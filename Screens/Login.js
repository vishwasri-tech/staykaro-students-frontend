import React, { useState } from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Ionicons } from "@expo/vector-icons";
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secure, setSecure] = useState(true);

  // Handle Login
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Email and password are required");
      return;
    }

    try {
      setLoading(true);

      // ⚡ Replace with your backend API
      const res = await axios.post("http://192.168.1.15:5000/api/auth/login", {
        email,
        password,
      });

      setLoading(false);

      // Save token in AsyncStorage
      await AsyncStorage.setItem("token", res.data.token);

      Alert.alert("Success", "Login successful", [
        { text: "OK", onPress: () => navigation.navigate("HomePage") },
      ]);

      console.log("Login Response:", res.data);
    } catch (err) {
      setLoading(false);
      console.error("Login error:", err.response?.data || err.message);
      Alert.alert(
        "Login Failed",
        err.response?.data?.message || "Invalid credentials"
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {Platform.OS === 'android' && (
        <View style={styles.statusBarBackground} />
      )}

      <StatusBar
        translucent
        backgroundColor="#fff"
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexGrow}
        keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 40}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Logo */}
            <Image
              source={require('../assets/staykaro-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Title */}
            <Text style={styles.title}>Login Account</Text>
            <Text style={styles.subtitle}>
              Welcome back! Sign in to continue your StayKaro experience.
            </Text>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                placeholder="Enter email..."
                keyboardType="email-address"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password with Eye Button */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Enter password..."
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

              {/* Forgot Password Link */}
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>

            {/* Google Login Placeholder */}
            <TouchableOpacity style={styles.googleLink}></TouchableOpacity>

            {/* Register Prompt */}
            <Text style={styles.registerPrompt}>
              Don’t have an account?{" "}
              <Text
                style={styles.registerLink}
                onPress={() => navigation.navigate("SignUp")}
              >
                Register here
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
    height: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  flexGrow: {
    flex: 1,
  },
  container: {
    padding: wp('6%'),
    justifyContent: 'center',
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    paddingBottom: hp('4%'),
  },
  logo: {
    width: wp('35%'),
    height: hp('7.5%'),
    alignSelf: 'center',
    marginTop: hp('-2%'),
  },
  title: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('10%'),
  },
  subtitle: {
    fontSize: hp('1.7%'),
    textAlign: 'center',
    marginTop: hp('1.5%'),
    marginBottom: hp('5%'),
    lineHeight: hp('2.5%'),
    color: '#444',
    paddingHorizontal: wp('3%'),
  },
  inputWrapper: {
    marginBottom: hp('2%'),
  },
  inputLabel: {
    fontSize: hp('1.8%'),
    fontWeight: '500',
    color: '#333',
    marginBottom: hp('0.5%'),
  },
  input: {
    height: hp('6%'),
    borderWidth: 1,
    borderColor: '#AEAEAE',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    fontSize: hp('1.7%'),
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#AEAEAE",
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    height: hp('6%'), // ✅ same as input
  },
  passwordInput: {
    flex: 1,
    fontSize: hp('1.7%'),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: hp('0.7%'),
  },
  forgotText: {
    fontSize: hp('1.6%'),
    color: '#007bff',
  },
  loginButton: {
    backgroundColor: '#f44336',
    paddingVertical: hp('1.8%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  loginText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  registerPrompt: {
    textAlign: 'center',
    marginTop: hp('1%'),
    fontSize: hp('1.7%'),
    color: '#333',
  },
  registerLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  googleLink: {
    marginVertical: hp('1.5%'),
  },
});

export default Login;
