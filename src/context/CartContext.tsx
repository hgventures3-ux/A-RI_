"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useCurrency, Currency } from "@/context/CurrencyContext";
import { DEFAULT_PRODUCT_BASE_PRICE, PriceableProduct } from "@/lib/pricing";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  basePrice?: number;
  basePriceINR?: number;
  currency?: Currency;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity" | "price"> & { price?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | null>(null);
  const { currency, getPrice } = useCurrency();

  const priceCartItem = (item: CartItem | (Omit<CartItem, "quantity" | "price"> & { price?: number; quantity?: number })): CartItem => {
    const source: PriceableProduct = {
      basePrice: item.basePrice ?? DEFAULT_PRODUCT_BASE_PRICE,
      basePriceINR: (item as any).basePriceINR,
      price: item.basePrice ?? item.price,
    };

    return {
      ...item,
      price: getPrice(source),
      basePrice: item.basePrice ?? DEFAULT_PRODUCT_BASE_PRICE,
      currency,
      quantity: item.quantity ?? 1,
    };
  };

  // Check customer auth state on mount/pathname change
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.user && data.user.id) {
            setUserId(data.user.id);
            return;
          }
        }
        setUserId("guest");
      } catch (error) {
        setUserId("guest");
      }
    };
    checkUser();
  }, [pathname]);

  // Load from local storage when userId is set
  useEffect(() => {
    if (userId === null) return;

    const saved = localStorage.getItem(`aeri_cart_${userId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CartItem[];
        setItems(parsed.map(priceCartItem));
      } catch (e) {
        console.error("Failed to parse cart", e);
        setItems([]);
      }
    } else {
      setItems([]);
    }
    setIsLoaded(true);
  }, [userId, currency]);

  // Save to local storage when items or userId changes
  useEffect(() => {
    if (isLoaded && userId !== null) {
      localStorage.setItem(`aeri_cart_${userId}`, JSON.stringify(items));
    }
  }, [items, isLoaded, userId]);

  const addToCart = (product: Omit<CartItem, "quantity" | "price"> & { price?: number }) => {
    const pricedProduct = priceCartItem(product);
    setItems((prev) => {
      const existing = prev.find((item) => item.id === pricedProduct.id);
      if (existing) {
        return prev.map((item) =>
          item.id === pricedProduct.id
            ? { ...priceCartItem(item), quantity: item.quantity + 1 }
            : priceCartItem(item)
        );
      }
      return [...prev.map(priceCartItem), pricedProduct];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...priceCartItem(item), quantity } : priceCartItem(item)))
    );
  };

  const clearCart = () => setItems([]);

  // Calculate totals only when loaded to avoid hydration mismatch
  const cartCount = isLoaded ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const cartTotal = isLoaded ? items.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        cartTotal,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
