// Screens/BoysHostelsPage.js

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  useWindowDimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import boys1 from '../assets/boys1.png';
import boys2 from '../assets/boys2.png';
import boys3 from '../assets/boys3.png';
import boys4 from '../assets/boys4.png';
import boys5 from '../assets/boys5.png';
import boys6 from '../assets/boys6.png';
import boys7 from '../assets/boys7.png';

const boysHostels = [
  { id: '1', name: 'Om Gents Hostel',       location: 'Hyderabad, Telangana', rent: '₹4999/month', rating: '4.5', image: boys1 },
  { id: '2', name: "Balaji MG PG Hostel",    location: 'Hyderabad, Telangana', rent: '₹4999/month', rating: '4.5', image: boys2 },
  { id: '3', name: "Akash Men's Hostel",     location: 'Hyderabad, Telangana', rent: '₹4999/month', rating: '4.5', image: boys3 },
  { id: '4', name: "Abhinav Men's Hostel",   location: 'Hyderabad, Telangana', rent: '₹4999/month', rating: '4.5', image: boys4 },
  { id: '5', name: 'Surya Sri Men’s Hostel', location: 'Hyderabad, Telangana', rent: '₹4999/month', rating: '4.5', image: boys5 },
  { id: '6', name: "Sai Nivas Men's Hostel", location: 'Hyderabad, Telangana', rent: '₹4999/month', rating: '4.5', image: boys6 },
  { id: '7', name: "Sri Harsha Men's Hostel",location: 'Hyderabad, Telangana', rent: '₹4999/month', rating: '4.5', image: boys7 },
];

export default function BoysHostelsPage({ navigation }) {
  const { width } = useWindowDimensions();
  const CARD_WIDTH = width - 32;
  const safeAreaTop = Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : 0;

  const renderItem = ({ item }) => (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.label}>Nearest to Institution</Text>

        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={12} color="#666" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.rent}>{item.rent}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="green" />
            <Text style={styles.ratingText}>{item.rating}(199)</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: safeAreaTop }]}>
      {/* Header with back arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Boys Hostels</Text>
      </View>

      <FlatList
        data={boysHostels}
        renderItem={renderItem}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,   // space between arrow and title
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: '#555',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 18,
    marginVertical: 2,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    flexShrink: 1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rent: {
    fontSize: 13,
    fontWeight: '600',
    color: 'green',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: 'green',
  },
});
