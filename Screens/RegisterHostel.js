import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

<<<<<<< HEAD
const API_BASE = "http://192.168.1.19:5000";
=======
const API_BASE = "http://192.168.1.8:5000";
>>>>>>> 7144865 (done with adminscreen)

const RegisterHostel = ({ navigation }) => {
  const route = useRoute();
  const { role } = route.params || {};

  const [form, setForm] = useState({
    ownerName: '',
    emailOrMobile: '',
    password: '',
    confirmPassword: '',
    hostelName: '',
    address: '',
    contactNumber: '',
    role: role || 'owner', 
  });

  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const validateForm = () => {
    if (!form.ownerName || !form.emailOrMobile || !form.password || !form.confirmPassword || !form.hostelName) {
      Alert.alert('Error', 'Please fill all required fields.');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(form.emailOrMobile) && !phoneRegex.test(form.emailOrMobile)) {
      Alert.alert('Error', 'Please enter a valid email address or phone number.');
      return false;
    }
    if (form.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return false;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const res = await axios.post(`${API_BASE}/api/hosts/register`, form);

      Alert.alert('Success', res.data.message || "Registered successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (err) {
      console.error("Registration error:", err);
      const msg = err.response?.data?.message || 'Something went wrong';
      Alert.alert('Error', msg);
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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Logo */}
            <Image
              source={require('../assets/staykaro-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Title */}
            <Text style={styles.title}>Register Your Hostel</Text>
            <Text style={styles.subtitle}>
              Create an Account to register your Hostel/Hotel, manage Bookings,
              and connect with Guests.
            </Text>

            {/* Input Fields */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Owner Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name...."
                value={form.ownerName}
                onChangeText={(t) => handleChange('ownerName', t)}
              />

              <Text style={styles.label}>Owner Email / Mobile No.</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email...."
                keyboardType="email-address"
                value={form.emailOrMobile}
                onChangeText={(t) => handleChange('emailOrMobile', t)}
              />

              {/* Password with Eye */}
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0 }]}
                  placeholder="Create Password...."
                  secureTextEntry={secure}
                  value={form.password}
                  onChangeText={(t) => handleChange('password', t)}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <Ionicons
                    name={secure ? 'eye-off' : 'eye'}
                    size={22}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>

              {/* Confirm Password with Eye */}
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0 }]}
                  placeholder="Confirm Password...."
                  secureTextEntry={secureConfirm}
                  value={form.confirmPassword}
                  onChangeText={(t) => handleChange('confirmPassword', t)}
                />
                <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
                  <Ionicons
                    name={secureConfirm ? 'eye-off' : 'eye'}
                    size={22}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Hostel Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Hostel Name..."
                value={form.hostelName}
                onChangeText={(t) => handleChange('hostelName', t)}
              />

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1.3 }]}>
                  <Text style={styles.label}>Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Type your Address..."
                    value={form.address}
                    onChangeText={(t) => handleChange('address', t)}
                  />
                </View>
                <View style={{ width: wp('3%') }} />
                <View style={[styles.inputGroup, { flex: 0.9 }]}>
                  <Text style={styles.label}>Contact Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="+91"
                    keyboardType="phone-pad"
                    value={form.contactNumber}
                    onChangeText={(t) => handleChange('contactNumber', t)}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerText}>Register Hostel</Text>
            </TouchableOpacity>

            {/* Google Sign Up */}
            <TouchableOpacity style={styles.googleButton}>
              <View style={styles.googleInline}>
                <Image
                  source={require('../assets/Google.png')}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleText}>Sign Up with Google</Text>
              </View>
            </TouchableOpacity>

            {/* Login Prompt */}
            <Text style={styles.loginPrompt}>
              Already Registered?{' '}
              <Text
                style={styles.loginLink}
                onPress={() => navigation.navigate('Login')}
              >
                Login
              </Text>{' '}
              here
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
  flexGrow: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: wp('6%'),
    justifyContent: 'center',
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
  },
  logo: {
    width: wp('35%'),
    height: hp('8%'),
    alignSelf: 'center',
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: hp('2.8%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp('1.5%'),
  },
  subtitle: {
    fontSize: hp('1.6%'),
    textAlign: 'center',
    color: '#555',
    marginBottom: hp('4%'),
    lineHeight: hp('2.4%'),
  },
  inputWrapper: {
    marginBottom: hp('3%'),
  },
  label: {
    fontSize: hp('1.8%'),
    fontWeight: '500',
    color: '#333',
    marginBottom: hp('0.5%'),
  },
  input: {
    height: hp('5.8%'),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('1.5%'),
    fontSize: hp('1.7%'),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('1.5%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flex: 1,
  },
  registerButton: {
    backgroundColor: '#FF0202',
    paddingVertical: hp('1.8%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginTop: hp('-1%'),
  },
  registerText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  googleButton: {
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
  googleInline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    width: wp('5.5%'),
    height: wp('5.5%'),
    marginRight: wp('2%'),
  },
  googleText: {
    fontSize: hp('1.85%'),
    fontWeight: '500',
    color: '#000',
  },
  loginPrompt: {
    textAlign: 'center',
    marginTop: hp('3%'),
    fontSize: hp('1.7%'),
    color: '#333',
  },
  loginLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default RegisterHostel;
