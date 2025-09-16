import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';  
// you can choose other icon set; Ionicons used as example

const { width } = Dimensions.get('window');

const complaintsData = [
  {
    id: '1',
    room: 'Room No 101',
    title: 'Water Leakage',
    date: 'Apr 20',
    status: 'Open',
    description:
      'There is water leakage in the ceiling. The leak has been dripping water on the floor, causing a wet patch that is spreading.',
  },
  {
    id: '2',
    room: 'Room No 203',
    title: 'Internet Outage',
    date: 'Apr 20',
    status: 'In Progress',
    description: '',
  },
  {
    id: '3',
    room: 'Room No 104',
    title: 'Broken Window',
    date: 'Apr 15',
    status: 'Resolved',
    description: '',
  },
];

export default function App() {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [filter, setFilter] = useState('All');

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Open':
        return styles.statusOpen;
      case 'In Progress':
        return styles.statusInProgress;
      case 'Resolved':
        return styles.statusResolved;
      default:
        return {};
    }
  };

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setStatus(complaint.status);
    setNotes('');
    setModalVisible(true);
  };

  const filteredComplaints = complaintsData.filter((c) => {
    if (filter === 'All') return true;
    return c.status === filter;
  });

  return (
    <View style={styles.container}>
      {/* Header with bell icon */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Complaint Management</Text>
        <TouchableOpacity style={styles.bellButton}>
          <Icon name="notifications" size={24} color="#1e0303ff" />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Search complaints"
        style={styles.searchInput}
        // you may add onChangeText & search logic
      />

      {/* Filter / “All” button */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'All' ? styles.filterActive : null,
          ]}
          onPress={() => setFilter('All')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === 'All' ? styles.filterActiveText : null,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'Open' ? styles.filterActive : null,
          ]}
          onPress={() => setFilter('Open')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === 'Open' ? styles.filterActiveText : null,
            ]}
          >
            Open
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'In Progress' ? styles.filterActive : null,
          ]}
          onPress={() => setFilter('In Progress')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === 'In Progress' ? styles.filterActiveText : null,
            ]}
          >
            In Progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'Resolved' ? styles.filterActive : null,
          ]}
          onPress={() => setFilter('Resolved')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === 'Resolved' ? styles.filterActiveText : null,
            ]}
          >
            Resolved
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredComplaints}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.roomText}>{item.room}</Text>
              <Text>{item.date}</Text>
            </View>
            <Text style={styles.titleText}>{item.title}</Text>
            <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
            <TouchableOpacity onPress={() => openModal(item)}>
              <Text style={styles.viewDetails}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>

              <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
              >
                {selectedComplaint && (
                  <>
                    <Text style={styles.modalHeader}>Complaint Details</Text>

                    <View style={styles.descriptionBox}>
                      <Text style={styles.modalTitle}>{selectedComplaint.title}</Text>
                      <Text style={styles.modalDescription}>
                        {selectedComplaint.description || 'No description provided.'}
                      </Text>
                    </View>

                    <Image
                      source={require('../assets/complaint.png')}
                      style={styles.modalImage}
                      resizeMode="cover"
                    />

                    <Text style={styles.label}>Status</Text>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={status}
                        onValueChange={(itemValue) => setStatus(itemValue)}
                        style={styles.picker}
                      >
                        <Picker.Item label="Open" value="Open" />
                        <Picker.Item label="In Progress" value="In Progress" />
                        <Picker.Item label="Resolved" value="Resolved" />
                      </Picker>
                    </View>

                    <Text style={styles.label}>Notes</Text>
                    <TextInput
                      style={styles.notesInput}
                      placeholder="Add a comment..."
                      value={notes}
                      onChangeText={setNotes}
                      multiline
                    />

                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => {
                        // you might want to update the complaint data here
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                  </>
                )}
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
  },
  bellButton: {
    padding: 8,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 20,
    // you may want to enable horizontal scroll if many filters
  },
  filterButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  filterActive: {
    backgroundColor: '#007bff', // active color
    borderColor: '#007bff',
  },
  filterButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  filterActiveText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomText: {
    fontWeight: '600',
    fontSize: 16,
  },
  titleText: {
    marginVertical: 6,
    color: '#555',
  },
  viewDetails: {
    color: '#0066cc',
    marginTop: 10,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  statusOpen: {
    backgroundColor: '#e74c3c',
    marginLeft: 280,
  },
  statusInProgress: {
    backgroundColor: '#f1c40f',
    marginLeft: 250,
  },
  statusResolved: {
    backgroundColor: '#2ecc71',
    marginLeft: 260,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000077',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '85%',
  },
  modalClose: {
    alignSelf: 'flex-end',
  },
  modalCloseText: {
    fontSize: 18,
    color: '#000',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  descriptionBox: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  modalDescription: {
    color: '#444',
  },
  modalImage: {
    width: '100%',
    height: width * 0.5,
    borderRadius: 8,
    marginBottom: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 60,
    width: '100%',
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },
  notesInput: {
    borderWidth: 1,
    height: 80,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
