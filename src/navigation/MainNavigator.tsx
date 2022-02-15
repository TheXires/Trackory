// got some code from react navigation documentation
// https://reactnavigation.org/docs/tab-based-navigation/
// https://reactnavigation.org/docs/nesting-navigators/
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import I18n from 'i18n-js';
import React from 'react';
import NavigationHeaderButton from '../components/NavigationHeaderButton';
import { HistoryProvider } from '../contexts/HistoryContext';
import { ItemProvider } from '../contexts/ItemContext';
import { SettingsProvider } from '../contexts/SettingsContext';
import { StatisticProvider } from '../contexts/StatisticContext';
import AddItemScreen from '../screens/AddItemScreen';
import ChangeEmailScreen from '../screens/ChangeEmailScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import CreateItemScreen from '../screens/CreateItem';
import EditItemScreen from '../screens/EditItemScreen';
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
          <StatisticProvider>
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
                  headerBackTitle: I18n.t('back'),
                  title: I18n.t('addItemTitle'),
                }}
              />
              <RootStack.Screen
                name="CreateItem"
                component={CreateItemScreen}
                options={{
                  headerLeft: () =>
                    NavigationHeaderButton({
                      onPress: () => navigation.goBack(),
                      text: I18n.t('cancel'),
                    }),
                  title: I18n.t('createItemTitle'),
                }}
              />
              <RootStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  headerBackTitle: I18n.t('back'),
                  title: I18n.t('settingsTitle'),
                }}
              />
              <RootStack.Screen
                name="ItemDetails"
                component={ItemDetailsScreen}
                options={{
                  headerBackTitle: I18n.t('back'),
                  title: I18n.t('itemDetailsTitle'),
                }}
              />
              <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                <RootStack.Screen
                  name="EditItem"
                  component={EditItemScreen}
                  options={{
                    headerLeft: () =>
                      NavigationHeaderButton({
                        onPress: () => navigation.goBack(),
                        text: I18n.t('cancel'),
                      }),
                    title: I18n.t('EditItemTitle'),
                  }}
                />
              </RootStack.Group>
              <RootStack.Screen
                name="ChangeEmail"
                component={ChangeEmailScreen}
                options={{
                  headerBackTitle: I18n.t('back'),
                  title: I18n.t('changeEmailTitle'),
                }}
              />
              <RootStack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{
                  headerBackTitle: I18n.t('back'),
                  title: I18n.t('changePasswordTitle'),
                }}
              />
            </RootStack.Navigator>
          </StatisticProvider>
        </HistoryProvider>
      </ItemProvider>
    </SettingsProvider>
  );
}

export default RootStackNavigator;
