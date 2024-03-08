import { registerRootComponent } from 'expo';
import AppInitializer from './src/AppInitializer';
import { RealmContext } from './src/realm/RealmContext';

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
