
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Screens/SplashScreen';
import BannerPage from './Screens/BannerPage';
import SignUp from './Screens/SignUp';
import Login from "./Screens/Login";
import ForgotPassword from './Screens/ForgotPassword';
import RegisterHostel from "./Screens/RegisterHostel";
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

