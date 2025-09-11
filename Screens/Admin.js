import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import * as Location from 'expo-location';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

// Dashboard tiles data
const dashboardData = [
  { title: 'Total Students', image: require('../assets/dashboard1.png') },
  { title: 'Rooms Available/Total Rooms', image: require('../assets/dashboard2.png') },
  { title: 'Applications Pending', image: require('../assets/dashboard3.png') },
  { title: 'Total Fees Collected', image: require('../assets/dashboard4.png') },
];

export default function Admin() {
  const [host, setHost] = useState(null);
  const navigation = useNavigation(); // ✅ navigation hook

  useEffect(() => {
    const fetchRecentHost = async () => {
      try {
        const res = await axios.get(`http://192.168.1.8:5000/api/admin/recent`);
        setHost(res.data);
        if (res.data?.id) {
          getAndUpdateLocation(res.data.id);
        }
      } catch (err) {
        console.log('Error fetching recent host:', err);
      }
    };

    const getAndUpdateLocation = async (hostId) => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission denied for location');
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        let coords = loc.coords;

        let address = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        let addressText =
          address.length > 0
            ? `${address[0].name || address[0].street || 'Unknown Area'}, ${address[0].city || ''}, ${address[0].region || ''}`
            : `Lat: ${coords.latitude.toFixed(3)}, Lng: ${coords.longitude.toFixed(3)}`;

        await axios.put(`http:///api/admin/update-location/${hostId}`, {
          latitude: coords.latitude,
          longitude: coords.longitude,
          address: addressText,
        });

        setHost((prev) =>
          prev
            ? { ...prev, address: addressText, location: { latitude: coords.latitude, longitude: coords.longitude } }
            : prev
        );

        console.log('Location updated on backend:', addressText);
      } catch (err) {
        console.log('Error fetching/updating location:', err);
      }
    };

    fetchRecentHost();
  }, []);

  if (!host) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Greeting Card */}
        <View style={styles.greetingCard}>
          <View style={styles.header}>
            {/* Left Profile Icon */}
            <TouchableOpacity>
              <Image
                source={require('../assets/Profile.png')}
                style={styles.ProfileIcon}
              />
            </TouchableOpacity>

            <View style={styles.headerTextWrapper}>
              <Text style={styles.greeting}>Hi, {host.name}!</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={wp('4%')} color="#555" />
                <Text style={styles.location}>
                  {host.address
                    ? host.address
                    : `${host.location?.latitude}, ${host.location?.longitude}`}
                </Text>
              </View>
            </View>

            {/* Right Side Icons */}
            <View style={styles.rightIcons}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/Doorbell.png')}
                  style={styles.DoorbellIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Hostel Card */}
        <View style={styles.hostelCardWrapper}>
          <View style={styles.hostelCard}>
            <Text style={styles.hostelTitle}>{host.hostelName}</Text>

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

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          {/* ✅ Navigate to AddHostel screen */}
          <TouchableOpacity
            style={styles.addHostelBtn}
            onPress={() => navigation.navigate('AddHostel')}
          >
            <Text style={styles.btnText}>+ Add Hostel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.announcementBtn}>
            <Text style={styles.btnText}>Post Announcement</Text>
          </TouchableOpacity>
        </View>

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
    paddingTop: hp('1%'),
    paddingHorizontal: wp('5%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingCard: {
    backgroundColor: '#fff',
    padding: hp('3%'),
    borderRadius: wp('6%'),
    marginTop: wp('-2%'),
    marginBottom: hp('3%'),
    marginLeft: wp('-5%'),
    marginRight: wp('-5%'),
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
  },
  headerTextWrapper: {
    flex: 1,
    marginHorizontal: wp('2%'),
  },
  greeting: {
    fontSize: hp('2.6%'),
    fontWeight: '500',
    marginTop: hp('3%'),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.5%'),
    flexWrap: 'wrap',
  },
  location: {
    marginLeft: wp('5%'),
    color: '#555',
    fontSize: hp('1.8%'),
    flexShrink: 1,
    marginTop: hp('-4.4%'),
  },
  ProfileIcon: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
    marginTop: hp('1%'),
  },
  DoorbellIcon: {
    width: wp('7%'),
    height: wp('7%'),
    resizeMode: 'contain',
    marginRight: wp('3%'),
    marginTop: hp('1%'),
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostelCardWrapper: {
    paddingHorizontal: wp('2%'),
  },
  hostelCard: {
    backgroundColor: '#F15B5D',
    borderRadius: wp('4%'),
    padding: hp('4%'),
  },
  hostelTitle: {
    fontSize: hp('3.9%'),
    fontWeight: '500',
    color: '#170303ff',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: hp('1%'),
  },
  statusText: {
    color: '#fff',
    fontSize: wp('3.2%'),
  },
  description: {
    color: '#fff',
    fontSize: hp('1.6%'),
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
    width: (wp('100%') - wp('18%')) / 2,
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
  dashboardArrow: {
    position: 'absolute',
    right: wp('2%'),
    top: '65%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  addHostelBtn: {
    flex: 1,
    backgroundColor: '#F15B5D',
    paddingVertical: hp('2%'),
    marginRight: wp('2%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
  },
  announcementBtn: {
    flex: 1,
    backgroundColor: '#007BFF',
    paddingVertical: hp('2%'),
    marginLeft: wp('2%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: hp('1.9%'),
    fontWeight: '600',
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
