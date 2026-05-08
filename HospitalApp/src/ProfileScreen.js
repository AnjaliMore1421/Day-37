import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Header from "../components/Header";

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => navigation.replace("Login");

  return (
    <ScrollView style={styles.container}>
      <Header title="Hospital Profile" onLogout={handleLogout} />

      {/*  HERO SECTION */}
      <View style={styles.hero}>
        <Text style={styles.hospitalName}>🏥 City Care Hospital</Text>
        <Text style={styles.tagline}>“Caring Beyond Limits”</Text>
      </View>

      {/*  STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>120+</Text>
          <Text style={styles.statLabel}>Patients</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>25+</Text>
          <Text style={styles.statLabel}>Doctors</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>10+</Text>
          <Text style={styles.statLabel}>Years</Text>
        </View>
      </View>

      {/*  FACILITIES */}
      <Text style={styles.sectionTitle}>🏥 Facilities</Text>
      <View style={styles.grid}>
        {[
          "🛏 ICU",
          "🧪 Lab",
          "💉 Emergency",
          "🩻 Radiology",
          "🚑 Ambulance",
          "🩺 OPD",
        ].map((item, index) => (
          <View key={index} style={styles.gridCard}>
            <Text style={styles.gridText}>{item}</Text>
          </View>
        ))}
      </View>

      {/*  SERVICES */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🩺 Services</Text>
        <Text style={styles.item}>✔ Cardiology Treatment</Text>
        <Text style={styles.item}>✔ Neurology Care</Text>
        <Text style={styles.item}>✔ Orthopedic Surgery</Text>
        <Text style={styles.item}>✔ Pediatric Care</Text>
      </View>

      {/*  ACHIEVEMENTS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🏆 Achievements</Text>
        <Text style={styles.item}>✔ Best Hospital Award 2023</Text>
        <Text style={styles.item}>✔ 10,000+ Patients Treated</Text>
        <Text style={styles.item}>✔ NABH Certified</Text>
      </View>

      {/*  CONTACT */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📍 Contact</Text>
        <Text style={styles.item}>
          MG Road, Pune, Maharashtra, India
        </Text>
        <Text style={styles.item}>📞 +91 9876543210</Text>
        <Text style={styles.item}>✉ care@cityhospital.com</Text>
      </View>

      {/*  EMERGENCY */}
      <View style={styles.emergency}>
        <Text style={styles.emergencyText}>
          🚨 24/7 Emergency Available
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },

  //  HERO
  hero: {
    backgroundColor: "#6C5CE7",
    padding: 25,
    margin: 10,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
  },

  hospitalName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  tagline: {
    color: "#fff",
    marginTop: 5,
    fontStyle: "italic",
  },

  //  STATS
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },

  statCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    width: 90,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  statLabel: {
    color: "gray",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 12,
  },

  //  GRID
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  gridCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  gridText: {
    fontWeight: "600",
  },

  //  CARDS
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },

  item: {
    marginTop: 6,
    fontSize: 14,
  },

  //  EMERGENCY
  emergency: {
    backgroundColor: "#d63031",
    margin: 10,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  emergencyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});