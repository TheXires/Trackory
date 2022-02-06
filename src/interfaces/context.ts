import { ConsumedItem, Item, NewItem } from './item';
import { Settings } from './settings';

export interface ItemContextType {
  addItem: (newItem: NewItem, imageUri?: undefined | string) => void;
  items: Item[];
  refreshItems: () => void;
  refreshingItems: boolean;
}

export interface HistoryContextType {
  consumedItems: ConsumedItem[];
  refreshConsumedItems: (date: number) => void;
  refreshingConsumedItems: boolean;
  consumeItem: (daysInThePast: number, item: Item, quantity: number) => void;
}

export interface SettingsContextType {
  settings: Settings | undefined;
  setSettings: React.Dispatch<React.SetStateAction<Settings | undefined>>;
}
