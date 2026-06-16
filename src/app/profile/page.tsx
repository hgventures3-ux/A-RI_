"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LogOut, User, ShoppingBag, Calendar, Mail, Phone, MapPin, Loader2, ChevronRight, PackageOpen } from "lucide-react";
import toast from "react-hot-toast";

const translations = {
  fr: {
    heading: "Mon Compte",
    welcome: "Ravi de vous revoir",
    detailsHeading: "Informations personnelles",
    name: "Nom",
    email: "Adresse e-mail",
    phone: "Téléphone",
    city: "Ville",
    notProvided: "Non renseigné",
    joined: "Inscrit le",
    logoutBtn: "Se déconnecter",
    ordersHeading: "Historique des commandes",
    noOrders: "Vous n'avez pas encore passé de commande.",
    orderNo: "N° de commande",
    date: "Date",
    total: "Total",
    status: "Statut",
    payment: "Paiement",
    items: "Articles",
    loading: "Chargement de votre compte...",
    logoutSuccess: "Déconnexion réussie !",
    viewWebsite: "Continuer mes achats",
  },
  en: {
    heading: "My Account",
    welcome: "Welcome back",
    detailsHeading: "Personal Information",
    name: "Name",
    email: "Email",
    phone: "Phone",
    city: "City",
    notProvided: "Not provided",
    joined: "Joined on",
    logoutBtn: "Log Out",
    ordersHeading: "Order History",
    noOrders: "You haven't placed any orders yet.",
    orderNo: "Order No.",
    date: "Date",
    total: "Total",
    status: "Status",
    payment: "Payment",
    items: "Items",
    loading: "Loading your account...",
    logoutSuccess: "Logged out successfully!",
    viewWebsite: "Continue Shopping",
  },
};

const statusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800 border-amber-200/50",
  Processing: "bg-blue-100 text-blue-800 border-blue-200/50",
  Packed: "bg-purple-100 text-purple-800 border-purple-200/50",
  Shipped: "bg-indigo-100 text-indigo-800 border-indigo-200/50",
  Delivered: "bg-green-100 text-green-800 border-green-200/50",
  Cancelled: "bg-red-100 text-red-800 border-red-200/50",
  Refunded: "bg-gray-100 text-gray-800 border-gray-200/50",
};

const paymentStatusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800 border-amber-200/50",
  Paid: "bg-green-100 text-green-800 border-green-200/50",
  Failed: "bg-red-100 text-red-800 border-red-200/50",
  Refunded: "bg-gray-100 text-gray-800 border-gray-200/50",
};

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  createdAt: string;
}

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  createdAt: string;
  total: number;
  status: string;
  paymentStatus: string;
  items: OrderItem[];
}

export default function ProfilePage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const s = translations[lang as keyof typeof translations] || translations.fr;

  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/login?callbackUrl=/profile");
            return;
          }
          throw new Error("Failed to fetch profile");
        }
        const data = await res.json();
        setUser(data.user);
        setOrders(data.orders || []);
      } catch (err) {
        console.error(err);
        toast.error("Error loading account data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        toast.success(s.logoutSuccess);
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1C1C]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-[#1C1C1C] mb-4" />
          <p className="text-sm font-medium tracking-wide">{s.loading}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1C1C]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#1C1C1C]/10 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl text-[#1C1C1C]" style={{ fontFamily: "var(--font-didot)" }}>
              {s.heading}
            </h1>
            <p className="text-sm text-[#1C1C1C]/60 mt-1">
              {s.welcome}, <span className="font-semibold text-[#1C1C1C]">{user.name}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/products")}
              className="px-4 py-2 border border-[#1C1C1C]/25 text-[#1C1C1C] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#1C1C1C]/5 transition-colors cursor-pointer"
            >
              {s.viewWebsite}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-[#1C1C1C] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#333333] transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              <span>{s.logoutBtn}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Information */}
          <div className="lg:col-span-1 bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-sm h-fit">
            <h2 className="text-lg font-semibold text-[#1C1C1C] mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-didot)" }}>
              <User size={18} className="text-[#D4AF37]" />
              {s.detailsHeading}
            </h2>

            <div className="space-y-4 text-xs">
              <div className="border-b border-[#1C1C1C]/5 pb-3">
                <span className="text-[#1C1C1C]/50 uppercase tracking-wider font-bold block mb-1">{s.name}</span>
                <span className="font-medium text-sm text-[#1C1C1C]">{user.name}</span>
              </div>
              <div className="border-b border-[#1C1C1C]/5 pb-3">
                <span className="text-[#1C1C1C]/50 uppercase tracking-wider font-bold block mb-1 flex items-center gap-1.5">
                  <Mail size={12} />
                  {s.email}
                </span>
                <span className="font-medium text-[#1C1C1C]">{user.email}</span>
              </div>
              <div className="border-b border-[#1C1C1C]/5 pb-3">
                <span className="text-[#1C1C1C]/50 uppercase tracking-wider font-bold block mb-1 flex items-center gap-1.5">
                  <Phone size={12} />
                  {s.phone}
                </span>
                <span className="font-medium text-[#1C1C1C]">{user.phone || s.notProvided}</span>
              </div>
              <div className="border-b border-[#1C1C1C]/5 pb-3">
                <span className="text-[#1C1C1C]/50 uppercase tracking-wider font-bold block mb-1 flex items-center gap-1.5">
                  <MapPin size={12} />
                  {s.city}
                </span>
                <span className="font-medium text-[#1C1C1C]">{user.city || s.notProvided}</span>
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[#1C1C1C]/55">
                <Calendar size={12} />
                <span>
                  {s.joined} {new Date(user.createdAt).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-[#1C1C1C] flex items-center gap-2" style={{ fontFamily: "var(--font-didot)" }}>
              <ShoppingBag size={20} className="text-[#D4AF37]" />
              {s.ordersHeading}
            </h2>

            {orders.length === 0 ? (
              <div className="bg-white/40 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-3xl text-center flex flex-col items-center justify-center">
                <PackageOpen size={48} className="text-[#1C1C1C]/20 mb-4" />
                <p className="text-[#1C1C1C]/60 text-sm font-medium">{s.noOrders}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1C1C1C]/5 pb-4 mb-4 gap-2">
                      <div>
                        <span className="text-xs text-[#1C1C1C]/50 uppercase tracking-wider font-bold block">
                          {s.orderNo}
                        </span>
                        <span className="text-sm font-bold text-[#1C1C1C]">{order.orderNumber}</span>
                      </div>
                      <div className="flex items-center gap-3 self-start sm:self-auto">
                        <span className="text-xs text-[#1C1C1C]/65">
                          {new Date(order.createdAt).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US")}
                        </span>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${statusColors[order.status] || "bg-gray-100 text-gray-800"}`}>
                          {order.status}
                        </span>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${paymentStatusColors[order.paymentStatus] || "bg-gray-100 text-gray-800"}`}>
                          {s.payment}: {order.paymentStatus}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs py-1">
                          <div className="flex items-center gap-3">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 object-cover rounded-lg bg-gray-50 border border-gray-100 shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                                🥣
                              </div>
                            )}
                            <div>
                              <span className="font-semibold text-[#1C1C1C] block">{item.name}</span>
                              <span className="text-[#1C1C1C]/50 text-[10px]">Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <span className="font-bold text-[#1C1C1C]">€{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center border-t border-[#1C1C1C]/5 mt-4 pt-4 text-sm font-bold">
                      <span className="text-[#1C1C1C]/60 text-xs font-semibold">{s.total}</span>
                      <span className="text-lg text-[#1C1C1C]">€{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
