import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'i18n-js';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { USER_SETTINGS } from '../constants';
import { firebaseGetUserSettings, firebaseUpdateUserSettings } from '../firebase/settings.firebase';
import { SettingsContextType } from '../interfaces/context';
import { Settings } from '../interfaces/settings';

export const SettingsContext = createContext({} as SettingsContextType);

export function SettingsProvider(props: any) {
  const [settings, setSettings] = useState<Settings | undefined>(undefined);

  useEffect(() => {
    const loadUserSettings = async () => {
      try {
        const localSettings = await AsyncStorage.getItem(USER_SETTINGS);
        if (localSettings) setSettings(JSON.parse(localSettings));
        const userSettings = await firebaseGetUserSettings();
        setSettings(userSettings);
        await AsyncStorage.setItem(USER_SETTINGS, JSON.stringify(userSettings));
      } catch (error: any) {
        console.error(error);
        Alert.alert(
          I18n.t('errorTitle'),
          I18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
        );
      }
    };
    loadUserSettings();
  }, []);

  useEffect(() => {
    if (!settings) return;
    firebaseUpdateUserSettings(settings);
  }, [settings]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SettingsContext.Provider value={{ setSettings, settings }}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </SettingsContext.Provider>
  );
}
