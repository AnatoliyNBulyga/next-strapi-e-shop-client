import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import {Product} from "@/types";
import { toast } from "react-hot-toast";

interface CartStore {
    items: { product: Product, quantity: number }[];
    addItem: (data: Product, quantity?: number) => void;
    increaseQuantity: (data: Product, quantity?: number) => void;
    decreaseQuantity: (data: Product, quantity?: number) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data, quantity = 1) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.product.id === data.id);

            if (existingItem) {
                set({ items: currentItems.map((item) => ({
                        ...item,
                        quantity: item.product.id === data.id ? item.quantity + quantity : item.quantity
                    }))
                })
                toast.success(`One more item has been added to cart.`);
            } else {
                set({ items: [...currentItems, { product: data, quantity } ] });
                toast.success(`Item has been added to cart.`);
            }

        },
        increaseQuantity: (data, quantity = 1) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.product.id === data.id);

            if (existingItem) {
                set({ items: currentItems.map((item) => ({
                        ...item,
                        quantity: item.product.id === data.id ? item.quantity + quantity : item.quantity
                    }))
                })
            }
        },
        decreaseQuantity: (data, quantity = 1) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.product.id === data.id);
            if (existingItem && existingItem.quantity > 1) {
                set({ items: currentItems.map((item) => ({
                        ...item,
                        quantity: item.product.id === data.id ? item.quantity - quantity : item.quantity
                    }))
                })
            } else {
                set({ items: [...get().items.filter((item) => item.product.id !== data.id)] });
            }
        },
        removeItem: (id: string) => {
            const existingItem = get().items.find((item) => item.product.id === id);
            const isPlural = Number(existingItem?.quantity) > 1
            set({ items: [...get().items.filter((item) => item.product.id !== id)] });
            toast.success(`Item${isPlural ? 's have' : ' has'}  been removed from the cart.`);
        },
        removeAll: () => {
            set({ items: [] });
            toast.success("All items have been removed");
        },
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
);

export default useCart;