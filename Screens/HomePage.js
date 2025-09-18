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
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import FilterModal from "./FilterModal"; // ✅ import modal
import * as Location from "expo-location";

// ✅ Haversine formula to calculate distance in km
const haversineDistance = (coords1, coords2) => {
  if (!coords1 || !coords2) return 0;

  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);
  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1) *
      Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
export default function HomePage() {
  const navigation = useNavigation();

  const [allHostels, setAllHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("Fetching location...");
  const [selectedCategory, setSelectedCategory] = useState("boys");
  const [showAllTop, setShowAllTop] = useState(false);
  const [nearbyHostels, setNearbyHostels] = useState([]);
  const [showAllNearby, setShowAllNearby] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  // Fetch hostels from backend
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await fetch("http://192.168.1.5:5000/api/hostel");
        const data = await response.json();

        // Normalize type → category
        const normalized = data.map((h) => ({
          ...h,
          category: h.type?.toLowerCase() === "co-live" ? "coliving" : h.type?.toLowerCase(),
        }));

        setAllHostels(normalized);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hostels:", error);
        setLoading(false);
      }
    };
    fetchHostels();
  }, []);

  // Get user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Enable location permissions in settings.");
        setAddress("Permission Denied");
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({ lat: currentLocation.coords.latitude, lng: currentLocation.coords.longitude });

        let geocode = await Location.reverseGeocodeAsync(currentLocation.coords);
        if (geocode.length > 0) {
          const { name, street, subregion, district, city, region } = geocode[0];
          let formattedAddress = `${name || street || subregion || district}, ${city || region}`;
          setAddress(formattedAddress);
        }
      } catch (error) {
        console.log("Error fetching location:", error);
        setAddress("Unable to fetch location");
      }
    })();
  }, []);

  // Sort nearby hostels dynamically
  useEffect(() => {
    if (location && allHostels.length > 0) {
      const sorted = [...allHostels].sort((a, b) => {
        if (!a.coords || !b.coords) return 0;
        return haversineDistance(location, a.coords) - haversineDistance(location, b.coords);
      });
      setNearbyHostels(sorted);
    }
  }, [location, allHostels]);

  // Categorize hostels
  const hostelsByCategory = {
    boys: allHostels.filter((h) => h.category === "boys"),
    girls: allHostels.filter((h) => h.category === "girls"),
    coliving: allHostels.filter((h) => h.category === "coliving"),
  };

  const displayedHostels = showAllTop
    ? hostelsByCategory[selectedCategory]
    : hostelsByCategory[selectedCategory].slice(0, 2);

  const displayedNearby = showAllNearby ? nearbyHostels : nearbyHostels.slice(0, 3);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0066FF" />
        <Text>Loading hostels...</Text>
      </View>
    );
  }

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
          {["boys", "girls", "coliving"].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={selectedCategory === cat ? styles.categoryActive : styles.category}
              onPress={() => { setSelectedCategory(cat); setShowAllTop(false); }}
            >
              <Text style={selectedCategory === cat ? styles.categoryTextActive : styles.categoryText}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setShowAllTop(!showAllTop)}>
            <Text style={styles.showAll1}>{showAllTop ? "Show less" : "Show all"}</Text>
          </TouchableOpacity>
        </View>

        {/* Top Hostels */}
        <FlatList
          data={displayedHostels}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: wp("4%") }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.topHostelCard}
              onPress={() => navigation.navigate("HostelDetails", { hostel: item })}
              activeOpacity={0.9}
            >
              {item.images[0] ? (
                <Image source={{ uri: item.images[0] }} style={styles.topHostelImage} />
              ) : (
                <Image source={require("../assets/hostel1.png")} style={styles.topHostelImage} />
              )}
              <View style={styles.overlay}>
                <Text style={styles.overlayName}>{item.name}</Text>
                <Text style={styles.overlayPrice}>₹{item.roomRent}</Text>
                 <Text style={styles.overlayRating}>⭐ {item.rating}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Nearby Services Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Services</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: wp("5%"), marginTop: hp("1%") }}
        >
          {[
            { name: "Food Court", icon: require("../assets/food.png") },
            { name: "Gym", icon: require("../assets/gym.png") },
            { name: "Park", icon: require("../assets/park.png") },
            { name: "Stationary", icon: require("../assets/stationary.png") },
          ].map((service, index) => (
            <TouchableOpacity key={index} style={styles.serviceCard}>
              <Image source={service.icon} style={styles.serviceIcon} />
              <Text style={styles.serviceText}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Nearby Hostels */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hostels Nearby</Text>
          <TouchableOpacity onPress={() => setShowAllNearby(!showAllNearby)}>
            <Text style={styles.showAll}>{showAllNearby ? "Show less" : "Show all"}</Text>
          </TouchableOpacity>
        </View>

        {displayedNearby.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.nearbyCard}
            onPress={() => navigation.navigate("HostelDetails", { hostel: item })}
            activeOpacity={0.9}
          >
            {item.images[0] ? (
              <Image source={{ uri: item.images[0] }} style={styles.nearbyImage} />
            ) : (
              <Image source={require("../assets/hostel1.png")} style={styles.nearbyImage} />
            )}
            <View style={{ flex: 1, marginLeft: wp("3%") }}>
              <Text style={styles.nearbyName}>{item.name}</Text>
              <Text style={styles.nearbyLocation}>{item.address}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.nearbyPrice}>₹{item.roomRent}</Text>
               <Text style={styles.overlayRating}>⭐ {item.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navbar */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
          <Image source={require("../assets/home.png")} style={[styles.footerIcon, { tintColor: "#000" }]} />
        </TouchableOpacity>
      <TouchableOpacity
  onPress={() => {
    if (allHostels.length > 0) {
      const hostelsByCategory = {
        boys: allHostels.filter((h) => h.category === "boys"),
        girls: allHostels.filter((h) => h.category === "girls"),
        coliving: allHostels.filter((h) => h.category === "coliving"),
      };

      navigation.navigate("SearchPage", { hostelsData: hostelsByCategory });
    } else {
      Alert.alert("Hostels are still loading...");
    }
  }}
>
  <Image source={require("../assets/Search.png")} style={styles.footerIcon} />
</TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Bookings")}>
          <Image source={require("../assets/document.png")} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image source={require("../assets/user.png")} style={styles.footerIcon} />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
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
