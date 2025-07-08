import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BottomNavbar = ({ activeTab }) => {
  const navigation = useNavigation();

  const tabs = [
    {
      id: 'Home',
      label: 'Home',
      icon: require('../assets/Home.png'),
      screen: 'HomeScreen',
    },
    {
      id: 'Booking',
      label: 'Booking',
      icon: require('../assets/Booking.png'),
      screen: 'StudentExamsScreen',
    },
    {
      id: 'Calender',
      label: 'Calender',
      icon: require('../assets/Calendar.png'),
      screen: 'StudentNotesAssignments',
    },
    {
      id: 'Profile',
      label: 'Profile',
      icon: require('../assets/Profile.png'),
      screen: 'StudentProfileScreen',
    },
  ];

  const handlePress = (tabId, screen) => {
    if (activeTab !== tabId) {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => handlePress(tab.id, tab.screen)}
            activeOpacity={0.7}
          >
            <Image
              source={tab.icon}
              style={[styles.icon, isActive && styles.activeIcon]}
              resizeMode="contain"
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FF0202',
    borderTopWidth: 1,
    borderTopColor: '#FF0202',
    height: hp('8%'), // Responsive height
    paddingBottom: hp('1%'),
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    width: wp('6.5%'),
    height: hp('3.5%'),
  },
  label: {
    fontSize: wp('3%'),
    marginTop: hp('0.5%'),
    color: 'white',
  },
  activeLabel: {
    color: '#000',
    fontWeight: '500',
  },
});

export default BottomNavbar;
