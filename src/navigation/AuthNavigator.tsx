import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/Login';
import { AuthStackParamList } from './types.navigation';

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  console.log('called AuthStack');

  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;
