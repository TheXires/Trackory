import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Type containing all screens for authStack
 */
export type AuthStackParamList = {
  LandingPage: undefined;
  Login: undefined;
  Registration: undefined;
  ForgotPassword: undefined;
};

/**
 * Type containing all screens for bottomTab
 */
export type BottomTabParamList = {
  HomeScreen: undefined;
  Statistics: undefined;
  Items: undefined;
  Realm: undefined;
};

/**
 * Type containing all screens for rotoStack
 */
export type RootStackParamList = {
  Main: NavigatorScreenParams<BottomTabParamList>;
  AddItem: { daysInPast: number };
  CreateItem: undefined;
  Settings: undefined;
  ItemDetails: { itemId: Realm.BSON.ObjectId };
  EditItem: { itemId: Realm.BSON.ObjectId };
  ChangeEmail: undefined;
  ChangePassword: undefined;
};

// AuthStackNavigator
export type LandingPageNavigationProp = StackNavigationProp<AuthStackParamList, 'LandingPage'>;
export type LoginNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;
export type RegistrationNavigationProp = StackNavigationProp<AuthStackParamList, 'Registration'>;
export type ForgotPasswordNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;

// BottomTabNavigator
export type ConsumedNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'HomeScreen'>,
  StackNavigationProp<RootStackParamList>
>;
export type StatisticsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Statistics'>,
  StackNavigationProp<RootStackParamList>
>;
export type ItemsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Items'>,
  StackNavigationProp<RootStackParamList>
>;

// RootStackNavigator
export type MainNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
export type AddItemNavigationProp = StackNavigationProp<RootStackParamList, 'AddItem'>;
export type CreateItemNavigationProp = StackNavigationProp<RootStackParamList, 'CreateItem'>;
export type SettingsNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;
export type ItemDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'ItemDetails'>;
export type EditItemNavigationProp = StackNavigationProp<RootStackParamList, 'EditItem'>;
export type ChangeEmailNavigationProp = StackNavigationProp<RootStackParamList, 'ChangeEmail'>;
export type ChangePasswordNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChangePassword'
>;

// routeParams
export type ItemDetailsRouteProp = RouteProp<RootStackParamList, 'ItemDetails'>;
export type AddItemRouteProp = RouteProp<RootStackParamList, 'AddItem'>;
export type EditItemRouteProp = RouteProp<RootStackParamList, 'EditItem'>;
export type CreateItemRouteProp = RouteProp<RootStackParamList, 'CreateItem'>;
