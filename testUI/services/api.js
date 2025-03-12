import axios from "axios";

const port = 3001; // Đổi thành cổng backend của bạn
const API_URL = `http://10.0.2.2:${port}/api/v1`; // Thêm `/api/v1`

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// Xác thực
export const signUp = (userData) => api.post("/auth/SignUp", userData);
export const signIn = (userData) => api.post("/auth/SignIn", userData);
export const getAllUsers = () => api.get("/auth/getAllUser");

// Điểm đến
export const createDestination = (data) => api.post("/destination/createdestination", data);
export const getAllDestinations = () => api.get("/destination/getAlldestination");
export const getDestinationById = (id) => api.get(`/destination/getBy/:id`);
export const updateDestination = (id, data) => api.patch(`/destination/update/${id}`, data);
export const deleteDestination = (id) => api.delete(`/destination/delete/${id}`);

// Khách sạn
export const createHotel = (data) => api.post("/hotel/create", data);
export const getAllHotels = () => api.get("/hotel/getAll");
export const getHotelById = (id) => api.get(`/hotel/getById/${id}`);
export const updateHotel = (id, data) => api.patch(`/hotel/update/${id}`, data);
export const deleteHotel = (id) => api.delete(`/hotel/delete/${id}`);

// Địa điểm
export const createPlace = (data) => api.post("/place/create", data);
export const getAllPlaces = () => api.get("/place/getAll");
export const getPlaceById = (id) => api.get(`/place/getById/${id}`);
export const updatePlace = (id, data) => api.patch(`/place/update/${id}`, data);
export const deletePlace = (id) => api.delete(`/place/delete/${id}`);

// Nhà hàng
export const createRestaurant = (data) => api.post("/restaurant/create", data);
export const getAllRestaurants = () => api.get("/restaurant/getAll");
export const getRestaurantById = (id) => api.get(`/restaurant/getById/${id}`);
export const updateRestaurant = (id, data) => api.patch(`/restaurant/update/${id}`, data);
export const deleteRestaurant = (id) => api.delete(`/restaurant/delete/${id}`);
export const updateRestaurantImage = (id, data) => api.patch(`/restaurant/updateImage/${id}`, data);
export const deleteRestaurantImage = (id, imageId) => api.delete(`/restaurant/deleteImage/${id}/${imageId}`);

// Lịch trình
export const createSchedule = (data) => api.post("/schedule/create", data);
export const getUserSchedules = (userId) => api.get(`/schedule/user/${userId}`);
export const getAllSchedules = () => api.get("/schedule/getAll");
export const getScheduleById = (id) => api.get(`/schedule/${id}`);
export const updateSchedule = (id, data) => api.put(`/schedule/update/${id}`, data);
export const deleteSchedule = (id) => api.delete(`/schedule/delete/${id}`);
