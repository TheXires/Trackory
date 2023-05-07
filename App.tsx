import 'expo-dev-client';
import 'react-native-get-random-values';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as Localization from 'expo-localization';
import React from 'react';
import Realm from 'realm';
import { registerRootComponent } from 'expo';
import { StatusBar, useColorScheme } from 'react-native';
import { LoadingProvider } from './src/contexts/LoadingContext';
import { i18n } from './src/i18n/i18n';
import Navigation from './src/navigation';
import './src/firebase/init.firebase';
import { RealmContext } from './src/realm/RealmContext';
import { ItemSchema } from './src/realm/schemas/item.schema';
import { ConsumedItemSchema } from './src/realm/schemas/consumedItem.schema';
import { ConsumptionSchema } from './src/realm/schemas/consumption.schema';

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
          <Navigation />
        </RealmProvider>
      </LoadingProvider>
    </>
  );
}

registerRootComponent(App);
