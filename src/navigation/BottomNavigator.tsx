import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import HeaderRightButton from '../components/HeaderRightButton';
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
  const { t } = useTranslation();

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
          title: t('screen.home.title'),
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
          title: t('screen.statistics.title'),
        }}
      />
      <MainTab.Screen
        name="Items"
        component={ItemsScreenTab}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIcon({ color: focused ? colors.primary : colors.text, icon: 'coffee' }),
          title: t('screen.items.title'),
        }}
      />
    </MainTab.Navigator>
  );
}

export default BottomNavigator;
