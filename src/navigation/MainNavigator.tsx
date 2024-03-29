// got some code from react navigation documentation
// https://reactnavigation.org/docs/tab-based-navigation/
// https://reactnavigation.org/docs/nesting-navigators/
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NavigationHeaderButton from '../components/NavigationHeaderButton';
import { i18n } from '../i18n/i18n';
import AddItemScreen from '../screens/AddItemScreen';
import CreateItemScreen from '../screens/CreateItem';
import EditItemScreen from '../screens/EditItemScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootStackParamList } from '../types/navigation';
import BottomNavigator from './BottomNavigator';

const RootStack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  const navigation = useNavigation();

  return (
    <RootStack.Navigator initialRouteName="Main" screenOptions={{ headerTitleAlign: 'center' }}>
      <RootStack.Screen name="Main" component={BottomNavigator} options={{ headerShown: false }} />
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
    </RootStack.Navigator>
  );
}

export default RootStackNavigator;
