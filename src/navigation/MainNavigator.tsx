// got some code from react navigation documentation
// https://reactnavigation.org/docs/tab-based-navigation/
// https://reactnavigation.org/docs/nesting-navigators/
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from './types.navigation';

const RootStack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  console.log('called RootStack');

  return (
    <RootStack.Navigator initialRouteName="Main">
      <RootStack.Screen name="Main" component={HomeScreen} />
    </RootStack.Navigator>
  );
}

export default RootStackNavigator;
