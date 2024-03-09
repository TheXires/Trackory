import { useNavigation, useRoute } from '@react-navigation/native';
import { Realm } from '@realm/react';
import update from 'immutability-helper';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import placeholderImage from '../../assets/images/itemPlaceholderImage.png';
import ChangeImageButton from '../components/ChangeImageButton';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import CustomNumberInput from '../components/CustomNumberInput';
import CustomTextInput from '../components/CustomTextInput';
import NavigationHeaderButton from '../components/NavigationHeaderButton';
import { LoadingContext } from '../contexts/LoadingContext';
import { RealmContext } from '../realm/RealmContext';
import { LoadingContextType } from '../types/context';
import { CustomError } from '../types/error';
import { Item, ItemPropertyType } from '../types/item';
import { EditItemNavigationProp, EditItemRouteProp } from '../types/navigation';
import { selectImage } from '../util/image';

const { useRealm, useObject } = RealmContext;

function EditItemScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<EditItemNavigationProp>();
  const route = useRoute<EditItemRouteProp>();
  const realm = useRealm();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [updatedItem, setUpdatedItem] = useState<Item | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [shownImage, setShownImage] = useState<string>();
  const realmItem = useObject<Item>('Item', new Realm.BSON.ObjectId(route.params.itemId));

  const handleUpdate = useCallback(async () => {
    showLoadingPopup(true, t('general.control.save'));
    try {
      if (!updatedItem) throw new CustomError('error.general.unexpectedError');
      realm.write(() => {
        realm.create('Item', updatedItem, Realm.UpdateMode.Modified);
      });
      showLoadingPopup(false);
      navigation.goBack();
    } catch (error: any) {
      console.error(error);
      showLoadingPopup(false);
      Alert.alert(
        t('error.general.errorTitle'),
        t(error.code, { defaults: [{ scope: 'error.general.unexpectedError' }] }),
      );
    }
  }, [updatedItem]);

  useEffect(() => {
    if (!realmItem || updatedItem != null) return;
    setUpdatedItem({
      _id: realmItem._id,
      calories: realmItem.calories,
      carbohydrates: realmItem.carbohydrates,
      fat: realmItem.fat,
      image: realmItem.image,
      name: realmItem.name,
      protein: realmItem.protein,
    });
  }, [realmItem]);

  useEffect(() => {
    // need to add save button here, because its not possible to add it in navigator
    // every time any input changed the function called on button press need to be updated with new values
    navigation.setOptions({
      headerRight: () =>
        NavigationHeaderButton({
          onPress: () => handleUpdate(),
          text: t('general.control.save'),
        }),
    });
  }, [navigation, handleUpdate]);

  useEffect(() => {
    if (updatedItem && (updatedItem.image || updatedItem.image === '')) {
      setShownImage(updatedItem.image);
    } else if (imageUrl !== '') {
      setShownImage(imageUrl);
    } else {
      setShownImage(undefined);
    }
  }, [imageUrl, updatedItem]);

  const change = (input: string | number | undefined, field: ItemPropertyType) => {
    setUpdatedItem(update(updatedItem, { [field]: { $set: input } }));
  };

  const deleteImage = () => {
    setUpdatedItem(update(updatedItem, { image: { $set: '' } }));
    setImageUrl('');
  };

  if (!realmItem || !updatedItem) return <CustomActivityIndicator />;

  return (
    <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Change image button */}
        <ChangeImageButton
          imgUri={shownImage ? { uri: shownImage } : placeholderImage}
          onDelete={deleteImage}
          onPress={async () => change((await selectImage()) ?? '', 'image')}
        />

        {/* Name input */}
        <CustomTextInput
          onChangeText={(input) => change(input, 'name')}
          placeholder={realmItem.name}
          title={t('general.item.name')}
          value={updatedItem.name}
        />

        {/* Calorie input */}
        <CustomNumberInput
          onChangeText={(input) => change(input, 'calories')}
          placeholder={realmItem.calories.toString()}
          title={t('general.item.calories')}
          value={updatedItem.calories}
        />

        {/* Fat input */}
        <CustomNumberInput
          onChangeText={(input) => change(input, 'fat')}
          placeholder={realmItem.fat.toString()}
          title={t('general.item.fat')}
          value={updatedItem.fat}
        />

        {/* Carbohydrates input */}
        <CustomNumberInput
          onChangeText={(input) => change(input, 'carbohydrates')}
          placeholder={realmItem.carbohydrates.toString()}
          title={t('general.item.carbohydrates')}
          value={updatedItem.carbohydrates}
        />

        {/* Protein input */}
        <CustomNumberInput
          onChangeText={(input) => change(input, 'protein')}
          placeholder={realmItem.protein.toString()}
          title={t('general.item.protein')}
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
