import { NextResponse } from "next/server";
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
    const country = detectCountryFromHeaders(req.headers);
    const currency = currencyForCountry(country, normalizeRequestedCurrency(body.currency));
    const pricedCart = await priceCartItems(body.items || [], currency);
    const coupon = await getCouponDiscount(body.couponCode, pricedCart.subtotal);
    const shipping = getShippingForCart(pricedCart.subtotal, currency);
    const total = Number((pricedCart.subtotal - coupon.discount + shipping).toFixed(2));
    const orderNumber = `AERI-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = new Order({
      orderNumber,
      customer: {
        name: body.customer.name,
        email: body.customer.email,
        phone: body.customer.phone || "",
        address: body.customer.address,
        city: body.customer.city,
        zipCode: body.customer.zipCode,
        country: body.customer.country,
      },
      items: pricedCart.items,
      subtotal: pricedCart.subtotal,
      discount: coupon.discount,
      couponCode: coupon.couponCode,
      shipping,
      total,
      currency,
      paymentMethod: body.paymentMethod || "Razorpay",
      paymentStatus: body.paymentStatus || "Pending",
      timeline: [
        { status: "Pending", note: "Order placed by customer." },
        ...(body.paymentStatus === "Paid"
          ? [{ status: "Paid", note: "Payment verified successfully." }]
          : []),
      ],
    });

    await newOrder.save();

    const totalDisplay = formatMoney(newOrder.total, currency);
    const itemList = newOrder.items
      .map((item) => `<li>${item.quantity}x ${item.name} - ${formatMoney(item.price * item.quantity, currency)}</li>`)
      .join("");

    await sendEmail({
      to: newOrder.customer.email,
      subject: `Order Confirmation - ${orderNumber}`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Your order <strong>${orderNumber}</strong> has been received and is currently being processed.</p>
        <h3>Order Details:</h3>
        <ul>${itemList}</ul>
        <p><strong>Total:</strong> ${totalDisplay}</p>
        <p>We will notify you once your order has been shipped.</p>
      `,
    });

    await sendEmail({
      to: process.env.SMTP_USER || "contact@aeri-snacks.com",
      subject: `New Order Received - ${orderNumber}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Customer:</strong> ${newOrder.customer.name} (${newOrder.customer.email})</p>
        <p><strong>Total:</strong> ${totalDisplay}</p>
        <p>Please check the admin dashboard for more details.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
      orderNumber,
      total,
      currency,
      totalDisplay,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
