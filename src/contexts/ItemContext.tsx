import AsyncStorage from '@react-native-async-storage/async-storage';
import { orderBy } from 'lodash';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ITEMS } from '../constants';
import { firebaseGetAllItems } from '../firebase/items.firebase';
import { ItemContextType } from '../types/context';
import { Item } from '../types/item';
import { deleteItems, mergeItemArrays } from '../util/item';
import { getItemLastUpdateTimeFromStorage, getItemsFromStorage } from '../util/localStorage';
import { i18n } from '../util/translation';

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
      const sortedItems = orderBy(itemsAfterDeleting, ['name'], ['asc']);
      setItems(sortedItems);
      await AsyncStorage.setItem(ITEMS, JSON.stringify(itemsAfterDeleting));
    } catch (error: any) {
      console.error(`refreshItems ${error}`);
      Alert.alert(
        i18n.t('errorTitle'),
        i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
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
      value={{
        items,
        refreshItems,
        refreshingItems,
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
}
