import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import AdminNavbar from './AdminNavbar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Admin() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
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

        {/* Hostel Card */}
        <View style={styles.hostelCard}>
          <Text style={styles.hostelTitle}>Michael’s Boys Hostel</Text>
          <Text style={styles.gender}>Male</Text>

          {/* Active Badge aligned to left */}
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Active</Text>
          </View>

          <Text style={styles.description}>
            ✨ Hygienic rooms with support service at affordable prices
          </Text>
        </View>

        {/* Dashboard Summary */}
        <Text style={styles.dashboardTitle}>Dashboard Summary</Text>
        <View style={styles.dashboardGrid}>
          {[
            'Total Bookings',
            'Total Earnings',
            'Occupancy Rate',
            'Pending Requests',
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.dashboardCard}>
              <Text style={styles.dashboardText}>{item}</Text>
              <MaterialIcons name="keyboard-arrow-right" size={wp('6%')} color="#333" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacer */}
        <View style={{ height: hp('12%') }} />
      </ScrollView>

      {/* Admin Navbar */}
      <View style={styles.navbarContainer}>
        <AdminNavbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: hp('6%'),
    paddingHorizontal: wp('7%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2.5%'),
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
    padding: wp('6%'),
    borderRadius: wp('4%'),
    marginBottom: hp('3%'),
  },
  hostelTitle: {
    fontSize: hp('3.6%'),
    fontWeight: 'bold',
    color: '#0e0101e4',
  },
  gender: {
    color: '#130101ec',
    fontSize: hp('2.2%'),
    marginTop: hp('0.5%'),
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: wp('3.5%'),
    marginLeft: 200,
    paddingVertical: hp('0.5%'),
    borderRadius: wp('3%'),
    alignSelf: 'flex-start',
    marginTop: hp('-2%'),
    marginBottom: hp('1.5%'),
  },
  statusText: {
    color: '#fff',
    fontSize: hp('1.6%'),
  },
  description: {
    color: '#fff',
    fontSize: hp('1.9%'),
    marginTop: hp('0.5%'),
  },
  dashboardTitle: {
    fontSize: hp('2.6%'),
    fontWeight: '600',
    marginBottom: hp('3.5%'),
    marginTop: hp('1.4%'),
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dashboardCard: {
    width: (wp('100%') - wp('20%')) / 2,
    backgroundColor: '#ffffff',
    
    padding: wp('6%'),
    borderRadius: wp('6%'),
    marginBottom: hp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  dashboardText: {
    fontSize: hp('2%'),
    color: '#333',
    flex: 1,
    lineHeight: hp('4%'),
    flexWrap: 'wrap',
  },
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
