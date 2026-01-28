import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface ProductState {
  products: Product[];
  addProduct: (newProduct: Product) => void;
  clearInventory: () => void;
}

export const useProductStore = create(
  persist<ProductState>(
    (set) => ({
      products: [
        { id: "1", name: "Laptop Gamer", price: 15000, stock: 5 },
        { id: "2", name: "Mouse Inalámbrico", price: 350, stock: 20 },
        { id: "3", name: "Teclado Mecánico", price: 890, stock: 12 },
        { id: "4", name: "Monitor 24 pulgadas", price: 3200, stock: 8 },
        { id: "5", name: "Auriculares Bluetooth", price: 1200, stock: 15 },
      ],

      addProduct: (newProduct) =>
        set((state) => ({ products: [...state.products, newProduct] })),

      clearInventory: () => set({ products: [] }),
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
