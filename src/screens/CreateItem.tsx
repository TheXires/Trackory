import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Realm } from '@realm/react';
import update from 'immutability-helper';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AddImageButton from '../components/AddImageButton';
import CustomNumberInput from '../components/CustomNumberInput';
import CustomTextInput from '../components/CustomTextInput';
import NavigationHeaderButton from '../components/NavigationHeaderButton';
import { LoadingContext } from '../contexts/LoadingContext';
import { i18n } from '../i18n/i18n';
import { RealmContext } from '../realm/RealmContext';
import { permanentColors } from '../theme/colors';
import { LoadingContextType } from '../types/context';
import { CustomError } from '../types/error';
import { Item, ItemPropertyType } from '../types/item';
import { CreateItemNavigationProp } from '../types/navigation';
import { selectImage } from '../util/image';

const { useRealm } = RealmContext;

function CreateItemScreen() {
  const navigation = useNavigation<CreateItemNavigationProp>();
  const realm = useRealm();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [item, setItem] = useState<Item>({
    _id: new Realm.BSON.ObjectId(),
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: '',
    name: '',
    protein: 0,
  });
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleCreation = useCallback(async () => {
    showLoadingPopup(true, i18n.t('create'));
    try {
      if (!item.name || item.name === '') throw new CustomError('create/no-name');
      realm.write(() => {
        realm.create('Item', item);
      });
      showLoadingPopup(false);
      navigation.goBack();
    } catch (error: any) {
      showLoadingPopup(false);
      Alert.alert(
        i18n.t('errorTitle'),
        i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  }, [item]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        NavigationHeaderButton({
          onPress: () => handleCreation(),
          text: i18n.t('create'),
        }),
    });
  }, [handleCreation]);

  const change = (input: string | number | undefined | ArrayBuffer, field: ItemPropertyType) => {
    setItem(update(item, { [field]: { $set: input } }));
  };

  return (
    <KeyboardAwareScrollView bounces={false}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* Name input */}
          <CustomTextInput
            onChangeText={(text) => change(text, 'name')}
            placeholder="Sandwich..."
            title={i18n.t('itemName')}
            value={item.name}
          />

          {/* Calorie input */}
          <CustomNumberInput
            onChangeText={(input) => change(input, 'calories')}
            placeholder="123"
            title={i18n.t('calories')}
            value={item.calories}
          />
          {expanded && (
            <>
              {/* Fat input */}
              <CustomNumberInput
                onChangeText={(input) => change(input, 'fat')}
                placeholder="123"
                title={i18n.t('fat')}
                value={item.fat}
              />

              {/* Carbohydrates input */}
              <CustomNumberInput
                onChangeText={(input) => change(input, 'carbohydrates')}
                placeholder="123"
                title={i18n.t('carbohydrates')}
                value={item.carbohydrates}
              />

              {/* Protein input */}
              <CustomNumberInput
                onChangeText={(input) => change(input, 'protein')}
                placeholder="123"
                title={i18n.t('protein')}
                value={item.protein}
              />
            </>
          )}
        </View>

        {/* Expand/Collapse button */}
        <View style={styles.expandButtonContainer}>
          <Text style={styles.expandButton} onPress={() => setExpanded(!expanded)}>
            <Feather name={expanded ? 'minus' : 'plus'} size={18} />
            {i18n.t(expanded ? 'less' : 'more')}
          </Text>
        </View>

        {/* Add image button */}
        <AddImageButton
          imageUri={item.image}
          onDelete={() => change(undefined, 'image')}
          onPress={async () => change(await selectImage(), 'image')}
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
