import I18n from 'i18n-js';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { firebaseConsumeItem, firebaseGetConsumptions } from '../firebase/consumption.firebase';
import { HistoryContextType } from '../interfaces/context';
import { ConsumedItem, Item } from '../interfaces/item';
import { getHistoryFromStorage, saveHistoryToStorage } from '../util/history';

export const HistoryContext = createContext({} as HistoryContextType);

export function HistoryProvider(props: any) {
  const [consumedItems, setConsumedItems] = useState<ConsumedItem[]>([]);
  const [refreshingConsumedItems, setRefreshingConsumedItems] = useState<boolean>(false);

  const refreshConsumedItems = async (daysInPast: number, hidden = false) => {
    if (!hidden) setRefreshingConsumedItems(true);
    try {
      const history = await getHistoryFromStorage(daysInPast);
      setConsumedItems(history?.consumedItems ?? []);
      const newHistory = await firebaseGetConsumptions(history?.lastUpdated ?? 0, daysInPast);
      if (!newHistory) return;
      setConsumedItems(newHistory);
      await saveHistoryToStorage(daysInPast, Date.now(), newHistory);
    } catch (error: any) {
      console.error(`refreshConsumedItems ${error}`);
      Alert.alert(
        I18n.t('errorTitle'),
        I18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  };

  const consumeItem = async (daysInPast: number, item: Item | ConsumedItem, quantity: number) => {
    try {
      await firebaseConsumeItem(daysInPast, item, quantity);
      refreshConsumedItems(daysInPast, true);
    } catch (error: any) {
      console.error(`consumeItem ${error}`);
      Alert.alert(
        I18n.t('errorTitle'),
        I18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  };

  useEffect(() => {
    refreshConsumedItems(0);
  }, []);

  useEffect(() => {
    setRefreshingConsumedItems(false);
  }, [consumedItems]);

  return (
    <HistoryContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        consumeItem,
        consumedItems,
        refreshConsumedItems,
        refreshingConsumedItems,
      }}
    >
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </HistoryContext.Provider>
  );
}
