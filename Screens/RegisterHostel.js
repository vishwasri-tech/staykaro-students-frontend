import React from 'react';
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
} from 'react-native';
import Constants from 'expo-constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const RegisterHostel = ({ navigation }) => {
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
              <TextInput style={styles.input} placeholder="Enter your name...." />

              <Text style={styles.label}>Owner Email / Mobile No.</Text>
              <TextInput style={styles.input} placeholder="Enter email...." keyboardType="email-address" />

              <Text style={styles.label}>Password</Text>
              <TextInput style={styles.input} placeholder="Create Password...." secureTextEntry />

              <Text style={styles.label}>Confirm Password</Text>
              <TextInput style={styles.input} placeholder="Confirm Password...." secureTextEntry />

              <Text style={styles.label}>Hostel Name</Text>
              <TextInput style={styles.input} placeholder="Enter Hostel Name..." />

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1.3 }]}>
                  <Text style={styles.label}>Address</Text>
                  <TextInput style={styles.input} placeholder="Type your Address..." />
                </View>
                <View style={{ width: wp('3%') }} />
                <View style={[styles.inputGroup, { flex: 0.9 }]}>
                  <Text style={styles.label}>Contact Number</Text>
                  <TextInput style={styles.input} placeholder="+91" keyboardType="phone-pad" />
                </View>
              </View>
            </View>

           <TouchableOpacity
  style={styles.registerButton}
  onPress={() => navigation.navigate('Admin')}
>
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
    // backgroundColor: '#FF0202',
  },
  statusBarBackground: {
    height: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    // backgroundColor: '#FF0202',
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
