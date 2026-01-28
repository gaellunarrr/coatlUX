import { Tabs } from "expo-router";
import {
  Home,
  Package,
  ShoppingBag,
  CopyPlus,
  ConciergeBell,
} from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#2563eb" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="inventario"
        options={{
          title: "Inventario",
          tabBarIcon: ({ color }) => <Package size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="agregar"
        options={{
          title: "Agregar",
          tabBarIcon: ({ color }) => <CopyPlus size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ventas"
        options={{
          title: "Ventas",
          tabBarIcon: ({ color }) => <ShoppingBag size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mesas"
        options={{
          title: "Mesas",
          tabBarIcon: ({ color }) => <ConciergeBell size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
