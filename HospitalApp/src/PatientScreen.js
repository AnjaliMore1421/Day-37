import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Share,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/Header";

export default function PatientsScreen({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [disease, setDisease] = useState("");
  const [image, setImage] = useState(null);

  const handleLogout = () => navigation.replace("Login");

  // LOAD SAVED DATA
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const savedPatients = await AsyncStorage.getItem("patients");

      if (savedPatients !== null) {
        setPatients(JSON.parse(savedPatients));
      } else {
        const defaultPatients = [
          {
            id: "1",
            name: "Rahul Sharma",
            disease: "Fever",
            image: null,
          },
          {
            id: "2",
            name: "Priya Mehta",
            disease: "Diabetes",
            image: null,
          },
        ];

        setPatients(defaultPatients);

        await AsyncStorage.setItem(
          "patients",
          JSON.stringify(defaultPatients)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // SAVE DATA
  const savePatients = async (data) => {
    try {
      await AsyncStorage.setItem(
        "patients",
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // IMAGE PICKER
  const pickImage = async () => {
    let result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // ADD PATIENT
  const handleAdd = async () => {
    if (!name || !disease) {
      Alert.alert(
        "Required",
        "Please enter all details"
      );
      return;
    }

    const newPatient = {
      id: Date.now().toString(),
      name,
      disease,
      image,
    };

    const updatedPatients = [
      ...patients,
      newPatient,
    ];

    setPatients(updatedPatients);

    await savePatients(updatedPatients);

    setName("");
    setDisease("");
    setImage(null);
  };

  // SHARE PATIENT
  const sharePatient = async (item) => {
    try {
      await Share.share({
        message:
          `🏥 Patient Details\n\n` +
          `👤 Name: ${item.name}\n` +
          `🩺 Disease: ${item.disease}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE PATIENT
  const deletePatient = async (id) => {
    const filtered = patients.filter(
      (item) => item.id !== id
    );

    setPatients(filtered);

    await savePatients(filtered);
  };

  return (
    <View style={styles.container}>

      <Header
        title="Patients"
        onLogout={handleLogout}
      />

      {/* FORM */}
      <View style={styles.form}>

        <TextInput
          placeholder="Patient Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Disease"
          value={disease}
          onChangeText={setDisease}
          style={styles.input}
        />

        {/* IMAGE BUTTON */}
        <TouchableOpacity
          style={styles.imgBtn}
          onPress={pickImage}
        >
          <Text style={{ color: "#fff" }}>
            Upload Photo
          </Text>
        </TouchableOpacity>

        {/* IMAGE PREVIEW */}
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.imgPreview}
          />
        )}

        {/* ADD BUTTON */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={handleAdd}
        >
          <Text style={{ color: "#fff" }}>
            Add Patient
          </Text>
        </TouchableOpacity>

      </View>

      {/* LIST */}
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>

            {/* IMAGE */}
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.patientImage}
              />
            )}

            {/* INFO */}
            <View style={{ flex: 1 }}>

              <Text style={styles.patientName}>
                {item.name}
              </Text>

              <Text style={styles.patientDisease}>
                {item.disease}
              </Text>

              {/* BUTTONS */}
              <View style={styles.btnRow}>

                <TouchableOpacity
                  style={styles.shareBtn}
                  onPress={() =>
                    sharePatient(item)
                  }
                >
                  <Text style={styles.btnText}>
                    Share
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() =>
                    deletePatient(item.id)
                  }
                >
                  <Text style={styles.btnText}>
                    Delete
                  </Text>
                </TouchableOpacity>

              </View>

            </View>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },

  form: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 15,
    elevation: 3,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
  },

  imgBtn: {
    backgroundColor: "#6C5CE7",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  imgPreview: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 10,
    alignSelf: "center",
  },

  addBtn: {
    backgroundColor: "#2E86DE",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 12,
    borderRadius: 15,
    flexDirection: "row",
    elevation: 3,
  },

  patientImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 12,
  },

  patientName: {
    fontSize: 17,
    fontWeight: "bold",
  },

  patientDisease: {
    color: "gray",
    marginTop: 4,
  },

  btnRow: {
    flexDirection: "row",
    marginTop: 12,
  },

  shareBtn: {
    backgroundColor: "#00b894",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },

  deleteBtn: {
    backgroundColor: "#d63031",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});