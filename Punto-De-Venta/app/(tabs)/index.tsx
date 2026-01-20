import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";
import {
  ShoppingCart,
  Package,
  TrendingUp,
  PlusCircle,
} from "lucide-react-native";

export default function HomeScreen() {
  // Estos datos vendrán luego de tu Zustand Store
  const stats = [
    {
      id: 1,
      label: "Ventas hoy",
      value: "$0.00",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      id: 2,
      label: "Productos",
      value: "0",
      icon: Package,
      color: "text-blue-600",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* Header de Bienvenida */}
      <View className="mb-8 mt-4">
        <Text className="text-3xl font-bold text-gray-800">Mi POS</Text>
        <Text className="text-gray-500">Panel de control de hoy</Text>
      </View>

      {/* Tarjetas de Resumen Rápido */}
      <View className="mb-8 flex-row justify-between">
        {stats.map((stat) => (
          <View
            key={stat.id}
            className="w-[47%] rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <stat.icon size={24} color="#4b5563" className="mb-2" />
            <Text className="text-sm text-gray-500">{stat.label}</Text>
            <Text className={`text-xl font-bold ${stat.color}`}>
              {stat.value}
            </Text>
          </View>
        ))}
      </View>

      {/* Acciones Principales */}
      <Text className="mb-4 text-lg font-semibold text-gray-700">
        Acciones rápidas
      </Text>

      <View className="space-y-4">
        {/* Botón Nueva Venta */}
        <Link href="/(tabs)/ventas" asChild>
          <TouchableOpacity
            className="flex-row items-center justify-between rounded-2xl bg-blue-600 p-6 shadow-md"
            activeOpacity={0.8}
          >
            <View className="flex-row items-center">
              <PlusCircle color="white" size={28} />
              <Text className="ml-3 text-lg font-bold text-white">
                Nueva Venta
              </Text>
            </View>
            <ShoppingCart color="white" size={20} opacity={0.5} />
          </TouchableOpacity>
        </Link>

        {/* Botón Ver Inventario */}
        <Link href="/(tabs)/inventario" asChild>
          <TouchableOpacity
            className="flex-row items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            activeOpacity={0.7}
          >
            <Package color="#4b5563" size={24} />
            <Text className="ml-3 text-lg font-medium text-gray-700">
              Gestionar Inventario
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-10 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <Text className="text-center font-medium italic text-blue-800">
          "El éxito de un negocio es el orden de sus cuentas."
        </Text>
      </View>
    </ScrollView>
  );
}
