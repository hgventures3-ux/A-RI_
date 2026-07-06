import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";
import { sendEmail } from "@/lib/mailer";
import { getCouponDiscount, getShippingForCart, priceCartItems } from "@/lib/cartPricing";
import {
  Currency,
  currencyForCountry,
  detectCountryFromHeaders,
  formatMoney,
} from "@/lib/pricing";

function normalizeRequestedCurrency(value: unknown): Currency {
  return value === "INR" || value === "USD" || value === "EUR" ? value : "EUR";
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = body;

    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET as string)
      .update(text.toString())
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    const country = detectCountryFromHeaders(req.headers);
    const currency = currencyForCountry(country, normalizeRequestedCurrency(orderDetails?.currency));
    const pricedCart = await priceCartItems(orderDetails.items, currency);
    const coupon = await getCouponDiscount(orderDetails?.couponCode, pricedCart.subtotal);
    const shipping = getShippingForCart(pricedCart.subtotal, currency);
    const total = Number((pricedCart.subtotal - coupon.discount + shipping).toFixed(2));
    const orderNumber = `AERI-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = new Order({
      orderNumber,
      customer: {
        name: orderDetails.customer.name,
        email: orderDetails.customer.email,
        phone: orderDetails.customer.phone || "",
        address: orderDetails.customer.address,
        city: orderDetails.customer.city,
        zipCode: orderDetails.customer.zipCode,
        country: orderDetails.customer.country,
      },
      items: pricedCart.items,
      subtotal: pricedCart.subtotal,
      discount: coupon.discount,
      couponCode: coupon.couponCode,
      shipping,
      total,
      currency,
      paymentMethod: "Razorpay",
      paymentStatus: "Paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      timeline: [
        { status: "Pending", note: "Order placed by customer." },
        { status: "Paid", note: "Payment verified via Razorpay." },
      ],
    });

    await newOrder.save();

    const itemList = newOrder.items
      .map((item) => `<li>${item.quantity}x ${item.name} - ${formatMoney(item.price * item.quantity, currency)}</li>`)
      .join("");
    const totalDisplay = formatMoney(newOrder.total, currency);

    await sendEmail({
      to: newOrder.customer.email,
      subject: `Order Confirmation - ${orderNumber}`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Your order <strong>${orderNumber}</strong> has been received and payment is successful.</p>
        <h3>Order Details:</h3>
        <ul>${itemList}</ul>
        <p><strong>Total:</strong> ${totalDisplay}</p>
        <p>We will notify you once your order has been shipped.</p>
      `,
    });

    await sendEmail({
      to: process.env.SMTP_USER || "contact@aeri-snacks.com",
      subject: `New Order Received - ${orderNumber} (Paid)`,
      html: `
        <h2>New Order Received (Paid via Razorpay)</h2>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Customer:</strong> ${newOrder.customer.name} (${newOrder.customer.email})</p>
        <p><strong>Total:</strong> ${totalDisplay}</p>
        <p>Payment ID: ${razorpay_payment_id}</p>
        <p>Please check the admin dashboard for more details.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      orderNumber,
      total,
      currency,
      totalDisplay,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
