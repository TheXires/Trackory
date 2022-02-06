// import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackParamList = {
  Login: undefined;
};

export type RootStackParamList = {
  Main: undefined;
};

// AuthStackNavigator
export type LoginNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

// RootStackNavigator
export type MainNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
