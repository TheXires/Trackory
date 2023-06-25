// got some code from react navigation documentation
// https://reactnavigation.org/docs/tab-based-navigation/
// https://reactnavigation.org/docs/nesting-navigators/
import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import HomeScreen from '../screens/HomeScreen';
import ItemsScreen from '../screens/ItemsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

export function HomeScreenTab() {
  const LocalTabStack = createSharedElementStackNavigator();

  return (
    <LocalTabStack.Navigator
      initialRouteName="LocalHomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <LocalTabStack.Screen name="LocalHomeScreen" component={HomeScreen} />
    </LocalTabStack.Navigator>
  );
}

export function StatisticsScreenTab() {
  const LocalTabStack = createSharedElementStackNavigator();

  return (
    <LocalTabStack.Navigator
      initialRouteName="LocalStatisticsScreen"
      screenOptions={{ headerShown: false }}
    >
      <LocalTabStack.Screen name="LocalStatisticsScreen" component={StatisticsScreen} />
    </LocalTabStack.Navigator>
  );
}

export function ItemsScreenTab() {
  const LocalTabStack = createSharedElementStackNavigator();

  return (
    <LocalTabStack.Navigator
      initialRouteName="LocalItemsScreen"
      screenOptions={{ headerShown: false }}
    >
      <LocalTabStack.Screen name="LocalItemsScreen" component={ItemsScreen} />
    </LocalTabStack.Navigator>
  );
}
