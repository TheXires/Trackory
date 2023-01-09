import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as Localization from 'expo-localization';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { LoadingProvider } from './src/contexts/LoadingContext';
import { i18n } from './src/i18n/i18n';
import Navigation from './src/navigation';
import './src/firebase/init.firebase';

export default function App() {
  const theme = useColorScheme();

  i18n.enableFallback = true;
  i18n.defaultLocale = 'en';
  i18n.locale = Localization.locale;

  const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';
  const backgroundColor = theme === 'dark' ? DarkTheme.colors.card : DefaultTheme.colors.card;

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <LoadingProvider>
        <Navigation />
      </LoadingProvider>
    </>
  );
}
