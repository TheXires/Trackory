import { createRealmContext } from '@realm/react';
import { ItemSchema } from './item';

export const RealmContext = createRealmContext({
  schema: [ItemSchema],
});

