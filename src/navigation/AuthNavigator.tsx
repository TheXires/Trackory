import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { i18n } from '../i18n/i18n';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import LandingScreen from '../screens/Auth/LandingScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegistrationScreen from '../screens/Auth/RegistrationScreen';
import { AuthStackParamList } from '../types/navigation';

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LandingPage" component={LandingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Registration" component={RegistrationScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: i18n.t('forgotPasswordTitle'),
        }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;
