// got some code from react navigation documentation
// https://reactnavigation.org/docs/tab-based-navigation/
// https://reactnavigation.org/docs/nesting-navigators/
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import I18n from 'i18n-js';
import React from 'react';
import { Platform, Pressable, Text } from 'react-native';
import { HistoryProvider } from '../contexts/HistoryContext';
import { ItemProvider } from '../contexts/ItemContext';
import { SettingsProvider } from '../contexts/SettingsContext';
import AddItemScreen from '../screens/AddItemScreen';
import ChangeEmailScreen from '../screens/ChangeEmailScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import CreateItemScreen from '../screens/CreateItem';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BottomNavigator from './BottomNavigator';
import { RootStackParamList } from './types.navigation';

const RootStack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  const navigation = useNavigation();

  return (
    <SettingsProvider>
      <ItemProvider>
        <HistoryProvider>
          <RootStack.Navigator
            initialRouteName="Main"
            screenOptions={{ headerTitleAlign: 'center' }}
          >
            <RootStack.Screen
              name="Main"
              component={BottomNavigator}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
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
                headerLeft: () =>
                  NavigationHeaderButton({
                    text: I18n.t('cancel'),
                    onPress: () => navigation.goBack(),
                  }),
              }}
            />
            <RootStack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                title: I18n.t('settingsTitle'),
                headerBackTitle: I18n.t('back'),
              }}
            />
            <RootStack.Screen
              name="ItemDetails"
              component={ItemDetailsScreen}
              options={{
                title: I18n.t('itemDetailsTitle'),
                headerBackTitle: I18n.t('back'),
              }}
            />
            <RootStack.Screen
              name="ChangeEmail"
              component={ChangeEmailScreen}
              options={{
                title: I18n.t('changeEmailTitle'),
                headerBackTitle: I18n.t('back'),
              }}
            />
            <RootStack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen}
              options={{
                title: I18n.t('changePasswordTitle'),
                headerBackTitle: I18n.t('back'),
              }}
            />
          </RootStack.Navigator>
        </HistoryProvider>
      </ItemProvider>
    </SettingsProvider>
  );
}

export default RootStackNavigator;
