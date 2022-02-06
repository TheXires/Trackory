import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React from 'react';
import HeaderRightButton from '../components/HeaderRightButton';
import HomeScreen from '../screens/HomeScreen';
import ItemsScreen from '../screens/ItemsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import { BottomTabParamList } from './types.navigation';

interface IconProps {
  icon: 'home' | 'bar-chart-2' | 'coffee';
  color: string;
}

const MainTab = createBottomTabNavigator<BottomTabParamList>();

function TabBarIcon({ icon, color }: IconProps) {
  return <Feather name={icon} size={24} color={color} />;
}

function SettingsButton() {
  return <HeaderRightButton targetScreen="Settings" />;
}

function BottomNavigator() {
  const { colors } = useTheme();

  return (
    <MainTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerRight: () => SettingsButton() }}
    >
      <MainTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: I18n.t('overviewTitle'),
          tabBarIcon: ({ focused }) =>
            TabBarIcon({ icon: 'home', color: focused ? colors.primary : colors.text }),
        }}
      />
      <MainTab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          title: I18n.t('statisticTitle'),
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              icon: 'bar-chart-2',
              color: focused ? colors.primary : colors.text,
            }),
        }}
      />
      <MainTab.Screen
        name="Items"
        component={ItemsScreen}
        options={{
          title: I18n.t('itemsTitle'),
          tabBarIcon: ({ focused }) =>
            TabBarIcon({ icon: 'coffee', color: focused ? colors.primary : colors.text }),
        }}
      />
    </MainTab.Navigator>
  );
}

export default BottomNavigator;
