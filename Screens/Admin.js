import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AdminNavbar from './AdminNavbar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function Admin() {
  const handleMenuPress = () => {
    navigation.navigate('Setting');
  };
  const [host, setHost] = useState(null);
  const navigation = useNavigation(); // navigation hook

  useEffect(() => {
    const fetchRecentHost = async () => {
      try {
        const res = await axios.get(`http://192.168.1.5:5000/api/admin/recent`);
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

        await axios.put(`http://192.168.1.5:5000/api/admin/update-location/${hostId}`, {
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
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Greeting Layout */}
        <View style={styles.greetingBox}>
          <View>
            <Text style={styles.greeting}>Hi, Chandhu !</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={wp('4%')} color="#555" />
              <Text style={styles.location}>Begumpet, Hyderabad</Text>
            </View>
          </View>

          {/* Icons Row */}
          <View style={styles.iconRow}>
            <TouchableOpacity>
              <Image
                source={require('../assets/Doorbell.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
              <Ionicons name="menu" size={wp('7%')} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hostel Card */}
        <View style={styles.hostelCard}>
          <Text style={styles.hostelTitle}>Michael’s Boys Hostel</Text>

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
            { label: 'Total Students', image: require('../assets/dashboard1.png') },
            { label: 'Rooms Available/Total Rooms', image: require('../assets/dashboard2.png') },
            { label: 'Applications Pending', image: require('../assets/dashboard3.png') },
            { label: 'Total Fees Collected', image: require('../assets/dashboard4.png') },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.dashboardCard}>
              <View style={styles.dashboardContent}>
                <Image source={item.image} style={styles.dashboardImage} />
                <Text style={styles.dashboardText}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={wp('5%')} color="#333" />
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
    backgroundColor: '#ffffff',
    paddingTop: hp('-3%'),
    paddingHorizontal: wp('7%'),
    marginBottom: hp('-2%'),
  },
  greetingBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 40,
    borderRadius: 80,
    marginBottom: hp('2%'),
    borderWidth: 1,
    marginLeft: -50,
    marginRight: -50,
    marginTop: -30,
    borderColor: '#f7f7f7',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
  },
  greeting: {
    fontSize: hp('2.8%'),
    fontWeight: '500',
    color: '#222',
    marginTop: hp('3'),
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
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImage: {
    width: wp('7%'),
    height: wp('6.5%'),
  },
  menuButton: {
    marginLeft: wp('4%'),
    padding: wp('1.5%'),
    backgroundColor: '#ffffff',
    borderRadius: wp('2%'),
  },
  hostelCard: {
    backgroundColor: '#F15B5D',
    padding: wp('6%'),
    borderRadius: wp('4%'),
    marginBottom: hp('3%'),
  },
  hostelTitle: {
    fontSize: hp('3.9%'),
    fontWeight: '500',
    color: '#222',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: wp('3.5%'),
    alignSelf: 'flex-start',
    paddingVertical: hp('0.5%'),
    borderRadius: wp('3%'),
    marginTop: hp('-1%'),
    marginBottom: hp('1.5%'),
    marginLeft: 'auto',
  },
  statusText: {
    color: '#fff',
    fontSize: hp('1.6%'),
  },
  description: {
    color: '#fff',
    fontSize: hp('1.6%'),
    marginTop: hp('0.5%'),
  },
  dashboardTitle: {
    fontSize: hp('2.6%'),
    fontWeight: '600',
    marginBottom: hp('3%'),
    marginTop: hp('1.4%'),
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dashboardCard: {
    width: (wp('100%') - wp('20')) / 2,
    backgroundColor: '#ffffff',
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('5%'),
    marginBottom: hp('2.5%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dashboardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: wp('2%'),
  },
  dashboardImage: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    marginRight: wp('-2%'),
    marginTop: -58,
  },
  dashboardText: {
    fontSize: hp('1.8%'),
    color: '#333',
    flexShrink: 1,
    flexWrap: 'wrap',
    padding: -20,
    marginTop: 20,
    marginLeft: -20,
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
