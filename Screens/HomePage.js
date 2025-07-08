import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import hostel1 from '../assets/hostel1.png';
import hostel2 from '../assets/hostel2.png';
import hostel3 from '../assets/hostel3.png';
import hostel4 from '../assets/hostel4.png';
import hostel5 from '../assets/hostel5.png';
import hostel6 from '../assets/hostel6.png';
import hostel7 from '../assets/hostel7.png';
import hostel8 from '../assets/hostel8.png';
import hostel9 from '../assets/hostel9.png';
import hostel10 from '../assets/hostel10.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_CARD_WIDTH = SCREEN_WIDTH * 0.6;
const H_CARD_HEIGHT = H_CARD_WIDTH * 0.6;
const GRID_ITEM_WIDTH = (SCREEN_WIDTH - 48) / 2;
const GRID_ITEM_HEIGHT = GRID_ITEM_WIDTH * 0.6;

const sampleHostels = [
  { id: '1', name: 'Sri Sai PG', price: 4999, location: 'Hyderabad, Telangana', img: hostel1, distance: '0.4km', rating: 4.5 },
  { id: '2', name: "Sri Depthi women's PG", price: 4999, location: 'Hyderabad, Telangana', img: hostel2, distance: '2.5km', rating: 4.3 },
  { id: '3', name: "Sri Depthi women's PG", price: 4999, location: 'Hyderabad, Telangana', img: hostel3, distance: '2.5km', rating: 4.3 },
  { id: '4', name: "Sri Depthi women's PG", price: 4999, location: 'Hyderabad, Telangana', img: hostel4, distance: '2.5km', rating: 4.3 },
  { id: '5', name: "Sri Depthi women's PG", price: 4999, location: 'Hyderabad, Telangana', img: hostel5, distance: '2.5km', rating: 4.3 },
  { id: '6', name: "Sri Depthi women's PG", price: 4999, location: 'Hyderabad, Telangana', img: hostel6, distance: '2.5km', rating: 4.3 },
  { id: '7', name: "Sri Depthi women's PG", price: 4999, location: 'Hyderabad, Telangana', img: hostel7, distance: '2.5km', rating: 4.3 },
  { id: '8', name: "Sri Depthi women's PG", price: 4999, location: 'Hyderabad, Telangana', img: hostel8, distance: '2.5km', rating: 4.3 },
  { id: '9', name: "Sri Depthi women's PG", price: 4999, location: 'Hyderabad, Telangana', img: hostel9, distance: '2.5km', rating: 4.3 },
  { id: '10', name: "Sri Depthi women's PG", price: 4999, location: 'Hyderabad, Telangana', img: hostel10, distance: '2.5km', rating: 4.3 },
];

const TabButton = ({ title, active, onPress }) => (
  <TouchableOpacity
    style={[styles.tabButton, active && styles.tabButtonActive]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, active && styles.tabTextActive]}>{title}</Text>
  </TouchableOpacity>
);

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Girls');

  const renderHorizontalItem = ({ item }) => (
    <View style={styles.hCard}>
      <Image source={item.img} style={styles.hImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSub}>{`${item.location} • ${item.distance}`}</Text>
        <Text style={styles.cardPrice}>{`₹${item.price}/mo`}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFA000" />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );

  const renderGridItem = ({ item }) => (
    <View style={styles.gCard}>
      <Image source={item.img} style={styles.gImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSub}>{`${item.location} • ${item.distance}`}</Text>
        <Text style={styles.cardPrice}>{`₹${item.price}/mo`}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFA000" />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.locationText}>Hyderabad, Telangana</Text>
        <Ionicons name="notifications-outline" size={24} />
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search college name or location..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>
      <ScrollView>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hostels near you</Text>
          <Text style={styles.seeAllText}>See all</Text>
        </View>
        <FlatList
          data={sampleHostels}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderHorizontalItem}
          contentContainerStyle={styles.horizontalList}
        />

        <View style={[styles.sectionHeader, { marginTop: 24, marginBottom: 0 }]}> 
          <Text style={styles.sectionTitle}>Hostels For</Text>
        </View>
        <View style={styles.tabsContainer}>
          {['Girls', 'Boys', 'Co-living'].map(tab => (
            <TabButton
              key={tab}
              title={tab}
              active={activeTab === tab}
              onPress={() => setActiveTab(tab)}
            />
          ))}
        </View>

        <FlatList
          data={sampleHostels}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={renderGridItem}
          columnWrapperStyle={styles.columnWrapper}
          scrollEnabled={false}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Hostels</Text>
          <Text style={styles.seeAllText}>See all</Text>
        </View>
        <FlatList
          data={sampleHostels}
          keyExtractor={item => item.id}
          renderItem={renderHorizontalItem}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  locationText: { fontSize: 16, fontWeight: '600' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, height: 40 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600' },
  seeAllText: { fontSize: 14, color: '#FF0000' },
  horizontalList: { paddingLeft: 16, paddingRight: 8 },
  hCard: {
    width: H_CARD_WIDTH,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  hImage: { width: '100%', height: H_CARD_HEIGHT },
  gCard: {
    width: GRID_ITEM_WIDTH,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  gImage: { width: '100%', height: GRID_ITEM_HEIGHT },
  cardContent: { padding: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardSub: { fontSize: 12, color: '#555', marginVertical: 4 },
  cardPrice: { fontSize: 14, fontWeight: '600', marginVertical: 2 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ratingText: { marginLeft: 4, fontSize: 12, fontWeight: '500' },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  tabButtonActive: { backgroundColor: '#FF0000' },
  tabText: { fontSize: 14, color: '#555' },
  tabTextActive: { color: '#fff' },
  columnWrapper: { justifyContent: 'space-between', marginHorizontal: 16 },
});
