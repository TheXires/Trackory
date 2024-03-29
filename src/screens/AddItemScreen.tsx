import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { Realm } from '@realm/react';
import dateFormat from 'dateformat';
import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CreateNewItemButton from '../components/CreateNewItemButton';
import ItemCard from '../components/ItemCard';
import Searchbar from '../components/Searchbar';
import Spacer from '../components/Spacer';
import { DAY_IN_MS } from '../constants';
import { LoadingContext } from '../contexts/LoadingContext';
import { i18n } from '../i18n/i18n';
import { RealmContext } from '../realm/RealmContext';
import { LoadingContextType } from '../types/context';
import { ConsumedItem, Consumption, Item } from '../types/item';
import { AddItemNavigationProp, AddItemRouteProp } from '../types/navigation';

const { useRealm, useQuery } = RealmContext;

function AddItemScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<AddItemNavigationProp>();
  const realm = useRealm();

  const { daysInPast } = useRoute<AddItemRouteProp>().params;

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const items = useQuery<Item>('Item').filtered(`name CONTAINS[c] "${searchTerm}"`).sorted('name');
  const consumption: Consumption = useQuery<Consumption>('Consumption').filtered(
    `date = "${dateFormat(Date.now() - daysInPast * DAY_IN_MS, 'yyyy-mm-dd')}"`,
  )[0];

  const onPress = async (item: Item) => {
    showLoadingPopup(true, i18n.t('add'));
    try {
      if (!consumption) {
        const newConsumption: ConsumedItem = {
          _id: item._id,
          calories: item.calories,
          carbohydrates: item.carbohydrates,
          fat: item.fat,
          image: item.image,
          name: item.name,
          protein: item.protein,
          quantity: 1,
        };
        realm.write(() => {
          realm.create('Consumption', {
            _id: new Realm.BSON.ObjectId(),
            date: dateFormat(Date.now() - daysInPast * DAY_IN_MS, 'yyyy-mm-dd'),
            items: [newConsumption],
          });
        });
      } else {
        const consumedItem = consumption.items.find((i) => i._id.equals(item._id));
        if (consumedItem) {
          realm.write(() => {
            consumedItem.quantity += 1;
          });
        } else {
          const newConsumedItem: ConsumedItem = {
            _id: item._id,
            calories: item.calories,
            carbohydrates: item.carbohydrates,
            fat: item.fat,
            image: item.image,
            name: item.name,
            protein: item.protein,
            quantity: 1,
          };
          realm.write(() => {
            consumption.items.push(newConsumedItem);
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
    showLoadingPopup(false);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <ItemCard item={item} onPress={() => onPress(item)} />}
        ListHeaderComponent={
          <CreateNewItemButton onPress={() => navigation.navigate('CreateItem')} />
        }
        ListFooterComponent={<Spacer height={50} />}
        ItemSeparatorComponent={() => Spacer({ height: 20 })}
        showsVerticalScrollIndicator={false}
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
