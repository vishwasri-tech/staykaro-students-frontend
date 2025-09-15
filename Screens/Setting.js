// screens/Settings.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Menu Items with Custom Icons */}
      
      <TouchableOpacity style={styles.menuItem}

  onPress={() => navigation.navigate('RoomManagement')} // ✅ Add this line
>
        <Image source={require('../assets/setting1.png')} style={styles.menuIconImage} />
        <Text style={styles.menuText}>Room Management</Text>
        <Ionicons name="chevron-forward" size={16} color="#aaa" />
        
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}
      onPress={() => navigation.navigate('FeeManagement')} >
        <Image source={require('../assets/setting2.png')} style={styles.menuIconImage} />
        <Text style={styles.menuText}>Fee Management</Text>
        <Ionicons name="chevron-forward" size={16} color="#aaa" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Image source={require('../assets/setting3.png')} style={styles.menuIconImage} />
        <Text style={styles.menuText}>Complaint Management</Text>
        <Ionicons name="chevron-forward" size={16} color="#aaa" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Image source={require('../assets/setting4.png')} style={styles.menuIconImage} />
        <Text style={styles.menuText}>Post Announcement</Text>
        <Ionicons name="chevron-forward" size={16} color="#aaa" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '500',
    marginLeft: 85,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginBottom: 3,
  },
});
