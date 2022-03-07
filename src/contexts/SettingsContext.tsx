import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'i18n-js';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { USER_SETTINGS } from '../constants';
import { firebaseGetUserSettings, firebaseUpdateUserSettings } from '../firebase/settings.firebase';
import { SettingsContextType } from '../types/context';
import { Settings } from '../types/settings';

export const SettingsContext = createContext({} as SettingsContextType);

export function SettingsProvider(props: any) {
  const [settings, setSettings] = useState<Settings | undefined>(undefined);

  useEffect(() => {
    loadUserSettings();
  }, []);

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

  const updateSettings = async (newSettings: Settings) => {
    try {
      await firebaseUpdateUserSettings(newSettings);
      await AsyncStorage.setItem(USER_SETTINGS, JSON.stringify(newSettings));
      await loadUserSettings();
    } catch (error: any) {
      console.error(`updateSettings ${error}`);
      Alert.alert(
        I18n.t('errorTitle'),
        I18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
}
