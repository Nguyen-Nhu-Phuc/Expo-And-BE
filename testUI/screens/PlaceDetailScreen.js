import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import api from "../services/api";

const DestinationDetailScreen = ({ route }) => {
  const { destinationId } = route.params;
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [places, setPlaces] = useState([]);
  const [destination, setDestination] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchDestinationDetails();
  }, []);

  const fetchDestinationDetails = async () => {
    try {
      const destinationRes = await api.get(`/api/v1/destination/getBy/${destinationId}`);
      setDestination(destinationRes.data);
      
      const [hotelsRes, restaurantsRes, placesRes] = await Promise.all([
        api.get(`/api/v1/hotel/getAll?destination_id=${destinationId}`),
        api.get(`/api/v1/restaurant/getAll?destination_id=${destinationId}`),
        api.get(`/api/v1/place/getAll?destination_id=${destinationId}`)
      ]);
      setHotels(hotelsRes.data);
      setRestaurants(restaurantsRes.data);
      setPlaces(placesRes.data);
    } catch (error) {
      console.error("Lỗi lấy chi tiết địa điểm:", error);
    }
  };

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  const handleAddToTrip = async () => {
    try {
      await api.post("/api/v1/schedule/add", { placeId: selectedPlace._id });
      alert("Đã thêm vào lịch trình!");
      setModalVisible(false);
    } catch (error) {
      console.error("Lỗi thêm vào lịch trình:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectPlace(item)}>
      <Image source={{ uri: item.image[0]?.url }} style={styles.image} />
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {destination && (
        <View>
          <Text style={styles.title}>{destination.name}</Text>
          <Text style={styles.description}>{destination.description}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Khách sạn</Text>
      <FlatList data={hotels} horizontal keyExtractor={(item) => item._id} renderItem={renderItem} showsHorizontalScrollIndicator={false} />

      <Text style={styles.sectionTitle}>Nhà hàng</Text>
      <FlatList data={restaurants} horizontal keyExtractor={(item) => item._id} renderItem={renderItem} showsHorizontalScrollIndicator={false} />

      <Text style={styles.sectionTitle}>Địa điểm vui chơi</Text>
      <FlatList data={places} horizontal keyExtractor={(item) => item._id} renderItem={renderItem} showsHorizontalScrollIndicator={false} />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          {selectedPlace && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedPlace.name}</Text>
              <Text style={styles.modalDescription}>{selectedPlace.description}</Text>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: selectedPlace.lat,
                  longitude: selectedPlace.long,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{ latitude: selectedPlace.coordinates.lat, longitude: selectedPlace.coordinates.lng }}
                  title={selectedPlace.name}
                />
              </MapView>
              <Button title="Thêm vào lịch trình" onPress={handleAddToTrip} />
              <Button title="Đóng" onPress={() => setModalVisible(false)} />
            </View>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B0C10", padding: 20 },
  title: { color: "#66FCF1", fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  description: { color: "#C5C6C7", fontSize: 16, marginBottom: 20 },
  sectionTitle: { color: "#66FCF1", fontSize: 22, fontWeight: "bold", marginVertical: 15 },
  itemContainer: { backgroundColor: "#1F2833", borderRadius: 10, marginRight: 10, padding: 10, alignItems: "center", width: 120 },
  image: { width: 100, height: 100, borderRadius: 10, marginBottom: 5 },
  itemName: { color: "#C5C6C7", fontSize: 14, textAlign: "center" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalDescription: { fontSize: 16, marginBottom: 10 },
  map: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
});

export default DestinationDetailScreen;
