// got some code from react navigation documentation
// https://reactnavigation.org/docs/tab-based-navigation/
// https://reactnavigation.org/docs/nesting-navigators/
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import NavigationHeaderButton from '../components/NavigationHeaderButton';
import AddItemScreen from '../screens/AddItemScreen';
import CreateItemScreen from '../screens/CreateItemScreen';
import EditItemScreen from '../screens/EditItemScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootStackParamList } from '../types/navigation';
import BottomNavigator from './BottomNavigator';

const RootStack = createSharedElementStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <RootStack.Navigator initialRouteName="Main" screenOptions={{ headerTitleAlign: 'center' }}>
      <RootStack.Screen name="Main" component={BottomNavigator} options={{ headerShown: false }} />
      <RootStack.Screen
        name="AddItem"
        component={AddItemScreen}
        options={{
          headerBackTitle: t('general.control.back'),
          title: t('screen.addItem.title'),
        }}
      />
      <RootStack.Screen
        name="CreateItem"
        component={CreateItemScreen}
        options={{
          headerLeft: () =>
            NavigationHeaderButton({
              onPress: () => navigation.goBack(),
              text: t('general.control.cancel'),
            }),
          title: t('screen.createItem.title'),
        }}
      />
      <RootStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerBackTitle: t('general.control.back'),
          title: t('screen.settings.title'),
        }}
      />
      <RootStack.Screen
        name="ItemDetails"
        component={ItemDetailsScreen}
        sharedElements={(route, otherRoute) => {
          // to only animate when coming from ItemsScreen (LocalItemsScreen, because its in its own stack)
          if (otherRoute.name !== 'LocalItemsScreen') return;
          const { itemId } = route.params;
          return [
            { animation: 'move', id: `item.${itemId}.image` },
            { animation: 'fade', id: `item.${itemId}.name` },
          ];
        }}
        options={{
          headerBackTitle: t('general.control.back'),
          title: t('screen.itemDetails.title'),
        }}
      />
      <RootStack.Screen
        name="EditItem"
        component={EditItemScreen}
        options={{
          headerLeft: () =>
            NavigationHeaderButton({
              onPress: () => navigation.goBack(),
              text: t('general.control.cancel'),
            }),
          presentation: 'modal',
          title: t('screen.editItem.title'),
        }}
      />
    </RootStack.Navigator>
  );
}

export default RootStackNavigator;
