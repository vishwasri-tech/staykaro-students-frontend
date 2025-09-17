import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import FilterModal from "./FilterModal"; // ✅ import modal
import * as Location from "expo-location";

export default function HomePage() {
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("Fetching location...");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Enable location permissions in settings."
        );
        setAddress("Permission Denied");
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);

        let geocode = await Location.reverseGeocodeAsync(
          currentLocation.coords
        );
        if (geocode.length > 0) {
          const { name, street, subregion, district, city, region } =
            geocode[0];

          let formattedAddress = `${
            name || street || subregion || district
          }, ${city || region}`;
          setAddress(formattedAddress);
        }
      } catch (error) {
        console.log("Error fetching location:", error);
        setAddress("Unable to fetch location");
      }
    })();
  }, []);

  // ✅ Updated with 2 more hostels per category
  const hostelsData = {
    boys: [
      { id: "1", name: "Classic Hostel", price: "₹5800.00", rating: 4.8, image: require("../assets/cl1.png") },
      { id: "2", name: "French Hostel", price: "₹5500.00", rating: 4.8, image: require("../assets/hostel2.png") },
      { id: "3", name: "Elite Hostel", price: "₹6000.00", rating: 4.7, image: require("../assets/hostel3.png") },
      { id: "14", name: "Skyline Hostel", price: "₹5900.00", rating: 4.6, image: require("../assets/gh6.png") },
      { id: "15", name: "Heritage Boys Hostel", price: "₹6100.00", rating: 4.9, image: require("../assets/gh7.png") },
      { id: "20", name: "City Pride Hostel", price: "₹5700.00", rating: 4.7, image: require("../assets/gh3.png") },
      { id: "21", name: "GreenView Boys Hostel", price: "₹6000.00", rating: 4.8, image: require("../assets/gh6.png") },
    ],
    girls: [
      { id: "4", name: "Grace Hostel", price: "₹5000.00", rating: 4.6, image: require("../assets/boys1.png") },
      { id: "5", name: "Queen Hostel", price: "₹5200.00", rating: 4.9, image: require("../assets/boys2.png") },
      { id: "6", name: "Elite Girls Hostel", price: "₹5300.00", rating: 4.7, image: require("../assets/boys3.png") },
      { id: "16", name: "Lotus Girls Hostel", price: "₹5400.00", rating: 4.8, image: require("../assets/gh5.png") },
      { id: "17", name: "Pearl Residency", price: "₹5600.00", rating: 4.7, image: require("../assets/gh3.png") },
      { id: "22", name: "Sunshine Girls Hostel", price: "₹5500.00", rating: 4.8, image: require("../assets/gh6.png") },
      { id: "23", name: "Meadow Residency", price: "₹5700.00", rating: 4.6, image: require("../assets/gh7.png") },
    ],
    coliving: [
      { id: "7", name: "Modern Living", price: "₹6200.00", rating: 4.9, image: require("../assets/hostel1.png") },
      { id: "8", name: "Shared Space", price: "₹5800.00", rating: 4.5, image: require("../assets/hostel2.png") },
      { id: "9", name: "Open Stay", price: "₹6000.00", rating: 4.8, image: require("../assets/hostel3.png") },
      { id: "18", name: "Urban Nest", price: "₹6400.00", rating: 4.9, image: require("../assets/gh6.png") },
      { id: "19", name: "Hive Living", price: "₹6150.00", rating: 4.6, image: require("../assets/gh7.png") },
      { id: "24", name: "Community Hub", price: "₹6300.00", rating: 4.8, image: require("../assets/gh3.png") },
      { id: "25", name: "Nest Living", price: "₹6100.00", rating: 4.7, image: require("../assets/gh5.png") },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState("boys");
  const [showAllTop, setShowAllTop] = useState(false);

  const displayedHostels = showAllTop
    ? hostelsData[selectedCategory]
    : hostelsData[selectedCategory].slice(0, 2);

  // ✅ Nearby Hostels Updated (Added 2 more)
  const nearbyHostels = [
    { id: "10", name: "Sri Sai Hostel", location: "Begumpet, Hyd", price: "₹4800.00", rating: 4.8, image: require("../assets/gh3.png") },
    { id: "11", name: "Shanthi Hostel", location: "Ameerpet, Hyd", price: "₹5300.00", rating: 4.8, image: require("../assets/gh5.png") },
    { id: "12", name: "BlueSky Hostel", location: "Madhapur, Hyd", price: "₹5000.00", rating: 4.6, image: require("../assets/gh6.png") },
    { id: "13", name: "Sunrise Hostel", location: "Kukatpally, Hyd", price: "₹5500.00", rating: 4.7, image: require("../assets/gh7.png") },
    { id: "26", name: "LakeView Hostel", location: "Gachibowli, Hyd", price: "₹5600.00", rating: 4.9, image: require("../assets/boys4.png") },
    { id: "27", name: "Harmony Hostel", location: "Secunderabad, Hyd", price: "₹5200.00", rating: 4.7, image: require("../assets/boys5.png") },
  ];

  // ✅ Show 3 nearby by default
  const [showAllNearby, setShowAllNearby] = useState(false);
  const displayedNearby = showAllNearby ? nearbyHostels : nearbyHostels.slice(0, 3);

  const [filterVisible, setFilterVisible] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.locationContainer}>
            <Image source={require("../assets/location.png")} style={styles.iconSmall} />
            <Text style={styles.locationText}>{address}</Text>
            <Image source={require("../assets/down-arrow.png")} style={[styles.iconSmall, { marginLeft: wp("2%") }]} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../assets/Bell.png")} style={styles.iconSmall} />
          </TouchableOpacity>
        </View>

        {/* Heading */}
        <Text style={styles.heading1}>Discover your</Text>
        <Text style={styles.heading2}>perfect place to stay</Text>

        {/* Categories */}
        <View style={styles.categories}>
          <TouchableOpacity
            style={selectedCategory === "boys" ? styles.categoryActive : styles.category}
            onPress={() => { setSelectedCategory("boys"); setShowAllTop(false); }}
          >
            <Text style={selectedCategory === "boys" ? styles.categoryTextActive : styles.categoryText}>Boys</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedCategory === "girls" ? styles.categoryActive : styles.category}
            onPress={() => { setSelectedCategory("girls"); setShowAllTop(false); }}
          >
            <Text style={selectedCategory === "girls" ? styles.categoryTextActive : styles.categoryText}>Girls</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedCategory === "coliving" ? styles.categoryActive : styles.category}
            onPress={() => { setSelectedCategory("coliving"); setShowAllTop(false); }}
          >
            <Text style={selectedCategory === "coliving" ? styles.categoryTextActive : styles.categoryText}>Co-living</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowAllTop(!showAllTop)}>
            <Text style={styles.showAll1}>{showAllTop ? "Show less" : "Show all"}</Text>
          </TouchableOpacity>
        </View>

        {/* Top Hostels */}
        <FlatList
          data={displayedHostels}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: wp("4%") }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.topHostelCard}
              onPress={() => navigation.navigate("HostelDetails", { hostel: item })}
              activeOpacity={0.9}
            >
              <Image source={item.image} style={styles.topHostelImage} />
              <View style={styles.overlay}>
                <Text style={styles.overlayName}>{item.name}</Text>
                <Text style={styles.overlayPrice}>{item.price}</Text>
                <Text style={styles.overlayRating}>⭐ {item.rating}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* ✅ Nearby Services Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Services</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: wp("5%"), marginTop: hp("1%") }}
        >
          <TouchableOpacity style={styles.serviceCard}>
            <Image source={require("../assets/food.png")} style={styles.serviceIcon} />
            <Text style={styles.serviceText}>Food Court</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceCard}>
            <Image source={require("../assets/gym.png")} style={styles.serviceIcon} />
            <Text style={styles.serviceText}>Gym</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceCard}>
            <Image source={require("../assets/park.png")} style={styles.serviceIcon} />
            <Text style={styles.serviceText}>Park</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceCard}>
            <Image source={require("../assets/stationary.png")} style={styles.serviceIcon} />
            <Text style={styles.serviceText}>Stationary</Text>
          </TouchableOpacity>

        
        </ScrollView>

        {/* Hostels Nearby */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hostels Nearby</Text>
          <TouchableOpacity onPress={() => setShowAllNearby(!showAllNearby)}>
            <Text style={styles.showAll}>{showAllNearby ? "Show less" : "Show all"}</Text>
          </TouchableOpacity>
        </View>

        {displayedNearby.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.nearbyCard}
            onPress={() => navigation.navigate("HostelDetails", { hostel: item })}
            activeOpacity={0.9}
          >
            <Image source={item.image} style={styles.nearbyImage} />
            <View style={{ flex: 1, marginLeft: wp("3%") }}>
              <Text style={styles.nearbyName}>{item.name}</Text>
              <Text style={styles.nearbyLocation}>{item.location}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.nearbyPrice}>{item.price}</Text>
              <Text style={styles.hostelRating}>⭐ {item.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ✅ Bottom Navbar Fixed */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
          <Image
            source={require("../assets/home.png")}
            style={[styles.footerIcon, { tintColor: "#000" }]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SearchPage", { hostelsData })}>
          <Image
            source={require("../assets/Search.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Bookings")}>
          <Image
            source={require("../assets/document.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../assets/user.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>
      </View>

      {/* ✅ Filter Modal */}
      <FilterModal visible={filterVisible} onClose={() => setFilterVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: hp("4%"),
    marginBottom: hp("8%"),
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
    backgroundColor: "#f5f5f5",
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1.9%"),
    borderRadius: wp("10%"),
  },
  locationText: {
    fontSize: wp("3.8%"),
    marginLeft: wp("2%"),
    color: "#333",
  },
  heading1: {
    fontSize: wp("4.5%"),
    color: "#555",
    marginLeft: wp("5%"),
    lineHeight: hp("4%"),
  },
  heading2: {
    fontSize: wp("5.5%"),
    fontWeight: "bold",
    marginLeft: wp("5%"),
    marginBottom: hp("2%"),
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
  showAll1: {
    marginLeft: "30%",
    color: "#555",
    fontSize: wp("4%"),
  },
  topHostelCard: {
    width: wp("45%"),
    height: hp("22%"),
    marginRight: wp("4%"),
    borderRadius: wp("3%"),
    overflow: "hidden",
  },
  topHostelImage: {
    width: "100%",
    height: "100%",
    borderRadius: wp("3%"),
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: wp("2%"),
  },
  overlayName: {
    color: "#fff",
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  overlayPrice: {
    color: "#fff",
    fontSize: wp("3.5%"),
  },
  overlayRating: {
    color: "#fff",
    fontSize: wp("3.5%"),
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
    fontSize: wp("3.8%"),
    fontWeight: "bold",
  },
  hostelRating: {
    fontSize: wp("3.5%"),
    color: "#555",
  },
  showAll: {
    color: "#555",
    fontSize: wp("4%"),
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: hp("8%"),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    elevation: 10,
  },
  footerIcon: {
    width: wp("7%"),
    height: wp("7%"),
    resizeMode: "contain",
  },
  iconSmall: {
    width: wp("5%"),
    height: wp("5%"),
    resizeMode: "contain",
  },

  // ✅ New Styles for Nearby Services
  serviceCard: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("5%"),
    backgroundColor: "#f9f9f9",
    borderRadius: wp("3%"),
    padding: wp("3%"),
    width: wp("22%"),
  },
  serviceIcon: {
    width: wp("10%"),
    height: wp("10%"),
    resizeMode: "contain",
    marginBottom: hp("0.5%"),
  },
  serviceText: {
    fontSize: wp("3.5%"),
    color: "#333",
    textAlign: "center",
  },
});
