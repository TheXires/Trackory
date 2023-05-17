import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import 'expo-dev-client';
import * as Localization from 'expo-localization';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import 'react-native-get-random-values';
import { LoadingProvider } from './src/contexts/LoadingContext';
import { i18n } from './src/i18n/i18n';
import RootStackNavigator from './src/navigation/MainNavigator';
import { RealmContext } from './src/realm/RealmContext';
import { MyDarkTheme, MyLightTheme } from './src/theme/colors';

export default function App() {
  const theme = useColorScheme();
  const { RealmProvider } = RealmContext;

  // Realm.deleteFile({ schema: [ItemSchema, ConsumedItemSchema, ConsumptionSchema] });

  i18n.enableFallback = true;
  i18n.defaultLocale = 'en';
  i18n.locale = Localization.locale;

  const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';
  const backgroundColor = theme === 'dark' ? DarkTheme.colors.card : DefaultTheme.colors.card;

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <LoadingProvider>
        <RealmProvider>
          <NavigationContainer theme={theme === 'dark' ? MyDarkTheme : MyLightTheme}>
            <RootStackNavigator />
          </NavigationContainer>
        </RealmProvider>
      </LoadingProvider>
    </>
  );
}

registerRootComponent(App);
