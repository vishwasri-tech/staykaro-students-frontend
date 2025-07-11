// Screens/CoLivingPage.js

import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
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
  { id: '1', name: 'Krishna Co-living', location: 'Hyderabad, Telangana', rent: '₹6000/-', rating: '4.6', image: cl1 },
  { id: '2', name: 'Elite Co-living',     location: 'Hyderabad, Telangana', rent: '₹6200/-', rating: '4.7', image: cl2 },
  { id: '3', name: 'Shared Stay',         location: 'Hyderabad, Telangana', rent: '₹5300/-', rating: '4.4', image: cl3 },
  { id: '4', name: 'Cozy Nest PG',        location: 'Hyderabad, Telangana', rent: '₹5500/-', rating: '4.3', image: cl4 },
  { id: '5', name: 'Urban Living PG',     location: 'Hyderabad, Telangana', rent: '₹5800/-', rating: '4.5', image: cl5 },
  { id: '6', name: 'Metro Co-living',     location: 'Hyderabad, Telangana', rent: '₹5900/-', rating: '4.2', image: cl6 },
  { id: '7', name: 'Downtown Co-living',  location: 'Hyderabad, Telangana', rent: '₹6100/-', rating: '4.6', image: cl7 },
];

export default function CoLivingPage({ navigation }) {
  const { width } = useWindowDimensions();
  const CARD_WIDTH = width - 32;
  const safeAreaTop = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.85} style={[styles.card, { width: CARD_WIDTH }]}>
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
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: safeAreaTop }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Co‑living Hostels</Text>
      </View>

      <FlatList
        data={data}
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
    marginBottom: 12,
    marginTop: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,   // push title just right of back arrow
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
