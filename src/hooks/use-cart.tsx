import { type ProductWithRelations } from "~/types/globals";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";

export type CartItem = {
  product: ProductWithRelations;
};

type CartState = {
  items: CartItem[];
  addItem: (product: ProductWithRelations) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id,
          );
          if (existingItem) {
            toast.error("Item already in cart");
            return state;
          }
          if (state.items.length > 0) {
            toast.error("Only one item is allowed in the cart");
            return { items: [{ product }] };
          }
          return { items: [...state.items, { product }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
