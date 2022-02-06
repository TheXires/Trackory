import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LandingPage from '../screens/Auth/LandingPage';
import Login from '../screens/Auth/Login';
import Registration from '../screens/Auth/Registration';
import { AuthStackParamList } from './types.navigation';

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="LandingPage"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="LandingPage" component={LandingPage} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Registration" component={Registration} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;
