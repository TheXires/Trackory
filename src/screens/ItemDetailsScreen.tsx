import { useNavigation, useRoute } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import placeholderImage from '../../assets/itemPlaceholderImage.png';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import CustomButton from '../components/CustomButton';
import Dialog from '../components/Dialog';
import HorizontalLine from '../components/HorizontalLine';
import ItemDetailsRow from '../components/ItemDetailsRow';
import { ItemContext } from '../contexts/ItemContext';
import { firebaseRemoveItem } from '../firebase/items.firebase';
import { ItemContextType } from '../interfaces/context';
import { Item } from '../interfaces/item';
import {
  ItemDetailsNavigationProp,
  ItemDetailsRouteProp,
} from '../navigation/types.navigation';
import { permanentColors } from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    aspectRatio: 1 / 1,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  dataContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: 35,
  },
});

function ItemDetailsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<ItemDetailsNavigationProp>();
  const route = useRoute<ItemDetailsRouteProp>();

  const { items } = useContext<ItemContextType>(ItemContext);

  const [itemId, setItemId] = useState<string | undefined>(undefined);
  const [item, setItem] = useState<Item | undefined>(undefined);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    if (route.params.itemId) setItemId(route.params.itemId);
    setItem(items.find((element: Item) => element.id === itemId));
  }, [route, itemId, items]);

  const removeItem = async () => {
    try {
      if (!itemId) throw 'no itemId to remove';
      const result = await firebaseRemoveItem(itemId);
      if (result === -1) throw 'unable to remove item';
      navigation.goBack();
    } catch (error) {
      console.error(`unable to remove item: ${error}`);
      setShowDialog(true);
    }
  };

  if (!item) return <CustomActivityIndicator />;

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.imageContainer}>
            {/* Item image */}
            <Image
              style={styles.image}
              source={item.imgUrl !== '' ? { uri: item.imgUrl } : placeholderImage}
            />
            <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
          </View>
          <View style={styles.dataContainer}>
            {/* calories */}
            <ItemDetailsRow
              left={I18n.t('calories')}
              right={`${item.calories} ${I18n.t('calorieAbbreviation')}`}
            />
            <HorizontalLine />
            {/* fat */}
            <ItemDetailsRow
              left={I18n.t('fat')}
              right={`${item.fat} ${I18n.t('gramAbbreviation')}`}
            />
            <HorizontalLine />
            {/* protein */}
            <ItemDetailsRow
              left={I18n.t('protein')}
              right={`${item.protein} ${I18n.t('gramAbbreviation')}`}
            />
            <HorizontalLine />
            {/* carbonHydrates */}
            <ItemDetailsRow
              left={I18n.t('carbohydrates')}
              right={`${item.carbonHydrates} ${I18n.t('gramAbbreviation')}`}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            value={I18n.t('editItem')}
            onPress={() => alert('to implement')}
            textColor={colors.text}
            buttonColor={colors.background}
            style={{ paddingHorizontal: 25, marginBottom: 15 }}
          />
          <CustomButton
            value={I18n.t('deleteItem')}
            onPress={() => alert('call remove function')}
            textColor={permanentColors.error}
            buttonColor={colors.background}
            style={{ paddingHorizontal: 25, marginBottom: 15 }}
          />
        </View>
      </View>

      <Dialog show={showDialog} onClose={() => setShowDialog(false)}>
        <Text>dklsflkjsad</Text>
      </Dialog>
    </>
  );
}

export default ItemDetailsScreen;
