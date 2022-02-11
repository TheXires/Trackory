import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  firebaseConsumeItem,
  firebaseGetConsumptions,
} from '../firebase/consumption.firebase';
import { HistoryContextType } from '../interfaces/context';
import { CustomError } from '../interfaces/error';
import { ConsumedItem, Item } from '../interfaces/item';

export const HistoryContext = createContext({} as HistoryContextType);

export function HistoryProvider(props: any) {
  const [consumedItems, setConsumedItems] = useState<ConsumedItem[]>([]);
  const [refreshingConsumedItems, setRefreshingConsumedItems] = useState<boolean>(false);

  const refreshConsumedItems = async (daysInThePast: number, hidden = false) => {
    if (!hidden) setRefreshingConsumedItems(true);
    try {
      setConsumedItems(await firebaseGetConsumptions(daysInThePast));
    } catch (error) {
      console.error(`refreshConsumedItems ${error}`);
    }
  };

  const consumeItem = async (
    daysInThePast: number,
    item: Item | ConsumedItem,
    quantity: number,
  ) => {
    try {
      await firebaseConsumeItem(daysInThePast, item, quantity);
      refreshConsumedItems(daysInThePast, true);
    } catch (error) {
      console.error(`consumeItem ${error}`);
      throw error;
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
