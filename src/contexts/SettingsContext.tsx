import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  firebaseGetUserSettings,
  firebaseUpdateUserSettings,
} from '../firebase/settings.firebase';
import { SettingsContextType } from '../interfaces/context';
import { Settings } from '../interfaces/settings';
import { USER_SETTINGS } from '../constants';

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
      } catch (error) {
        console.error(error);
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
