// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
//   StatusBar,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import BottomNavbar from './BottomNavbar';

// import hostel1 from '../assets/hostel1.png';
// import hostel2 from '../assets/hostel2.png';
// import hostel3 from '../assets/hostel3.png';
// import hostel4 from '../assets/hostel4.png';
// import hostel5 from '../assets/hostel5.png';
// import hostel6 from '../assets/hostel6.png';
// import hostel7 from '../assets/hostel7.png';
// import hostel8 from '../assets/hostel8.png';
// import hostel9 from '../assets/hostel9.png';
// import hostel10 from '../assets/hostel10.png';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const H_CARD_WIDTH = SCREEN_WIDTH * 0.6;
// const H_CARD_HEIGHT = H_CARD_WIDTH * 0.6;
// const GRID_ITEM_WIDTH = (SCREEN_WIDTH - 48) / 2;
// const GRID_ITEM_HEIGHT = GRID_ITEM_WIDTH * 0.6;

// const sampleHostels = [
//   { id: '1', name: 'Sri Sai Durga Womens PG', price: 4999, location: 'Hyderabad, Telangana', img: hostel1, distance: '0.4km', rating: 4.5, gender: 'Girls' },
//   { id: '2', name: "Sri Deepthi women's PG", price: 4999, location: 'Hyderabad, Telangana', img: hostel2, distance: '2.5km', rating: 4.3, gender: 'Girls' },
//   { id: '3', name: "Raghav Boys PG", price: 4500, location: 'Hyderabad, Telangana', img: hostel3, distance: '1.5km', rating: 4.2, gender: 'Boys' },
//   { id: '4', name: "Krishna Co-living", price: 6000, location: 'Hyderabad, Telangana', img: hostel4, distance: '1.8km', rating: 4.6, gender: 'Co-living' },
//   { id: '5', name: "Kiran Boys Hostel", price: 4700, location: 'Hyderabad, Telangana', img: hostel5, distance: '2.0km', rating: 4.1, gender: 'Boys' },
//   { id: '6', name: "Megha Girls PG", price: 5100, location: 'Hyderabad, Telangana', img: hostel6, distance: '2.5km', rating: 4.4, gender: 'Girls' },
//   { id: '7', name: "Shared Stay", price: 5300, location: 'Hyderabad, Telangana', img: hostel7, distance: '2.2km', rating: 4.0, gender: 'Co-living' },
//   { id: '8', name: "Sai Boys PG", price: 4400, location: 'Hyderabad, Telangana', img: hostel8, distance: '1.7km', rating: 4.3, gender: 'Boys' },
//   { id: '9', name: "Vamsi Girls PG", price: 5200, location: 'Hyderabad, Telangana', img: hostel9, distance: '2.1km', rating: 4.5, gender: 'Girls' },
//   { id: '10', name: "Elite Co-living", price: 6200, location: 'Hyderabad, Telangana', img: hostel10, distance: '2.6km', rating: 4.6, gender: 'Co-living' },
// ];

// const TabButton = ({ title, active, onPress }) => (
//   <TouchableOpacity
//     style={[styles.tabButton, active && styles.tabButtonActive]}
//     onPress={onPress}
//   >
//     <Text style={[styles.tabText, active && styles.tabTextActive]}>{title}</Text>
//   </TouchableOpacity>
// );

// export default function HomePage({ navigation }) {
//   const [search, setSearch] = useState('');
//   const [activeTab, setActiveTab] = useState('Girls');
//   const [featuredTab, setFeaturedTab] = useState('Proximity');

//   const filteredHostels = sampleHostels.filter(h => h.gender === activeTab);
//   const visibleHostels = filteredHostels.slice(0, 4);

//   const handleSeeAllNavigation = () => {
//     if (activeTab === 'Girls') navigation.navigate('GirlsHostelsPage');
//     if (activeTab === 'Boys') navigation.navigate('BoysHostelsPage');
//     if (activeTab === 'Co-living') navigation.navigate('CoLiving');
//   };

//   const renderHorizontalItem = ({ item }) => (
//     <TouchableOpacity onPress={() => navigation.navigate('HostelDetails', { hostel: item })}>
//       <View style={styles.hCard}>
//         <Image source={item.img} style={styles.hImage} resizeMode="cover" />
//         <View style={styles.cardContent}>
//           <Text style={styles.cardTitle}>{item.name}</Text>
//           <Text style={styles.cardSub}>{`${item.location} • ${item.distance}`}</Text>
//           <Text style={styles.cardPrice}>{`₹${item.price}/mo`}</Text>
//           <View style={styles.ratingContainer}>
//             <Ionicons name="star" size={14} color="#FFA000" />
//             <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderGridItem = ({ item }) => (
//     <TouchableOpacity onPress={() => navigation.navigate('HostelDetails', { hostel: item })}>
//       <View style={styles.gCard}>
//         <Image source={item.img} style={styles.gImage} resizeMode="cover" />
//         <View style={styles.cardContent}>
//           <Text style={styles.cardTitle}>{item.name}</Text>
//           <Text style={styles.cardSub}>{`${item.location} • ${item.distance}`}</Text>
//           <Text style={styles.cardPrice}>{`₹${item.price}/mo`}</Text>
//           <View style={styles.ratingContainer}>
//             <Ionicons name="star" size={14} color="#FFA000" />
//             <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderFeaturedCard = ({ item }) => (
//     <TouchableOpacity onPress={() => navigation.navigate('HostelDetails', { hostel: item })}>
//       <View style={styles.featuredCard}>
//         <Image source={item.img} style={styles.featuredImage} resizeMode="cover" />
//         <View style={styles.featuredContent}>
//           <Text style={styles.featuredTopLabel}>Nearest to Institution</Text>
//           <Text style={styles.featuredName}>
//             <Ionicons name="home-outline" size={16} /> {item.name}
//           </Text>
//           <Text style={styles.featuredSubText}>
//             <Ionicons name="business" size={14} /> PG • <Ionicons name="location-outline" size={14} /> Institution • {item.distance}
//           </Text>
//           <Text style={styles.featuredSubText}>
//             <Ionicons name="location-sharp" size={14} /> {item.location}
//           </Text>
//           <Text style={styles.featuredPrice}>{`₹${item.price}/month`}</Text>
//           <View style={styles.featuredFooter}>
//             <View style={styles.sharePill}>
//               <Text style={styles.shareText}>Available: 1 • 2 • 3 • 4 • 5 Sharing</Text>
//             </View>
//             <View style={styles.ratingRow}>
//               <Ionicons name="star" size={14} color="#FFA000" />
//               <Text style={styles.ratingText}>{` ${item.rating.toFixed(1)} (99)`}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.locationWrapper}>
//           <Ionicons name="location-outline" size={20} color="#000" style={styles.locationIcon} />
//           <Text style={styles.locationText}>Hyderabad, Telangana</Text>
//         </View>
//         <Ionicons name="notifications-outline" size={24} style={styles.bellIcon} />
//       </View>

//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
//         <TextInput
//           placeholder="Search college name or location..."
//           value={search}
//           onChangeText={setSearch}
//           style={styles.searchInput}
//         />
//       </View>

//       <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Hostels near you</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeAllText}>See all</Text>
//           </TouchableOpacity>
//         </View>
//         <FlatList
//           data={sampleHostels}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={item => item.id}
//           renderItem={renderHorizontalItem}
//           contentContainerStyle={styles.horizontalList}
//         />

//         <View style={[styles.sectionHeader, { marginTop: 29 }]}>
//           <Text style={styles.sectionTitle}>Hostels For</Text>
//         </View>
//         <View style={styles.tabsContainer}>
//           {['Girls', 'Boys', 'Co-living'].map(tab => (
//             <TabButton
//               key={tab}
//               title={tab}
//               active={activeTab === tab}
//               onPress={() => setActiveTab(tab)}
//             />
//           ))}
//         </View>
//         <FlatList
//           data={visibleHostels}
//           numColumns={2}
//           renderItem={renderGridItem}
//           keyExtractor={item => item.id}
//           columnWrapperStyle={styles.columnWrapper}
//           scrollEnabled={false}
//         />
//         <View style={{ alignItems: 'center', marginVertical: 12 }}>
//           <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAllNavigation}>
//             <Text style={styles.seeAllButtonText}>See all</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Featured Hostels</Text>
//         </View>
//         <View style={styles.featuredTabContainer}>
//           {['Proximity', 'Friend Recommend', 'College-based'].map(tab => (
//             <TouchableOpacity
//               key={tab}
//               style={[styles.featuredTab, featuredTab === tab && styles.activeFeaturedTab]}
//               onPress={() => setFeaturedTab(tab)}
//             >
//               <Text style={[styles.featuredTabText, featuredTab === tab && styles.activeFeaturedTabText]}>
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//         <FlatList
//           data={sampleHostels.slice(0, 3)}
//           keyExtractor={item => item.id}
//           renderItem={renderFeaturedCard}
//           scrollEnabled={false}
//         />
//         <View style={{ alignItems: 'center', marginVertical: 12 }}>
//           <TouchableOpacity style={styles.seeAllButton}>
//             <Text style={styles.seeAllButtonText}>See all</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       <BottomNavbar />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingBottom: 8,
//     paddingTop: Platform.OS === 'android'
//       ? (StatusBar.currentHeight || 0) + 8
//       : 48,
//     backgroundColor: '#fff',
//   },
//   locationWrapper: { flexDirection: 'row', alignItems: 'center' },
//   locationIcon: { marginRight: 6 },
//   locationText: { fontSize: 16, fontWeight: '600' },
//   bellIcon: { marginTop: 2 },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 16,
//     marginBottom: 12,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 48,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   searchIcon: { marginRight: 6 },
//   searchInput: { flex: 1, height: 40 },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginHorizontal: 16,
//     marginBottom: 8,
//   },
//   sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
//   seeAllText: { fontSize: 14, color: '#FF0000', fontWeight: '600' },
//   horizontalList: { paddingLeft: 16, paddingRight: 8 },
//   hCard: {
//     width: H_CARD_WIDTH,
//     marginRight: 12,
//     borderRadius: 20,
//     overflow: 'hidden',
//     backgroundColor: '#fff',
//     elevation: 1.5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   hImage: { width: '100%', height: H_CARD_HEIGHT },
//   gCard: {
//     width: GRID_ITEM_WIDTH,
//     marginBottom: 16,
//     borderRadius: 12,
//     overflow: 'hidden',
//     backgroundColor: '#fff',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   gImage: { width: '100%', height: GRID_ITEM_HEIGHT },
//   cardContent: { padding: 8 },
//   cardTitle: { fontSize: 16, fontWeight: '600' },
//   cardSub: { fontSize: 12, color: '#555', marginVertical: 4 },
//   cardPrice: { fontSize: 14, fontWeight: '600', marginVertical: 2 },
//   ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
//   ratingText: { marginLeft: 4, fontSize: 12, fontWeight: '500' },
//   tabsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginHorizontal: 16,
//     marginTop: 8,
//     marginBottom: 12,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     elevation: 3,
//     paddingVertical: 8,
//   },
//   tabButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 24,
//     borderRadius: 20,
//     backgroundColor: '#F0F0F0',
//   },
//   tabButtonActive: {
//     backgroundColor: '#FF0000',
//   },
//   tabText: { fontSize: 14, color: '#555' },
//   tabTextActive: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   columnWrapper: { justifyContent: 'space-between', marginHorizontal: 16 },
//   featuredTabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginHorizontal: 16,
//     marginBottom: 12,
//   },
//   featuredTab: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     backgroundColor: '#F0F0F0',
//   },
//   activeFeaturedTab: {
//     backgroundColor: '#FF0000',
//   },
//   featuredTabText: { color: '#555', fontSize: 13 },
//   activeFeaturedTabText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   featuredCard: {
//     flexDirection: 'row',
//     marginHorizontal: 16,
//     marginVertical: 8,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     overflow: 'hidden',
//   },
//   featuredImage: {
//     width: 120,
//     height: 120,
//   },
//   featuredContent: { flex: 1, padding: 8 },
//   featuredTopLabel: { fontSize: 12, fontWeight: '500', color: '#999', marginBottom: 4 },
//   featuredName: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
//   featuredSubText: { fontSize: 12, color: '#555', marginBottom: 2 },
//   featuredPrice: { fontSize: 15, fontWeight: '700', color: '#000', marginVertical: 4 },
//   featuredFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   sharePill: { backgroundColor: '#e8fbe9', paddingVertical: 2, paddingHorizontal: 8, borderRadius: 12 },
//   shareText: { fontSize: 11, color: '#28a745' },
//   ratingRow: { flexDirection: 'row', alignItems: 'center' },
//   seeAllButton: { borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 120, paddingVertical: 8, borderRadius: 8 },
//   seeAllButtonText: { color: '#444', fontWeight: '600' },
// });






import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function HomePage() {
  // Sample hostel data
  const topHostels = [
    {
      id: "1",
      name: "Classic Hostel",
      price: "₹5800.00",
      rating: 4.8,
      image: require("../assets/hostel1.png"),
    },
    {
      id: "2",
      name: "French Hostel",
      price: "₹5500.00",
      rating: 4.8,
      image: require("../assets/hostel1.png"),
    },
  ];

  const nearbyHostels = [
    {
      id: "3",
      name: "Sri Sai Hostel",
      location: "Begumpet, Hyd",
      price: "₹4800.00",
      rating: 4.8,
      image: require("../assets/hostel1.png"),
    },
    {
      id: "4",
      name: "Shanthi Hostel",
      location: "Ameerpet, Hyd",
      price: "₹5300.00",
      rating: 4.8,
      image: require("../assets/hostel1.png"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.locationContainer}>
          <Image
            source={require("../assets/location.png")}
            style={styles.iconSmall}
          />
          <Text style={styles.locationText}>Hyderabad, Telangana</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/bell.png")}
            style={styles.iconSmall}
          />
        </TouchableOpacity>
      </View>

      {/* Heading */}
      <Text style={styles.heading1}>Discover your</Text>
      <Text style={styles.heading2}>perfect place to stay</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Image
          source={require("../assets/search.png")}
          style={styles.iconSmall}
        />
        <TextInput
          placeholder="Search hostel"
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        <TouchableOpacity>
          <Image
            source={require("../assets/filter.png")}
            style={styles.iconSmall}
          />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        <TouchableOpacity style={styles.categoryActive}>
          <Text style={styles.categoryTextActive}>Boys</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>Girls</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>Co-living</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.showAll}>Show all</Text>
        </TouchableOpacity>
      </View>

      {/* Top Hostels - Horizontal */}
      <FlatList
        data={topHostels}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: wp("4%") }}
        renderItem={({ item }) => (
          <View style={styles.topHostelCard}>
            <Image source={item.image} style={styles.topHostelImage} />
            <Text style={styles.hostelName}>{item.name}</Text>
            <Text style={styles.hostelPrice}>{item.price}</Text>
            <Text style={styles.hostelRating}>⭐ {item.rating}</Text>
          </View>
        )}
      />

      {/* Hostels Nearby */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Hostels Nearby</Text>
        <TouchableOpacity>
          <Text style={styles.showAll}>Show all</Text>
        </TouchableOpacity>
      </View>

      {nearbyHostels.map((item) => (
        <View key={item.id} style={styles.nearbyCard}>
          <Image source={item.image} style={styles.nearbyImage} />
          <View style={{ flex: 1, marginLeft: wp("3%") }}>
            <Text style={styles.nearbyName}>{item.name}</Text>
            <Text style={styles.nearbyLocation}>{item.location}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.nearbyPrice}>{item.price}</Text>
            <Text style={styles.hostelRating}>⭐ {item.rating}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
      paddingVertical: hp("5%"),
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: wp("4%"),
    marginLeft: wp("2%"),
    color: "#333",
  },
  heading1: {
    fontSize: wp("4.5%"),
    color: "#555",
    marginLeft: wp("5%"),
  },
  heading2: {
    fontSize: wp("5.5%"),
    fontWeight: "bold",
    marginLeft: wp("5%"),
    marginBottom: hp("2%"),
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: wp("3%"),
    paddingHorizontal: wp("3%"),
    marginHorizontal: wp("5%"),
    marginBottom: hp("2%"),
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: wp("2%"),
    fontSize: wp("4%"),
  },
  categories: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    marginBottom: hp("2%"),
  },
  category: {
    backgroundColor: "#eee",
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("0.8%"),
    borderRadius: wp("5%"),
    marginRight: wp("2%"),
  },
  categoryActive: {
    backgroundColor: "red",
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("0.8%"),
    borderRadius: wp("5%"),
    marginRight: wp("2%"),
  },
  categoryText: {
    color: "#333",
    fontSize: wp("3.8%"),
  },
  categoryTextActive: {
    color: "#fff",
    fontSize: wp("3.8%"),
  },
  showAll: {
    marginLeft: "auto",
    color: "#555",
    fontSize: wp("3.5%"),
  },
  topHostelCard: {
    width: wp("40%"),
    marginRight: wp("4%"),
  },
  topHostelImage: {
    width: "100%",
    height: hp("15%"),
    borderRadius: wp("3%"),
    marginBottom: hp("1%"),
  },
  hostelName: {
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  hostelPrice: {
    fontSize: wp("3.5%"),
    color: "#333",
  },
  hostelRating: {
    fontSize: wp("3.5%"),
    color: "#777",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("2%"),
    paddingHorizontal: wp("5%"),
  },
  sectionTitle: {
    fontSize: wp("4.8%"),
    fontWeight: "bold",
  },
  nearbyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    padding: wp("3%"),
    marginHorizontal: wp("5%"),
    marginVertical: hp("1%"),
    borderRadius: wp("3%"),
  },
  nearbyImage: {
    width: wp("18%"),
    height: hp("9%"),
    borderRadius: wp("2%"),
  },
  nearbyName: {
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  nearbyLocation: {
    fontSize: wp("3.5%"),
    color: "#666",
  },
  nearbyPrice: {
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  iconSmall: {
    width: wp("5%"),
    height: wp("5%"),
    tintColor: "#000",
  },
});

