import { ConsumedItem, Item, NewItem } from './item';
import { Settings } from './settings';
import { DailyStatistic, WeightHistory } from './statistics';

/**
 * Context for saving items
 */
export interface ItemContextType {
  items: Item[];
  refreshItems: () => Promise<void>;
  refreshingItems: boolean;
}

/**
 * Context for saving history of consumed items
 */
export interface HistoryContextType {
  consumedItems: ConsumedItem[];
  refreshConsumedItems: (daysInPast: number, hidden?: boolean) => Promise<void>;
  refreshingConsumedItems: boolean;
  consumeItem: (daysInThePast: number, item: Item, quantity: number) => Promise<void>;
}

/**
 * Context for saving usersettings
 */
export interface SettingsContextType {
  settings: Settings | undefined;
  updateSettings: (newSettings: Settings) => Promise<void>;
}

/**
 * Context for saving userstatics
 */
export interface StatisticsContextType {
  dailyStatistics: DailyStatistic[];
  refreshDailyStatistics: () => Promise<void>;
  refreshingDailyStatistics: boolean;
  weightHistory: WeightHistory[];
}

/**
 * Context for showing global loading spinner 
 */
export interface LoadingContextType {
  showLoadingPopup: (isLoading: boolean, title?: string | undefined) => void;
}
