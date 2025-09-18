import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const filterOptions = {
  floor: ["1", "2", "3", "4", "5"],
  block: ["A", "B", "C"],
  type: [
    "1-bed AC",
    "2-bed AC",
    "3-bed AC",
    "1-bed Non-AC",
    "2-bed Non-AC",
    "3-bed Non-AC",
  ],
};

// Sample students
const studentsList = ["Ravi", "Kiran", "Priya", "Asha", "Ramesh", "Neha"];

const roomsData = [
  { id: 1, roomNo: "A1", type: "2-bed AC", floor: "1", status: "Occupied", students: ["Rohan", "Singh"] },
  { id: 2, roomNo: "A2", type: "1-bed AC", floor: "3", status: "Vacant", students: [] },
  { id: 3, roomNo: "B3", type: "2-bed AC", floor: "3", status: "Maintenance", students: [] },
  { id: 4, roomNo: "C4", type: "2-bed Non-AC", floor: "4", status: "Vacant", students: [] },
  { id: 5, roomNo: "B2", type: "3-bed Non-AC", floor: "2", status: "Vacant", students: [] },
  { id: 6, roomNo: "C1", type: "1-bed Non-AC", floor: "1", status: "Occupied", students: ["Kiran"] },
];

export default function RoomManagement() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    floor: null,
    block: null,
    type: null,
  });

  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState("");

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleSelect = (value) => {
    setSelectedFilters({ ...selectedFilters, [modalType]: value });
    setModalVisible(false);
  };

  const clearFilter = (type) => {
    setSelectedFilters({ ...selectedFilters, [type]: null });
  };

  const getFilteredRooms = () => {
    return roomsData.filter((room) => {
      return (
        (!selectedFilters.floor || room.floor === selectedFilters.floor) &&
        (!selectedFilters.type || room.type === selectedFilters.type) &&
        (!selectedFilters.block || room.roomNo.startsWith(selectedFilters.block))
      );
    });
  };

  const handleAssignStudent = () => {
    if (selectedRoom && selectedStudent) {
      selectedRoom.students.push(selectedStudent);
      selectedRoom.status = "Occupied"; // Mark occupied once student is added
      setAssignModalVisible(false);
      setSelectedStudent("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room Management</Text>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        {["floor", "block", "type"].map((filterKey) => (
          <TouchableOpacity
            key={filterKey}
            style={styles.filterBtn}
            onPress={() => openModal(filterKey)}
          >
            <Text style={{ fontSize: 13 }}>
              {selectedFilters[filterKey]
                ? `${filterKey === "floor" ? "Floor" : filterKey === "block" ? "Block" : "Type"}: ${selectedFilters[filterKey]}`
                : filterKey === "floor"
                ? "Floor No"
                : filterKey === "block"
                ? "Block"
                : "Type"}
            </Text>
            <Ionicons name="chevron-down" size={16} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Clear All Filters */}
      <TouchableOpacity
        style={styles.clearBtn}
        onPress={() =>
          setSelectedFilters({ floor: null, block: null, type: null })
        }
      >
        <Text style={{ color: "white" }}>Clear All Filters</Text>
      </TouchableOpacity>

      {/* Rooms */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {getFilteredRooms().map((room) => (
          <View key={room.id} style={styles.card}>
            <Text style={styles.roomTitle}>Room No-{room.roomNo}</Text>
            <Text>{room.type}</Text>
            <Text>Floor No {room.floor}</Text>

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    room.status === "Occupied"
                      ? "#e74c3c"
                      : room.status === "Vacant"
                      ? "#2ecc71"
                      : "#f1c40f",
                },
              ]}
            >
              <Text style={styles.statusText}>{room.status}</Text>
            </View>

            {room.students.length > 0 && (
              <View style={{ marginTop: 6 }}>
                <Text>Assigned Students:</Text>
                {room.students.map((s, i) => (
                  <Text key={i}>{i + 1}. {s}</Text>
                ))}
              </View>
            )}

            {room.status !== "Occupied" && (
              <TouchableOpacity
                style={styles.assignBtn}
                onPress={() => {
                  setSelectedRoom(room);
                  setAssignModalVisible(true);
                }}
              >
                <Text style={{ color: "white" }}>Assign Student</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {modalType === "floor"
                ? "Select Floor"
                : modalType === "block"
                ? "Select Block"
                : "Select Type"}
            </Text>

            {filterOptions[modalType]?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => handleSelect(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}

            {selectedFilters[modalType] && (
              <TouchableOpacity
                style={[styles.modalOption, { backgroundColor: "#f8d7da" }]}
                onPress={() => {
                  clearFilter(modalType);
                  setModalVisible(false);
                }}
              >
                <Text>Clear {modalType}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.modalOption, { backgroundColor: "#ddd" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Assign Student Modal */}
      <Modal visible={assignModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.assignCard}>
            <Text style={styles.modalTitle}>Assign Student</Text>

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedStudent}
                onValueChange={(itemValue) => setSelectedStudent(itemValue)}
              >
                <Picker.Item label="Select Student" value="" />
                {studentsList.map((student, index) => (
                  <Picker.Item key={index} label={student} value={student} />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              style={[
                styles.confirmBtn,
                { backgroundColor: selectedStudent ? "#3498db" : "#ccc" },
              ]}
              onPress={handleAssignStudent}
              disabled={!selectedStudent}
            >
              <Text style={{ color: "white" }}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOption, { backgroundColor: "#ddd", marginTop: 10 }]}
              onPress={() => setAssignModalVisible(false)}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18,marginTop:29, fontWeight: "bold", marginBottom: 12 },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: width / 3.5,
    justifyContent: "space-between",
  },
  clearBtn: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 16,
  },
  scroll: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: width / 2.44 + 10,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  roomTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
  },
  statusText: { color: "#fff", fontSize: 12 },
  assignBtn: {
    marginTop: 10,
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  assignCard: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    width: "100%",
    alignItems: "center",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    width: "100%",
    marginBottom: 16,
  },
  confirmBtn: {
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    width: "100%",
  },
});
