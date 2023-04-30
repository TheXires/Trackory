import { useNavigation, useRoute } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
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
import { i18n } from '../i18n/i18n';
import { permanentColors } from '../theme/colors';
import { ItemContextType, LoadingContextType } from '../types/context';
import { CustomError } from '../types/error';
import { Item } from '../types/item';
import { ItemDetailsNavigationProp, ItemDetailsRouteProp } from '../types/navigation';
import { RealmContext } from '../realm/RealmContext';

const { useQuery, useRealm, useObject } = RealmContext;

function ItemDetailsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<ItemDetailsNavigationProp>();
  const route = useRoute<ItemDetailsRouteProp>();

  const { items, refreshItems } = useContext<ItemContextType>(ItemContext);
  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const item = useObject<Item>('Item', route.params.itemId);

  useEffect(() => {
    if (!route.params.itemId) return;
    navigation.setOptions({
      headerRight: () =>
        NavigationHeaderButton({
          // TODO ab hier weiter machen
          onPress: () => navigation.navigate('EditItem', { itemId: route.params.itemId }),
          text: i18n.t('edit'),
        }),
    });
  }, [route, items, navigation]);

  const deleteItem = async () => {
    showLoadingPopup(true, i18n.t('deleteItem'));
    try {
      if (!item) throw new CustomError('unexpectedError');
      await firebaseRemoveItem(item);
      await refreshItems();
      showLoadingPopup(false);
      navigation.goBack();
    } catch (error: any) {
      showLoadingPopup(false);
      Alert.alert(
        i18n.t('errorTitle'),
        i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  };

  const deleteItemPopup = () => {
    Alert.alert(i18n.t('deleteItemDialogTitle'), i18n.t('deleteItemDialogText'), [
      { style: 'cancel', text: i18n.t('cancel') },
      { onPress: () => deleteItem(), style: 'destructive', text: i18n.t('delete') },
    ]);
  };

  if (!item) return <CustomActivityIndicator />;

  return (
    <View style={styles.container}>
      <View>
        {/* Item image */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={item.imgUrl !== '' ? { uri: item.imgUrl } : placeholderImage}
          />
          {/* Item name */}
          <Text
            style={[styles.itemName, { color: colors.text }]}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
        </View>
        <View style={styles.dataContainer}>
          {/* calories */}
          <ItemDetailsRow
            description={i18n.t('calories')}
            unit={i18n.t('calorieAbbreviation')}
            value={item.calories}
          />
          <HorizontalLine />

          {/* fat */}
          <ItemDetailsRow
            description={i18n.t('fat')}
            unit={i18n.t('gramAbbreviation')}
            value={item.fat}
          />
          <HorizontalLine />

          {/* carbohydrates */}
          <ItemDetailsRow
            description={i18n.t('carbohydrates')}
            unit={i18n.t('gramAbbreviation')}
            value={item.carbohydrates}
          />
          <HorizontalLine />

          {/* protein */}
          <ItemDetailsRow
            description={i18n.t('protein')}
            unit={i18n.t('gramAbbreviation')}
            value={item.protein}
          />
        </View>
      </View>

      {/* delete button */}
      <View style={styles.buttonContainer}>
        <CustomButton
          value={i18n.t('deleteItem')}
          onPress={deleteItemPopup}
          textColor={permanentColors.error}
          buttonColor={colors.background}
        />
      </View>
    </View>
  );
}

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dataContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  image: {
    aspectRatio: 1 / 1,
    borderRadius: 100,
    height: 200,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    height: '42%',
    marginVertical: 20,
  },
  itemName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});
