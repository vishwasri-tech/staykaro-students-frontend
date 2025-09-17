import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function BottomNavBar({ hostelsData }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Image
          source={require("../assets/home.png")}
          style={[styles.icon, { tintColor: "#000" }]}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Search */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("SearchPage", { hostelsData })}
      >
        <Image
          source={require("../assets/Search.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Bookings */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("Bookings")}
      >
        <Image
          source={require("../assets/document.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          source={require("../assets/user.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: hp("1.5%"),
    backgroundColor: "#fff",
    width: wp("100%"),
    position: "absolute",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    width: wp("6%"),
    height: hp("4%"),
  },
});
