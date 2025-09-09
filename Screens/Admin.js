import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import AdminNavbar from './AdminNavbar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Dashboard tiles data
const dashboardData = [
  {
    title: 'Total Students',
    image: require('../assets/dashboard1.png'),
  },
  {
    title: 'Rooms Available/Total Rooms',
    image: require('../assets/dashboard2.png'),
  },
  {
    title: 'Applications Pending',
    image: require('../assets/dashboard3.png'),
  },
  {
    title: 'Total Fees Collected',
    image: require('../assets/dashboard4.png'),
  },
];

export default function Admin() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Layout Card */}
        <View style={styles.greetingCard}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Hi, Chandhu !</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={wp('4%')} color="#555" />
                <Text style={styles.location}>Begumpet, Hyderabad</Text>
              </View>
            </View>
            <Ionicons name="notifications" size={wp('6%')} color="#F4D03F" />
          </View>
        </View>

        {/* Hostel Card inside White Layout */}
        <View style={styles.hostelCardWrapper}>
          <View style={styles.hostelCard}>
            <Text style={styles.hostelTitle}>Michael’s Boys Hostel</Text>
            <Text style={styles.gender}>Male</Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Active</Text>
            </View>

            <Text style={styles.description}>
              ✨ Hygienic rooms with support service at affordable prices
            </Text>
          </View>
        </View>

        {/* Dashboard Summary */}
        <Text style={styles.dashboardTitle}>Dashboard Summary</Text>
        <View style={styles.dashboardGrid}>
          {dashboardData.map((item, index) => (
            <TouchableOpacity key={index} style={styles.dashboardCard}>
              <View style={styles.dashboardLeft}>
                <Image source={item.image} style={styles.dashboardImage} />
                <Text style={styles.dashboardText}>{item.title}</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={wp('6%')}
                color="#333"
                style={styles.dashboardArrow}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Spacer */}
        <View style={{ height: hp('12%') }} />
      </ScrollView>

      {/* Bottom Navbar */}
      <View style={styles.navbarContainer}>
        <AdminNavbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('4%'),
    paddingHorizontal: wp('5%'),
  },

  greetingCard: {
    backgroundColor: '#fff',
    padding: wp('10%'),
    borderRadius: wp('12%'),
    marginTop: hp('-3.9%'),
    marginBottom: hp('4%'),
    marginRight: wp('-6%'),
    marginLeft: wp('-8%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('-2%'),
    marginTop: hp('2%'),
  },
  greeting: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.5%'),
  },
  location: {
    marginLeft: wp('1.5%'),
    color: '#555',
    fontSize: hp('1.8%'),
  },


  hostelCard: {
    backgroundColor: '#F15B5D',
    borderRadius: wp('4%'),
    padding: wp('5%'),
  },
  hostelTitle: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: '#170303ff',
  },
  gender: {
    color: '#fff',
    fontSize: hp('2%'),
    marginTop: hp('0.5%'),
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginLeft: 230,
    marginTop: hp('-2.7%'),
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginVertical: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: wp('3.5%'),
  },
  description: {
    color: '#fff',
    fontSize: hp('1.8%'),
    marginTop: hp('0.5%'),
  },
dashboardTitle: {
  fontSize: hp('2.4%'),
  fontWeight: '600',
  marginBottom: hp('2.5%'),
  marginTop: hp('1.5%'),
  color: '#000',
},

dashboardGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},

dashboardCard: {
  width: (wp('100%') - wp('18%')) / 2, // Slightly smaller to match image
  backgroundColor: '#fff',
  paddingVertical: hp('2%'),
  paddingHorizontal: wp('4%'),
  borderRadius: wp('4%'),
  marginBottom: hp('3.5%'),
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  flexDirection: 'row',
  alignItems: 'center',
},

dashboardImage: {
  width: wp('7.5%'),
  height: wp('7.5%'),
  resizeMode: 'contain',
  marginRight: wp('3.5%'),
},

dashboardText: {
  fontSize: hp('1.7%'),
  color: '#000',
  flex: 1,
  flexWrap: 'wrap',
  lineHeight: hp('2.4%'),
},

dashboardArrow: { position: 'absolute',
   right: wp('2.3%'), 
   bottom: wp('-9%'),
    marginBottom: hp('8%'), },


  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: wp('2%'),
    right: wp('2%'),
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },
});
