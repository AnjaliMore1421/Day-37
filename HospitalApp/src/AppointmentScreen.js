import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Header from "../components/Header";

const doctorsList = [
  "Dr. Sharma",
  "Dr. Mehta",
  "Dr. Richa",
  "Dr. Khan",
];

export default function AppointmentsScreen({ navigation }) {
  const handleLogout = () => navigation.replace("Login");

  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [appointments, setAppointments] = useState([]);

  // BOOK APPOINTMENT
  const handleBook = () => {
    if (!name || !doctor || !date || !time) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    const newData = {
      id: Date.now().toString(),
      name: name.trim(),
      doctor,
      date,
      time,
    };

    //  FIX: force new array
    setAppointments((prev) => [...prev, newData]);

    // CLEAR INPUTS
    setName("");
    setDoctor("");
    setDate("");
    setTime("");

    Alert.alert("Success ✅", "Appointment Booked!");
  };

  // DELETE
  const handleDelete = (id) => {
    setAppointments((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Appointments" onLogout={handleLogout} />

      {/* FORM */}
      <View style={styles.card}>
        <Text style={styles.title}>📅 Book Appointment</Text>

        <TextInput
          placeholder="Patient Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        {/* DOCTOR */}
        <Text style={styles.label}>Select Doctor</Text>
        <View style={styles.doctorList}>
          {doctorsList.map((doc) => (
            <TouchableOpacity
              key={doc}
              style={[
                styles.docBtn,
                doctor === doc && styles.selectedDoc,
              ]}
              onPress={() => setDoctor(doc)}
            >
              <Text
                style={{
                  color: doctor === doc ? "#fff" : "#333",
                }}
              >
                {doc}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* DATE + TIME */}
        <View style={styles.row}>
          <TextInput
            placeholder="DD-MM-YYYY"
            value={date}
            onChangeText={setDate}
            style={styles.smallInput}
          />

          <TextInput
            placeholder="HH:MM"
            value={time}
            onChangeText={setTime}
            style={styles.smallInput}
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleBook}>
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>

      {/*  LIST ALWAYS VISIBLE */}
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No Appointments Yet</Text>
        }
        ListHeaderComponent={
          appointments.length > 0 && (
            <Text style={styles.listTitle}>📋 Booked Appointments</Text>
          )
        }
        renderItem={({ item }) => (
          <View style={styles.listCard}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>
                {item.doctor} • {item.date} • {item.time}
              </Text>
            </View>

            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fb" },

  card: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 15,
    borderRadius: 15,
    elevation: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  label: {
    fontSize: 13,
    marginBottom: 5,
  },

  doctorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },

  docBtn: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 4,
  },

  selectedDoc: {
    backgroundColor: "#0984e3",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  smallInput: {
    width: "48%",
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#0984e3",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
    marginTop: 10,
  },

  listCard: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },

  name: {
    fontWeight: "bold",
  },

  details: {
    color: "gray",
  },

  delete: {
    color: "red",
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});