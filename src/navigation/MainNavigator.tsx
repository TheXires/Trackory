// got some code from react navigation documentation
// https://reactnavigation.org/docs/tab-based-navigation/
// https://reactnavigation.org/docs/nesting-navigators/
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
import { RootStackParamList } from '../types/navigation';
import { i18n } from '../util/translation';
import BottomNavigator from './BottomNavigator';

const RootStack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  const navigation = useNavigation();

  return (
    // available provider for logged in users
    <SettingsProvider>
      <ItemProvider>
        <HistoryProvider>
          <StatisticProvider>
            {/* main stack navigator */}
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
                  headerBackTitle: i18n.t('back'),
                  title: i18n.t('addItemTitle'),
                }}
              />
              <RootStack.Screen
                name="CreateItem"
                component={CreateItemScreen}
                options={{
                  headerLeft: () =>
                    NavigationHeaderButton({
                      onPress: () => navigation.goBack(),
                      text: i18n.t('cancel'),
                    }),
                  title: i18n.t('createItemTitle'),
                }}
              />
              <RootStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  headerBackTitle: i18n.t('back'),
                  title: i18n.t('settingsTitle'),
                }}
              />
              <RootStack.Screen
                name="ItemDetails"
                component={ItemDetailsScreen}
                options={{
                  headerBackTitle: i18n.t('back'),
                  title: i18n.t('itemDetailsTitle'),
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
                        text: i18n.t('cancel'),
                      }),
                    title: i18n.t('EditItemTitle'),
                  }}
                />
              </RootStack.Group>
              <RootStack.Screen
                name="ChangeEmail"
                component={ChangeEmailScreen}
                options={{
                  headerBackTitle: i18n.t('back'),
                  title: i18n.t('changeEmailTitle'),
                }}
              />
              <RootStack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{
                  headerBackTitle: i18n.t('back'),
                  title: i18n.t('changePasswordTitle'),
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
