import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AddImageButton from '../components/AddImageButton';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import CustomNumberInput from '../components/CustomNumberInput';
import CustomTextInput from '../components/CustomTextInput';
import { ItemContext } from '../contexts/ItemContext';
import { LoadingContext } from '../contexts/LoadingContext';
import { firebaseUpdateItem } from '../firebase/items.firebase';
import { ItemContextType, LoadingContextType } from '../interfaces/context';
import { Item } from '../interfaces/item';
import {
  EditItemNavigationProp,
  EditItemRouteProp,
} from '../navigation/types.navigation';

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

function EditItemScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<EditItemNavigationProp>();
  const route = useRoute<EditItemRouteProp>();

  const { items, refreshItems } = useContext<ItemContextType>(ItemContext);
  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [calories, setCalories] = useState<number | undefined>();
  const [carbohydrates, setCarbohydrates] = useState<number | undefined>();
  const [fat, setFat] = useState<number | undefined>();
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [name, setName] = useState<string>('');
  const [protein, setProtein] = useState<number | undefined>();

  const [item, setItem] = useState<Item | undefined>(undefined);

  useEffect(() => {
    if (!route.params?.itemId) return;
    setItem(items.find((element: Item) => element.id === route.params.itemId));
  }, [route, items]);

  const updateItem = async () => {
    // TODO text einfügen
    showLoadingPopup(true);
    try {
      if (!item) throw 'unable to update item';
      const updatedItem: Item = {
        calories: calories ?? 0,
        carbohydrates: carbohydrates ?? 0,
        fat: fat ?? 0,
        id: item?.id,
        imgUrl: item.imgUrl,
        name: name ?? '',
        protein: protein ?? 0,
      };
      if (item.imgUrl !== imageUri) {
        await firebaseUpdateItem(updatedItem, imageUri);
      } else {
        await firebaseUpdateItem(updatedItem);
      }
      await refreshItems();
    } catch (error) {
      // TODO richtige Fehlermeldung und übersetzunge hinzufügen
      Alert.alert('toAdd', I18n.t('unexpectedError'), [{ text: 'OK' }]);
    }
    showLoadingPopup(false);
  };

  const camera = async () => {
    try {
      const res = await launchCamera({
        cameraType: 'back',
        maxHeight: 400,
        maxWidth: 400,
        mediaType: 'photo',
        quality: 0.9,
      });
      if (res.didCancel) return;
      if (res.errorCode) throw res.errorCode;
      if (!res.assets) return;
      setImageUri(res.assets[0].uri);
    } catch (error: any) {
      Alert.alert(I18n.t('errorTitle'), I18n.t(error), [{ text: 'OK' }]);
    }
  };

  const pickImage = async () => {
    try {
      const res = await launchImageLibrary({
        maxHeight: 400,
        maxWidth: 400,
        mediaType: 'photo',
        quality: 0.9,
        selectionLimit: 1,
      });
      if (res.didCancel) return;
      if (res.errorCode) throw res.errorCode;
      if (!res.assets) return;
      setImageUri(res.assets[0].uri);
    } catch (error: any) {
      Alert.alert(I18n.t('errorTitle'), I18n.t(error), [{ text: 'OK' }]);
    }
  };

  if (!item) return <CustomActivityIndicator />;

  return (
    <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <CustomTextInput
          onChangeText={(text) => setName(text)}
          placeholder={item.name}
          title={I18n.t('itemName')}
          value={name}
        />
        <CustomNumberInput
          onChangeText={(input) => setCalories(input)}
          placeholder={item.calories.toString()}
          title={I18n.t('calories')}
          value={calories}
        />
        <CustomNumberInput
          onChangeText={(input) => setFat(input)}
          placeholder={item.fat.toString()}
          title={I18n.t('fat')}
          value={fat}
        />
        <CustomNumberInput
          onChangeText={(input) => setProtein(input)}
          placeholder={item.protein.toString()}
          title={I18n.t('protein')}
          value={protein}
        />
        <CustomNumberInput
          onChangeText={(input) => setCarbohydrates(input)}
          placeholder={item.carbohydrates.toString()}
          title={I18n.t('carbohydrates')}
          value={carbohydrates}
        />
      </View>
      <AddImageButton onPress={pickImage} imageUri={imageUri} />
    </KeyboardAwareScrollView>
  );
}

export default EditItemScreen;
