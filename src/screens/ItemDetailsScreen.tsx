import { useNavigation, useRoute } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import placeholderImage from '../../assets/itemPlaceholderImage.png';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import CustomButton from '../components/CustomButton';
import HorizontalLine from '../components/HorizontalLine';
import ItemDetailsRow from '../components/ItemDetailsRow';
import { ItemContext } from '../contexts/ItemContext';
import { LoadingContext } from '../contexts/LoadingContext';
import { firebaseRemoveItem, firebaseUpdateItem } from '../firebase/items.firebase';
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
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
  },
});

interface Test {
  isEditing: boolean;
  onPress: () => void;
}

// TODO richtig umsetzen und als eigene Komponente
function EditSave({ isEditing, onPress }: Test) {
  const { colors } = useTheme();

  return (
    <Pressable style={{ marginHorizontal: 15 }} onPress={onPress}>
      <Text
        style={{
          fontSize: 17,
          color: colors.primary,
        }}
      >
        {isEditing ? I18n.t('save') : I18n.t('edit')}
      </Text>
    </Pressable>
  );
}

function ItemDetailsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<ItemDetailsNavigationProp>();
  const route = useRoute<ItemDetailsRouteProp>();

  const { items, refreshItems } = useContext<ItemContextType>(ItemContext);
  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [itemId, setItemId] = useState<string | undefined>(undefined);
  const [calories, setCalories] = useState<number | null>(0);
  const [carbonHydrates, setCarbonHydrates] = useState<number | null>(0);
  const [fat, setFat] = useState<number | null>(0);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [name, setName] = useState<string>();
  const [protein, setProtein] = useState<number | null>(0);

  const [item, setItem] = useState<Item | undefined>(undefined);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (route.params.itemId) setItemId(route.params.itemId);
    setItem(items.find((element: Item) => element.id === itemId));
  }, [route, itemId, items]);

  useEffect(() => {
    if (!item) return;
    setCalories(item.calories);
    setCarbonHydrates(item.carbonHydrates);
    setFat(item.fat);
    setImageUrl(item.imgUrl);
    setName(item.name);
    setProtein(item.protein);
  }, [item]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        EditSave({
          isEditing,
          onPress: () => {
            if (!isEditing) setIsEditing(true);
            // eslint-disable-next-line no-use-before-define
            if (isEditing) updateItem();
          },
        }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, navigation]);

  const updateItem = async () => {
    showLoadingPopup(true);
    try {
      if (!item) throw 'unable to update item';
      const updatedItem: Item = {
        id: item?.id,
        calories: calories ?? 0,
        carbonHydrates: carbonHydrates ?? 0,
        fat: fat ?? 0,
        imgUrl: imageUrl ?? '',
        name: name ?? '',
        protein: protein ?? 0,
      };
      await firebaseUpdateItem(updatedItem);
      await refreshItems();
      setIsEditing(false);
    } catch (error) {
      // TODO richtige Fehlermeldung und übersetzunge hinzufügen
      Alert.alert('toAdd', 'toAdd', [{ text: 'OK' }]);
    }
    showLoadingPopup(false);
  };

  const removeItem = async () => {
    try {
      if (!itemId) throw 'no itemId to remove';
      const result = await firebaseRemoveItem(itemId);
      if (result === -1) throw 'unable to remove item';
      navigation.goBack();
    } catch (error) {
      console.error(`unable to remove item: ${error}`);
    }
  };

  const deletePopup = () => {
    Alert.alert(I18n.t('deleteItemDialogTitle'), I18n.t('deleteItemDialogText'), [
      { text: I18n.t('cancel'), style: 'cancel' },
      { text: I18n.t('delete'), style: 'destructive', onPress: () => removeItem() },
    ]);
  };

  if (!item) return <CustomActivityIndicator />;

  return (
    <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false}>
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
              value={calories}
              setValue={setCalories}
              isEditing={isEditing}
            />
            <HorizontalLine />
            {/* fat */}
            <ItemDetailsRow
              description={I18n.t('fat')}
              unit={I18n.t('gramAbbreviation')}
              value={fat}
              setValue={setFat}
              isEditing={isEditing}
            />
            <HorizontalLine />
            {/* protein */}
            <ItemDetailsRow
              description={I18n.t('protein')}
              unit={I18n.t('gramAbbreviation')}
              value={protein}
              setValue={setProtein}
              isEditing={isEditing}
            />
            <HorizontalLine />
            {/* carbonHydrates */}
            <ItemDetailsRow
              description={I18n.t('carbohydrates')}
              unit={I18n.t('gramAbbreviation')}
              value={carbonHydrates}
              setValue={setCarbonHydrates}
              isEditing={isEditing}
            />
          </View>
        </View>
        {!isEditing && (
          <View style={styles.buttonContainer}>
            <CustomButton
              value={I18n.t('deleteItem')}
              onPress={deletePopup}
              textColor={permanentColors.error}
              buttonColor={colors.background}
            />
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default ItemDetailsScreen;
