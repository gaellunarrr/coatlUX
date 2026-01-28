import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "./productStore";

export interface OrderItem extends Product {
  quantity: number;
}

export interface Table {
  id: string;
  name: string;
  status: "available" | "occupied";
  items: OrderItem[];
}

interface TableState {
  tables: Table[];
  occupyTable: (id: string) => void;
  addItemToTable: (tableId: string, product: Product) => void;
  removeItemFromTable: (tableId: string, productId: string) => void;
  freeTable: (id: string) => void;
}

export const useTableStore = create(
  persist<TableState>(
    (set) => ({
      tables: Array.from({ length: 6 }, (_, i) => ({
        id: (i + 1).toString(),
        name: `Mesa ${i + 1}`,
        status: "available",
        items: [],
      })),

      occupyTable: (id) =>
        set((state) => ({
          tables: state.tables.map((t) =>
            t.id === id ? { ...t, status: "occupied" } : t
          ),
        })),

      addItemToTable: (tableId, product) =>
        set((state) => ({
          tables: state.tables.map((t) => {
            if (t.id !== tableId) return t;

            const existingItem = t.items.find((i) => i.id === product.id);
            let newItems;

            if (existingItem) {
              newItems = t.items.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              );
            } else {
              newItems = [...t.items, { ...product, quantity: 1 }];
            }

            return { ...t, items: newItems, status: "occupied" };
          }),
        })),

      removeItemFromTable: (tableId, productId) =>
        set((state) => ({
          tables: state.tables.map((t) => {
            if (t.id !== tableId) return t;

            const existingItem = t.items.find((i) => i.id === productId);
            if (!existingItem) return t;

            let newItems;
            if (existingItem.quantity > 1) {
              newItems = t.items.map((i) =>
                i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
              );
            } else {
              newItems = t.items.filter((i) => i.id !== productId);
            }

            // If no items left, keep status occupied until manually freed or make rule?
            // Keeping occupied is safer.
            return { ...t, items: newItems };
          }),
        })),

      freeTable: (id) =>
        set((state) => ({
          tables: state.tables.map((t) =>
            t.id === id ? { ...t, status: "available", items: [] } : t
          ),
        })),
    }),
    {
      name: "table-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
