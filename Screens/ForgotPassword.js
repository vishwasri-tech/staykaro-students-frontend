
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

import Constants from 'expo-constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ForgotPassword = ({ navigation }) => {
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
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
              Enter a new password to securely access your StayKaro account.
            </Text>

            {/* Input Fields */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput placeholder="Enter your name..." style={styles.input} />

              <Text style={styles.inputLabel}>Create Password</Text>
              <TextInput
                placeholder="Enter your password..."
                secureTextEntry
                style={styles.input}
              />

              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                placeholder="Re-enter your password..."
                secureTextEntry
                style={styles.input}
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.signupText}>Save</Text>
            </TouchableOpacity>

            {/* Login Prompt */}
            <Text style={styles.loginPrompt}>
              Already have an account?{' '}
              <Text
                style={styles.loginLink}
                onPress={() => navigation.navigate('Login')}
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
    // backgroundColor: '#FF0202',
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
    paddingBottom: hp('4%'),
  },
  logo: {
    width: wp('35%'),
    height: hp('7.25%'),
    alignSelf: 'center',
    marginTop: hp('-4.25%'),
  },
  title: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('5.75%'),
  },
  subtitle: {
    fontSize: hp('1.6%'),
    textAlign: 'center',
    marginVertical: hp('1.5%'),
    marginTop: hp('1.3%'),
    marginBottom: hp('5%'),
    lineHeight: hp('2.4%'),
    color: '#555',
  },
  inputWrapper: {
    marginBottom: hp('0.25%'),
  },
  inputLabel: {
    fontSize: hp('1.8%'),
    fontWeight: '500',
    color: '#333',
    marginBottom: hp('0.25%'),
  },
  input: {
    height: hp('5.8%'),
    borderWidth: 1,
    borderColor: '#AEAEAE',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    marginVertical: hp('0.5%'),
    fontSize: hp('1.7%'),
  },
  signupButton: {
    backgroundColor: '#f44336',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
    marginTop: hp('4.25%'),
  },
  signupText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  loginPrompt: {
    textAlign: 'center',
    marginTop: hp('2%'),
    color: '#333',
  },
  loginLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default ForgotPassword;

