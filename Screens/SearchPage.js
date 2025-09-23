import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider"; // ✅ Slider for budget & distance
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function SearchPage() {
  const navigation = useNavigation();
  const route = useRoute();

   const { hostelsData = { boys: [], girls: [], coliving: [] } } = route.params || {};

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("boys");
  const [hostels, setHostels] = useState(hostelsData[selectedCategory] || []);
  const [filterVisible, setFilterVisible] = useState(false); // ✅ controls popup
  const [budget, setBudget] = useState(6999);
  const [distance, setDistance] = useState(10);

  const [filters, setFilters] = useState({
    wifi: false,
    ac: false,
    gym: false,
    fridge: false,
    hotwater: false,
    washingmachine: false,
  });


  const toggleFilter = (key) => {
    setFilters({ ...filters, [key]: !filters[key] });
  };
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setHostels(hostelsData[cat] || []);
  };
     const applyFilters = async () => {
    try {
      const res = await fetch("http://192.168.1.2:5000/api/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget,
          distance,
          facilities: filters,
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Filter by category after backend filter
        const categoryFiltered = data.data.filter(
          (item) => item.category === selectedCategory
        );
        setHostels(categoryFiltered);
        setFilterVisible(false);
      } else {
        Alert.alert("Error", "Failed to fetch filtered hostels");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  // Filter by search text
  const filteredData = hostels.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search hostel"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        {/* Filter Icon */}
        <TouchableOpacity onPress={() => setFilterVisible(true)}>
          <Image
            source={require("../assets/filter.png")}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>

      {/* 🏷 Categories */}
      <View style={styles.categories}>
        {["boys", "girls", "coliving"].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={
              selectedCategory === cat ? styles.categoryActive : styles.category
            }
            onPress={() => handleCategoryChange(cat)}
          >
            <Text
              style={
                selectedCategory === cat
                  ? styles.categoryTextActive
                  : styles.categoryText
              }
            >
              {cat === "boys"
                ? "Boys Hostels"
                : cat === "girls"
                ? "Girls Hostels"
                : "Co-living"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🏠 Hostel List */}
      <FlatList
  data={filteredData}
  keyExtractor={(item, index) => item.id?.toString() || index.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.hostelCard}
      onPress={() =>
        navigation.navigate("HostelDetails", { hostel: item })
      }
    >
      <Image
        source={
          item.images && item.images[0]
            ? { uri: item.images[0] }
            : require("../assets/hostel1.png")
        }
        style={styles.hostelImage}
      />
      <View style={{ flex: 1, marginLeft: wp("3%") }}>
        <Text style={styles.hostelName}>{item.name}</Text>
        {item.address && (
          <Text style={styles.hostelLocation}>{item.address}</Text>
        )}
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.hostelPrice}>
          ₹{item.roomRent || item.price || item.rent || item.monthlyRent || "N/A"}
        </Text>
        <Text style={styles.hostelRating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  )}
/>

      {/* ✅ Filter Popup Modal */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterVisible(false)}
      >
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setFilterVisible(false)}
        />

        {/* Popup */}
        <View style={styles.popupContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Apply Button */}
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>

            {/* Budget Section */}
            <Text style={styles.sectionTitle}>Budget</Text>
            <View style={styles.sliderContainer}>
              <Slider
                style={{ width: "100%", height: 40 }}
                minimumValue={3999}
                maximumValue={15999}
                step={500}
                value={budget}
                onValueChange={setBudget}
                minimumTrackTintColor="red"
                maximumTrackTintColor="#ccc"
                thumbTintColor="red"
              />
              <View style={styles.sliderLabels}>
                <Text>₹ 3999</Text>
                <Text>₹ {budget}</Text>
                <Text>₹ 15999</Text>
              </View>
            </View>

            {/* Amenities Section */}
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              <View style={styles.amenityColumn}>
                <TouchableOpacity onPress={() => toggleFilter("wifi")}>
                  <Text>{filters.wifi ? "✅ Wifi" : "⬜ Wifi"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFilter("ac")}>
                  <Text>{filters.ac ? "✅ AC" : "⬜ AC"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFilter("gym")}>
                  <Text>{filters.gym ? "✅ Gym" : "⬜ Gym"}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.amenityColumn}>
                <TouchableOpacity onPress={() => toggleFilter("fridge")}>
                  <Text>{filters.fridge ? "✅ Fridge" : "⬜ Fridge"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFilter("hotwater")}>
                  <Text>
                    {filters.hotwater ? "✅ Hot water" : "⬜ Hot water"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleFilter("washingmachine")}
                >
                  <Text>
                    {filters.washingmachine
                      ? "✅ Washing Machine"
                      : "⬜ Washing Machine"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Distance Section */}
            <Text style={styles.sectionTitle}>Distance</Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={2}
              maximumValue={12}
              step={1}
              value={distance}
              onValueChange={setDistance}
              minimumTrackTintColor="red"
              maximumTrackTintColor="#ccc"
              thumbTintColor="red"
            />
            <View style={styles.sliderLabels}>
              <Text>2 km</Text>
              <Text>{distance} km</Text>
              <Text>12 km</Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: wp("4%") },

  /* Search Bar */
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: wp("10%"),
    paddingHorizontal: wp("4%"),
    marginTop: hp("5%"),
    marginBottom: hp("2%"),
  },
  searchInput: {
    flex: 1,
    fontSize: wp("4%"),
    paddingVertical: hp("1%"),
  },
  filterIcon: {
    width: wp("6%"),
    height: wp("6%"),
    marginLeft: wp("2%"),
    tintColor: "#333",
  },

  /* Categories */
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("2%"),
  },
  category: {
    backgroundColor: "#eee",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("1%"),
    borderRadius: wp("5%"),
  },
  categoryActive: {
    backgroundColor: "red",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("1%"),
    borderRadius: wp("5%"),
  },
  categoryText: { color: "#333", fontSize: wp("3.8%") },
  categoryTextActive: { color: "#fff", fontSize: wp("3.8%") },

  /* Hostel Card */
  hostelCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp("3%"),
    marginVertical: hp("1%"),
    borderRadius: wp("3%"),
    backgroundColor: "#fff",
    elevation: 2,
  },
  hostelImage: {
    width: wp("18%"),
    height: hp("9%"),
    borderRadius: wp("2%"),
  },
  hostelName: { fontSize: wp("4%"), fontWeight: "600" },
  hostelLocation: { fontSize: wp("3.5%"), color: "#666" },
  hostelPrice: { fontSize: wp("4%"), fontWeight: "600" },
  hostelRating: { fontSize: wp("3.5%"), color: "#777" },

  /* Popup Modal */
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  popupContainer: {
    position: "absolute",
    top: hp("10%"),
    left: wp("5%"),
    right: wp("5%"),
    backgroundColor: "#fff",
    borderRadius: wp("4%"),
    padding: wp("5%"),
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    maxHeight: hp("70%"),
  },
  applyButton: {
    backgroundColor: "red",
    paddingVertical: hp("1.5%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    marginBottom: hp("2%"),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp("4%"),
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: wp("4%"),
    marginBottom: hp("1%"),
    marginTop: hp("1%"),
  },
  sliderContainer: {
    marginBottom: hp("2%"),
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("0.5%"),
  },
  amenitiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp("2%"),
  },
  amenityColumn: {
    flexDirection: "column",
    gap: hp("1%"),
  },
});
