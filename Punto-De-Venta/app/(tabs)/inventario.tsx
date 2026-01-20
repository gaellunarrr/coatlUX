import React from 'react';
import { View, Text } from 'react-native';

export default function InventarioScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold text-gray-800">Inventario</Text>
      <Text className="text-gray-500 mt-2">Gestión de productos aquí</Text>
    </View>
  );
}
