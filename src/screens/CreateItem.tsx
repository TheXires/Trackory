import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import I18n from 'i18n-js';
import update from 'immutability-helper';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AddImageButton from '../components/AddImageButton';
import CustomNumberInput from '../components/CustomNumberInput';
import CustomTextInput from '../components/CustomTextInput';
import NavigationHeaderButton from '../components/NavigationHeaderButton';
import { ItemContext } from '../contexts/ItemContext';
import { LoadingContext } from '../contexts/LoadingContext';
import { firebaseAddItem } from '../firebase/items.firebase';
import { ItemContextType, LoadingContextType } from '../types/context';
import { CustomError } from '../types/error';
import { NewItem, NewItemPropertyType } from '../types/item';
import { CreateItemNavigationProp } from '../types/navigation';
import { permanentColors } from '../theme/colors';
import { selectImage, takeImage } from '../util/image';
import { createNewItem } from '../util/item';

function CreateItemScreen() {
  const navigation = useNavigation<CreateItemNavigationProp>();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);
  const { refreshItems } = useContext<ItemContextType>(ItemContext);

  const [item, setItem] = useState<NewItem>({} as NewItem);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<undefined | string>(undefined);

  const handleCreation = useCallback(async () => {
    showLoadingPopup(true, I18n.t('create'));
    try {
      if (!item.name || item.name === '') throw new CustomError('create/no-name');
      await firebaseAddItem(createNewItem(item), imageUri);
      await refreshItems();
      showLoadingPopup(false);
      navigation.goBack();
    } catch (error: any) {
      showLoadingPopup(false);
      Alert.alert(
        I18n.t('errorTitle'),
        I18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  }, [item, imageUri]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        NavigationHeaderButton({
          onPress: () => handleCreation(),
          text: I18n.t('create'),
        }),
    });
  }, [handleCreation]);

  const change = (input: string | number | undefined, field: NewItemPropertyType) => {
    setItem(update(item, { [field]: { $set: input } }));
  };

  return (
    <KeyboardAwareScrollView bounces={false}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <CustomTextInput
            onChangeText={(text) => change(text, 'name')}
            placeholder="Sandwich..."
            title={I18n.t('itemName')}
            value={item.name}
          />
          <CustomNumberInput
            onChangeText={(input) => change(input, 'calories')}
            placeholder="123"
            title={I18n.t('calories')}
            value={item.calories}
          />
          {expanded && (
            <>
              <CustomNumberInput
                onChangeText={(input) => change(input, 'fat')}
                placeholder="123"
                title={I18n.t('fat')}
                value={item.fat}
              />
              <CustomNumberInput
                onChangeText={(input) => change(input, 'carbohydrates')}
                placeholder="123"
                title={I18n.t('carbohydrates')}
                value={item.carbohydrates}
              />
              <CustomNumberInput
                onChangeText={(input) => change(input, 'protein')}
                placeholder="123"
                title={I18n.t('protein')}
                value={item.protein}
              />
            </>
          )}
        </View>
        <View style={styles.expandButtonContainer}>
          <Text style={styles.expandButton} onPress={() => setExpanded(!expanded)}>
            <Feather name={expanded ? 'minus' : 'plus'} size={18} />
            {I18n.t(expanded ? 'less' : 'more')}
          </Text>
        </View>
        <AddImageButton
          imageUri={imageUri}
          onDelete={() => setImageUri(undefined)}
          onPress={async () => setImageUri(await takeImage())}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default CreateItemScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  expandButton: {
    color: permanentColors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandButtonContainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 25,
  },
  inputContainer: {
    width: '100%',
  },
});
