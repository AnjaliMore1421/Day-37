// src/screens/DoctorsScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import Header from "../components/Header";

const doctors = [
  {
    id: "1",
    name: "Dr. Sharma",
    spec: "Cardiologist",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Dr. Mehta",
    spec: "Neurologist",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: "3",
    name: "Dr. Richa",
    spec: "Orthopedic",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "4",
    name: "Dr. Khan",
    spec: "Pediatrician",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

export default function DoctorsScreen({ navigation }) {
  const handleLogout = () => navigation.replace("Login");

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.spec}>{item.spec}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Doctors" onLogout={handleLogout} />

      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fb" },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  spec: {
    color: "gray",
  },
});