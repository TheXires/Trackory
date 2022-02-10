import { useNavigation, useRoute } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, View } from 'react-native';
import placeholderImage from '../../assets/itemPlaceholderImage.png';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import CustomButton from '../components/CustomButton';
import HorizontalLine from '../components/HorizontalLine';
import ItemDetailsRow from '../components/ItemDetailsRow';
import NavigationHeaderButton from '../components/NavigationHeaderButton';
import { ItemContext } from '../contexts/ItemContext';
import { LoadingContext } from '../contexts/LoadingContext';
import { firebaseRemoveItem } from '../firebase/items.firebase';
import { ItemContextType, LoadingContextType } from '../interfaces/context';
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
    height: '40%',
  },
  image: {
    height: 200,
    aspectRatio: 1 / 1,
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
    flex: 1,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
  },
});

function ItemDetailsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<ItemDetailsNavigationProp>();
  const route = useRoute<ItemDetailsRouteProp>();

  const { items, refreshItems } = useContext<ItemContextType>(ItemContext);
  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [item, setItem] = useState<Item | undefined>(undefined);

  useEffect(() => {
    if (!route.params.itemId) return;
    setItem(items.find((element: Item) => element.id === route.params.itemId));
    navigation.setOptions({
      headerRight: () =>
        NavigationHeaderButton({
          text: I18n.t('edit'),
          onPress: () => navigation.navigate('EditItem', { itemId: route.params.itemId }),
        }),
    });
  }, [route, items, navigation]);

  const deleteItem = async () => {
    showLoadingPopup(true, I18n.t('deleteItem'));
    try {
      if (!item?.id) throw 'no itemId to remove';
      await firebaseRemoveItem(item.id);
      refreshItems();
      showLoadingPopup(false);
      navigation.goBack();
    } catch (error) {
      showLoadingPopup(false);
      console.error(`unable to remove item: ${error}`);
      Alert.alert(I18n.t('errorTitle'), I18n.t('unexpectedError'), [{ text: 'OK' }]);
    }
  };

  const deleteItemPopup = () => {
    Alert.alert(I18n.t('deleteItemDialogTitle'), I18n.t('deleteItemDialogText'), [
      { text: I18n.t('cancel'), style: 'cancel' },
      { text: I18n.t('delete'), style: 'destructive', onPress: () => deleteItem() },
    ]);
  };

  if (!item) return <CustomActivityIndicator />;

  return (
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
            description={I18n.t('calories')}
            unit={I18n.t('calorieAbbreviation')}
            value={item.calories}
          />
          <HorizontalLine />
          {/* fat */}
          <ItemDetailsRow
            description={I18n.t('fat')}
            unit={I18n.t('gramAbbreviation')}
            value={item.fat}
          />
          <HorizontalLine />
          {/* protein */}
          <ItemDetailsRow
            description={I18n.t('protein')}
            unit={I18n.t('gramAbbreviation')}
            value={item.protein}
          />
          <HorizontalLine />
          {/* carbohydrates */}
          <ItemDetailsRow
            description={I18n.t('carbohydrates')}
            unit={I18n.t('gramAbbreviation')}
            value={item.carbohydrates}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          value={I18n.t('deleteItem')}
          onPress={deleteItemPopup}
          textColor={permanentColors.error}
          buttonColor={colors.background}
        />
      </View>
    </View>
  );
}

export default ItemDetailsScreen;
