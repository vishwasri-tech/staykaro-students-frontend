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
  Modal,
  Dimensions,
  SafeAreaView,
  ToastAndroid,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, useRoute } from "@react-navigation/native";
import ImageViewing from "react-native-image-viewing";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

export default function HostelDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const hostel = route.params?.hostel;
  const [saved, setSaved] = useState(false);

  // modal viewer state
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  // select sharing modal
  const [sharingVisible, setSharingVisible] = useState(false);
  const [selectedSharing, setSelectedSharing] = useState(null);

  if (!hostel) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hostel data provided.</Text>
        <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // assets
  const bookmarkIcon = require("../assets/bookmark.png");
  const locPin = require("../assets/location.png");

  // gallery data fallback
  const gallery =
    Array.isArray(hostel.gallery) && hostel.gallery.length > 0
      ? hostel.gallery
      : [hostel.image, hostel.image, hostel.image, hostel.image, hostel.image];

  // format for ImageViewing
  const galleryImages = gallery.map((img) =>
    typeof img === "number" ? img : { uri: img }
  );

  const THUMB_COUNT = 4;

  function openViewer(index = 0) {
    setViewerIndex(index);
    setViewerVisible(true);
  }

  // sharing options list
  const sharingOptions = [
    { id: 1, label: "Single Sharing", price: 7500, status: "available" },
    { id: 2, label: "2 Sharing", price: 5800, status: "few" },
    { id: 3, label: "3 Sharing", price: 4500, status: "available" },
    { id: 4, label: "4 Sharing", price: 4000, status: "available" },
    { id: 5, label: "5 Sharing", price: 3500, status: "full" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: hp("20%") }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top image with save button */}
        <View>
          <TouchableOpacity activeOpacity={0.9} onPress={() => openViewer(0)}>
            <Image source={hostel.image} style={styles.topImage} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveBtnTop}
            onPress={() => {
              setSaved((s) => !s);
              Alert.alert(
                saved ? "Removed from saved" : "Saved",
                `${hostel.name} ${saved ? "removed" : "saved"}`
              );
            }}
            activeOpacity={0.85}
          >
            <Image
              source={bookmarkIcon}
              style={styles.saveIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Info card */}
        <View style={styles.infoCard}>
          <Text style={styles.name}>{hostel.name}</Text>

          <View style={styles.locationInline}>
            <Image source={locPin} style={styles.locIconSmall} />
            <Text style={styles.locationText}>
              {hostel.location ?? "Begumpet, Hyderabad"}
            </Text>
          </View>

          {/* rating */}
          <View style={styles.ratingRow}>
            <View style={styles.starsRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Text
                  key={i}
                  style={[
                    styles.star,
                    i < Math.round(hostel.rating)
                      ? styles.starActive
                      : styles.starInactive,
                  ]}
                >
                  ★
                </Text>
              ))}
            </View>
            <Text style={styles.ratingNumber}>{hostel.rating}</Text>
            <Text style={styles.reviews}> · 1231 Reviews</Text>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description} numberOfLines={3}>
            {hostel.description ||
              "Hostel means a residential facility designed to provide accommodation to students or individuals, consisting of rooms, common areas."}
          </Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert("Read more", hostel.description || "No more text")
            }
          >
            <Text style={styles.readMore}>Read more</Text>
          </TouchableOpacity>

          {/* Gallery */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.galleryRow}
          >
            {gallery.slice(0, THUMB_COUNT).map((img, idx) => {
              const isLastShown =
                idx === THUMB_COUNT - 1 && gallery.length > THUMB_COUNT;
              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.85}
                  onPress={() => openViewer(idx)}
                >
                  <Image source={img} style={styles.galleryImage} />
                  {isLastShown && (
                    <View style={styles.moreOverlay}>
                      <Text style={styles.moreOverlayText}>
                        +{gallery.length - THUMB_COUNT}
                      </Text>
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
        <View style={{ flex: 1 }}>
          {selectedSharing && (
            <View style={styles.selectedRow}>
              <Text style={styles.selectedCheck}>✅</Text>
              <Text style={styles.selectedText}>
                Selected {selectedSharing.label} – ₹{selectedSharing.price}
              </Text>
            </View>
          )}

          <View style={styles.footerBtns}>
            <TouchableOpacity
              style={styles.selectBtn}
              onPress={() => setSharingVisible(true)}
            >
              <Text style={styles.selectText}>
                {selectedSharing ? "Change Sharing" : "Select Sharing"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.bookBtn,
                !selectedSharing || selectedSharing.status === "full"
                  ? { backgroundColor: "#ccc" }
                  : {},
              ]}
              disabled={!selectedSharing || selectedSharing.status === "full"}
              onPress={() => {
                Alert.alert(
                  "Booking Confirmed",
                  `You selected ${selectedSharing.label} – ₹${selectedSharing.price}`
                );
                setSelectedSharing(null);
              }}
            >
              <Text style={styles.bookText}>Book now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Sharing Modal */}
      <Modal visible={sharingVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {sharingOptions.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.optionRow,
                  selectedSharing?.id === opt.id && styles.optionRowActive,
                ]}
                onPress={() => {
                  setSelectedSharing(opt);
                  if (opt.status === "full") {
                    if (Platform.OS === "android") {
                      ToastAndroid.show(
                        "This sharing is not available",
                        ToastAndroid.SHORT
                      );
                    } else {
                      Alert.alert("Unavailable", "This sharing is not available");
                    }
                  }
                }}
                disabled={opt.status === "full"}
              >
                {/* Checkbox */}
                <Text style={styles.checkbox}>
                  {selectedSharing?.id === opt.id ? "☑" : "☐"}
                </Text>

                {/* Label + Price */}
                <Text style={styles.optionText}>
                  {opt.label} – ₹{opt.price}
                </Text>

                {/* Status */}
                <Text
                  style={[
                    styles.optionStatus,
                    opt.status === "available"
                      ? { color: "green" }
                      : opt.status === "few"
                      ? { color: "orange" }
                      : { color: "red" },
                  ]}
                >
                  {opt.status === "available"
                    ? "✅ Available"
                    : opt.status === "few"
                    ? "⚠️ 2 Left"
                    : "❌ Full"}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Cancel / Select row */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setSharingVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.selectBtnModal,
                  !selectedSharing || selectedSharing.status === "full"
                    ? { backgroundColor: "#ccc" }
                    : {},
                ]}
                disabled={!selectedSharing || selectedSharing.status === "full"}
                onPress={() => setSharingVisible(false)}
              >
                <Text style={styles.selectTextModal}>Select</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modern Viewer */}
      <ImageViewing
        images={galleryImages}
        imageIndex={viewerIndex}
        visible={viewerVisible}
        onRequestClose={() => setViewerVisible(false)}
        swipeToCloseEnabled={true}
        doubleTapToZoomEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#efefef" },
  topImage: { width: "100%", height: hp("34%") },

  saveBtnTop: {
    position: "absolute",
    top: hp("5%"),
    right: wp("4%"),
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("5.5%"),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  saveIcon: { width: wp("6.2%"), height: wp("6.2%") },

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

  name: {
    fontSize: wp("6.4%"),
    fontWeight: "800",
    color: "#0b0b0b",
    marginBottom: hp("0.3%"),
  },

  locationInline: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.6%"),
  },
  locIconSmall: {
    width: wp("4.2%"),
    height: wp("4.2%"),
    resizeMode: "contain",
    tintColor: "#9b9b9b",
    marginRight: wp("2%"),
  },
  locationText: { color: "#9b9b9b", fontSize: wp("3.8%") },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("0.4%"),
  },
  starsRow: { flexDirection: "row" },
  star: { fontSize: wp("4%"), marginRight: wp("0.6%") },
  starActive: { color: "#ffb400" },
  starInactive: { color: "#e6e6e6" },
  ratingNumber: {
    fontSize: wp("3.8%"),
    fontWeight: "700",
    marginLeft: wp("2%"),
  },
  reviews: { color: "#9b9b9b", fontSize: wp("3.6%"), marginLeft: wp("2%") },

  sectionTitle: {
    fontSize: wp("4.8%"),
    fontWeight: "700",
    marginTop: hp("2%"),
    marginBottom: hp("1%"),
  },
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
  moreOverlayText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: wp("5%"),
  },

  footer: {
    position: "absolute",
    bottom: hp("4%"),
    left: wp("4%"),
    right: wp("4%"),
  },

  selectedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.5%"),
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  selectedCheck: {
    fontSize: 18,
    marginRight: 6,
    color: "green",
  },
  selectedText: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
  },

  footerBtns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectBtn: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: hp("1.8%"),
    borderRadius: wp("6%"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("3%"),
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectText: {
    fontSize: wp("4.2%"),
    fontWeight: "700",
    color: "#ff0b2d",
  },

  bookBtn: {
    flex: 1,
    backgroundColor: "#ff0b2d",
    paddingVertical: hp("1.8%"),
    borderRadius: wp("6%"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  bookText: { color: "#fff", fontSize: wp("4.6%"), fontWeight: "800" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionRowActive: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  optionStatus: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  cancelText: { color: "red", fontSize: 16, fontWeight: "700" },
  selectBtnModal: {
    flex: 1,
    backgroundColor: "red",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  selectTextModal: { color: "#fff", fontSize: 16, fontWeight: "700" },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: { fontSize: 16, color: "#777", marginBottom: 16 },
  goBackBtn: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  goBackText: { color: "#fff", fontWeight: "700" },
});
