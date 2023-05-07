import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FloatingActionButton from '../components/FloatingActionButton';
import ItemListElement from '../components/ItemListElement';
import Searchbar from '../components/Searchbar';
import Spacer from '../components/Spacer';
import { RealmContext } from '../realm/RealmContext';
import { Item } from '../types/item';
import { ItemsNavigationProp } from '../types/navigation';

const { useQuery } = RealmContext;

function ItemsScreen() {
  const navigation = useNavigation<ItemsNavigationProp>();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const realmItems = useQuery<Item>('Item')
    .filtered(`name CONTAINS[c] "${searchTerm}"`)
    .sorted('name');

  return (
    <>
      <View style={styles.container}>
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FlatList
          data={realmItems}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ItemListElement
              item={item}
              onPress={() => navigation.navigate('ItemDetails', { itemId: item._id.toHexString() })}
            />
          )}
          ListFooterComponent={<Spacer height={100} />}
        />
      </View>
      <FloatingActionButton icon="edit-2" onPress={() => navigation.navigate('CreateItem')} />
    </>
  );
}

export default ItemsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});
