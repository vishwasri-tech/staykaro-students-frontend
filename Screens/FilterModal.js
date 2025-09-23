// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import Slider from "@react-native-community/slider";

// export default function FilterModal({ visible, onClose }) {
//   const [budget, setBudget] = useState(6999);
//   const [distance, setDistance] = useState(10);

//   const [facilities, setFacilities] = useState({
//     wifi: true,
//     ac: true,
//     gym: true,
//     fridge: true,
//     hotwater: false,
//     washingmachine: true,
//   });

//   const toggleFacility = (key) => {
//     setFacilities({ ...facilities, [key]: !facilities[key] });
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <View style={styles.overlay}>
//         <View style={styles.modalBox}>
//           {/* Apply Button */}
//           <TouchableOpacity style={styles.applyBtn} onPress={onClose}>
//             <Text style={styles.applyBtnText}>Apply Filters</Text>
//           </TouchableOpacity>

//           <ScrollView>
//             {/* Budget Section */}
//             <Text style={styles.sectionTitle}>Budget</Text>
//             <Slider
//               style={{ width: "100%" }}
//               minimumValue={3999}
//               maximumValue={15999}
//               step={100}
//               value={budget}
//               minimumTrackTintColor="black"
//               maximumTrackTintColor="#ccc"
//               thumbTintColor="black"
//               onValueChange={(val) => setBudget(val)}
//             />
//             <View style={styles.rangeRow}>
//               <Text>₹3999</Text>
//               <Text>₹{budget}</Text>
//               <Text>₹15999</Text>
//             </View>

//             {/* Facilities Section */}
//             <View style={{ marginTop: 20 }}>
//               <View style={styles.facilitiesRow}>
//                 <TouchableOpacity
//                   style={styles.checkboxRow}
//                   onPress={() => toggleFacility("wifi")}
//                 >
//                   <View
//                     style={[
//                       styles.checkbox,
//                       facilities.wifi && styles.checkedBox,
//                     ]}
//                   />
//                   <Text>Wifi</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.checkboxRow}
//                   onPress={() => toggleFacility("fridge")}
//                 >
//                   <View
//                     style={[
//                       styles.checkbox,
//                       facilities.fridge && styles.checkedBox,
//                     ]}
//                   />
//                   <Text>Fridge</Text>
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.facilitiesRow}>
//                 <TouchableOpacity
//                   style={styles.checkboxRow}
//                   onPress={() => toggleFacility("ac")}
//                 >
//                   <View
//                     style={[
//                       styles.checkbox,
//                       facilities.ac && styles.checkedBox,
//                     ]}
//                   />
//                   <Text>AC</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.checkboxRow}
//                   onPress={() => toggleFacility("hotwater")}
//                 >
//                   <View
//                     style={[
//                       styles.checkbox,
//                       facilities.hotwater && styles.checkedBox,
//                     ]}
//                   />
//                   <Text>Hot water</Text>
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.facilitiesRow}>
//                 <TouchableOpacity
//                   style={styles.checkboxRow}
//                   onPress={() => toggleFacility("gym")}
//                 >
//                   <View
//                     style={[
//                       styles.checkbox,
//                       facilities.gym && styles.checkedBox,
//                     ]}
//                   />
//                   <Text>Gym</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.checkboxRow}
//                   onPress={() => toggleFacility("washingmachine")}
//                 >
//                   <View
//                     style={[
//                       styles.checkbox,
//                       facilities.washingmachine && styles.checkedBox,
//                     ]}
//                   />
//                   <Text>Waching Machine</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Distance Section */}
//             <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
//               Distance
//             </Text>
//             <Slider
//               style={{ width: "100%" }}
//               minimumValue={2}
//               maximumValue={12}
//               step={1}
//               value={distance}
//               minimumTrackTintColor="black"
//               maximumTrackTintColor="#ccc"
//               thumbTintColor="black"
//               onValueChange={(val) => setDistance(val)}
//             />
//             <View style={styles.rangeRow}>
//               <Text>2km</Text>
//               <Text>{distance}km</Text>
//               <Text>12km</Text>
//             </View>
//           </ScrollView>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.3)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalBox: {
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 20,
//     width: "90%",
//     maxHeight: "85%",
//   },
//   applyBtn: {
//     backgroundColor: "red",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   applyBtnText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   rangeRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 8,
//   },
//   facilitiesRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   checkboxRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "45%",
//   },
//   checkbox: {
//     width: 18,
//     height: 18,
//     borderWidth: 1,
//     borderColor: "black",
//     marginRight: 6,
//   },
//   checkedBox: {
//     backgroundColor: "black",
//   },
// });











import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";

export default function FilterModal({ visible, onClose }) {
  const [budget, setBudget] = useState(6999);
  const [distance, setDistance] = useState(10);

  const [facilities, setFacilities] = useState({
    wifi: true,
    ac: true,
    gym: true,
    fridge: true,
    hotwater: false,
    washingmachine: true,
  });

  const toggleFacility = (key) => {
    setFacilities({ ...facilities, [key]: !facilities[key] });
  };
      const applyFilters = async () => {
  try {
    const res = await fetch("http://192.168.1.2:5000/api/filter", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budget, distance, facilities: filters }),
    });
    const data = await res.json();

    if (data.success) {
      // Optional: filter by selected category on frontend
      const categoryFiltered = data.data.filter(item => item.category === selectedCategory);
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

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* Apply Button */}
          <TouchableOpacity style={styles.applyBtn} onPress={onClose}>
            <Text style={styles.applyBtnText}>Apply Filters</Text>
          </TouchableOpacity>

          <ScrollView>
            {/* Budget Section */}
            <Text style={styles.sectionTitle}>Budget</Text>
            <Slider
              style={{ width: "100%" }}
              minimumValue={3999}
              maximumValue={15999}
              step={100}
              value={budget}
              minimumTrackTintColor="black"
              maximumTrackTintColor="#ccc"
              thumbTintColor="black"
              onValueChange={(val) => setBudget(val)}
            />
            <View style={styles.rangeRow}>
              <Text>₹3999</Text>
              <Text>₹{budget}</Text>
              <Text>₹15999</Text>
            </View>

            {/* Facilities Section */}
            <View style={{ marginTop: 20 }}>
              <View style={styles.facilitiesRow}>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => toggleFacility("wifi")}
                >
                  <View style={styles.checkbox}>
                    {facilities.wifi && <Text style={styles.tick}>✓</Text>}
                  </View>
                  <Text>Wifi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => toggleFacility("fridge")}
                >
                  <View style={styles.checkbox}>
                    {facilities.fridge && <Text style={styles.tick}>✓</Text>}
                  </View>
                  <Text>Fridge</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.facilitiesRow}>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => toggleFacility("ac")}
                >
                  <View style={styles.checkbox}>
                    {facilities.ac && <Text style={styles.tick}>✓</Text>}
                  </View>
                  <Text>AC</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => toggleFacility("hotwater")}
                >
                  <View style={styles.checkbox}>
                    {facilities.hotwater && <Text style={styles.tick}>✓</Text>}
                  </View>
                  <Text>Hot water</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.facilitiesRow}>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => toggleFacility("gym")}
                >
                  <View style={styles.checkbox}>
                    {facilities.gym && <Text style={styles.tick}>✓</Text>}
                  </View>
                  <Text>Gym</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => toggleFacility("washingmachine")}
                >
                  <View style={styles.checkbox}>
                    {facilities.washingmachine && (
                      <Text style={styles.tick}>✓</Text>
                    )}
                  </View>
                  <Text>Washing Machine</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Distance Section */}
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
              Distance
            </Text>
            <Slider
              style={{ width: "100%" }}
              minimumValue={2}
              maximumValue={12}
              step={1}
              value={distance}
              minimumTrackTintColor="black"
              maximumTrackTintColor="#ccc"
              thumbTintColor="black"
              onValueChange={(val) => setDistance(val)}
            />
            <View style={styles.rangeRow}>
              <Text>2km</Text>
              <Text>{distance}km</Text>
              <Text>12km</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 18,
    width: "90%",
    maxHeight: "85%",
  },
  applyBtn: {
    backgroundColor: "red",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  applyBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rangeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  facilitiesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "45%",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "black",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  tick: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
});

