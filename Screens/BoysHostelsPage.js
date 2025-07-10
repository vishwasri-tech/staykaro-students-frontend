import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import images
import boys1 from '../assets/boys1.png';
import boys2 from '../assets/boys2.png';
import boys3 from '../assets/boys3.png';
import boys4 from '../assets/boys4.png';
import boys5 from '../assets/boys5.png';
import boys6 from '../assets/boys6.png';
import boys7 from '../assets/boys7.png';

const boysHostels = [
  {
    id: '1',
    name: 'Om Gents Hostel',
    location: 'Neredmet, Telangana · 0.65km',
    roomType: '2 & 3 Sharing · Balcony',
    rent: '₹4999/month',
    discount: 'Available · Upto 50% OFF',
    rating: '4.5',
    image: boys1,
  },
  {
    id: '2',
    name: "Balaji Men's PG Hostel",
    location: 'Neredmet, Telangana · 0.63km',
    roomType: '2 & 3 Sharing · Attached Bathroom',
    rent: '₹4999/month',
    discount: 'Available · Upto 50% OFF',
    rating: '4.5',
    image: boys2,
  },
  {
    id: '3',
    name: "Akash Men's Hostel",
    location: 'Neredmet, Telangana · 0.63km',
    roomType: 'Individual · Table · Balcony',
    rent: '₹4999/month',
    discount: 'Available · Upto 50% OFF',
    rating: '4.5',
    image: boys3,
  },
  {
    id: '4',
    name: "Surya Sai Men's Hostel",
    location: 'Neredmet, Telangana · 0.63km',
    roomType: '2 Sharing · Cupboard · Balcony',
    rent: '₹4999/month',
    discount: 'Available · Upto 50% OFF',
    rating: '4.5',
    image: boys4,
  },
  {
    id: '5',
    name: 'Annapurna Gents Hostel',
    location: 'Neredmet, Telangana · 0.63km',
    roomType: '3 Sharing · Table · Attached',
    rent: '₹4999/month',
    discount: 'Available · Upto 50% OFF',
    rating: '4.5',
    image: boys5,
  },
  {
    id: '6',
    name: "Teekayz Men's Hostel",
    location: 'Neredmet, Telangana · 0.63km',
    roomType: '2 Sharing · Table · Cupboard',
    rent: '₹4999/month',
    discount: 'Available · Upto 50% OFF',
    rating: '4.5',
    image: boys6,
  },
  {
    id: '7',
    name: "Durga Bhai Men's Hostel",
    location: 'Neredmet, Telangana · 0.63km',
    roomType: '2 & 3 Sharing · Attached',
    rent: '₹4999/month',
    discount: 'Available · Upto 50% OFF',
    rating: '4.5',
    image: boys7,
  },
];

const BoysHostelsPage = () => {
  const { width } = useWindowDimensions();

  const renderItem = ({ item }) => (
    <View style={[styles.card, { width: width - 32 }]}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.nearest}>Nearest to Institution</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subText}>{item.roomType}</Text>

        <View style={styles.iconRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>

        <View style={styles.iconRow}>
          <Ionicons name="star" size={14} color="#f4c430" />
          <Text style={styles.infoText}>{item.rating}★ (99)</Text>
        </View>

        <Text style={styles.rent}>{item.rent}</Text>
        <Text style={styles.discount}>{item.discount}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Boys Hostels</Text>
      <FlatList
        data={boysHostels}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default BoysHostelsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 160,
  },
  textContainer: {
    padding: 12,
  },
  nearest: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 2,
  },
  subText: {
    fontSize: 13,
    color: '#444',
    marginBottom: 6,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  rent: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginTop: 6,
  },
  discount: {
    fontSize: 12,
    color: 'green',
    backgroundColor: '#e2fbe4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
});
