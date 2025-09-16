import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const scale = width / 375;
function normalize(size) {
  return Math.round(size * scale);
}

export default function BookingPayment({ route = {}, navigation = {} }) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 450,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const selectedSharing =
    (route.params && route.params.selectedSharing) || {
      label: "Single Sharing",
      price: 7500,
    };

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    college: "",
  });

  const [duration, setDuration] = useState(6); // default 6 months
  const [showDurationOptions, setShowDurationOptions] = useState(false);
  const durationOptions = [1, 2, 3, 6]; // months

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Personal Details */}
        <Text style={styles.heading}>Personal Details</Text>

        <Text style={styles.fieldLabel}>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={form.fullName}
          onChangeText={(t) => setForm({ ...form, fullName: t })}
          placeholderTextColor="#bdbdbd"
        />

        <Text style={styles.fieldLabel}>Mobile No</Text>
        <TextInput
          placeholder="Mobile No"
          style={styles.input}
          keyboardType="phone-pad"
          value={form.mobile}
          onChangeText={(t) => setForm({ ...form, mobile: t })}
          placeholderTextColor="#bdbdbd"
        />

        <Text style={styles.fieldLabel}>Email Id</Text>
        <TextInput
          placeholder="Email Id"
          style={styles.input}
          keyboardType="email-address"
          value={form.email}
          onChangeText={(t) => setForm({ ...form, email: t })}
          placeholderTextColor="#bdbdbd"
        />

        <Text style={styles.fieldLabel}>College / Company Name</Text>
        <TextInput
          placeholder="College / Company Name"
          style={styles.input}
          value={form.college}
          onChangeText={(t) => setForm({ ...form, college: t })}
          placeholderTextColor="#bdbdbd"
        />

        <Text style={[styles.fieldLabel, { marginTop: 6 }]}>
          Upload ID Proof{" "}
          <Text style={styles.smallHint}>(Aadhaar, PAN, College ID)</Text>
        </Text>
        <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
          <Text style={styles.uploadText}>Upload File</Text>
        </TouchableOpacity>

        {/* Payment Summary */}
        <Text style={[styles.heading, { marginTop: 20 }]}>Payment Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Room Type:</Text>
          <Text style={styles.summaryValue}>{selectedSharing.label}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Rent:</Text>
          <Text style={styles.summaryValue}>
            ₹{selectedSharing.price} / month
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Duration:</Text>
          <View>
            <TouchableOpacity
              style={styles.durationPill}
              onPress={() => setShowDurationOptions(!showDurationOptions)}
            >
              <Text style={styles.durationText}>{duration} Months ▾</Text>
            </TouchableOpacity>
            {showDurationOptions && (
              <View style={styles.durationDropdownUp}>
                {durationOptions.map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={styles.durationOption}
                    onPress={() => {
                      setDuration(m);
                      setShowDurationOptions(false);
                    }}
                  >
                    <Text style={styles.durationText}>
                      {m} Month{m > 1 ? "s" : ""}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.mutedValue}>₹{selectedSharing.price * duration}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount (if any):</Text>
          <Text style={styles.mutedValue}>- ₹800</Text>
        </View>

        {/* Total Payable without extra margin */}
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total Payable:</Text>
          <Text style={styles.totalValue}>
            ₹{selectedSharing.price * duration - 800}
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <Animated.View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom + 10, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <TouchableOpacity
          style={[styles.btn, styles.cancelBtn]}
          onPress={() => (navigation.goBack ? navigation.goBack() : null)}
          activeOpacity={0.8}
        >
          <Text style={[styles.btnText, styles.cancelText]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.payBtn]}
          onPress={() => alert("Proceed to Payment")}
          activeOpacity={0.9}
        >
          <Text style={[styles.btnText, styles.payText]}>
            Proceed to Payment
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const PADDING = 16;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fdfdfd" },
  content: { flexGrow: 1, paddingHorizontal: 16, paddingTop: height * 0.04 },
  heading: {
    fontSize: normalize(20),
    fontWeight: "800",
    color: "#111",
    marginBottom: normalize(12),
    marginTop: normalize(20),
  },
  fieldLabel: { fontSize: normalize(13), color: "#666", marginTop: normalize(10), marginBottom: normalize(8) },
  smallHint: { fontSize: normalize(12), color: "#9a9a9a", fontWeight: "400" },
  input: { height: normalize(46), borderRadius: normalize(12), borderWidth: 1, borderColor: "#e0e0e0", paddingHorizontal: normalize(14), fontSize: normalize(15), backgroundColor: "#fff", color: "#222", marginBottom: normalize(10) },
  uploadBtn: { marginTop: normalize(10), width: normalize(150), height: normalize(44), borderRadius: normalize(12), borderWidth: 1, borderColor: "#ddd", justifyContent: "center", alignItems: "center", backgroundColor: "#fafafa" },
  uploadText: { fontSize: normalize(13), color: "#666" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: normalize(8) },
  summaryLabel: { fontSize: normalize(15), color: "#666", fontWeight: "600" },
  summaryValue: { fontSize: normalize(15), color: "#111", fontWeight: "500" },
  mutedValue: { fontSize: normalize(15), color: "#8f8f8f" },
  durationPill: { borderWidth: 1, borderColor: "#ddd", borderRadius: normalize(18), paddingHorizontal: normalize(14), height: normalize(34), justifyContent: "center", alignItems: "center", backgroundColor: "#fafafa" },
  durationDropdownUp: {
    position: "absolute",
    bottom: normalize(40), // appears above the pill
    width: normalize(120),
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: normalize(8),
    zIndex: 10,
    elevation: 5,
  },
  durationOption: { paddingVertical: normalize(10), paddingHorizontal: normalize(12) },
  durationText: { fontSize: normalize(14), color: "#666" },
  totalLabel: { fontSize: normalize(17), color: "#111", fontWeight: "700" },
  totalValue: { fontSize: normalize(17), color: "#111", fontWeight: "800" },
  footer: { flexDirection: width < 400 ? "column" : "row", justifyContent: "space-between", paddingHorizontal: normalize(16), paddingTop: normalize(12), backgroundColor: "#fff" },
  btn: { flex: 1, paddingVertical: normalize(15), borderRadius: normalize(28), alignItems: "center", marginHorizontal: width < 400 ? 0 : normalize(6), marginVertical: width < 400 ? normalize(6) : 0, width: width < 400 ? "100%" : "auto" },
  btnText: { fontWeight: "700", fontSize: normalize(13) },
  cancelBtn: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ff4b4b" },
  cancelText: { color: "#ff4b4b" },
  payBtn: {
    backgroundColor: "#ff2b2b",
    ...Platform.select({
      ios: { shadowColor: "#ff2b2b", shadowOpacity: 0.18, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
      android: { elevation: 3 },
    }),
  },
  payText: { color: "#fff" },
});
