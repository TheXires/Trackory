import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as Localization from 'expo-localization';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { LoadingProvider } from './src/contexts/LoadingContext';
import Navigation from './src/navigation';
import { i18n } from './src/util/translation';

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
