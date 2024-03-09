import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Realm } from '@realm/react';
import 'expo-dev-client';
import * as Localization from 'expo-localization';
import React, { useEffect, useMemo, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import 'react-native-get-random-values';
import { LoadingProvider } from './contexts/LoadingContext';
import RootStackNavigator from './navigation/MainNavigator';
import { RealmContext } from './realm/RealmContext';
import { MyDarkTheme, MyLightTheme } from './theme/colors';
import { Setting } from './types/settings';
import { I18nextProvider } from 'react-i18next';
import translator from './i18n/i18next';

const { useQuery, useRealm } = RealmContext;

export default function AppInitializer() {
  const systemScheme = useColorScheme();
  const realm = useRealm();

  const initialStart = useQuery<Setting>('Setting').filtered("key == 'initialStart'")[0]?.value;
  const language = useQuery<Setting>('Setting').filtered("key == 'language'")[0]?.value;
  const theme = useQuery<Setting>('Setting').filtered("key == 'theme'")[0]?.value;
  const calorieTarget = useQuery<Setting>('Setting').filtered("key == 'calorieTarget'")[0]?.value;

  const [colorTheme, setColorTheme] = useState<string>(
    theme === 'system' ? systemScheme ?? 'light' : theme,
  );

  const saveDefaultSettings = () => {
    try {
      realm.write(() => {
        if (!initialStart)
          realm.create('Setting', {
            _id: new Realm.BSON.ObjectId(),
            key: 'initialStart',
            value: 'false',
          });
        if (!theme)
          realm.create('Setting', {
            _id: new Realm.BSON.ObjectId(),
            key: 'theme',
            value: 'system',
          });
        if (!language)
          realm.create('Setting', {
            _id: new Realm.BSON.ObjectId(),
            key: 'language',
            value: 'system',
          });
        if (!calorieTarget)
          realm.create('Setting', {
            _id: new Realm.BSON.ObjectId(),
            key: 'calorieTarget',
            value: '2000',
          });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const appLanguage = useMemo(
    () =>
      !language || language === 'system' ? Localization.getLocales()[0].languageTag : language,
    [language, Localization],
  );

  useEffect(() => {
    // App language
    translator.changeLanguage(appLanguage);
  }, [appLanguage]);

  useEffect(() => {
    if (initialStart === 'false') return;
    saveDefaultSettings();
  }, []);

  useEffect(() => {
    if (theme !== 'system') return;
    setColorTheme(systemScheme ?? 'light');
  }, [systemScheme]);

  const barStyle = colorTheme === 'dark' ? 'light-content' : 'dark-content';
  const backgroundColor = colorTheme === 'dark' ? DarkTheme.colors.card : DefaultTheme.colors.card;

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <I18nextProvider i18n={translator}>
        <LoadingProvider>
          <NavigationContainer theme={colorTheme === 'dark' ? MyDarkTheme : MyLightTheme}>
            <RootStackNavigator />
          </NavigationContainer>
        </LoadingProvider>
      </I18nextProvider>
    </>
  );
}
