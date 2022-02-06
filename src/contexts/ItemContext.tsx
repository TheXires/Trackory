import React, { createContext, useEffect, useState } from 'react';
import { firebaseAddItem, firebaseGetAllItems } from '../firebase/items.firebase';
import { ItemContextType } from '../interfaces/context';
import { Item, NewItem } from '../interfaces/item';

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

  const addItem = async (newItem: NewItem, imageUri?: string | undefined) => {
    try {
      // TODO hier weiter machen und wenn imageUri verfügbar ist, das Bild bei Firebase hochladen
      const addedItem = await firebaseAddItem(newItem, imageUri);
      if (!addedItem) throw 'no newItem returned';
      const tmpItems: Item[] = [...items];
      tmpItems.push(addedItem);
      setItems(tmpItems);
    } catch (error) {
      console.error('addItem error: ', error);
    }
  };

  return (
    <ItemContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        addItem,
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
