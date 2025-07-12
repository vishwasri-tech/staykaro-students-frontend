
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Screens/SplashScreen';
import BannerPage from './Screens/BannerPage';
import SignUp from './Screens/SignUp';
import Login from "./Screens/Login";
import ForgotPassword from './Screens/ForgotPassword';
import RegisterHostel from "./Screens/RegisterHostel";
import HomePage from "./Screens/HomePage";
import BottomNavbar from "./Screens/BottomNavbar";
import BoysHostelsPage from "./Screens/BoysHostelsPage";
import CoLiving from "./Screens/CoLiving";
import GirlsHostelsPage from "./Screens/GirlsHostelsPage";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="BottomNavbar" component={BottomNavbar} />
            <Stack.Screen name="BoysHostelsPage" component={BoysHostelsPage} />
            <Stack.Screen name="CoLiving" component={CoLiving} />
            <Stack.Screen name="GirlsHostelsPage" component={GirlsHostelsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

