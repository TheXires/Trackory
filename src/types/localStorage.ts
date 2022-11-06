import { ConsumedItem } from './item';

export interface StoredHistory {
  consumedItems: ConsumedItem[];
  date: string;
  lastUpdated: number;
}
