import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { ITEMS, ITEMS_LAST_UPDATED } from '../constants';
import { firebaseGetAllItems } from '../firebase/items.firebase';
import { ItemContextType } from '../interfaces/context';
import { Item } from '../interfaces/item';
import { deleteItems, mergeItemArrays, mergeItems } from '../util/item';
import { getItemLastUpdateTimeFromStorage, getItemsFromStorage } from '../util/localStorage';

export const ItemContext = createContext({} as ItemContextType);

export function ItemProvider(props: any) {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Item[]>([]);
  const [refreshingItems, setRefreshingItems] = useState<boolean>(false);

  const refreshItems = async () => {
    setRefreshingItems(true);
    try {
      const lastUpdated = await getItemLastUpdateTimeFromStorage();
      let localItems: Item[] = [];
      if (initialLoading) {
        const storedItems = await getItemsFromStorage();
        localItems = mergeItemArrays(storedItems, items);
        setInitialLoading(false);
      } else {
        localItems = [...items];
      }
      const { updatedItems, deletedItemIds } = await firebaseGetAllItems(lastUpdated);
      const itemsAfterMerging = mergeItemArrays(localItems, updatedItems);
      const itemsAfterDeleting = deleteItems(itemsAfterMerging, deletedItemIds);
      setItems(itemsAfterDeleting);
      await AsyncStorage.setItem(ITEMS, JSON.stringify(itemsAfterDeleting));
    } catch (error) {
      console.error(`refreshItems ${error}`);
    }
  };

  useEffect(() => {
    refreshItems();
  }, []);

  useEffect(() => {
    setRefreshingItems(false);
  }, [items]);

  return (
    <ItemContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        items,
        refreshItems,
        refreshingItems,
      }}
    >
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </ItemContext.Provider>
  );
}
