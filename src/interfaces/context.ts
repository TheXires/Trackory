import { ConsumedItem, Item, NewItem } from './item';
import { Settings } from './settings';
import { DailyStatistic } from './statistics';

export interface ItemContextType {
  items: Item[];
  refreshItems: () => Promise<void>;
  refreshingItems: boolean;
}

export interface HistoryContextType {
  consumedItems: ConsumedItem[];
  refreshConsumedItems: (date: number) => Promise<void>;
  refreshingConsumedItems: boolean;
  consumeItem: (daysInThePast: number, item: Item, quantity: number) => Promise<void>;
}

export interface SettingsContextType {
  settings: Settings | undefined;
  setSettings: React.Dispatch<React.SetStateAction<Settings | undefined>>;
}

export interface LoadingContextType {
  showLoadingPopup: (isLoading: boolean, title?: string | undefined) => void;
}

export interface StatisticsContextType {
  dailyStatistics: DailyStatistic[];
  refreshDailyStatistics: () => Promise<void>;
  refreshingDailyStatistics: boolean;
}
