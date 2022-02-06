// got some code from react navigation documentation
// https://reactnavigation.org/docs/tab-based-navigation/
// https://reactnavigation.org/docs/nesting-navigators/
import { createStackNavigator } from '@react-navigation/stack';
import I18n from 'i18n-js';
import React from 'react';
import { SettingsProvider } from '../contexts/SettingsContext';
import SettingsScreen from '../screens/SettingsScreen';
import BottomNavigator from './BottomNavigator';
import { RootStackParamList } from './types.navigation';

const RootStack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  return (
    <SettingsProvider>
      <RootStack.Navigator initialRouteName="Main">
        <RootStack.Screen
          name="Main"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
        {/* <RootStack.Screen
        name="AddItem"
        component={AddItemScreen}
        options={{
          title: I18n.t('addItemTitle'),
          headerBackTitle: I18n.t('back'),
        }}
      />
      <RootStack.Screen
        name="CreateItem"
        component={CreateItemScreen}
        options={{
          title: I18n.t('createItemTitle'),
          headerLeft: () => (Platform.OS === 'ios' ? CancelHeader() : null),
          headerRight: () => (Platform.OS === 'ios' ? null : CancelHeader()),
        }}
      />
      <RootStack.Screen
        name="Camera"
        component={MyCamera}
        options={{ title: I18n.t('CameraTitle'), headerShown: false }}
      /> */}
        <RootStack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: I18n.t('settingsTitle'),
            headerBackTitle: I18n.t('back'),
          }}
        />
        {/* <RootStack.Screen
        name="ItemDetails"
        component={ItemDetailsScreen}
        options={{
          title: I18n.t('itemEditTitle'),
          headerBackTitle: I18n.t('back'),
        }}
      /> */}
      </RootStack.Navigator>
    </SettingsProvider>
  );
}

export default RootStackNavigator;
