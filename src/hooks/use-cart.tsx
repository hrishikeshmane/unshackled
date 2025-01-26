import { type ProductWithRelations } from "~/types/globals";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";

export type CartItem = {
  product: ProductWithRelations;
  quantity: number;
  isDownPayment: boolean;
  refNumber: string;
  orderPrice: string; // Added orderPrice field
};

type CartState = {
  items: CartItem[];
  addItem: (product: ProductWithRelations, isDownPayment: boolean, orderPrice: string, refNumber: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, isDownPayment, orderPrice, refNumber, quantity = 1, ) =>
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
            return { items: [{ product, quantity, isDownPayment, orderPrice, refNumber }] };
          }
          return { items: [...state.items, { product, quantity, isDownPayment, orderPrice, refNumber }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      updateQuantity: (id, newQuantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === id ? { ...item, quantity: newQuantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
