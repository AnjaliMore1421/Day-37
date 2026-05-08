// src/screens/PharmacyScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import Header from "../components/Header";

const medicines = [
  { id: "1", name: "Paracetamol", price: "₹20" },
  { id: "2", name: "Ibuprofen", price: "₹35" },
  { id: "3", name: "Amoxicillin", price: "₹80" },
  { id: "4", name: "Cough Syrup", price: "₹60" },
];

export default function PharmacyScreen({ navigation }) {
  const handleLogout = () => navigation.replace("Login");

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Pharmacy" onLogout={handleLogout} />

      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fb" },

  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  price: {
    color: "#0984e3",
    fontWeight: "bold",
  },
});