import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const students = [
  {
    id: 1,
    name: "Robert Brown",
    course: "Civil Engineering",
    status: "Pending",
    gender: "Male",
    dob: "03-05-2003",
    college: "National College of Engineering",
    phone: "0000000000",
    email: "Robert@gmail.com",
    appliedDate: "05-04-2024",
    documents: "Aadhaar Card xxxx xxxx 3254",
    image: require("../assets/student1.png"),
    idProof: require("../assets/id-proof.png"),
  },
  {
    id: 2,
    name: "Michael",
    course: "Computer Science Engineering",
    status: "Approved",
    gender: "Male",
    dob: "21-01-2002",
    college: "Tech University",
    phone: "1111111111",
    email: "michael@gmail.com",
    appliedDate: "06-04-2024",
    documents: "Aadhaar Card xxxx xxxx 1234",
    image: require("../assets/student2.png"),
    idProof: require("../assets/id-proof.png"),
  },
  {
    id: 3,
    name: "George",
    course: "Mechanical Engineering",
    status: "Pending",
    gender: "Male",
    dob: "15-07-2002",
    college: "Engineering Institute",
    phone: "2222222222",
    email: "george@gmail.com",
    appliedDate: "07-04-2024",
    documents: "Aadhaar Card xxxx xxxx 5678",
    image: require("../assets/student3.png"),
    idProof: require("../assets/id-proof.png"),
  },
  {
    id: 4,
    name: "Wilson",
    course: "Electrical Engineering",
    status: "Rejected",
    gender: "Male",
    dob: "10-12-2001",
    college: "National Institute",
    phone: "3333333333",
    email: "wilson@gmail.com",
    appliedDate: "08-04-2024",
    documents: "Aadhaar Card xxxx xxxx 7890",
    image: require("../assets/student4.png"),
    idProof: require("../assets/id-proof.png"),
  },
  {
    id: 5,
    name: "John",
    course: "Data Science",
    status: "Approved",
    gender: "Male",
    dob: "25-03-2000",
    college: "Global University",
    phone: "4444444444",
    email: "john@gmail.com",
    appliedDate: "09-04-2024",
    documents: "Aadhaar Card xxxx xxxx 2468",
    image: require("../assets/student5.png"),
    idProof: require("../assets/id-proof.png"),
  },
  {
    id: 6,
    name: "Smith",
    course: "Course",
    status: "Pending",
    gender: "Male",
    dob: "05-11-2001",
    college: "International College",
    phone: "5555555555",
    email: "smith@gmail.com",
    appliedDate: "10-04-2024",
    documents: "Aadhaar Card xxxx xxxx 1357",
    image: require("../assets/student6.png"),
    idProof: require("../assets/id-proof.png"),
  },
];

export default function StudentApplications() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showIdProof, setShowIdProof] = useState(false);

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedStatus ? student.status === selectedStatus : true) &&
      (selectedCourse ? student.course === selectedCourse : true)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Applications</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search Students"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedStatus}
            onValueChange={(value) => setSelectedStatus(value)}
          >
            <Picker.Item label="Status" value="" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Approved" value="Approved" />
            <Picker.Item label="Rejected" value="Rejected" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCourse}
            onValueChange={(value) => setSelectedCourse(value)}
          >
            <Picker.Item label="Course/Dept" value="" />
            <Picker.Item label="Civil Engineering" value="Civil Engineering" />
            <Picker.Item
              label="Computer Science Engineering"
              value="Computer Science Engineering"
            />
            <Picker.Item
              label="Mechanical Engineering"
              value="Mechanical Engineering"
            />
            <Picker.Item
              label="Electrical Engineering"
              value="Electrical Engineering"
            />
            <Picker.Item label="Data Science" value="Data Science" />
            <Picker.Item label="Course" value="Course" />
          </Picker>
        </View>
      </View>

      {/* Student List */}
      <ScrollView>
        {filteredStudents.map((student) => (
          <TouchableOpacity
            key={student.id}
            style={styles.studentRow}
            onPress={() => setSelectedStudent(student)}
          >
            <Image source={student.image} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.studentCourse}>{student.course}</Text>
            </View>

            {student.status === "Pending" && (
              <View style={styles.pendingBadge}>
                <Text style={styles.badgeText}>Pending</Text>
              </View>
            )}
            {student.status === "Approved" && (
              <View style={styles.approvedBadge}>
                <Text style={styles.badgeText}>Approved</Text>
              </View>
            )}
            {student.status === "Rejected" && (
              <View style={styles.rejectedBadge}>
                <Text style={styles.badgeText}>Rejected</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Student Detail Modal */}
      <Modal
        visible={!!selectedStudent}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedStudent(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selectedStudent && (
              <ScrollView>
                <Image
                  source={selectedStudent.image}
                  style={styles.modalAvatar}
                />
                <Text style={styles.modalName}>{selectedStudent.name}</Text>

                <Text style={styles.detailText}>
                  Gender: <Text style={styles.detailValue}>{selectedStudent.gender}</Text>
                </Text>
                <Text style={styles.detailText}>
                  Date of Birth: <Text style={styles.detailValue}>{selectedStudent.dob}</Text>
                </Text>
                <Text style={styles.detailText}>
                  College: <Text style={styles.detailValue}>{selectedStudent.college}</Text>
                </Text>
                <Text style={styles.detailText}>
                  Course: <Text style={styles.detailValue}>{selectedStudent.course}</Text>
                </Text>
                <Text style={styles.detailText}>
                  Phone: <Text style={styles.detailValue}>{selectedStudent.phone}</Text>
                </Text>
                <Text style={styles.detailText}>
                  Email: <Text style={styles.detailValue}>{selectedStudent.email}</Text>
                </Text>
                <Text style={styles.detailText}>
                  Applied Date: <Text style={styles.detailValue}>{selectedStudent.appliedDate}</Text>
                </Text>

                {/* Aadhaar Card Section */}
                <Text style={styles.documentsTitle}>Documents:</Text>
                <TouchableOpacity
                  style={styles.docRow}
                  onPress={() => setShowIdProof(true)}
                >
                  <Image
                    source={selectedStudent.idProof}
                    style={styles.idProof}
                  />
                  <Text style={styles.docText}>
                    {selectedStudent.documents}
                  </Text>
                </TouchableOpacity>

                <View style={styles.modalButtonRow}>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: "#ccc" }]}
                    onPress={() => setSelectedStudent(null)}
                  >
                    <Text>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: "green" }]}
                  >
                    <Text style={{ color: "#fff" }}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: "red" }]}
                  >
                    <Text style={{ color: "#fff" }}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Full ID Proof Modal */}
      <Modal visible={showIdProof} transparent animationType="fade">
        <View style={styles.idProofOverlay}>
          <TouchableOpacity
            style={styles.idProofClose}
            onPress={() => setShowIdProof(false)}
          >
            <Text style={{ color: "#fff", fontSize: hp("2%") }}>Close</Text>
          </TouchableOpacity>
          {selectedStudent && (
            <Image
              source={selectedStudent.idProof}
              style={styles.fullIdProof}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp("3%"),
    backgroundColor: "#fff",
  },
  header: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
    marginTop: hp("2%"),
  },
  searchBar: {
    backgroundColor: "#f2f2f2",
    borderRadius: wp("3%"),
    paddingHorizontal: wp("4%"),
    marginBottom: hp("2%"),
  },
  searchInput: {
    height: hp("5%"),
    fontSize: hp("2%"),
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("2%"),
  },
  pickerContainer: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: wp("3%"),
    overflow: "hidden",
  },
  studentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1.5%"),
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  avatar: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("6%"),
    marginRight: wp("4%"),
  },
  studentName: {
    fontSize: hp("2%"),
    fontWeight: "600",
  },
  studentCourse: {
    color: "#555",
    fontSize: hp("1.7%"),
  },
  pendingBadge: {
    backgroundColor: "#f4c27a",
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.5%"),
    borderRadius: wp("3%"),
  },
  approvedBadge: {
    backgroundColor: "green",
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.5%"),
    borderRadius: wp("3%"),
  },
  rejectedBadge: {
    backgroundColor: "red",
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.5%"),
    borderRadius: wp("3%"),
  },
  badgeText: {
    color: "#fff",
    fontSize: hp("1.6%"),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCard: {
    backgroundColor: "#fff",
    padding: wp("6%"),
    borderTopLeftRadius: wp("6%"),
    borderTopRightRadius: wp("6%"),
    maxHeight: hp("80%"),
  },
  modalAvatar: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("10%"),
    alignSelf: "center",
    marginBottom: hp("1%"),
  },
  modalName: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: hp("2%"),
  },
  detailText: {
    fontSize: hp("2%"),
    marginVertical: hp("0.5%"),
    fontWeight: "700",
  },
  detailValue: {
    fontWeight: "400",
    fontSize: hp("1.7%"),
  },
  documentsTitle: {
    fontSize: hp("2%"),
    fontWeight: "600",
    marginTop: hp("1%"),
    marginBottom: hp("2%"),
  },
  docRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  idProof: {
    width: wp("25%"),
    height: hp("12%"),
    resizeMode: "contain",
    marginRight: wp("3%"),
    marginTop: hp("-2%"),
  },
  docText: {
    fontSize: hp("1.8%"),
    marginBottom: hp("1%"),
    marginLeft: 30,
    marginRight: 80,
    flexShrink: 1,
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("2%"),
  },
  actionBtn: {
    flex: 1,
    paddingVertical: hp("1.5%"),
    marginHorizontal: wp("1%"),
    borderRadius: wp("3%"),
    alignItems: "center",
  },
  idProofOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullIdProof: {
    width: wp("90%"),
    height: hp("70%"),
    resizeMode: "contain",
  },
  idProofClose: {
    position: "absolute",
    top: hp("5%"),
    right: wp("5%"),
    padding: wp("2%"),
  },
});
