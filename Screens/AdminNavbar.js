import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
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
      {/* Home icon always red */}
      <TouchableOpacity onPress={() => navigation.navigate('Admin1')}>
        <Ionicons
          name="home"
          size={wp('6%')}
          color={'#e53535'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('HostelForm')}>
        <MaterialIcons
          name="add-box"
          size={wp('6%')}
          color={isActive('Admin2') ? '#e53535' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('StudentApplication')}>
        <MaterialIcons
          name="assignment"
          size={wp('6%')}
          color={isActive('Admin3') ? '#e53535' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Admin4')}>
        <FontAwesome
          name="user-circle"
          size={wp('6%')}
          color={isActive('Admin4') ? '#e53535' : 'gray'}
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
    height: hp('8%'),
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
});

export default AdminNavbar;
