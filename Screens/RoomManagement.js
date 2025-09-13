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

const roomsData = [
  {
    id: 1,
    roomNo: "Room No 1",
    beds: "2-bed AC",
    status: "Occupied",
    students: ["Rohan", "Singh"],
  },
  {
    id: 2,
    roomNo: "Room No 2",
    beds: "1-bed AC",
    status: "Vacant",
    students: [],
  },
  {
    id: 3,
    roomNo: "Room No 3",
    beds: "2-bed AC",
    status: "Maintenance",
    students: [],
  },
  {
    id: 4,
    roomNo: "Room No 4",
    beds: "2-bed AC",
    status: "Vacant",
    students: [],
  },
];

export default function RoomManagement() {
  const [rooms, setRooms] = useState(roomsData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState("");

  const handleAssignStudent = () => {
    if (selectedRoom && selectedStudent) {
      setRooms((prev) =>
        prev.map((room) =>
          room.id === selectedRoom.id
            ? { ...room, students: [...room.students, selectedStudent] }
            : room
        )
      );
      setSelectedStudent("");
      setModalVisible(false);
    }
  };

  const openAssignModal = (room) => {
    setSelectedRoom(room);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room Management</Text>

      {/* Filters */}
      <View style={styles.filters}>
        {["Floor No", "Block", "Type"].map((label, index) => (
          <TouchableOpacity key={index} style={styles.dropdownBtn}>
            <Text style={styles.dropdownText}>{label}</Text>
            <Ionicons name="chevron-down-outline" size={16} color="#555" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Rooms */}
      <ScrollView
        contentContainerStyle={styles.roomsContainer}
        showsVerticalScrollIndicator={false}
      >
        {rooms.map((room) => (
          <View key={room.id} style={styles.card}>
            <Text style={styles.roomTitle}>{room.roomNo}</Text>
            <Text style={styles.roomSubtitle}>{room.beds}</Text>

            {/* Status */}
            <View
              style={[
                styles.statusBadge,
                room.status === "Occupied"
                  ? styles.occupied
                  : room.status === "Vacant"
                  ? styles.vacant
                  : styles.maintenance,
              ]}
            >
              <Text style={styles.statusText}>{room.status}</Text>
            </View>

            {/* Students */}
            {room.students.length > 0 && (
              <View style={styles.studentsList}>
                <Text style={styles.studentsTitle}>Assigned Students:</Text>
                {room.students.map((s, i) => (
                  <Text key={i}>{`${i + 1}. ${s}`}</Text>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.assignBtn}
              onPress={() => openAssignModal(room)}
            >
              <Text style={styles.assignBtnText}>Assign Student</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Assign Student Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Assign Student</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedStudent}
                onValueChange={(val) => setSelectedStudent(val)}
              >
                <Picker.Item label="Select Student" value="" />
                <Picker.Item label="Rohan" value="Rohan" />
                <Picker.Item label="Singh" value="Singh" />
                <Picker.Item label="Amit" value="Amit" />
                <Picker.Item label="Priya" value="Priya" />
              </Picker>
            </View>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={handleAssignStudent}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dropdownBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: width * 0.25,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
    marginRight: 6,
  },
  roomsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 100,
  },
  card: {
    width: width * 0.43,
    height: 210,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  roomSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  occupied: { backgroundColor: "#E53935" },
  vacant: { backgroundColor: "#43A047" },
  maintenance: { backgroundColor: "#FBC02D" },
  studentsList: {
    marginBottom: 8,
  },
  studentsTitle: {
    fontWeight: "600",
    fontSize: 13,
  },
  assignBtn: {
    backgroundColor: "#4285F4",
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 5,
    alignItems: "center",
  },
  assignBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    width: width * 0.8,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
  },
  confirmBtn: {
    backgroundColor: "#4285F4",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelBtn: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  cancelText: {
    color: "#333",
    fontWeight: "600",
  },
});
