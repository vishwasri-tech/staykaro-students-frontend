// screens/GirlsHostelsPage.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Correct import: BottomNavbar lives alongside this file in screens/
import BottomNavbar from './BottomNavbar';

// Local images
import gh1 from '../assets/gh1.png';
import gh2 from '../assets/gh2.png';
import gh3 from '../assets/gh3.png';
import gh4 from '../assets/gh4.png';
import gh5 from '../assets/gh5.png';
import gh6 from '../assets/gh6.png';
import gh7 from '../assets/gh7.png';

const { width } = Dimensions.get('window');
const cardWidth = width - 40;

const hostels = [
  {
    id: '1',
    name: 'Annapurna Girls Hostel',
    address: '8-7-96, road no. 4, Nizampet, Hyderabad, Telangana',
    distance: '0.52km',
    rating: '4.5/5',
    price: '₹4999/-',
    image: gh1,
  },
  {
    id: '2',
    name: 'Radhika Ladies Hostel',
    address: 'Nizampet, Hyderabad, Telangana',
    distance: '0.55km',
    rating: '4.5/5',
    price: '₹4999/-',
    image: gh2,
  },
  {
    id: '3',
    name: 'Sri Ladies Hostel',
    address: 'Nizampet, Hyderabad, Telangana',
    distance: '0.55km',
    rating: '4.5/5',
    price: '₹4999/-',
    image: gh3,
  },
  {
    id: '4',
    name: 'Sri Teja Ladies Hostel',
    address: 'Nizampet, Hyderabad, Telangana',
    distance: '0.55km',
    rating: '4.5/5',
    price: '₹4999/-',
    image: gh4,
  },
  {
    id: '5',
    name: 'SLV Womens Hostel',
    address: 'Nizampet, Hyderabad, Telangana',
    distance: '0.55km',
    rating: '4.5/5',
    price: '₹4999/-',
    image: gh5,
  },
  {
    id: '6',
    name: 'Sri Venkateswara Ladies Hostel',
    address: 'Nizampet, Hyderabad, Telangana',
    distance: '0.55km',
    rating: '4.5/5',
    price: '₹4999/-',
    image: gh6,
  },
  {
    id: '7',
    name: 'Anitha Womens Hostel',
    address: 'Nizampet, Hyderabad, Telangana',
    distance: '0.55km',
    rating: '4.5/5',
    price: '₹4999/-',
    image: gh7,
  },
];

export default function GirlsHostelsPage({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        // e.g. navigation.navigate('HostelDetails', { hostelId: item.id });
      }}
    >
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.nearest}>Nearest to Institution</Text>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.address} numberOfLines={2}>
            {item.address}
          </Text>
          <View style={styles.row}>
            <Ionicons name="location-outline" size={14} color="#444" />
            <Text style={styles.distance}> {item.distance}</Text>
          </View>
          <View style={styles.meta}>
            <View style={styles.row}>
              <Ionicons name="cash-outline" size={14} color="green" />
              <Text style={styles.price}> {item.price}</Text>
            </View>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={14} color="green" />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Girls Hostels</Text>
      <FlatList
        data={hostels}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <BottomNavbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heading: { fontSize: 20, fontWeight: '600', paddingHorizontal: 20, marginVertical: 15 },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: cardWidth * 0.35,
    height: 130,
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  details: { flex: 1, padding: 10, justifyContent: 'space-between' },
  nearest: { fontSize: 10, color: '#888', marginBottom: 2 },
  title: { fontSize: 16, fontWeight: '600', flexShrink: 1 },
  address: { fontSize: 12, color: '#666', marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  distance: { fontSize: 12, color: '#444' },
  meta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, alignItems: 'center' },
  price: { fontSize: 14, color: 'green', fontWeight: 'bold' },
  ratingBox: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: 13, marginLeft: 4, color: 'green', fontWeight: '600' },
});
