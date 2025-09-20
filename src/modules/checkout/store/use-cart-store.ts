import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TenantCart = {
  productIds: string[];
};

type CartState = {
  tenantCarts: Record<string, TenantCart>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCarts: () => void;
  getCartByTenant: (tenantSlug: string) => string[];
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      tenantCarts: {},

      addProduct: (tenantSlug, productId) => {
        set((state) => {
          const tenantCart = state.tenantCarts[tenantSlug] || {
            productIds: [],
          };
          if (!tenantCart.productIds.includes(productId)) {
            tenantCart.productIds.push(productId);
          }
          return {
            tenantCarts: {
              ...state.tenantCarts,
              [tenantSlug]: tenantCart,
            },
          };
        });
      },

      removeProduct: (tenantSlug, productId) => {
        set((state) => {
          const tenantCart = state.tenantCarts[tenantSlug];
          if (tenantCart) {
            tenantCart.productIds = tenantCart.productIds.filter(
              (id) => id !== productId
            );
            return {
              tenantCarts: {
                ...state.tenantCarts,
                [tenantSlug]: tenantCart,
              },
            };
          }
          return state;
        });
      },

      clearCart: (tenantSlug) => {
        set((state) => {
          const newCarts = { ...state.tenantCarts };
          delete newCarts[tenantSlug];
          return { tenantCarts: newCarts };
        });
      },

      clearAllCarts: () => {
        set({ tenantCarts: {} });
      },

      getCartByTenant: (tenantSlug) => {
        const tenantCart = get().tenantCarts[tenantSlug];
        return tenantCart ? tenantCart.productIds : [];
      },
    }),
    {
      name: "funroad-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
