import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Type containing all screens for bottomTab
 */
export type BottomTabParamList = {
  HomeScreen: undefined;
  Statistics: undefined;
  Items: undefined;
};

/**
 * Type containing all screens for rotoStack
 */
export type RootStackParamList = {
  Main: NavigatorScreenParams<BottomTabParamList>;
  AddItem: { daysInPast: number };
  CreateItem: undefined;
  Settings: undefined;
  ItemDetails: { itemId: string };
  EditItem: { itemId: string };
};

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
export type ItemDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'ItemDetails'>;
export type EditItemNavigationProp = StackNavigationProp<RootStackParamList, 'EditItem'>;

// routeParams
export type ItemDetailsRouteProp = RouteProp<RootStackParamList, 'ItemDetails'>;
export type AddItemRouteProp = RouteProp<RootStackParamList, 'AddItem'>;
export type EditItemRouteProp = RouteProp<RootStackParamList, 'EditItem'>;
export type CreateItemRouteProp = RouteProp<RootStackParamList, 'CreateItem'>;
