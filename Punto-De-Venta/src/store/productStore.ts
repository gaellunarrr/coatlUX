import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

type ProductStore = {
  products: Product[];

  addProduct: (newProduct: Product) => void;
  editProduct: (id: string, updates: Partial<Omit<Product, "id">>) => void;
  deleteProduct: (id: string) => void;

  clearInventory: () => void;
};

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],

      addProduct: (newProduct) =>
        set((state) => ({ products: [...state.products, newProduct] })),

      editProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      clearInventory: () => set({ products: [] }),
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
