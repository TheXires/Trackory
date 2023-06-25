import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import HeaderRightButton from '../components/HeaderRightButton';
import { i18n } from '../i18n/i18n';
import { BottomTabParamList } from '../types/navigation';
import { HomeScreenTab, ItemsScreenTab, StatisticsScreenTab } from './TabStack';

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
      screenOptions={{ headerRight: () => SettingsButton(), headerTitleAlign: 'center' }}
    >
      <MainTab.Screen
        name="HomeScreen"
        component={HomeScreenTab}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIcon({ color: focused ? colors.primary : colors.text, icon: 'home' }),
          title: i18n.t('overviewTitle'),
        }}
      />
      <MainTab.Screen
        name="Statistics"
        component={StatisticsScreenTab}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              color: focused ? colors.primary : colors.text,
              icon: 'bar-chart-2',
            }),
          title: i18n.t('statisticTitle'),
        }}
      />
      <MainTab.Screen
        name="Items"
        component={ItemsScreenTab}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIcon({ color: focused ? colors.primary : colors.text, icon: 'coffee' }),
          title: i18n.t('itemsTitle'),
        }}
      />
    </MainTab.Navigator>
  );
}

export default BottomNavigator;
