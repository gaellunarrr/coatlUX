import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useProductStore } from "../../src/store/productStore";

// ✅ Esto genera ids simples para prueba (luego lo hará el backend/DB)
function genId() {
  return `p_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function ProductsTestPage() {
  // 1) Traemos estado y acciones del store (Zustand)
  const { products, addProduct, editProduct, deleteProduct, clearInventory } =
    useProductStore();

  // 2) Estados locales SOLO para el formulario (no van al store)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [stock, setStock] = useState("0");

  // 3) Ejemplo: total de productos (useMemo evita recalcular en cada render)
  const totalCount = useMemo(() => products.length, [products]);

  // 4) Handler: agrega producto usando el store
  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert("Falta nombre", "Escribe el nombre del producto");
      return;
    }

    const priceNum = Number(price);
    const stockNum = Number(stock);

    if (Number.isNaN(priceNum) || Number.isNaN(stockNum)) {
      Alert.alert("Datos inválidos", "Precio y stock deben ser números");
      return;
    }

    addProduct({
      id: genId(),
      name: trimmed,
      price: priceNum,
      stock: stockNum,
    });

    // Limpia input de nombre para hacer pruebas rápido
    setName("");
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Products Test</Text>
      <Text>Total: {totalCount}</Text>

      {/* FORMULARIO */}
      <View style={{ gap: 8 }}>
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 8,
          }}
        />

        <View style={{ flexDirection: "row", gap: 8 }}>
          <TextInput
            placeholder="Precio"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 8,
            }}
          />
          <TextInput
            placeholder="Stock"
            value={stock}
            onChangeText={setStock}
            keyboardType="numeric"
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 8,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={handleAdd}
          style={{
            backgroundColor: "black",
            padding: 12,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Agregar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => clearInventory()}
          style={{
            backgroundColor: "#b91c1c",
            padding: 12,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>
            Vaciar inventario
          </Text>
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 12,
              padding: 12,
              gap: 8,
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 16 }}>{item.name}</Text>
            <Text>Precio: ${item.price}</Text>
            <Text>Stock: {item.stock}</Text>

            <View style={{ flexDirection: "row", gap: 8 }}>
              {/* EDITAR: ejemplo: +1 stock */}
              <TouchableOpacity
                onPress={() => editProduct(item.id, { stock: item.stock + 1 })}
                style={{
                  flex: 1,
                  backgroundColor: "#0f766e",
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  + Stock
                </Text>
              </TouchableOpacity>

              {/* ELIMINAR */}
              <TouchableOpacity
                onPress={() => deleteProduct(item.id)}
                style={{
                  flex: 1,
                  backgroundColor: "#7f1d1d",
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
