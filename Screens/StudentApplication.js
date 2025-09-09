import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get("window");

export default function StudentApplications() {
  const currentYear = new Date().getFullYear();
  const numberOfFutureYears = 100;
  const numberOfPastYears = 2;

  const years = Array.from(
    { length: numberOfFutureYears + numberOfPastYears + 1 },
    (_, i) => (currentYear + numberOfFutureYears - i).toString()
  );

  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Kalyan",
      course: "Computer Science",
      phone: "xxxxxxxxxx",
      date: "04-09-2025",
      status: "Pending",
    },
    {
      id: 2,
      name: "Imran",
      course: "Data Science",
      phone: "xxxxxxxxxx",
      date: "03-09-2025",
      status: "Approved",
    },
    {
      id: 3,
      name: "Kalyan",
      course: "Machine Learning",
      phone: "xxxxxxxxxx",
      date: "03-09-2025",
      status: "Rejected",
    },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "#FFD700" };
      case "Approved":
        return { backgroundColor: "#90EE90" };
      case "Rejected":
        return { backgroundColor: "#FF7F7F" };
      default:
        return { backgroundColor: "#ccc" };
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setApplications((prevApps) =>
      prevApps.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={-45}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Student Applications</Text>

          {/* Table */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.table}>
              {/* Header Row */}
              <View style={[styles.row, styles.headerRow]}>
                <Text style={[styles.headerCell, styles.colName]}>Name</Text>
                <Text style={[styles.headerCell, styles.colCourse]}>
                  Course/ Dept
                </Text>
                <Text style={[styles.headerCell, styles.colPhone]}>Phone</Text>
                <Text style={[styles.headerCell, styles.colDate]}>
                  Applied Date
                </Text>
                <Text style={[styles.headerCell, styles.colStatus, { textAlign: "center" }]}>
  Status
</Text>
<Text style={[styles.headerCell, styles.colAction, { textAlign: "center" }]}>
  Action
</Text>

              </View>

              {/* Data Rows */}
              {applications.map((app) => (
                <View key={app.id} style={styles.row}>
                  <Text style={[styles.cell, styles.colName]}>{app.name}</Text>
                  <Text style={[styles.cell, styles.colCourse]}>
                    {app.course}
                  </Text>
                  <Text style={[styles.cell, styles.colPhone]}>
                    {app.phone}
                  </Text>
                  <Text style={[styles.cell, styles.colDate]}>{app.date}</Text>

                  <View
                    style={[
                      styles.statusBox,
                      getStatusStyle(app.status),
                      styles.colStatus,
                    ]}
                  >
                    <Text style={styles.statusText}>{app.status}</Text>
                  </View>

                  <View style={[styles.actionContainer, styles.colAction]}>
                    {app.status !== "Approved" && (
                      <Button
                        mode="outlined"
                        compact
                        style={styles.actionButton}
                        labelStyle={styles.buttonText}
                        onPress={() => handleStatusChange(app.id, "Approved")}
                      >
                        Approve
                      </Button>
                    )}
                    {app.status !== "Rejected" && (
                      <Button
                        mode="outlined"
                        compact
                        style={styles.actionButton}
                        labelStyle={styles.buttonText}
                        onPress={() => handleStatusChange(app.id, "Rejected")}
                      >
                        Reject
                      </Button>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Student Form */}
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Student Details :</Text>

            <Text style={styles.label}>Name :</Text>
            <TextInput style={styles.input} placeholder="Enter Name" />

            <Text style={styles.label}>College Info :</Text>
            <TextInput style={styles.input} placeholder="Enter College Info" />

            <Text style={styles.label}>Year :</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue) => setSelectedYear(itemValue)}
                style={styles.picker}
                dropdownIconColor="#333"
              >
                {years.map((year) => (
                  <Picker.Item key={year} label={year} value={year} />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>ID Proof :</Text>
            <Image
              source={require("../assets/id-proof.png")}
              style={styles.idProofImage}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// Column widths
const columnWidth = {
  colName: 70,
  colCourse: 70,
  colPhone: 85,
  colDate: 90,
  colStatus: 100,
  colAction: 160,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    minWidth: Object.values(columnWidth).reduce((a, b) => a + b, 0),
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  headerRow: {
    backgroundColor: "#f9f9f9",
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "row",
    color: "#333",
  },
  cell: {
    fontSize: 13,
    textAlign: "left",
    color: "#333",
  },
  colName: { width: columnWidth.colName },
  colCourse: { width: columnWidth.colCourse },
  colPhone: { width: columnWidth.colPhone },
  colDate: { width: columnWidth.colDate },
  colStatus: {
  width: columnWidth.colStatus,
  alignItems: "center",
  justifyContent: "center",
},
colAction: {
  width: columnWidth.colAction,
  alignItems: "center",
  justifyContent: "center",
},

  statusBox: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 14,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  actionButton: {
    borderRadius: 6,
    marginHorizontal: 4,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  buttonText: {
    fontSize: 11,
    color: "#000",
  },
  form: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    height: 50,
    backgroundColor: "#f9f9f9",
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 5,
    backgroundColor: "#f9f9f9",
    height: 50,
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: 50,
  },
  idProofImage: {
    width: width * 0.8,
    height: 120,
    marginLeft: -100,
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 6,
  },
});
