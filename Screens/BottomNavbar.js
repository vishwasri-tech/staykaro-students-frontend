import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function BottomNavBar() {
  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={require("../assets/Home.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Clock */}
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={require("../assets/clock.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Map */}
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={require("../assets/fold.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={require("../assets/profile.png")}
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
    width: wp("5.5%"),
    height: hp("4%"),
  },
});
