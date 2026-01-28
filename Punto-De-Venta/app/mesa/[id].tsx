import React from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useProductStore } from "../../src/store/productStore";
import { useTableStore } from "../../src/store/tableStore";
import { ArrowLeft, CheckCircle, Package, Minus, Plus } from "lucide-react-native";

export default function MesaDetalleScreen() {
    const { id } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const products = useProductStore((state) => state.products);
    const { tables, addItemToTable, removeItemFromTable, freeTable } = useTableStore();

    const table = tables.find((t) => t.id === id);

    if (!table) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <Text className="text-lg text-gray-500">Mesa no encontrada</Text>
                <Pressable onPress={() => router.back()} className="mt-4">
                    <Text className="text-blue-600">Volver</Text>
                </Pressable>
            </View>
        );
    }

    const tableTotal = table.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleSendToKitchen = () => {
        if (table.items.length === 0) {
            Alert.alert("Orden Vacía", "No hay productos para enviar.");
            return;
        }

        Alert.alert(
            "Confirmar Orden",
            "¿Enviar orden a cocina y liberar mesa?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Enviar",
                    onPress: () => {
                        freeTable(table.id);
                        Alert.alert("Enviado", "La orden se ha enviado a cocina.", [
                            { text: "OK", onPress: () => router.back() }
                        ]);
                    }
                }
            ]
        );
    };

    const getQuantity = (productId: string) => {
        const item = table.items.find(i => i.id === productId);
        return item ? item.quantity : 0;
    };

    return (
        <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="flex-row items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm">
                <Pressable onPress={() => router.back()} className="rounded-full bg-gray-100 p-2">
                    <ArrowLeft size={24} className="text-gray-600" />
                </Pressable>
                <Text className="text-xl font-bold text-gray-800">{table.name}</Text>
                <View className={`rounded-full px-3 py-1 ${table.items.length > 0 ? "bg-orange-100" : "bg-green-100"}`}>
                    <Text className={`text-xs font-bold ${table.items.length > 0 ? "text-orange-600" : "text-green-600"}`}>
                        {table.items.length > 0 ? "En Curso" : "Libre"}
                    </Text>
                </View>
            </View>

            <View className="flex-1 p-2">
                <Text className="mb-2 ml-2 text-lg font-semibold text-gray-700">Menú</Text>

                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => addItemToTable(table.id, item)}
                            className="m-2 flex-1 rounded-2xl bg-white p-4 shadow-sm active:bg-blue-50"
                        >
                            <View className="items-center">
                                <Package size={28} className="mb-2 text-gray-400" />
                                <Text className="text-center font-bold text-gray-800">{item.name}</Text>
                                <Text className="text-green-600 font-semibold">${item.price}</Text>
                            </View>

                            {/* Quantity Controls within Card */}
                            {getQuantity(item.id) > 0 && (
                                <View className="mt-3 flex-row items-center justify-center bg-gray-100 rounded-lg p-1">
                                    <Pressable onPress={() => removeItemFromTable(table.id, item.id)} className="p-1 bg-white rounded-full shadow-sm">
                                        <Minus size={16} className="text-gray-600" />
                                    </Pressable>
                                    <Text className="mx-3 font-bold text-gray-800">{getQuantity(item.id)}</Text>
                                    <Pressable onPress={() => addItemToTable(table.id, item)} className="p-1 bg-blue-600 rounded-full shadow-sm">
                                        <Plus size={16} className="text-white" />
                                    </Pressable>
                                </View>
                            )}
                        </Pressable>
                    )}
                />
            </View>

            {/* Footer Summary */}
            {table.items.length > 0 && (
                <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6 shadow-lg border-t border-gray-100">
                    <View className="flex-row justify-between mb-4">
                        <Text className="text-lg text-gray-500">Total</Text>
                        <Text className="text-2xl font-bold text-gray-900">${tableTotal.toFixed(2)}</Text>
                    </View>
                    <Pressable
                        onPress={handleSendToKitchen}
                        className="flex-row items-center justify-center rounded-xl bg-orange-500 p-4 shadow-md active:bg-orange-600"
                    >
                        <CheckCircle size={24} className="mr-2 text-white" />
                        <Text className="text-lg font-bold text-white">Listo / Enviar a Cocina</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}
