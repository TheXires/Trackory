import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { firebaseGetAllItems } from '../firebase/items.firebase';
import { Item } from '../types/item';
import { RealmContext } from './RealmContext';
import { ItemSchema } from './item';

const { useQuery, useRealm } = RealmContext;

function InnerComponent() {
  const realm = useRealm();

  const [items, setItems] = useState<Item[]>([]);
  const realmItems = useQuery<Item>('Item');
  // const realmItems: Item[] = [];

  useEffect(() => {
    console.log('items:', items);
  }, [items]);

  useEffect(() => {
    console.log('realmItems:', realmItems.sorted('name', true));
  }, [realmItems]);

  const loadItems = async () => {
    const itemUpdates = await firebaseGetAllItems(0);
    setItems(itemUpdates.updatedItems);
  };

  const writeRealmItems = async () => {
    items.forEach((item) => {
      realm.write(() => {
        realm.create('Item', item);
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
    </View>
  );
}

export default InnerComponent;

const styles = StyleSheet.create({});
