import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { ShoppingCart, Package, TrendingUp, PlusCircle } from 'lucide-react-native';

export default function HomeScreen() {
  const stats = [
    { id: 1, label: 'Ventas hoy', value: '$0.00', icon: TrendingUp, color: 'text-green-600' },
    { id: 2, label: 'Productos', value: '0', icon: Package, color: 'text-blue-600' },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* Header */}
      <View className="mb-8 mt-4">
        <Text className="text-3xl font-bold text-gray-800">Mi POS</Text>
        <Text className="text-gray-500">Panel de control de hoy</Text>
      </View>

      {/* Tarjetas de Resumen */}
      <View className="flex-row justify-between mb-8">
        {stats.map((stat) => (
          <View key={stat.id} className="bg-white p-4 rounded-2xl w-[47%] shadow-sm border border-gray-100">
            {/* Quitamos className del icono y usamos un View para el margen */}
            <View className="mb-2">
              <stat.icon size={24} color="#4b5563" />
            </View>
            <Text className="text-gray-500 text-sm">{stat.label}</Text>
            <Text className={`text-xl font-bold ${stat.color}`}>{stat.value}</Text>
          </View>
        ))}
      </View>

      {/* Acciones Principales */}
      <Text className="text-lg font-semibold text-gray-700 mb-4">Acciones rápidas</Text>
      
      {/* Reemplazamos space-y-4 por gap-4 (si usas SDK 50+) o márgenes manuales */}
      <View style={{ gap: 16 }}> 
        <Link href="/(tabs)/ventas" asChild> 
          <TouchableOpacity 
            className="bg-blue-600 p-6 rounded-2xl flex-row items-center justify-between shadow-md"
            activeOpacity={0.8}
          >
            <View className="flex-row items-center">
              <PlusCircle color="white" size={28} />
              <Text className="text-white text-lg font-bold ml-3">Nueva Venta</Text>
            </View>
            <ShoppingCart color="white" size={20} />
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/inventario" asChild>
          <TouchableOpacity 
            className="bg-white p-6 rounded-2xl flex-row items-center border border-gray-200 shadow-sm"
            activeOpacity={0.7}
          >
            <Package color="#4b5563" size={24} />
            <Text className="text-gray-700 text-lg font-medium ml-3">Gestionar Inventario</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-10 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <Text className="text-blue-800 text-center font-medium italic">
          "El éxito de un negocio es el orden de sus cuentas."
        </Text>
      </View>
    </ScrollView>
  );
}