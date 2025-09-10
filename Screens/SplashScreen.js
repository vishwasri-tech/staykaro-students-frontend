import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Image,
  StyleSheet,
  Platform,
  InteractionManager,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [roleSelected, setRoleSelected] = useState(null); 

  useEffect(() => {
    if (roleSelected) {
      const timer = setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          if (roleSelected === 'student') {
            navigation.replace('BannerPage');
          } else if (roleSelected === 'owner') {
            navigation.replace('Admin');
          }
        });
      }, 1000); // 1-second delay
      return () => clearTimeout(timer);
    }
  }, [roleSelected, navigation]);

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

      <View style={styles.container}>
        {/* Background Shapes */}
        <View style={styles.diagonalShape} />
        <View style={styles.innerDiagonal} />

        {/* Logo */}
        <Image
          source={require('../assets/staykaro-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Role Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => navigation.replace('RegisterHostel', { role: 'owner' })}
          >
            <Text style={styles.buttonText}>Owner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => navigation.replace('SignUp', { role: 'student' })}
          >
            <Text style={styles.buttonText}>User</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diagonalShape: {
    position: 'absolute',
    width: wp('200%'),
    height: wp('200%'),
    backgroundColor: '#fde0e0',
    transform: [{ rotate: '45deg' }],
    top: hp('9%'),
    left: wp('49%'),
  },
  innerDiagonal: {
    position: 'absolute',
    width: wp('65%'),
    height: wp('65%'),
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
    top: hp('39%'),
    left: wp('85%'),
    zIndex: 1,
  },
  logo: {
    width: wp('55%'),
    height: hp('20%'),
    zIndex: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: hp('5%'),
    width: '100%',
    alignItems: 'center',
    gap: hp('2%'),
  },
  roleButton: {
    backgroundColor: '#FF0202',
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('20%'),
    borderRadius: wp('2%'),
  },
  buttonText: {
    color: '#000',
    fontSize: hp('2.1%'),
    fontWeight: 'bold',
  },
});

export default SplashScreen;
