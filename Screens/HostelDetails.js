// Screens/HostelDetails.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

export default function HostelDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const hostel = route.params?.hostel;
  const [saved, setSaved] = useState(false);

  // modal viewer state
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const scrollRef = useRef(null);

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

  // assets
  const bookmarkIcon = require("../assets/bookmark.png");
  const locFrame = require("../assets/locframe.png"); // circular frame icon (kept on right)
  const locPin = require("../assets/location.png"); // inline pin icon (left of location text)

  // gallery data fallback
  const gallery = Array.isArray(hostel.gallery) && hostel.gallery.length > 0
    ? hostel.gallery
    : [hostel.image, hostel.image, hostel.image, hostel.image, hostel.image];

  const THUMB_COUNT = 4;

  function openViewer(index = 0) {
    setViewerIndex(index);
    setViewerVisible(true);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ x: WINDOW_WIDTH * index, animated: false });
      }
    }, 50);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: hp("16%") }} showsVerticalScrollIndicator={false}>
        {/* Top image (hero) */}
        <Image source={hostel.image} style={styles.topImage} />

        {/* Info card */}
        <View style={styles.infoCard}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{hostel.name}</Text>

              {/* Inline location: pin icon + text */}
              <View style={styles.locationInline}>
                <Image source={locPin} style={styles.locIconSmall} />
                <Text style={styles.locationText}>{hostel.location ?? "Begumpet, Hyderabad"}</Text>
              </View>

              {/* rating */}
              <View style={styles.ratingRow}>
                <View style={styles.starsRow}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Text
                      key={i}
                      style={[
                        styles.star,
                        i < Math.round(hostel.rating) ? styles.starActive : styles.starInactive,
                      ]}
                    >
                      ★
                    </Text>
                  ))}
                </View>
                <Text style={styles.ratingNumber}>{hostel.rating}</Text>
                <Text style={styles.reviews}> · 1231 Reviews</Text>
              </View>
            </View>

            {/* circular right icon (optional) */}
            <TouchableOpacity style={styles.avatarBtn} activeOpacity={0.9}>
              <Image source={locFrame} style={styles.avatarImage} />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description} numberOfLines={3}>
            {hostel.description ||
              "Hostel means a residential facility designed to provide accommodation to students or individuals, consisting of rooms, common areas."}
          </Text>
          <TouchableOpacity onPress={() => Alert.alert("Read more", hostel.description || "No more text")}>
            <Text style={styles.readMore}>Read more</Text>
          </TouchableOpacity>

          {/* Gallery */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryRow}>
            {gallery.slice(0, THUMB_COUNT).map((img, idx) => {
              const isLastShown = idx === THUMB_COUNT - 1 && gallery.length > THUMB_COUNT;
              return (
                <TouchableOpacity key={idx} activeOpacity={0.85} onPress={() => openViewer(idx)}>
                  <Image source={img} style={styles.galleryImage} />
                  {isLastShown && (
                    <View style={styles.moreOverlay}>
                      <Text style={styles.moreOverlayText}>+{gallery.length - THUMB_COUNT}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveBtn, saved && styles.saveBtnActive]}
          onPress={() => {
            setSaved((s) => !s);
            Alert.alert(saved ? "Removed from saved" : "Saved", `${hostel.name} ${saved ? "removed" : "saved"}`);
          }}
          activeOpacity={0.85}
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

      {/* Viewer modal */}
      <Modal visible={viewerVisible} animationType="fade" transparent={false}>
        <SafeAreaView style={viewerStyles.modalContainer}>
          <View style={viewerStyles.topBar}>
            <TouchableOpacity onPress={() => setViewerVisible(false)} style={viewerStyles.closeBtn}>
              <Text style={viewerStyles.closeTxt}>Close</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            pagingEnabled
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            contentOffset={{ x: WINDOW_WIDTH * viewerIndex, y: 0 }}
          >
            {gallery.map((img, i) => (
              <View style={{ width: WINDOW_WIDTH, alignItems: "center", justifyContent: "center" }} key={i}>
                <Image source={img} style={viewerStyles.fullImage} resizeMode="contain" />
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#efefef" },
  topImage: { width: "100%", height: hp("34%") },
  infoCard: {
    backgroundColor: "#fff",
    marginTop: -hp("4%"),
    marginHorizontal: wp("3%"),
    borderRadius: wp("6%"),
    padding: wp("5%"),
    minHeight: hp("52%"),
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 30,
    overflow: "hidden",
  },

  headerRow: { flexDirection: "row", alignItems: "center" },
  name: { fontSize: wp("6.4%"), fontWeight: "800", color: "#0b0b0b", marginBottom: hp("0.3%") },

  /* inline location: pin icon + text */
  locationInline: { flexDirection: "row", alignItems: "center", marginBottom: hp("0.6%") },
  locIconSmall: { width: wp("4.2%"), height: wp("4.2%"), resizeMode: "contain", tintColor: "#9b9b9b", marginRight: wp("2%") },
  locationText: { color: "#9b9b9b", fontSize: wp("3.8%") },

  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: hp("0.4%") },
  starsRow: { flexDirection: "row" },
  star: { fontSize: wp("4%"), marginRight: wp("0.6%") },
  starActive: { color: "#ffb400" },
  starInactive: { color: "#e6e6e6" },
  ratingNumber: { fontSize: wp("3.8%"), fontWeight: "700", marginLeft: wp("2%") },
  reviews: { color: "#9b9b9b", fontSize: wp("3.6%"), marginLeft: wp("2%") },

 

  avatarImage: { width: wp("12%"), height: wp("12%"), resizeMode: "contain" },

  sectionTitle: { fontSize: wp("4.8%"), fontWeight: "700", marginTop: hp("2%"), marginBottom: hp("1%") },
  description: { fontSize: wp("3.8%"), color: "#444", lineHeight: hp("2.6%") },
  readMore: { color: "#0b76ff", marginTop: hp("1%"), fontWeight: "700" },

  galleryRow: { marginTop: hp("2%"), marginBottom: hp("2%") },
  galleryImage: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("3.5%"),
    marginRight: wp("3%"),
  },
  moreOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("3.5%"),
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  moreOverlayText: { color: "#fff", fontWeight: "800", fontSize: wp("5%") },

  footer: {
    position: "absolute",
    bottom: hp("5%"),
    left: wp("4%"),
    right: wp("4%"),
    height: hp("9%"),
    flexDirection: "row",
    alignItems: "center",
  },

  saveBtn: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("6%"),
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("4%"),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  saveBtnActive: { borderColor: "#ff0b2d", backgroundColor: "#fff6f6" },
  saveIcon: { width: wp("6%"), height: wp("6%") },

  bookBtn: {
    flex: 1,
    backgroundColor: "#ff0b2d",
    paddingVertical: hp("1.2%"),
    borderRadius: wp("6%"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 8,
  },
  bookText: { color: "#fff", fontSize: wp("4.6%"), fontWeight: "800" },

  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { fontSize: wp("4%"), marginBottom: hp("2%") },
  goBackBtn: { backgroundColor: "#ff0b2d", padding: 12, borderRadius: 8 },
  goBackText: { color: "#fff" },
});

/* Viewer modal styles */
const viewerStyles = StyleSheet.create({
  modalContainer: { flex: 1, backgroundColor: "#000" },
  topBar: {
    height: hp("8%"),
    justifyContent: "center",
    paddingHorizontal: wp("4%"),
  },
  closeBtn: { alignSelf: "flex-end", padding: 8 },
  closeTxt: { color: "#fff", fontSize: wp("4%"), fontWeight: "700" },
  fullImage: { width: WINDOW_WIDTH, height: hp("80%") },
});
