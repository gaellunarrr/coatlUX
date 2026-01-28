import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTableStore } from "../../src/store/tableStore";
import { Link } from "expo-router";
import { Armchair } from "lucide-react-native";

export default function MesasScreen() {
  const insets = useSafeAreaInsets();
  const tables = useTableStore((state) => state.tables);

  const renderItem = ({ item }: { item: any }) => {
    const isOccupied = item.items.length > 0 || item.status === "occupied";

    return (
      <Link href={`/mesa/${item.id}`} asChild>
        <Pressable
          className={`m-2 flex-1 aspect-square justify-between rounded-2xl p-4 shadow-sm border ${isOccupied ? "bg-red-50 border-red-200" : "bg-white border-gray-100"
            }`}
        >
          <View className="items-end">
            <View className={`h-3 w-3 rounded-full ${isOccupied ? "bg-red-500" : "bg-green-500"}`} />
          </View>

          <View className="items-center">
            <Armchair size={32} className={isOccupied ? "text-red-400" : "text-gray-400"} />
            <Text className={`mt-2 text-lg font-bold ${isOccupied ? "text-red-800" : "text-gray-800"}`}>
              {item.name}
            </Text>
          </View>

          <View className="items-center">
            <Text className={`text-sm font-medium ${isOccupied ? "text-red-600" : "text-green-600"}`}>
              {isOccupied ? "Ocupada" : "Libre"}
            </Text>
            {isOccupied && (
              <Text className="text-xs text-gray-500 mt-1">
                {item.items.reduce((acc: number, curr: any) => acc + curr.quantity, 0)} items
              </Text>
            )}
          </View>
        </Pressable>
      </Link>
    );
  };

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      <View className="p-4">
        <Text className="mb-2 text-3xl font-bold text-gray-800">Mesas</Text>
        <Text className="mb-6 text-gray-500">Selecciona una mesa para gestionar la orden</Text>

        <FlatList
          data={tables}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 100 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      </View>
    </View>
  );
}
