import { Realm } from '@realm/react';
import { registerRootComponent } from 'expo';
import 'expo-dev-client';
import React from 'react';
import 'react-native-get-random-values';
import { RealmContext } from './src/realm/RealmContext';
import { ConsumedItemSchema } from './src/realm/schemas/consumedItem.schema';
import { ConsumptionSchema } from './src/realm/schemas/consumption.schema';
import { ItemSchema } from './src/realm/schemas/item.schema';
import { SettingsSchema } from './src/realm/schemas/settings.schema';
import AppInitializer from './src/AppInitializer';

const { RealmProvider } = RealmContext;

export default function App() {
  // Realm.deleteFile({ schema: [ItemSchema, ConsumedItemSchema, ConsumptionSchema, SettingsSchema] });

  return (
    <RealmProvider>
      <AppInitializer />
    </RealmProvider>
  );
}

registerRootComponent(App);
