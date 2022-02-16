import { ConsumedItem } from './item';

export interface StoredHistory {
  consumedItems: ConsumedItem[];
  date: number;
  lastUpdated: number;
}
