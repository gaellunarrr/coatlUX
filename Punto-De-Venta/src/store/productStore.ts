import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useProductStore = create(
  persist(
    (set) => ({
      products: [], 
      
      addProduct: (newProduct) => 
        set((state) => ({ products: [...state.products, newProduct] })),
        
      clearInventory: () => set({ products: [] }),
    }),
    {
      name: 'product-storage', 
      storage: createJSONStorage(() => AsyncStorage), 
    }
  )
);