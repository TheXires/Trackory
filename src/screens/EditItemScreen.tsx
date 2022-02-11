import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import I18n from 'i18n-js';
import update from 'immutability-helper';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import placeholderImage from '../../assets/itemPlaceholderImage.png';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import CustomNumberInput from '../components/CustomNumberInput';
import CustomTextInput from '../components/CustomTextInput';
import NavigationHeaderButton from '../components/NavigationHeaderButton';
import { ItemContext } from '../contexts/ItemContext';
import { LoadingContext } from '../contexts/LoadingContext';
import { firebaseUpdateItem } from '../firebase/items.firebase';
import { ItemContextType, LoadingContextType } from '../interfaces/context';
import { CustomError } from '../interfaces/error';
import { Item, UpdateItem, UpdateItemPropertyType } from '../interfaces/item';
import {
  EditItemNavigationProp,
  EditItemRouteProp,
} from '../navigation/types.navigation';
import { permanentColors } from '../theme/colors';
import { takeImage } from '../util/image';
import { mergeItems } from '../util/item';

function EditItemScreen() {
  const navigation = useNavigation<EditItemNavigationProp>();
  const route = useRoute<EditItemRouteProp>();

  const { items, refreshItems } = useContext<ItemContextType>(ItemContext);
  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [updatedItem, setUpdatedItem] = useState<UpdateItem>({} as UpdateItem);
  const [item, setItem] = useState<Item | undefined>(undefined);
  const [shownImage, setShownImage] = useState<string>();

  const handleUpdate = useCallback(async () => {
    showLoadingPopup(true, I18n.t('save'));
    try {
      if (!item) throw new CustomError('unexpectedError');
      await firebaseUpdateItem(mergeItems(updatedItem, item), updatedItem.imgUri);
      await refreshItems();
      showLoadingPopup(false);
      navigation.goBack();
    } catch (error: any) {
      showLoadingPopup(false);
      Alert.alert('toAdd', I18n.t(error.code), [{ text: 'OK' }]);
    }
  }, [item, updatedItem]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        NavigationHeaderButton({
          onPress: () => handleUpdate(),
          text: I18n.t('save'),
        }),
    });
  }, [navigation, handleUpdate]);

  useEffect(() => {
    if (!route.params?.itemId) return;
    setItem(items.find((element: Item) => element.id === route.params.itemId));
  }, [route]);

  useEffect(() => {
    if (updatedItem.imgUri && updatedItem.imgUri !== '') {
      setShownImage(updatedItem.imgUri);
    } else if (item?.imgUrl && item?.imgUrl !== '') {
      setShownImage(item?.imgUrl);
    } else {
      setShownImage(undefined);
    }
  }, [item, updatedItem.imgUri]);

  const change = (input: string | number | undefined, field: UpdateItemPropertyType) => {
    setUpdatedItem(update(updatedItem, { [field]: { $set: input } }));
  };

  if (!item) return <CustomActivityIndicator />;

  return (
    <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.image}
            imageStyle={{ borderRadius: 100 }}
            source={shownImage ? { uri: shownImage } : placeholderImage}
          >
            <Pressable
              style={styles.imageOverlay}
              onPress={async () => change(await takeImage(), 'imgUri')}
            >
              <Feather name="edit" size={34} color={permanentColors.textWhite} />
            </Pressable>
          </ImageBackground>
        </View>
        <CustomTextInput
          onChangeText={(text) => change(text, 'name')}
          placeholder={item.name}
          title={I18n.t('itemName')}
          value={updatedItem.name ?? ''}
        />
        <CustomNumberInput
          onChangeText={(input) => change(input, 'calories')}
          placeholder={item.calories.toString()}
          title={I18n.t('calories')}
          value={updatedItem.calories}
        />
        <CustomNumberInput
          onChangeText={(input) => change(input, 'fat')}
          placeholder={item.fat.toString()}
          title={I18n.t('fat')}
          value={updatedItem.fat}
        />
        <CustomNumberInput
          onChangeText={(input) => change(input, 'protein')}
          placeholder={item.protein.toString()}
          title={I18n.t('protein')}
          value={updatedItem.protein}
        />
        <CustomNumberInput
          onChangeText={(input) => change(input, 'carbohydrates')}
          placeholder={item.carbohydrates.toString()}
          title={I18n.t('carbohydrates')}
          value={updatedItem.carbohydrates}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default EditItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  image: {
    aspectRatio: 1 / 1,
    borderRadius: 100,
    height: 200,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageOverlay: {
    alignItems: 'center',
    backgroundColor: '#66666688',
    borderRadius: 100,
    height: 200,
    justifyContent: 'center',
    width: 200,
  },
  title: {
    fontSize: 16,
    marginVertical: 5,
  },
});
