/* eslint-disable no-restricted-syntax */
import { Consumption, Item } from '../types/item';

export function validateJsonData(data: any): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const { items }: { items: Item[] } = data;
  const { consumptions }: { consumptions: Consumption[] } = data;

  if (!Array.isArray(items) || !Array.isArray(consumptions)) {
    return false;
  }

  for (const item of items) {
    if (!isValidItem(item)) {
      return false;
    }
  }

  for (const consumption of consumptions) {
    if (!isValidConsumption(consumption)) {
      return false;
    }
  }

  return true;
}

function isValidItem(item: any): boolean {
  if (
    !item ||
    typeof item !== 'object' ||
    !('_id' in item) ||
    typeof item._id !== 'string' ||
    !('calories' in item) ||
    typeof item.calories !== 'number' ||
    !('carbohydrates' in item) ||
    typeof item.carbohydrates !== 'number' ||
    !('fat' in item) ||
    typeof item.fat !== 'number' ||
    !('name' in item) ||
    typeof item.name !== 'string' ||
    !('protein' in item) ||
    typeof item.protein !== 'number'
  ) {
    return false;
  }

  if ('image' in item && !(item.image instanceof ArrayBuffer) && item.image != null) {
    return false;
  }

  if ('imgUrl' in item && typeof item.imgUrl !== 'string') {
    return false;
  }

  return true;
}

function isValidConsumedItem(item: any): boolean {
  return isValidItem(item) && 'quantity' in item && typeof item.quantity === 'number';
}

function isValidConsumption(consumption: any): boolean {
  if (
    !consumption ||
    typeof consumption !== 'object' ||
    !('_id' in consumption) ||
    typeof consumption._id !== 'string' ||
    !('date' in consumption) ||
    typeof consumption.date !== 'string' ||
    !('items' in consumption) ||
    !Array.isArray(consumption.items)
  ) {
    return false;
  }

  for (const item of consumption.items) {
    if (!isValidConsumedItem(item)) {
      return false;
    }
  }

  return true;
}
