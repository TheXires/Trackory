import { useNavigation, useRoute } from '@react-navigation/native';
import update from 'immutability-helper';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import placeholderImage from '../../assets/itemPlaceholderImage.png';
import ChangeImageButton from '../components/ChangeImageButton';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import CustomNumberInput from '../components/CustomNumberInput';
import CustomTextInput from '../components/CustomTextInput';
import NavigationHeaderButton from '../components/NavigationHeaderButton';
import { ItemContext } from '../contexts/ItemContext';
import { LoadingContext } from '../contexts/LoadingContext';
import { firebaseUpdateItem } from '../firebase/items.firebase';
import { ItemContextType, LoadingContextType } from '../types/context';
import { CustomError } from '../types/error';
import { Item, UpdateItem, UpdateItemPropertyType } from '../types/item';
import { EditItemNavigationProp, EditItemRouteProp } from '../types/navigation';
import { takeImage } from '../util/image';
import { mergeItems } from '../util/item';
import { i18n } from '../util/translation';

function EditItemScreen() {
  const navigation = useNavigation<EditItemNavigationProp>();
  const route = useRoute<EditItemRouteProp>();

  const { items, refreshItems } = useContext<ItemContextType>(ItemContext);
  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [updatedItem, setUpdatedItem] = useState<UpdateItem>({} as UpdateItem);
  const [item, setItem] = useState<Item | undefined>(undefined);
  const [shownImage, setShownImage] = useState<string>();

  const handleUpdate = useCallback(async () => {
    showLoadingPopup(true, i18n.t('save'));
    try {
      if (!item) throw new CustomError('unexpectedError');
      await firebaseUpdateItem(mergeItems(updatedItem, item));
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
  }, [item, updatedItem]);

  useEffect(() => {
    // need to add save button here, because its not possible to add it in navigator
    // every time any input changed the function called on button press need to be updated with new values
    navigation.setOptions({
      headerRight: () =>
        NavigationHeaderButton({
          onPress: () => handleUpdate(),
          text: i18n.t('save'),
        }),
    });
  }, [navigation, handleUpdate]);

  useEffect(() => {
    if (!route.params?.itemId) return;
    const tmpItem = items.find((element: Item) => element.id === route.params.itemId);
    setItem(tmpItem);
    setUpdatedItem({
      calories: tmpItem?.calories,
      carbohydrates: tmpItem?.carbohydrates,
      fat: tmpItem?.fat,
      imgUrl: undefined,
      name: tmpItem?.name,
      protein: tmpItem?.protein,
    });
  }, [route]);

  useEffect(() => {
    if (updatedItem.imgUrl || updatedItem.imgUrl === '') {
      setShownImage(updatedItem.imgUrl);
    } else if (item?.imgUrl) {
      setShownImage(item?.imgUrl);
    } else {
      setShownImage(undefined);
    }
  }, [item, updatedItem]);

  const change = (input: string | number | undefined, field: UpdateItemPropertyType) => {
    setUpdatedItem(update(updatedItem, { [field]: { $set: input } }));
  };

  const deleteImage = () => {
    setItem(update(item, { imgUrl: { $set: '' } }));
    setUpdatedItem(update(updatedItem, { imgUrl: { $set: '' } }));
  };

  if (!item) return <CustomActivityIndicator />;

  return (
    <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Change image button */}
        <ChangeImageButton
          imgUri={shownImage ? { uri: shownImage } : placeholderImage}
          onDelete={deleteImage}
          onPress={async () => change((await takeImage()) ?? '', 'imgUrl')}
        />

        {/* Name input */}
        <CustomTextInput
          onChangeText={(text) => change(text, 'name')}
          placeholder={item.name}
          title={i18n.t('itemName')}
          value={updatedItem.name ?? ''}
        />

        {/* Calorie input */}
        <CustomNumberInput
          onChangeText={(input) => change(input, 'calories')}
          placeholder={item.calories.toString()}
          title={i18n.t('calories')}
          value={updatedItem.calories}
        />

        {/* Fat input */}
        <CustomNumberInput
          onChangeText={(input) => change(input, 'fat')}
          placeholder={item.fat.toString()}
          title={i18n.t('fat')}
          value={updatedItem.fat}
        />

        {/* Carbohydrates input */}
        <CustomNumberInput
          onChangeText={(input) => change(input, 'carbohydrates')}
          placeholder={item.carbohydrates.toString()}
          title={i18n.t('carbohydrates')}
          value={updatedItem.carbohydrates}
        />

        {/* Protein input */}
        <CustomNumberInput
          onChangeText={(input) => change(input, 'protein')}
          placeholder={item.protein.toString()}
          title={i18n.t('protein')}
          value={updatedItem.protein}
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
  title: {
    fontSize: 16,
    marginVertical: 5,
  },
});
