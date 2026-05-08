import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";

import Header from "../components/Header";

import Animated, {
  FadeInUp,
  FadeInDown,
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

import { useFocusEffect } from "@react-navigation/native";

import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function DashboardScreen({ navigation }) {
  const handleLogout = () => navigation.replace("Login");

  const [refreshKey, setRefreshKey] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setRefreshKey((prev) => prev + 1);
    }, [])
  );

  const theme = darkMode ? dark : light;

  //  LIVE PULSE
  const pulse = useSharedValue(1);

  useFocusEffect(
    useCallback(() => {
      pulse.value = withRepeat(
        withTiming(1.3, { duration: 800 }),
        -1,
        true
      );
    }, [])
  );

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  //  PUSH NOTIFICATION
  const sendTestNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🏥 City Care Hospital",
          body: "Emergency patient assigned to ICU.",
          sound: true,
        },

        trigger: null,
      });

      console.log("Notification Sent");
    } catch (error) {
      console.log("Notification Error:", error);
    }
  };

  // 🔗 DEEP LINK FUNCTIONS
  const openDoctorsDeepLink = async () => {
    await Linking.openURL("hospitalapp://doctors");
  };

  const openPatientsDeepLink = async () => {
    await Linking.openURL("hospitalapp://patients");
  };

  const openAppointmentsDeepLink = async () => {
    await Linking.openURL("hospitalapp://appointments");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView key={refreshKey} style={theme.container}>

        <Header title="Dashboard" onLogout={handleLogout} />

        {/* TOP BAR */}
        <View style={theme.topBar}>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Animated.View style={[theme.liveDot, pulseStyle]} />
            <Text style={theme.liveText}>Live Monitoring</Text>
          </View>

          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />

        </View>

        {/* HERO */}
        <Animated.View
          entering={FadeInDown.duration(700)}
          style={theme.hero}
        >

          <Text style={theme.heroTitle}>
            City Care Hospital
          </Text>

          <Text style={theme.heroSub}>
            Smart Healthcare Dashboard
          </Text>

          <View style={theme.heroBottom}>

            <Text style={theme.heroBadge}>
              🟢 System Active
            </Text>

            <Text style={theme.heroBadge}>
              🚑 Emergency Ready
            </Text>

          </View>

        </Animated.View>

        {/* AI INSIGHTS */}
        <Animated.View
          entering={FadeInUp.delay(200)}
          style={theme.insightCard}
        >

          <Text style={theme.insightTitle}>
            🧠 AI Insights
          </Text>

          <Text style={theme.insightText}>
            ICU demand expected to increase by 15% today.
          </Text>

        </Animated.View>

        {/* STATS */}
        <Animated.View
          entering={FadeInUp.delay(300)}
          style={theme.statsCard}
        >

          <Text style={theme.sectionTitle}>
            📊 Hospital Stats
          </Text>

          <View style={theme.statsRow}>

            <View style={theme.statBox}>
              <Text style={theme.statNumber}>124</Text>
              <Text style={theme.statLabel}>Patients</Text>
            </View>

            <View style={theme.statBox}>
              <Text style={theme.statNumber}>18</Text>
              <Text style={theme.statLabel}>Doctors</Text>
            </View>

            <View style={theme.statBox}>
              <Text style={theme.statNumber}>9</Text>
              <Text style={theme.statLabel}>ICU Beds</Text>
            </View>

          </View>

        </Animated.View>

        {/* DOCTORS */}
        <Text style={theme.sectionTitle}>
          👨‍⚕️ Doctors On Duty
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >

          {[
            { name: "Dr. Sharma", status: "Available" },
            { name: "Dr. Mehta", status: "Busy" },
            { name: "Dr. Richa", status: "Available" },
          ].map((doc, i) => (

            <Animated.View
              key={i}
              entering={FadeInRight.delay(i * 150)}
              style={theme.doctorCard}
            >

              <View style={theme.avatar}>
                <Text style={{ color: "#fff" }}>
                  👨‍⚕️
                </Text>
              </View>

              <Text style={theme.docName}>
                {doc.name}
              </Text>

              <Text
                style={{
                  color:
                    doc.status === "Available"
                      ? "#00b894"
                      : "#e17055",
                  fontSize: 12,
                }}
              >
                ● {doc.status}
              </Text>

            </Animated.View>
          ))}

        </ScrollView>

        {/* PATIENT QUEUE */}
        <Text style={theme.sectionTitle}>
          🧑 Patient Queue
        </Text>

        {[
          {
            token: "A12",
            name: "Rahul Sharma",
            time: "10:30 AM",
          },
          {
            token: "A13",
            name: "Priya Mehta",
            time: "10:45 AM",
          },
        ].map((p, i) => (

          <Animated.View
            key={i}
            entering={FadeInUp.delay(i * 150)}
            style={theme.queueCard}
          >

            <View style={theme.tokenBox}>
              <Text style={theme.token}>
                {p.token}
              </Text>
            </View>

            <View>
              <Text style={theme.queueName}>
                {p.name}
              </Text>

              <Text style={theme.queueTime}>
                {p.time}
              </Text>
            </View>

          </Animated.View>
        ))}

        {/* UPCOMING */}
        <Animated.View
          entering={FadeInUp.delay(400)}
          style={theme.upcoming}
        >

          <Text style={theme.sectionTitle}>
            ⏱️ Upcoming Appointments
          </Text>

          <Text style={theme.upText}>
            Dr. Sharma • 11:00 AM
          </Text>

          <Text style={theme.upText}>
            Dr. Mehta • 11:30 AM
          </Text>

        </Animated.View>

        {/* QUICK ACTIONS */}
        <Text style={theme.sectionTitle}>
          ⚡ Quick Actions
        </Text>

        <View style={theme.quickGrid}>

          {/* DOCTORS */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Doctors")}
            style={theme.quickCard}
          >
            <Text style={theme.quickIcon}>👨‍⚕️</Text>
            <Text style={theme.quickText}>Doctors</Text>
          </TouchableOpacity>

          {/* PATIENTS */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Patients")}
            style={theme.quickCard}
          >
            <Text style={theme.quickIcon}>🧑‍🤝‍🧑</Text>
            <Text style={theme.quickText}>Patients</Text>
          </TouchableOpacity>

          {/* APPOINTMENTS */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Appointments")}
            style={theme.quickCard}
          >
            <Text style={theme.quickIcon}>📅</Text>
            <Text style={theme.quickText}>Appointments</Text>
          </TouchableOpacity>

          {/* PHARMACY */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Pharmacy")}
            style={theme.quickCard}
          >
            <Text style={theme.quickIcon}>💊</Text>
            <Text style={theme.quickText}>Pharmacy</Text>
          </TouchableOpacity>

          {/* NOTIFICATION */}
          <TouchableOpacity
            style={theme.quickCard}
            onPress={sendTestNotification}
          >
            <Text style={theme.quickIcon}>🔔</Text>
            <Text style={theme.quickText}>Notify</Text>
          </TouchableOpacity>

         

         

        </View>

      </ScrollView>

      {/* FLOATING BUTTON */}
      <TouchableOpacity
        style={theme.fab}
        onPress={() => navigation.navigate("Appointments")}
      >
        <Text style={{ color: "#fff", fontSize: 24 }}>
          +
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const light = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
  },

  liveText: {
    fontWeight: "600",
  },

  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    marginRight: 10,
  },

  hero: {
    backgroundColor: "#6C5CE7",
    margin: 12,
    padding: 20,
    borderRadius: 20,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  heroSub: {
    color: "#ddd",
    marginTop: 5,
  },

  heroBottom: {
    flexDirection: "row",
    marginTop: 15,
  },

  heroBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
    fontSize: 12,
  },

  insightCard: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 15,
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#6C5CE7",
  },

  insightTitle: {
    fontWeight: "bold",
  },

  insightText: {
    color: "gray",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    marginTop: 15,
  },

  statsCard: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 15,
    borderRadius: 15,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  statBox: {
    backgroundColor: "#eef2ff",
    width: "30%",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6C5CE7",
  },

  statLabel: {
    marginTop: 5,
    color: "gray",
    fontSize: 12,
  },

  doctorCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    margin: 10,
    alignItems: "center",
    width: 120,
  },

  avatar: {
    backgroundColor: "#6C5CE7",
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },

  docName: {
    fontWeight: "bold",
  },

  queueCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  tokenBox: {
    backgroundColor: "#6C5CE7",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  token: {
    color: "#fff",
    fontWeight: "bold",
  },

  queueName: {
    fontWeight: "bold",
  },

  queueTime: {
    color: "gray",
    fontSize: 12,
  },

  upcoming: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 15,
    borderRadius: 15,
  },

  upText: {
    marginTop: 5,
  },

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
    marginBottom: 100,
  },

  quickCard: {
    width: "48%",
    backgroundColor: "#fff",
    margin: "1%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
  },

  quickIcon: {
    fontSize: 26,
  },

  quickText: {
    marginTop: 8,
    fontWeight: "600",
  },

  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6C5CE7",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

const dark = StyleSheet.create({
  ...light,

  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  liveText: {
    color: "#fff",
  },

  sectionTitle: {
    color: "#fff",
  },

  insightCard: {
    backgroundColor: "#1f1f1f",
  },

  insightText: {
    color: "#bbb",
  },

  statsCard: {
    backgroundColor: "#1f1f1f",
  },

  statBox: {
    backgroundColor: "#2c2c2c",
  },

  doctorCard: {
    backgroundColor: "#1f1f1f",
  },

  queueCard: {
    backgroundColor: "#1f1f1f",
  },

  upcoming: {
    backgroundColor: "#1f1f1f",
  },

  quickCard: {
    backgroundColor: "#1f1f1f",
  },

  quickText: {
    color: "#fff",
  },

  docName: {
    color: "#fff",
  },

  queueName: {
    color: "#fff",
  },

  queueTime: {
    color: "#bbb",
  },
});