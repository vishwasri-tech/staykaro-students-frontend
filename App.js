
// App.js
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavbar from './Screens/BottomNavbar';
import Admin from './Screens/Admin';
import AdminNavbar from './Screens/AdminNavbar';
import AddHostel from './Screens/AddHostel';
import StudentApplications from './Screens/StudentApplications';
import SplashScreen from "./Screens/SplashScreen";
import BannerPage from "./Screens/BannerPage";
import SignUp from "./Screens/SignUp";
import Login from "./Screens/Login";
import ForgotPassword from "./Screens/ForgotPassword";
import RegisterHostel from "./Screens/RegisterHostel";
import HomePage from "./Screens/HomePage";
import HostelDetails from "./Screens/HostelDetails";
import Setting from "./Screens/Setting";
import RoomManagement from "./Screens/RoomManagement";
import FeeManagement from "./Screens/FeeManagement";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="BannerPage" component={BannerPage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="RegisterHostel" component={RegisterHostel} />

        
        {/* Hostel details screen (opened from HomePage) */}
        <Stack.Screen name="HostelDetails" component={HostelDetails} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="BottomNavbar" component={BottomNavbar} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="AdminNavbar" component={AdminNavbar} />
        <Stack.Screen name='AddHostel' component={AddHostel}/>
        <Stack.Screen name='StudentApplications' component={StudentApplications}/> 
        <Stack.Screen name='Setting' component={Setting}/>
        <Stack.Screen name='RoomManagement' component={RoomManagement}/>
        <Stack.Screen name='FeeManagement' component={FeeManagement}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
