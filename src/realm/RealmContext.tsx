import { createRealmContext } from '@realm/react';
import { consumedItemSchema } from '../schemas/consumedItem.schema';
import { ConsumptionSchema } from '../schemas/consumption.schema';
import { ItemSchema } from '../schemas/item.schema';

/**
 * Realm context for the app.
 */
export const RealmContext = createRealmContext({
  schema: [ItemSchema, consumedItemSchema, ConsumptionSchema],
});
