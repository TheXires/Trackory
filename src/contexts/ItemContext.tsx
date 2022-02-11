import React, { createContext, useEffect, useState } from 'react';
import { firebaseGetAllItems } from '../firebase/items.firebase';
import { ItemContextType } from '../interfaces/context';
import { Item } from '../interfaces/item';

export const ItemContext = createContext({} as ItemContextType);

export function ItemProvider(props: any) {
  const [items, setItems] = useState<Item[]>([]);
  const [refreshingItems, setRefreshingItems] = useState<boolean>(false);

  const refreshItems = async () => {
    setRefreshingItems(true);
    try {
      setItems(await firebaseGetAllItems());
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
