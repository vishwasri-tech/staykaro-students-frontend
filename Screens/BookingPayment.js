import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";


const { width, height } = Dimensions.get("window");
const baseWidth = 375;
const scale = width / baseWidth;
function normalize(size) {
  return Math.round(size * scale);
}

export default function BookingPayment({ navigation }) {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(1); // 1: personal, 2: summary, 3: success
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    college: "",
  });
  const [file, setFile] = useState(null);

  const pricePerMonth = 7500;
  const discount = 800;

  const [duration, setDuration] = useState(6);
  const [durationModalVisible, setDurationModalVisible] = useState(false);

  // animation for bottom-sheet modal
  const sheetAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (durationModalVisible) {
      Animated.timing(sheetAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(sheetAnim, {
        toValue: height,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [durationModalVisible, sheetAnim]);

  const subtotal = pricePerMonth * duration;
  const totalPayable = subtotal - discount;

  const durationOptions = [1, 2, 3, 6];

  // Slightly raised footer offset
  const footerBottom = insets.bottom + normalize(12);

    // -------- VALIDATION FUNCTION --------
  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]{8,}$/; // at least 8 letters, no numbers
    const mobileRegex = /^\d{10}$/; // exactly 10 digits
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple email validation

    if (!nameRegex.test(form.fullName)) {
      Alert.alert("Invalid Full Name", "Full Name must be at least 8 characters and contain no numbers.");
      return false;
    }

    if (!mobileRegex.test(form.mobile)) {
      Alert.alert("Invalid Mobile No", "Mobile number must be exactly 10 digits.");
      return false;
    }

    if (!emailRegex.test(form.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return false;
    }

    return true;
  };

  // -------- HANDLE SUBMIT --------
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("mobile", form.mobile);
      formData.append("email", form.email);
      formData.append("college", form.college);

      if (file) {
        formData.append("idProof", {
          uri: file.uri,
          type: file.mimeType || "application/octet-stream",
          name: file.name,
        });
      }

      const res = await axios.post(
        "http://192.168.1.2:5000/api/booking/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        Alert.alert("Success", res.data.message);
        setStep(2);
      } else {
        Alert.alert("Failed", res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(" Booking error:", err);
      Alert.alert("Error", err.response?.data?.error || "Server error");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: footerBottom + normalize(110) }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* PERSONAL DETAILS */}
        {step === 1 && (
          <View style={{ marginTop: normalize(36), paddingHorizontal: normalize(18) }}>
            <Text style={styles.title}>Personal Details</Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#bdbdbd"
              value={form.fullName}
              onChangeText={(t) => setForm((s) => ({ ...s, fullName: t }))}
              style={styles.input}
            />

            <Text style={styles.label}>Mobile No</Text>
            <TextInput
              placeholder="Mobile No"
              placeholderTextColor="#bdbdbd"
              keyboardType="phone-pad"
              value={form.mobile}
              onChangeText={(t) => setForm((s) => ({ ...s, mobile: t }))}
              style={styles.input}
            />

            <Text style={styles.label}>Email Id</Text>
            <TextInput
              placeholder="Email Id"
              placeholderTextColor="#bdbdbd"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(t) => setForm((s) => ({ ...s, email: t }))}
              style={styles.input}
            />

            <Text style={styles.label}>College / Company Name</Text>
            <TextInput
              placeholder="College / Company Name"
              placeholderTextColor="#bdbdbd"
              value={form.college}
              onChangeText={(t) => setForm((s) => ({ ...s, college: t }))}
              style={styles.input}
            />

            <Text style={[styles.label, { marginTop: normalize(6) }]}>
              Upload ID Proof <Text style={styles.smallHint}>(Aadhaar, PAN, College ID)</Text>
            </Text>
               <TouchableOpacity
              style={styles.uploadBtn}
              activeOpacity={0.85}
              onPress={async () => {
                try {
                  const result = await DocumentPicker.getDocumentAsync({
                    type: "*/*",
                  });
                  if (result.canceled) return;

                  const doc = result.assets[0];
                  setFile(doc);
                  Alert.alert("File Selected", doc.name);
                } catch (err) {
                  Alert.alert("Error", "Failed to pick document");
                  console.error(err);
                }
              }}
            >
              <Text style={styles.uploadText}>
                {file ? file.name : "Upload File"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* PAYMENT SUMMARY */}
        {step === 2 && (
          <View style={{ marginTop: normalize(36), paddingHorizontal: normalize(18) }}>
            <Text style={styles.title}>Payment Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Room Type:</Text>
              <Text style={styles.summaryValue}>Single Sharing</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Rent:</Text>
              <Text style={styles.summaryValue}>₹{pricePerMonth} / month</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duration:</Text>
              <TouchableOpacity
                style={[styles.durationPill, { paddingHorizontal: normalize(12) }]}
                onPress={() => setDurationModalVisible(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.durationText}>{duration} Month{duration > 1 ? "s" : ""} ▾</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.mutedValue}>₹{subtotal.toLocaleString()}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount (if any):</Text>
              <Text style={styles.mutedValue}>- ₹{discount.toLocaleString()}</Text>
            </View>

            <View style={[styles.summaryRow, { marginTop: normalize(8) }]}>
              <Text style={styles.totalLabel}>Total Payable:</Text>
              <Text style={styles.totalValue}>₹{totalPayable.toLocaleString()}</Text>
            </View>
          </View>
        )}

        {/* PAYMENT SUCCESS */}
        {step === 3 && (
          <View style={{ marginTop: normalize(80), alignItems: "center", paddingHorizontal: normalize(18) }}>
            <View style={styles.successCard}>
              <TouchableOpacity
                style={styles.successClose}
                onPress={() => {
                  // close or go back to home; here simply go to step 2
                  setStep(2);
                }}
              >
                <Text style={styles.closeX}>✕</Text>
              </TouchableOpacity>

              <Text style={styles.successCheck}>✅</Text>
              <Text style={styles.successTitleCard}>Payment Successful</Text>
              <Text style={styles.successSub}>Your payment of ₹{totalPayable.toLocaleString()} has been received.</Text>

              <View style={{ marginTop: normalize(12), alignItems: "center" }}>
                <Text style={styles.bookingLabel}>Booking Summary</Text>
                <Text style={styles.bookingText}>Classic Hostel - Single Sharing</Text>
                <Text style={styles.bookingText}>Check-in: 1 Oct 2025</Text>
              </View>

              <TouchableOpacity
                style={styles.contactBtn}
                activeOpacity={0.9}
                onPress={() => {
                  // your contact owner action
                  alert("Contact owner tapped");
                }}
              >
                <Text style={styles.contactBtnText}>Contact Owner</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* FOOTER (fixed slightly above bottom) */}
      <View style={[styles.footer, { bottom: footerBottom }]}>
        {step === 1 && (
          <>
            <TouchableOpacity
              style={styles.cancelButtonFooter}
              activeOpacity={0.85}
              onPress={() => {
                // cancel action
                 navigation.goBack ? navigation.goBack() : null;
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButtonFooter}
              activeOpacity={0.9}
              onPress={handleSubmit}
            >
              <Text style={styles.primaryButtonText}>Save and Next</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <TouchableOpacity
              style={styles.cancelButtonFooter}
              activeOpacity={0.85}
              onPress={() => setStep(1)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButtonFooter}
              activeOpacity={0.9}
              onPress={() => setStep(3)}
            >
              <Text style={styles.primaryButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* DURATION BOTTOM-SHEET MODAL */}
      <Modal transparent visible={durationModalVisible} animationType="none" onRequestClose={() => setDurationModalVisible(false)}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalOverlay}
          onPress={() => setDurationModalVisible(false)}
        />
        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [
                {
                  translateY: sheetAnim.interpolate({
                    inputRange: [0, height],
                    outputRange: [0, height],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>Select Duration</Text>

          {durationOptions.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={styles.sheetOption}
              activeOpacity={0.85}
              onPress={() => {
                setDuration(opt);
                setDurationModalVisible(false);
              }}
            >
              <Text style={[styles.optionText, duration === opt && { fontWeight: "700" }]}>
                {opt} Month{opt > 1 ? "s" : ""}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.cancelSmall, { marginTop: normalize(8) }]}
            onPress={() => setDurationModalVisible(false)}
            activeOpacity={0.85}
          >
            <Text style={styles.cancelSmallText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  scrollContent: {
    paddingTop: normalize(6),
  },
  title: {
    fontSize: normalize(20),
    fontWeight: "800",
    color: "#111",
    marginBottom: normalize(12),
  },
  label: {
    fontSize: normalize(13),
    color: "#666",
    marginBottom: normalize(6),
  },
  smallHint: {
    fontSize: normalize(12),
    color: "#9a9a9a",
    fontWeight: "400",
  },
  input: {
    height: normalize(48),
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: "#eee",
    paddingHorizontal: normalize(14),
    fontSize: normalize(15),
    backgroundColor: "#fff",
    color: "#222",
    marginBottom: normalize(10),
  },
  uploadBtn: {
    marginTop: normalize(10),
    width: normalize(150),
    height: normalize(44),
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  uploadText: {
    fontSize: normalize(13),
    color: "#666",
  },

  durationPill: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: normalize(20),
    paddingHorizontal: normalize(16),
    height: normalize(36),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  durationText: {
    fontSize: normalize(14),
    color: "#444",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: normalize(8),
  },
  summaryLabel: { fontSize: normalize(15), color: "#666", fontWeight: "600" },
  summaryValue: { fontSize: normalize(15), color: "#111", fontWeight: "500" },
  mutedValue: { fontSize: normalize(15), color: "#8f8f8f" },

  totalLabel: { fontSize: normalize(17), color: "#111", fontWeight: "800" },
  totalValue: { fontSize: normalize(17), color: "#111", fontWeight: "900" },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    // bottom is set programmatically to slightly above safe area
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: normalize(16),
    alignItems: "center",
    paddingVertical: normalize(12),

    borderTopColor: "#eee",
  },

  cancelButtonFooter: {
    flex: 1,
    marginRight: normalize(10),
    borderWidth: 1,
    borderColor: "#ff3333",
    borderRadius: normalize(28),
    paddingVertical: normalize(12),
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cancelButtonText: {
    color: "#ff3333",
    fontWeight: "700",
    fontSize: normalize(14),
  },

  primaryButtonFooter: {
    flex: 1,
    marginLeft: normalize(10),
    borderRadius: normalize(28),
    paddingVertical: normalize(12),
    alignItems: "center",
    backgroundColor: "#ff2b2b",
    ...Platform.select({
      ios: {
        shadowColor: "#ff2b2b",
        shadowOpacity: 0.18,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
      android: { elevation: 3 },
    }),
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: normalize(14),
  },

  // SUCCESS CARD
  successCard: {
    width: width - normalize(56),
    backgroundColor: "#fff",
    borderRadius: normalize(16),
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(18),
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  successClose: {
    position: "absolute",
    top: normalize(8),
    right: normalize(10),
    zIndex: 3,
    padding: normalize(6),
  },
  closeX: { fontSize: normalize(16), color: "#888" },
  successCheck: { fontSize: normalize(30) },
  successTitleCard: { fontSize: normalize(16), fontWeight: "800", marginTop: normalize(6) },
  successSub: { fontSize: normalize(13), color: "#666", textAlign: "center", marginTop: normalize(6) },

  bookingLabel: { fontSize: normalize(13), color: "#111", fontWeight: "700" },
  bookingText: { fontSize: normalize(13), color: "#666", marginTop: normalize(4) },

  contactBtn: {
    marginTop: normalize(16),
    backgroundColor: "#ff2b2b",
    width: "80%",
    paddingVertical: normalize(12),
    borderRadius: normalize(12),
    alignItems: "center",
  },
  contactBtnText: { color: "#fff", fontWeight: "800", fontSize: normalize(14) },

  // modal/bottom-sheet
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: normalize(14),
    borderTopRightRadius: normalize(14),
    paddingTop: normalize(10),
    paddingHorizontal: normalize(18),
    paddingBottom: normalize(20),
  },
  sheetHandle: {
    width: normalize(40),
    height: normalize(4),
    backgroundColor: "#e6e6e6",
    borderRadius: normalize(3),
    alignSelf: "center",
    marginBottom: normalize(10),
  },
  sheetTitle: { fontSize: normalize(16), fontWeight: "700", textAlign: "center", marginBottom: normalize(8) },
  sheetOption: {
    paddingVertical: normalize(14),
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  optionText: { fontSize: normalize(15), textAlign: "center" },

  cancelSmall: {
    marginTop: normalize(8),
    alignSelf: "center",
    paddingHorizontal: normalize(22),
    paddingVertical: normalize(10),
    borderRadius: normalize(10),
  },
  cancelSmallText: { color: "#333", fontWeight: "600" },
});
