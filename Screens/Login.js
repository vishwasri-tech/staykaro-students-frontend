
import React from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Constants from 'expo-constants';

const Login = ({ navigation }) => {
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
              />
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                placeholder="Enter password..."
                secureTextEntry
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('HomePage')}
            >
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>

            {/* Google Login - Placeholder for now */}
            <TouchableOpacity style={styles.googleLink}></TouchableOpacity>

            {/* Register Prompt */}
            <Text style={styles.registerPrompt}>
              Don’t have an account?{' '}
              <Text
                style={styles.registerLink}
                onPress={() => navigation.navigate('SignUp')}
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
    // backgroundColor: '#FF0202',
  },
  statusBarBackground: {
    height: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    backgroundColor: '#FF0202',
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

