import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(null);
const LS_KEY = "auraverde_cart_v1";

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function StoreProvider({ children }) {
  const [ui, setUi] = useState({ menuOpen: false, cartOpen: false });

  const [cart, setCart] = useState(() => {
    const raw = localStorage.getItem(LS_KEY);
    const parsed = raw ? safeParse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(cart));
  }, [cart]);

  const actions = useMemo(
    () => ({
      toggleMenu() {
        setUi((s) => ({ ...s, menuOpen: !s.menuOpen }));
      },
      closeMenu() {
        setUi((s) => ({ ...s, menuOpen: false }));
      },

      openCart() {
        setUi((s) => ({ ...s, cartOpen: true }));
      },
      closeCart() {
        setUi((s) => ({ ...s, cartOpen: false }));
      },
      toggleCart() {
        setUi((s) => ({ ...s, cartOpen: !s.cartOpen }));
      },

      addToCart(product, qty = 1) {
        setCart((prev) => {
          const found = prev.find((i) => i.id === product.id);
          if (found) {
            return prev.map((i) =>
              i.id === product.id ? { ...i, qty: i.qty + qty } : i
            );
          }
          return [...prev, { id: product.id, name: product.name, price: product.price, qty }];
        });

        setUi((s) => ({ ...s, cartOpen: true }));
      },

      decQty(id) {
        setCart((prev) =>
          prev
            .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0)
        );
      },

      incQty(id) {
        setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
      },

      removeItem(id) {
        setCart((prev) => prev.filter((i) => i.id !== id));
      },

      clearCart() {
        setCart([]);
      },
    }),
    []
  );

  const value = useMemo(() => ({ ui, cart, ...actions }), [ui, cart, actions]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
