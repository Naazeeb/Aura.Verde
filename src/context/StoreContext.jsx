import React, { useEffect, useMemo, useState } from "react";
import { StoreContext } from "./store.js";

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
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        const resolvedId = item?.id || item?._id;
        const qty = Number.isFinite(item?.qty) ? item.qty : 0;
        if (!resolvedId || qty <= 0) return null;
        return {
          id: resolvedId,
          _id: resolvedId,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          size: item.size,
          qty,
        };
      })
      .filter(Boolean);
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
              i.id === product.id
                ? {
                    ...i,
                    _id: product._id || product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    size: product.size,
                    qty: i.qty + qty,
                  }
                : i
            );
          }
          return [
            ...prev,
            {
              id: product.id,
              _id: product._id || product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category,
              size: product.size,
              qty,
            },
          ];
        });
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
