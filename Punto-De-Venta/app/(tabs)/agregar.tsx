import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useProductStore } from "../../src/store/productStore";
import { useRouter } from "expo-router";
import { Save, XCircle } from "lucide-react-native";

export default function AgregarProductoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const addProduct = useProductStore((state) => state.addProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSave = () => {
    if (!name.trim() || !price.trim() || !stock.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const priceNum = parseFloat(price);
    const stockNum = parseInt(stock, 10);

    if (isNaN(priceNum) || isNaN(stockNum)) {
      Alert.alert("Error", "Precio y Stock deben ser números válidos");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: name.trim(),
      price: priceNum,
      stock: stockNum,
    };

    addProduct(newProduct);

    // Reset form
    setName("");
    setPrice("");
    setStock("");

    Alert.alert("Éxito", "Producto agregado correctamente", [
      { text: "OK", onPress: () => router.push("/(tabs)/inventario") }
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
        <ScrollView className="p-6">
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-800">Nuevo Producto</Text>
            <Text className="text-gray-500">Ingresa los detalles del producto</Text>
          </View>

          <View className="space-y-6">
            {/* Nombre */}
            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700">Nombre del Producto</Text>
              <TextInput
                className="rounded-xl border border-gray-200 bg-white p-4 text-gray-800 shadow-sm"
                placeholder="Ej. Hamburguesa Doble"
                placeholderTextColor="#9ca3af"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Precio */}
            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700">Precio ($)</Text>
              <TextInput
                className="rounded-xl border border-gray-200 bg-white p-4 text-gray-800 shadow-sm"
                placeholder="0.00"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />
            </View>

            {/* Stock */}
            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700">Stock Inicial</Text>
              <TextInput
                className="rounded-xl border border-gray-200 bg-white p-4 text-gray-800 shadow-sm"
                placeholder="0"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                value={stock}
                onChangeText={setStock}
              />
            </View>

            <View className="mt-8 flex-row gap-4">
              <Pressable
                onPress={() => router.back()}
                className="flex-1 flex-row items-center justify-center rounded-xl border border-gray-300 bg-white p-4"
              >
                <XCircle size={20} className="mr-2 text-gray-600" />
                <Text className="font-semibold text-gray-700">Cancelar</Text>
              </Pressable>

              <Pressable
                onPress={handleSave}
                className="flex-1 flex-row items-center justify-center rounded-xl bg-blue-600 p-4 shadow-md active:bg-blue-700"
              >
                <Save size={20} className="mr-2 text-white" />
                <Text className="font-bold text-white">Guardar</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
