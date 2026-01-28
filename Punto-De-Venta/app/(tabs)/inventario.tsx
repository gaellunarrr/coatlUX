import React from "react";
import { View, Text, FlatList, ListRenderItem } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Package } from "lucide-react-native";
import { useProductStore, Product } from "../../src/store/productStore";

export default function InventarioScreen() {
  const insets = useSafeAreaInsets();
  const products = useProductStore((state) => state.products);

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <View className="mb-3 flex-row items-center justify-between rounded-xl bg-white p-4 shadow-sm">
      <View className="flex-row items-center gap-3">
        <View className="rounded-lg bg-blue-100 p-2">
          <Package size={24} className="text-blue-600" />
        </View>
        <View>
          <Text className="text-lg font-semibold text-gray-800">
            {item.name}
          </Text>
          <Text className="text-sm text-gray-500">Stock: {item.stock}</Text>
        </View>
      </View>
      <Text className="text-lg font-bold text-green-600">
        ${item.price.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      <View className="p-4">
        <Text className="mb-6 text-2xl font-bold text-gray-800">
          Inventario
        </Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="mt-20 items-center justify-center">
              <Package size={64} className="text-gray-300" />
              <Text className="mt-4 text-lg font-medium text-gray-400">
                No hay productos en inventario
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}
