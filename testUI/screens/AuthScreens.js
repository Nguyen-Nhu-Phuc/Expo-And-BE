import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Alert } from "react-native";
import api from "../services/api"; // Import API từ services

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/SignIn", { email, password }); // Không cần API_BASE_URL vì đã có trong `api.js`
      console.log("Response:", response.data);

      if (response.data._id) {
        navigation.navigate("Main");
      } else {
        Alert.alert("Lỗi đăng nhập", response.data.message);
      }
    } catch (error) {
      console.error("Đăng nhập lỗi:", error.response?.data || error.message);
      Alert.alert("Lỗi đăng nhập", error.response?.data?.message || "Có lỗi xảy ra, kiểm tra console");
    }
  };

  return (
    <ImageBackground source={require("../assets/travel_background.jpg")} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng nhập</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("register")}>
          <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu nhập lại không khớp");
      return;
    }
    try {
      const response = await api.post("/auth/SignUp", { email, password });
      console.log("Response:", response.data);

      if (response.data._id) {
        navigation.navigate("Main");
      } else {
        Alert.alert("Lỗi đăng ký", response.data.message);
      }
    } catch (error) {
      console.error("Đăng ký lỗi:", error.response?.data || error.message);
      Alert.alert("Lỗi đăng ký", error.response?.data?.message || "Có lỗi xảy ra, kiểm tra console");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Nhập lại mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
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
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#87CEEB",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FF8C00",
    color: "#FFFFFF",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF8C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#FF8C00",
    marginTop: 10,
    textAlign: "center",
  },
});

export { LoginScreen, RegisterScreen };
