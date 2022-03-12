import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import CreateNewItemButton from '../components/CreateNewItemButton';
import ItemCard from '../components/ItemCard';
import Searchbar from '../components/Searchbar';
import Spacer from '../components/Spacer';
import { HistoryContext } from '../contexts/HistoryContext';
import { ItemContext } from '../contexts/ItemContext';
import { LoadingContext } from '../contexts/LoadingContext';
import { HistoryContextType, ItemContextType, LoadingContextType } from '../types/context';
import { Item } from '../types/item';
import { AddItemNavigationProp, AddItemRouteProp } from '../types/navigation';

function Separator() {
  return <View style={{ height: 20 }} />;
}

function AddItemScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<AddItemNavigationProp>();
  const { daysInPast } = useRoute<AddItemRouteProp>().params;

  const { items, refreshItems, refreshingItems } = useContext<ItemContextType>(ItemContext);
  const { consumeItem } = useContext<HistoryContextType>(HistoryContext);
  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (searchTerm === '') return setFilteredItems(items);
    return setFilteredItems(
      items.filter((element) =>
        element.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
      ),
    );
  }, [searchTerm, items]);

  const onPress = async (item: Item) => {
    showLoadingPopup(true, I18n.t('add'));
    await consumeItem(daysInPast, item, 1);
    showLoadingPopup(false);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FlatList
        data={filteredItems}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemCard item={item} onPress={() => onPress(item)} />}
        ListHeaderComponent={<CreateNewItemButton onPress={() => navigation.navigate('CreateItem')} />}
        ListFooterComponent={<Spacer height={50} />}
        ItemSeparatorComponent={() => Separator()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshingItems}
            onRefresh={refreshItems}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
}

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});
