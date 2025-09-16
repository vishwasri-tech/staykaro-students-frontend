import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

// Import icons
import calendarIcon from '../assets/calendar.png';
import fm1 from '../assets/fm1.png'; // Add Payment icon
import fm2 from '../assets/fm2.png'; // Send Reminder icon

const initialUsers = [
  {
    name: 'Kalyan Kumar',
    room: 'Room:A-101',
    paid: 25000,
    due: 0,
    status: 'Paid',
    lastDate: '01-05-2024',
  },
  {
    name: 'Rahul Vijay',
    room: 'Room:B-102',
    paid: 15000,
    due: 10000,
    status: 'Partial',
    lastDate: '10-05-2024',
  },
  {
    name: 'Rahul Vijay',
    room: 'Room:C-103',
    paid: 0,
    due: 25000,
    status: 'Unpaid',
    lastDate: 'Never',
  },
];

export default function FeeManagement() {
  const [users, setUsers] = useState(initialUsers);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [selectedTab, setSelectedTab] = useState('Paid');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [amount, setAmount] = useState('');

  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDateChange = (event, date) => {
    if (date) setSelectedDate(date);
    setDatePickerVisible(false);
  };

  const handleSavePayment = () => {
    if (!selectedUser || !amount) return;

    const updatedUsers = users.map((u) =>
      u.name === selectedUser.name && u.room === selectedUser.room
        ? {
            ...u,
            paid: u.paid + parseFloat(amount),
            due: Math.max(u.due - parseFloat(amount), 0),
            status:
              u.due - parseFloat(amount) <= 0
                ? 'Paid'
                : u.paid > 0
                ? 'Partial'
                : 'Unpaid',
            lastDate: selectedDate.toLocaleDateString(),
          }
        : u
    );

    setUsers(updatedUsers);
    setPaymentModalVisible(false);
    setAmount('');
    setPaymentMode('Cash');
  };

  const handleMarkAsPaid = (user) => {
    const updatedUsers = users.map((u) =>
      u.name === user.name && u.room === user.room
        ? {
            ...u,
            paid: u.paid + u.due,
            due: 0,
            status: 'Paid',
            lastDate: new Date().toLocaleDateString(),
          }
        : u
    );
    setUsers(updatedUsers);
  };

  const renderStatus = (status) => {
    let color;
    if (status === 'Paid') color = '#3EC57C';
    else if (status === 'Partial') color = '#BEA24D';
    else color = '#ED5C5C';
    return (
      <View style={[styles.statusBadge, { backgroundColor: color }]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  };

  // Filter users based on selected tab
  const filteredUsers =
    selectedTab === 'Paid'
      ? users.filter((u) => u.status === 'Paid' || u.status === 'Partial')
      : users.filter((u) => u.status === 'Unpaid');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Fee Management</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name, room, block"
        placeholderTextColor="#999"
      />

      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Paid' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setSelectedTab('Paid')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Paid' ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Paid
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Unpaid' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setSelectedTab('Unpaid')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Unpaid' ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Unpaid
          </Text>
        </TouchableOpacity>
      </View>

      {/* User Cards */}
      <View style={styles.cardWrapper}>
        {filteredUsers.map((user, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userRoom}>{user.room}</Text>
              </View>
              {renderStatus(user.status)}
            </View>

            <View style={styles.cardRow}>
              <Text>
                Paid: <Text style={{ fontWeight: 'bold' }}>${user.paid}</Text>
              </Text>
              <Text>
                Due: <Text style={{ fontWeight: 'bold' }}>${user.due}</Text>
              </Text>
            </View>

            <Text style={styles.cardDate}>Last Payment Date: {user.lastDate}</Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.outlineBtn}
                onPress={() => {
                  setSelectedUser(user);
                  setPaymentModalVisible(true);
                }}
              >
                <Image source={fm1} style={styles.icon} />
                <Text style={styles.outlineText}>Add Payment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlineBtn}>
                <Image source={fm2} style={styles.icon} />
                <Text style={styles.outlineText}>Send Reminder</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.markPaidBtn}
                onPress={() => handleMarkAsPaid(user)}
              >
                <Text style={styles.btnText}>Mark as Paid</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Add Payment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={paymentModalVisible}
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.formTitle}>Add Payment Entry</Text>

            {/* Amount Field */}
            <Text style={styles.label}>Amount</Text>
            <TextInput
              placeholder="Enter Amount"
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            {/* Date Field */}
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setDatePickerVisible(true)}
            >
              <Image source={calendarIcon} style={styles.calendarIcon} />
              <Text style={styles.dateText}>
                {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
              </Text>
            </TouchableOpacity>

            {/* Mode Field */}
            <Text style={styles.label}>Mode</Text>
            <View style={styles.dropdownWrapper}>
              <Picker
                selectedValue={paymentMode}
                onValueChange={(itemValue) => setPaymentMode(itemValue)}
                style={styles.dropdown}
              >
                <Picker.Item label="Cash" value="Cash" />
                <Picker.Item label="UPI" value="UPI" />
                <Picker.Item label="Bank Transfer" value="Bank" />
                <Picker.Item label="Card" value="Card" />
              </Picker>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setPaymentModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSavePayment}>
                <Text style={styles.saveText}>Save Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Date Picker */}
      {datePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flexGrow: 1, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: '600', marginBottom: 10, marginTop: 30 },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  toggleContainer: { flexDirection: 'row', marginBottom: 20 },
  tab: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: 'red' },
  inactiveTab: { backgroundColor: '#fff', borderWidth: 1, borderColor: 'red' },
  tabText: { fontWeight: 'bold' },
  activeTabText: { color: '#fff' },
  inactiveTabText: { color: 'red' },
  cardWrapper: { marginBottom: 20 },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  userName: { fontWeight: 'bold', fontSize: 16 },
  userRoom: { fontSize: 12, color: '#555' },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  cardDate: { fontSize: 12, color: '#444', marginBottom: 10 },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 10 },
  statusText: { fontSize: 12, color: '#fff' },
  buttonGroup: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between' },
  outlineBtn: {
    borderColor: '#555',
    borderWidth: 1,
    padding: 6,
    borderRadius: 6,
    marginBottom: 8,
    flex: 1,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineText: { fontSize: 12, marginLeft: 5, textAlign: 'center' },
  icon: { width: 18, height: 18, resizeMode: 'contain' },
  markPaidBtn: {
    backgroundColor: '#3D91E3',
    padding: 6,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { fontSize: 12, color: '#fff', fontWeight: 'bold' },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  formTitle: { fontSize: 19, fontWeight: '600', marginBottom: 15, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 5, marginTop: 5 },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  calendarIcon: { width: 20, height: 30, marginRight: 10 },
  dateText: { fontSize: 14, color: '#555' },
  dropdownWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdown: { height: 50, width: '100%' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cancelBtn: {
    borderColor: '#888',
    borderWidth: 1,
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelText: { fontWeight: '600', color: '#555' },
  saveBtn: {
    backgroundColor: '#007bff',
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveText: { fontWeight: '600', color: '#fff' },
});
