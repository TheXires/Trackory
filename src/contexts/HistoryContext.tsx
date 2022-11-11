import { orderBy } from 'lodash';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { firebaseConsumeItem, firebaseGetConsumptions } from '../firebase/consumption.firebase';
import { i18n } from '../i18n/i18n';
import { HistoryContextType } from '../types/context';
import { ConsumedItem, Item } from '../types/item';
import { getHistoryFromStorage, saveHistoryToStorage } from '../util/history';

export const HistoryContext = createContext({} as HistoryContextType);

export function HistoryProvider(props: any) {
  const [consumedItems, setConsumedItems] = useState<ConsumedItem[]>([]);
  const [refreshingConsumedItems, setRefreshingConsumedItems] = useState<boolean>(false);

  const refreshConsumedItems = async (daysInPast: number, hidden = false) => {
    if (!hidden) setRefreshingConsumedItems(true);
    try {
      const history = await getHistoryFromStorage(daysInPast);
      const sortedHistoryItems = orderBy(history?.consumedItems ?? [], ['name'], ['asc']);
      setConsumedItems(sortedHistoryItems);
      const newHistory = await firebaseGetConsumptions(history?.lastUpdated ?? 0, daysInPast);
      if (!newHistory) return;
      const sortedNewHistoryItems = orderBy(newHistory, ['name'], ['asc']);
      setConsumedItems(sortedNewHistoryItems);
      await saveHistoryToStorage(daysInPast, Date.now(), sortedNewHistoryItems);
    } catch (error: any) {
      console.error(`refreshConsumedItems ${error}`);
      Alert.alert(
        i18n.t('errorTitle'),
        i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
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
        i18n.t('errorTitle'),
        i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
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
      value={{
        consumeItem,
        consumedItems,
        refreshConsumedItems,
        refreshingConsumedItems,
      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
}
