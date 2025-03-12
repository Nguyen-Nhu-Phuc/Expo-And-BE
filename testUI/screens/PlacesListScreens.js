import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";

const DestinationListScreen = ({ navigation }) => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await api.get("/destination/getAlldestination");
      setDestinations(response.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách địa điểm:", error);
    }
  };

  return (
    <ImageBackground 
      source={require("../assets/travel_background.jpg")} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Danh sách địa điểm</Text>
        <Picker
          selectedValue={selectedDestination}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedDestination(itemValue);
            if (itemValue) {
              navigation.navigate("DestinationDetail", { destinationId: itemValue });
            }
          }}
        >
          <Picker.Item label="Chọn địa điểm" value={null} />
          {destinations.map((dest) => (
            <Picker.Item key={dest._id} label={dest.name} value={dest._id} />
          ))}
        </Picker>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(245, 245, 220, 0.8)", // Màu be bán trong suốt để nhìn thấy nền
    padding: 20,
    justifyContent: "center",
    borderRadius: 15,
    margin: 20,
  },
  title: {
    color: "#FF8C00", // Màu cam đậm gợi nhớ đến hoàng hôn
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  picker: {
    backgroundColor: "#87CEEB", // Xanh da trời nhạt
    color: "#FFFFFF", // Màu trắng cho chữ dễ đọc
    marginBottom: 15,
    borderRadius: 10,
  },
});

export default DestinationListScreen;
