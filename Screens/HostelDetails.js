// Screens/HostelDetails.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function HostelDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const hostel = route.params?.hostel;
  const [saved, setSaved] = useState(false);

  if (!hostel) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hostel data provided.</Text>
        <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // single bookmark asset (make sure this file exists in ./assets/bookmark.png)
  const bookmarkIcon = require("../assets/bookmark.png");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: hp("14%") }} showsVerticalScrollIndicator={false}>
        {/* Top image */}
        <Image source={hostel.image} style={styles.topImage} />

        {/* Info card */}
        <View style={styles.infoCard}>
        

          <Text style={styles.name}>{hostel.name}</Text>
          {hostel.location ? <Text style={styles.location}>📍 {hostel.location}</Text> : null}

          <View style={styles.row}>
            <Text style={styles.rating}>⭐ {hostel.rating}</Text>
            <Text style={styles.reviews}> • 1231 Reviews</Text>
          </View>

          {/* Price */}
          

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {hostel.description ||
              "Comfortable rooms, clean mess, high-speed WiFi and 24/7 security. Ideal for students and working professionals."}
          </Text>

          <Text style={[styles.sectionTitle, { marginTop: hp("2%") }]}></Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryRow}>
            {[hostel.image, hostel.image, hostel.image].map((img, idx) => (
              <Image key={idx} source={img} style={styles.galleryImage} />
            ))}
            <View style={[styles.galleryImage, styles.moreBox]}>
              <Text style={styles.moreText}>+5</Text>
            </View>
          </ScrollView>

        </View>
      </ScrollView>

      {/* Sticky footer: left = Save (bookmark.png), right = Book Now */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveBtn, saved && styles.saveBtnActive]}
          onPress={() => {
            setSaved((s) => !s);
            Alert.alert(saved ? "Removed from saved" : "Saved", `${hostel.name} ${saved ? "removed" : "saved"}`);
          }}
          activeOpacity={0.8}
        >
          <Image source={bookmarkIcon} style={styles.saveIcon} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => {
            Alert.alert("Book Now", `Booking started for ${hostel.name}`);
          }}
          activeOpacity={0.9}
        >
          <Text style={styles.bookText}>Book now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topImage: { width: "100%", height: hp("34%") },
  infoCard: {
    backgroundColor: "#fff",
    marginTop: -hp("6%"),
    borderTopLeftRadius: wp("6%"),
    borderTopRightRadius: wp("6%"),
    padding: wp("5%"),
    minHeight: hp("50%"),
    elevation: 3,
  },


  name: { fontSize: wp("6%"), fontWeight: "700", marginBottom: hp("0.4%") },
  location: { color: "#666", marginBottom: hp("0.6%") },
  row: { flexDirection: "row", alignItems: "center", marginBottom: hp("0.6%") },
  rating: { color: "#f5a623", fontSize: wp("4%"), fontWeight: "600" },
  reviews: { color: "#666", fontSize: wp("3.6%") },
  price: { color: "red", fontSize: wp("5%"), fontWeight: "700", marginTop: hp("0.6%") },

  sectionTitle: { fontSize: wp("4.6%"), fontWeight: "600", marginTop: hp("1.2%") },
  description: { fontSize: wp("3.8%"), color: "#444", marginTop: hp("0.6%"), lineHeight: hp("2.5%") },

  galleryRow: { marginTop: hp("1%"), marginBottom: hp("1%") },
  galleryImage: { width: wp("28%"), height: hp("14%"), borderRadius: wp("2%"), marginRight: wp("3%") },
  moreBox: { backgroundColor: "#e0e0e0", alignItems: "center", justifyContent: "center" },
  moreText: { fontSize: wp("5%"), fontWeight: "700", color: "#444" },



  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: hp("10%"),
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
  },

  // Save button (matches screenshot)
  saveBtn: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("6%"),
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("4%"),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  saveBtnActive: {
    borderColor: "red",
    backgroundColor: "#fff0f0",
  },
  saveIcon: {
    width: wp("6%"),
    height: wp("6%"),
  },

  bookBtn: {
    flex: 1,
    backgroundColor: "red",
    paddingVertical: hp("1.6%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    justifyContent: "center",
  },
  bookText: { color: "#fff", fontSize: wp("4.6%"), fontWeight: "700" },

  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { fontSize: wp("4%"), marginBottom: hp("2%") },
  goBackBtn: { backgroundColor: "red", padding: 12, borderRadius: 8 },
  goBackText: { color: "#fff" },
});
