import mongoose from "mongoose";
import Product from "@/lib/models/Product";
import Coupon from "@/lib/models/Coupon";
import {
  Currency,
  DEFAULT_PRODUCT_BASE_PRICE,
  getProductUnitPrice,
  resolveCartProductSlug,
} from "@/lib/pricing";

export type IncomingCartItem = {
  id?: string;
  productId?: string;
  name?: string;
  image?: string;
  quantity?: number;
  basePrice?: number;
};

export type PricedCartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

async function findProduct(itemId: string) {
  if (mongoose.Types.ObjectId.isValid(itemId)) {
    return Product.findById(itemId);
  }

  return Product.findOne({ slug: resolveCartProductSlug(itemId) });
}

export async function priceCartItems(items: IncomingCartItem[], currency: Currency) {
  const pricedItems: PricedCartItem[] = [];
  let subtotal = 0;

  for (const item of items) {
    const itemId = item.id || item.productId || "";
    const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
    const dbProduct = itemId ? await findProduct(itemId) : null;

    if (dbProduct && dbProduct.stockQuantity < quantity) {
      throw new Error(`Not enough stock for ${item.name || dbProduct.name}`);
    }

    const sourceProduct = dbProduct
      ? {
          price: dbProduct.discountPrice || dbProduct.price,
          basePrice: dbProduct.price,
        }
      : {
          basePrice: item.basePrice ?? DEFAULT_PRODUCT_BASE_PRICE,
        };
    const unitPrice = getProductUnitPrice(sourceProduct, currency);

    pricedItems.push({
      productId: dbProduct ? String(dbProduct._id) : itemId,
      name: item.name || dbProduct?.name || itemId,
      price: unitPrice,
      quantity,
      image: item.image || dbProduct?.images?.[0] || "",
    });
    subtotal += unitPrice * quantity;
  }

  return {
    items: pricedItems,
    subtotal: Number(subtotal.toFixed(2)),
  };
}

export function getShippingForCart(subtotal: number, currency: Currency): number {
  if (currency === "INR") return 0;
  return subtotal >= 50 ? 0 : 5;
}

export async function getCouponDiscount(code: string | undefined, subtotal: number) {
  if (!code) {
    return { couponCode: "", discount: 0 };
  }

  const coupon = await Coupon.findOne({
    code: code.toUpperCase().trim(),
    isActive: true,
  });

  if (!coupon) {
    return { couponCode: "", discount: 0 };
  }

  const now = new Date();
  const isOutsideWindow = now < coupon.validFrom || now > coupon.validUntil;
  const isUsageExceeded = coupon.maxUsage && coupon.usedCount >= coupon.maxUsage;
  const isBelowMinimum = coupon.minPurchase && subtotal < coupon.minPurchase;

  if (isOutsideWindow || isUsageExceeded || isBelowMinimum) {
    return { couponCode: "", discount: 0 };
  }

  const discount =
    coupon.discountType === "percentage"
      ? (subtotal * coupon.discountValue) / 100
      : coupon.discountValue;

  return {
    couponCode: coupon.code,
    discount: Number(Math.min(discount, subtotal).toFixed(2)),
  };
}
