import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';

const AdminNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (screenName) => route.name === screenName;

  return (
    <View style={styles.navbar}>
      {/* Home (always red) */}
      <TouchableOpacity onPress={() => navigation.navigate('Admin1')}>
        <Image
          source={require('../assets/Admin1.png')}
          style={[styles.icon, { tintColor: '#e53535' }]} // always red
        />
      </TouchableOpacity>

      {/* Student Applications */}
      <TouchableOpacity onPress={() => navigation.navigate('StudentApplications')}>
        <Image
          source={require('../assets/Admin2.png')}
          style={[styles.icon, isActive('StudentApplications') && styles.activeIcon]}
        />
      </TouchableOpacity>

      {/* Room Management */}
      <TouchableOpacity onPress={() => navigation.navigate('Admin3')}>
        <Image
          source={require('../assets/Admin3.png')}
          style={[styles.icon, isActive('Admin3') && styles.activeIcon]}
        />
      </TouchableOpacity>

      {/* Fee Management */}
      <TouchableOpacity onPress={() => navigation.navigate('Admin4')}>
        <Image
          source={require('../assets/Admin4.png')}
          style={[styles.icon, isActive('Admin4') && styles.activeIcon]}
        />
      </TouchableOpacity>

      {/* Complaint Management */}
      <TouchableOpacity onPress={() => navigation.navigate('Admin5')}>
        <Image
          source={require('../assets/Admin5.png')}
          style={[styles.icon, isActive('Admin5') && styles.activeIcon]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: -10,
    right: -10,
    height: hp('9%'),
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    width: wp('8%'),
    height: wp('7%'),
    resizeMode: 'contain',
    tintColor: 'gray',
  },
  activeIcon: {
    tintColor: '#e53535', // active state red
  },
});

export default AdminNavbar;
