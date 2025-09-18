import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const { width } = Dimensions.get('window');
const API_BASE = 'http://192.168.1.5:5000/api/hostel';

const facilitiesList = ['Wi-fi', 'Mess', 'Laundry', 'Water Heater', 'CCTV'];
const hostelTypes = ['Boys', 'Girls', 'Co-live'];

export default function HostelForm() {
  const [form, setForm] = useState({
    name: '',
    type: '',
    address: '',
    roomRent: '',
    messFee: '',
    cautionDeposit: '',
    totalFloors: '',
    roomsPerFloor: '',
    facilities: [],
    image1: null,
    image2: null,
  });
  // Request permissions and pick image
  const handleImagePick = async (slot) => {
    try {
      // Request media library permissions
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Please grant permission to access the media library.');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use MediaTypeOptions
        allowsEditing: false,
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        setForm((prev) => ({
          ...prev,
          [`image${slot}`]: image.uri, // Store local URI
        }));
      }
    } catch (err) {
      console.error('Image pick error:', err.message);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const toggleFacility = (facility) => {
    setForm((prev) => {
      const facilities = prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility];
      return { ...prev, facilities };
    });
  };

  const handleReset = () => {
    setForm({
      name: '',
      type: '',
      address: '',
      roomRent: '',
      messFee: '',
      cautionDeposit: '',
      totalFloors: '',
      roomsPerFloor: '',
      facilities: [],
      image1: null,
      image2: null,
    });
  };

     const handleSave = async () => {
    try {
      const payload = {
        ...form,
        facilities: form.facilities,
        images: [form.image1, form.image2].filter((img) => img !== null),
      };

      const res = await axios.post(`${API_BASE}/add`, payload);

      if (res.data.success) {
        Alert.alert('Success', 'Hostel saved successfully!');
        handleReset();
      }
    } catch (err) {
      console.error('Save error:', err.response?.data || err.message);
      Alert.alert('Error', 'Failed to save hostel');
    }
  };

  // const handleImageUpload = (slot) => {
  //   console.log(`Upload button pressed for slot ${slot}`);
  //   // Image picker logic goes here
  // };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'android' ? -40 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>ADD/EDIT HOSTEL</Text>

        {/* Hostel Name */}
        <Text style={styles.label}>Hostel Name</Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          placeholder="Enter hostel name"
          returnKeyType="done"
        />

        {/* Hostel Type */}
        <Text style={styles.label}>Hostel Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.type}
            onValueChange={(value) => setForm({ ...form, type: value })}
            style={styles.picker}
            dropdownIconColor="#888"
          >
            <Picker.Item label="Type of Hostel" value="" enabled={false} />
            {hostelTypes.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={form.address}
          onChangeText={(text) => setForm({ ...form, address: text })}
          placeholder="Address"
          multiline
          numberOfLines={3}
          returnKeyType="done"
        />

        {/* Facilities */}
        <Text style={styles.label}>Facilities</Text>
        <View style={styles.facilitiesContainer}>
          {facilitiesList.map((facility) => (
            <TouchableOpacity
              key={facility}
              style={styles.facilityRow}
              onPress={() => toggleFacility(facility)}
              activeOpacity={0.7}
            >
              <View style={styles.checkboxBox}>
                {form.facilities.includes(facility) && (
                  <Text style={styles.checkmarkText}>✓</Text>
                )}
              </View>
              <Text style={styles.facilityText}>{facility}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Fee Details */}
        <Text style={styles.label}>Fee Details</Text>
        <View style={styles.feeBox}>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Room Rent</Text>
            <TextInput
              style={styles.feeInput}
              value={form.roomRent}
              onChangeText={(text) => setForm({ ...form, roomRent: text })}
              keyboardType="default"
              returnKeyType="done"
            />
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Mess Fee</Text>
            <TextInput
              style={styles.feeInput}
              value={form.messFee}
              onChangeText={(text) => setForm({ ...form, messFee: text })}
              keyboardType="default"
              returnKeyType="done"
            />
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Caution Deposit</Text>
            <TextInput
              style={styles.feeInput}
              value={form.cautionDeposit}
              onChangeText={(text) =>
                setForm({ ...form, cautionDeposit: text })
              }
              keyboardType="default"
              returnKeyType="done"
            />
          </View>
        </View>

        {/* Room Structure */}
        <Text style={styles.label}>Room Structure</Text>
        <View style={styles.structureRow}>
          <View style={styles.structureCol}>
            <Text style={styles.structureLabel}>Total Floors</Text>
            <TextInput
              style={styles.structureInput}
              value={form.totalFloors}
              onChangeText={(text) => setForm({ ...form, totalFloors: text })}
              keyboardType="default"
              returnKeyType="done"
              maxLength={3}
            />
          </View>
          <View style={styles.structureCol}>
            <Text style={styles.structureLabel}>Rooms per Floor</Text>
            <TextInput
              style={styles.structureInput}
              value={form.roomsPerFloor}
              onChangeText={(text) => setForm({ ...form, roomsPerFloor: text })}
              keyboardType="default"
              returnKeyType="done"
              maxLength={3}
            />
          </View>
        </View>

        {/* Upload Boxes */}
        <View style={styles.uploadContainer}>
          {[1, 2].map((slot) => (
            <View key={slot} style={styles.uploadBox}>
              <TouchableOpacity
                onPress={() => handleImagePick(slot)}
                activeOpacity={0.8}
                style={styles.uploadImageWrapper}
              >
                <Image
                  source={
                    form[`image${slot}`]
                      ? { uri: form[`image${slot}`] }
                      : require('../assets/add-hostel.png')
                  }
                  style={styles.uploadIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleImagePick(slot)}
                style={styles.uploadBoxButton}
                activeOpacity={0.8}
              >
                <Text style={styles.uploadBoxButtonText}>Upload</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
         <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
            Save
          </Button>
          <Button mode="contained" onPress={handleReset} style={styles.resetButton}>
            Reset
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 30,
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#f2f2f2',
    fontSize: 14,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f2f2f2',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  facilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f2f2f2',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    fontSize: 14,
    color: '#28a745',
  },
  facilityText: {
    fontSize: 14,
  },
  feeBox: {
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  feeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  feeLabel: {
    width: 110,
    fontSize: 13,
    lineHeight: 16,
  },
  feeInput: {
    flex: 1,
    height: 36,
    backgroundColor: '#d3d3d3',
    borderRadius: 6,
    paddingHorizontal: 10,
    borderWidth: 0,
    fontSize: 14,
  },
  structureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  structureCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  structureLabel: {
    fontSize: 14,
    marginRight: 10,
    width: 110,
  },
  structureInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 5,
    fontSize: 14,
  },

  // Upload Section
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  uploadBox: {
    width: '43%',
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
  },
  uploadImageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  uploadIcon: {
    width: 100,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  uploadBoxButton: {
    backgroundColor: '#1d76fc',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  uploadBoxButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  saveButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#f66',
    borderRadius: 8,
    paddingVertical: 5,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#f66',
    borderRadius: 8,
    paddingVertical: 5,
  },
  buttonLabel: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
