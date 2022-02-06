// got some code from react navigation documentation
// https://reactnavigation.org/docs/tab-based-navigation/
// https://reactnavigation.org/docs/nesting-navigators/
import { useNavigation, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import I18n from 'i18n-js';
import React from 'react';
import { Platform, Pressable, Text } from 'react-native';
import { HistoryProvider } from '../contexts/HistoryContext';
import { ItemProvider } from '../contexts/ItemContext';
import { SettingsProvider } from '../contexts/SettingsContext';
import AddItemScreen from '../screens/AddItemScreen';
import CreateItemScreen from '../screens/CreateItem';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BottomNavigator from './BottomNavigator';
import { RootStackParamList } from './types.navigation';

const RootStack = createStackNavigator<RootStackParamList>();

function CancelHeader() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Pressable style={{ marginHorizontal: 15 }} onPress={() => navigation.goBack()}>
      <Text
        style={{
          fontSize: 17,
          color: colors.primary,
        }}
      >
        {I18n.t('cancel')}
      </Text>
    </Pressable>
  );
}

function RootStackNavigator() {
  return (
    <SettingsProvider>
      <ItemProvider>
        <HistoryProvider>
          <RootStack.Navigator initialRouteName="Main">
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
                headerLeft: () => (Platform.OS === 'ios' ? CancelHeader() : null),
                headerRight: () => (Platform.OS === 'ios' ? null : CancelHeader()),
              }}
            />
            {/* <RootStack.Screen
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
            <RootStack.Screen
              name="ItemDetails"
              component={ItemDetailsScreen}
              options={{
                title: I18n.t('itemEditTitle'),
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
