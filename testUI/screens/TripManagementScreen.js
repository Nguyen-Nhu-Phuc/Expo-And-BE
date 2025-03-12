import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import api from "../services/api";

const TripManagementScreen = ({ navigation }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await api.get("/trips");
      setTrips(response.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách lịch trình:", error);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await api.delete(`/trips/${tripId}`);
      setTrips(trips.filter((trip) => trip._id !== tripId));
    } catch (error) {
      console.error("Lỗi xoá lịch trình:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý lịch trình</Text>
      <FlatList
        data={trips}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.tripContainer}>
            <View style={styles.tripInfo}>
              <Text style={styles.tripName}>{item.city}</Text>
              <Text style={styles.tripDate}>Ngày tạo: {item.created_at}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("TripDetail", { tripId: item._id })}
            >
              <Text style={styles.buttonText}>Xem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTrip(item._id)}>
              <Text style={styles.buttonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("CreateTrip")}> 
        <Text style={styles.buttonText}>Tạo lịch trình mới</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F9F9", // Màu nền sáng nhẹ nhàng
    padding: 20,
  },
  title: {
    color: "#1E3A5F", // Màu xanh đậm
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },
  tripContainer: {
    flexDirection: "row",
    backgroundColor: "#A8DADC", // Màu xanh pastel
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  tripInfo: {
    flex: 1,
  },
  tripName: {
    color: "#1D3557", // Màu xanh đậm hơn
    fontSize: 18,
    fontWeight: "bold",
  },
  tripDate: {
    color: "#457B9D", // Màu xanh dịu nhẹ
    fontSize: 14,
  },
  editButton: {
    backgroundColor: "#457B9D", // Màu xanh nhạt hơn
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#E63946", // Màu đỏ nhạt
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#2A9D8F", // Màu xanh lá nhẹ
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TripManagementScreen;