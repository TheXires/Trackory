import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LandingScreen from '../screens/Auth/LandingScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegistrationScreen from '../screens/Auth/RegistrationScreen';
import { AuthStackParamList } from './types.navigation';

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="LandingPage"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="LandingPage" component={LandingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Registration" component={RegistrationScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;
