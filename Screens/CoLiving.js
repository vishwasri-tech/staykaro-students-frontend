import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import cl1 from '../assets/cl1.png';
import cl2 from '../assets/cl2.png';
import cl3 from '../assets/cl3.png';
import cl4 from '../assets/cl4.png';
import cl5 from '../assets/cl5.png';
import cl6 from '../assets/cl6.png';
import cl7 from '../assets/cl7.png';

const data = [
  {
    id: '1',
    name: 'Krishna Co-living',
    location: 'KPHB, Hyderabad',
    distance: '1.5 km',
    price: '₹6000/-',
    rating: '4.6',
    image: cl1,
  },
  {
    id: '2',
    name: 'Elite Co-living',
    location: 'Madhapur, Hyderabad',
    distance: '2.3 km',
    price: '₹6200/-',
    rating: '4.7',
    image: cl2,
  },
  {
    id: '3',
    name: 'Shared Stay',
    location: 'Ameerpet, Hyderabad',
    distance: '1.8 km',
    price: '₹5300/-',
    rating: '4.4',
    image: cl3,
  },
  {
    id: '4',
    name: 'Cozy Nest PG',
    location: 'Kondapur, Hyderabad',
    distance: '2.7 km',
    price: '₹5500/-',
    rating: '4.3',
    image: cl4,
  },
  {
    id: '5',
    name: 'Urban Living PG',
    location: 'Hitech City, Hyderabad',
    distance: '3.1 km',
    price: '₹5800/-',
    rating: '4.5',
    image: cl5,
  },
  {
    id: '6',
    name: 'Metro Co-living',
    location: 'SR Nagar, Hyderabad',
    distance: '2.0 km',
    price: '₹5900/-',
    rating: '4.2',
    image: cl6,
  },
  {
    id: '7',
    name: 'Downtown Co-living',
    location: 'Punjagutta, Hyderabad',
    distance: '2.4 km',
    price: '₹6100/-',
    rating: '4.6',
    image: cl7,
  },
];

const CoLivingPage = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>Nearest to Institution</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>
          📍 {item.location} - {item.distance}
        </Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>Available for Co-living</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Co-living Hostels</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      {/* List of Co-living Hostels */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default CoLivingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 4,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  card: {
    flexDirection: 'row',
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  details: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  title: {
    color: '#2E8B57',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  price: {
    fontSize: 14,
    color: 'green',
    fontWeight: '700',
  },
  rating: {
    fontSize: 13,
    color: '#444',
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#d4edda',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 6,
  },
  badgeText: {
    color: '#2e7d32',
    fontSize: 11,
    fontWeight: '600',
  },
});
