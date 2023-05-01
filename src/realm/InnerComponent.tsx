import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import Realm from 'realm';
import ItemListElement from '../components/ItemListElement';
import Spacer from '../components/Spacer';
import { firebaseGetAllItems } from '../firebase/items.firebase';
import { Item } from '../types/item';
import { RealmContext } from './RealmContext';

const { useQuery, useRealm } = RealmContext;

function InnerComponent() {
  const realm = useRealm();

  const [items, setItems] = useState<Item[]>([]);
  const realmItems = useQuery<Item>('Item').sorted('name');

  const loadItems = async () => {
    const itemUpdates = await firebaseGetAllItems(0);
    setItems(itemUpdates.updatedItems);
  };

  const writeRealmItems = async () => {
    realm.write(() => {
      items.forEach((item) => {
        const t: any = { ...item, _id: new Realm.BSON.ObjectId() };
        delete t.id;
        console.log(t);
        realm.create('Item', t);
      });
    });
  };

  return (
    <View>
      <Text>Spacer</Text>
      <Button title="Log Items" onPress={() => console.log('items:', items)} />
      <Text>Spacer</Text>
      <Button title="Load Items" onPress={loadItems} />
      <Text>Spacer</Text>
      <Button
        title="Log RealmItems"
        onPress={() => console.log('realmItems:', realmItems.sorted('name'))}
      />
      <Text>Spacer</Text>
      <Button title="Write RealmItems" onPress={writeRealmItems} />
      <View style={styles.container}>
        <FlatList
          data={realmItems}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ItemListElement item={item} onPress={() => console.log(item)} />
          )}
          ListFooterComponent={<Spacer height={100} />}
        />
      </View>
    </View>
  );
}

export default InnerComponent;

const styles = StyleSheet.create({
  container: {},
});
