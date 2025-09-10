import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SignUp = ({ route, navigation }) => {
  const { role } = route.params; // 👈 From SplashScreen
  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  // Validation
  const validateForm = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "All fields are required");
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  // Handle Sign Up
  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await axios.post("http://192.168.1.15:5000/api/auth/signup", {
        name,
        email,
        password,
        role,
      });

      setLoading(false);
      Alert.alert("Success", "Account created successfully", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (err) {
      setLoading(false);
      console.error(err);
      Alert.alert(
        "Signup Failed",
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {Platform.OS === "android" && <View style={styles.statusBarBackground} />}

      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flexGrow}
        keyboardVerticalOffset={Platform.OS === "android" ? 0 : 40}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Logo */}
            <Image
              source={require("../assets/staykaro-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Title */}
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>
              Creating an account lets you explore verified hostels, save your
              favorites, and book your perfect Stay anytime.
            </Text>

            {/* Input Fields */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                placeholder="Enter your name..."
                style={styles.input}
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                placeholder="Enter your email..."
                keyboardType="email-address"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Enter your password..."
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secure}
                  style={styles.passwordInput}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <Ionicons
                    name={secure ? "eye-off" : "eye"}
                    size={22}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={styles.signupText}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            {/* Google Signup */}
            <TouchableOpacity style={styles.googleLink}>
              <View style={styles.googleInline}>
                <Image
                  source={require("../assets/Google.png")}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleText}>Sign Up with Google</Text>
              </View>
            </TouchableOpacity>

            {/* Login Prompt */}
            <Text style={styles.loginPrompt}>
              Already have an account?{" "}
              <Text
                style={styles.loginLink}
                onPress={() => navigation.navigate("Login")}
              >
                Login here
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  statusBarBackground: {
    height: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    padding: wp("6%"),
    justifyContent: "center",
    borderTopLeftRadius: wp("5%"),
    borderTopRightRadius: wp("5%"),
    paddingBottom: hp("4%"),
  },
  flexGrow: {
    flex: 1,
  },
  logo: {
    width: wp("35%"),
    height: hp("7.25%"),
    alignSelf: "center",
    marginTop: hp("-4.25%"),
  },
  title: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: hp("5.75%"),
  },
  subtitle: {
    fontSize: hp("1.6%"),
    textAlign: "center",
    marginVertical: hp("1.5%"),
    marginTop: hp("1.3%"),
    marginBottom: hp("5%"),
    lineHeight: hp("2.4%"),
    color: "#555",
  },
  inputWrapper: {
    marginBottom: hp("0.25%"),
  },
  inputLabel: {
    fontSize: hp("1.8%"),
    fontWeight: "500",
    color: "#333",
    marginBottom: hp("0.25%"),
  },
  input: {
    height: hp("5.8%"),
    borderWidth: 1,
    borderColor: "#AEAEAE",
    borderRadius: wp("2%"),
    paddingHorizontal: wp("3%"),
    marginVertical: hp("0.5%"),
    fontSize: hp("1.7%"),
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#AEAEAE",
    borderRadius: wp("2%"),
    paddingHorizontal: wp("3%"),
    marginVertical: hp("0.5%"),
    height: hp("5.8%"), // ✅ same height as email input
  },
  passwordInput: {
    flex: 1,
    fontSize: hp("1.7%"),
  },
  signupButton: {
    backgroundColor: "#f44336",
    paddingVertical: hp("1.5%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    marginBottom: hp("2%"),
    marginTop: hp("6.25%"),
  },
  signupText: {
    color: "#fff",
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  googleLink: {
    alignSelf: "center",
    marginTop: hp("1.5%"),
  },
  googleInline: {
    flexDirection: "row",
    alignItems: "center",
  },
  googleIcon: {
    width: wp("5%"),
    height: wp("5%"),
    marginRight: wp("2%"),
  },
  googleText: {
    fontSize: hp("1.85%"),
    fontWeight: "500",
    color: "#000",
  },
  loginPrompt: {
    textAlign: "center",
    marginTop: hp("3%"),
    color: "#333",
  },
  loginLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default SignUp;
