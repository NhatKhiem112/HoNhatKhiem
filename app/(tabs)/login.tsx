import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  CheckBox,
  TextInputProps,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import icon

// Import image assets
const backgroundImage = require("../../components/imgs/backgroud.jpg");
const avatarImage = require("../../components/imgs/admin.jpg");

export default function LoginScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });
      Alert.alert("Đăng nhập thành công", "Chào mừng bạn trở lại!");
      router.replace("/"); // Navigate to home or another screen
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image source={avatarImage} style={styles.avatar} />
          <Text style={styles.title}>Login</Text>

          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="rgba(255, 255, 255, 0.75)"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.75)"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rememberForgot}>
            <View style={styles.rememberMe}>
              <CheckBox
                value={rememberMe}
                onValueChange={setRememberMe}
                tintColors={{ true: "white", false: "white" }}
              />
              <Text style={styles.rememberMeText}>Remember me</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.registerBox}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

// Define the styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    width: "80%",
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
  },
  inputBox: {
    width: "100%",
    marginBottom: 16,
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    fontSize: 16,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 12,
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
  rememberForgot: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    color: "white",
    marginLeft: 8,
    fontSize: 14,
  },
  forgotPassword: {
    color: "white",
    textDecorationLine: "underline",
    fontSize: 14,
  },
  loginButton: {
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "#32CDD5",
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerBox: {
    flexDirection: "row",
    marginTop: 20,
  },
  registerText: {
    color: "white",
    fontSize: 14,
  },
  link: {
    color: "white",
    textDecorationLine: "underline",
    marginLeft: 4,
    fontSize: 14,
  },
});
