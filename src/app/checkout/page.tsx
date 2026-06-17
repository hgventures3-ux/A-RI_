"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

type CouponResult = {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  discountAmount: number;
  finalTotal: number;
};

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const { lang } = useLanguage();
  const router = useRouter();

  const isFrench = lang === "fr";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponResult | null>(null);
  const [couponError, setCouponError] = useState("");

  const finalTotal = appliedCoupon ? appliedCoupon.finalTotal : cartTotal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Coupon validation ──────────────────────────────────────────
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    setAppliedCoupon(null);

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, total: cartTotal }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.error || (isFrench ? "Code invalide" : "Invalid code"));
      } else {
        setAppliedCoupon(data);
        toast.success(
          isFrench
            ? `Code appliqué ! -€${data.discountAmount.toFixed(2)}`
            : `Coupon applied! -€${data.discountAmount.toFixed(2)}`
        );
      }
    } catch {
      setCouponError(isFrench ? "Erreur lors de la validation." : "Validation error.");
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // ── Razorpay ──────────────────────────────────────────────────
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.email &&
      formData.address &&
      formData.city &&
      formData.zipCode &&
      formData.country
    );
  };

  const handleRazorpayPayment = async () => {
    if (!isFormValid()) {
      toast.error(
        isFrench
          ? "Veuillez remplir tous les champs obligatoires."
          : "Please fill in all required fields."
      );
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error(
        isFrench
          ? "Échec du chargement de Razorpay. Êtes-vous connecté à Internet ?"
          : "Razorpay failed to load. Are you online?"
      );
      return;
    }

    try {
      const orderData = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items,
          amount: finalTotal 
        }),
      }).then((t) => t.json());

      if (orderData.error) {
        toast.error(orderData.error);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY || "",
        amount: orderData.amount * 100, // Make sure amount is exactly what backend computed
        currency: orderData.currency,
        name: "AÉRI Snacks",
        description: "Premium Makhana Checkout",
        order_id: orderData.order_id,
        handler: async function (response: any) {
          const payload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderDetails: {
              customer: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                zipCode: formData.zipCode,
                country: formData.country,
              },
              items: items,
              subtotal: orderData.subtotal,
              discount: appliedCoupon ? appliedCoupon.discountAmount : 0,
              couponCode: appliedCoupon ? appliedCoupon.code : undefined,
              shipping: orderData.shipping,
              total: orderData.amount,
            },
          };

          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }).then((t) => t.json());

          if (verifyRes.success) {
            clearCart();
            router.push(`/order-confirmation?orderNumber=${verifyRes.orderNumber}`);
          } else {
            toast.error(
              isFrench
                ? "Échec de la vérification du paiement. Contactez le support."
                : "Payment verification failed. Please contact support."
            );
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#1C1C1C",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      toast.error(
        isFrench
          ? "Échec de l'initiation du paiement."
          : "Failed to initiate payment."
      );
    }
  };

  // ── Empty cart ─────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 bg-[#FAF8F5] pt-32 px-4 sm:px-6 flex flex-col items-center justify-center gap-6">
          <h1
            className="text-3xl font-bold text-[#1C1C1C]"
            style={{ fontFamily: "var(--font-didot), serif" }}
          >
            {isFrench ? "Votre panier est vide" : "Your cart is empty"}
          </h1>
          <button
            onClick={() => router.push("/products")}
            className="px-8 py-3 bg-[#1C1C1C] text-[#FAF8F5] rounded-xl font-medium tracking-wide hover:bg-[#333] transition-colors"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            {isFrench ? "Continuer vos achats" : "Continue Shopping"}
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />
      <div className="flex-1 pt-32 pb-20 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-[#1C1C1C]"
            style={{ fontFamily: "var(--font-didot), serif" }}
          >
            {isFrench ? "Paiement sécurisé" : "Secure Checkout"}
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* ── Left: Shipping Form ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1 space-y-8"
            >
              <div className="bg-white/50 p-5 sm:p-8 rounded-2xl border border-[#cec5bb] shadow-sm">
                <h2
                  className="text-xl font-semibold mb-6 text-[#1C1C1C]"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {isFrench ? "Détails de livraison" : "Shipping Details"}
                </h2>
                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {/* First Name */}
                  <div>
                    <label className="block text-sm text-[#4c463e] mb-1">
                      {isFrench ? "Prénom" : "First Name"}*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#cec5bb] bg-white focus:ring-2 focus:ring-[#1C1C1C] outline-none"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm text-[#4c463e] mb-1">
                      {isFrench ? "Nom" : "Last Name"}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#cec5bb] bg-white focus:ring-2 focus:ring-[#1C1C1C] outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-[#4c463e] mb-1">
                      {isFrench ? "E-mail" : "Email"}*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#cec5bb] bg-white focus:ring-2 focus:ring-[#1C1C1C] outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-[#4c463e] mb-1">
                      {isFrench ? "Téléphone" : "Phone Number"}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={isFrench ? "+33 6 00 00 00 00" : "+1 555 000 0000"}
                      className="w-full px-4 py-3 rounded-xl border border-[#cec5bb] bg-white focus:ring-2 focus:ring-[#1C1C1C] outline-none"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-[#4c463e] mb-1">
                      {isFrench ? "Adresse" : "Address"}*
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#cec5bb] bg-white focus:ring-2 focus:ring-[#1C1C1C] outline-none"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm text-[#4c463e] mb-1">
                      {isFrench ? "Ville" : "City"}*
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#cec5bb] bg-white focus:ring-2 focus:ring-[#1C1C1C] outline-none"
                    />
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label className="block text-sm text-[#4c463e] mb-1">
                      {isFrench ? "Code Postal" : "Zip Code"}*
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#cec5bb] bg-white focus:ring-2 focus:ring-[#1C1C1C] outline-none"
                    />
                  </div>

                  {/* Country */}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-[#4c463e] mb-1">
                      {isFrench ? "Pays" : "Country"}*
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#cec5bb] bg-white focus:ring-2 focus:ring-[#1C1C1C] outline-none"
                    />
                  </div>
                </form>
              </div>

              {/* ── Coupon Code ── */}
              <div className="bg-white/50 p-5 sm:p-6 rounded-2xl border border-[#cec5bb] shadow-sm">
                <h2
                  className="text-base font-semibold mb-4 text-[#1C1C1C]"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {isFrench ? "Code Promo" : "Promo Code"}
                </h2>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                    <div>
                      <span
                        className="text-sm font-bold text-green-800"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        {appliedCoupon.code}
                      </span>
                      <p
                        className="text-xs text-green-700"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        -{appliedCoupon.discountType === "percentage"
                          ? `${appliedCoupon.discountValue}%`
                          : `€${appliedCoupon.discountValue}`}{" "}
                        {isFrench ? "remise appliquée" : "discount applied"} (−€{appliedCoupon.discountAmount.toFixed(2)})
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-green-700 hover:text-red-600 text-xs font-semibold uppercase tracking-wider transition-colors"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      {isFrench ? "Retirer" : "Remove"}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        setCouponError("");
                      }}
                      placeholder={isFrench ? "Entrer le code" : "Enter code"}
                      className="flex-1 px-4 py-3 rounded-xl border border-[#cec5bb] bg-white focus:ring-2 focus:ring-[#1C1C1C] outline-none text-sm uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponCode.trim()}
                      className="px-5 py-3 bg-[#1C1C1C] text-white rounded-xl text-sm font-semibold hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      {couponLoading
                        ? "..."
                        : isFrench
                        ? "Appliquer"
                        : "Apply"}
                    </button>
                  </div>
                )}
                {couponError && (
                  <p
                    className="mt-2 text-xs text-red-600 font-medium"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {couponError}
                  </p>
                )}
              </div>
            </motion.div>

            {/* ── Right: Order Summary + Payment ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full lg:w-[420px] flex flex-col gap-8"
            >
              {/* Order Summary */}
              <div className="bg-white/50 p-5 sm:p-8 rounded-2xl border border-[#cec5bb] shadow-sm">
                <h2
                  className="text-xl font-semibold mb-6 text-[#1C1C1C]"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {isFrench ? "Résumé de la commande" : "Order Summary"}
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 bg-[#FAF8F5] rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div
                        className="flex-1"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        <h4 className="text-sm font-semibold text-[#1C1C1C]">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#4c463e]">
                          {isFrench ? "Qté" : "Qty"}: {item.quantity}
                        </p>
                      </div>
                      <div
                        className="text-sm font-semibold text-[#1C1C1C]"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        €{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div
                  className="border-t border-[#cec5bb] pt-4 space-y-2"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  <div className="flex justify-between items-center text-sm text-[#4c463e]">
                    <span>{isFrench ? "Sous-total" : "Subtotal"}</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between items-center text-sm text-green-700 font-semibold">
                      <span>
                        {isFrench ? "Remise" : "Discount"} ({appliedCoupon.code})
                      </span>
                      <span>−€{appliedCoupon.discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm text-[#4c463e]">
                    <span>{isFrench ? "Livraison" : "Shipping"}</span>
                    <span>{isFrench ? "Gratuit" : "Free"}</span>
                  </div>

                  <div className="flex justify-between items-center text-lg font-bold text-[#1C1C1C] pt-2 border-t border-[#cec5bb]">
                    <span>Total</span>
                    <span>€{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* ── Payment Buttons ── */}
                <div className="mt-8 space-y-4">
                  {/* Razorpay */}
                  <button
                    onClick={handleRazorpayPayment}
                    className="w-full py-3.5 px-4 bg-[#1C1C1C] text-white rounded-xl font-semibold tracking-wide hover:bg-[#333] transition-colors flex justify-center items-center gap-2 text-sm"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    {isFrench ? "Payer de manière sécurisée" : "Pay Securely"}
                  </button>
                  
                </div>
              </div>

              {/* Security badges */}
              <div
                className="flex items-center justify-center gap-6 text-xs text-[#4c463e]/70"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  {isFrench ? "Paiement sécurisé SSL" : "SSL Secured Payment"}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                  {isFrench ? "Données chiffrées" : "Encrypted Data"}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
