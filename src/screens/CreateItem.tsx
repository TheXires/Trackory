import { Feather } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AddImageButton from '../components/AddImageButton';
import CustomButton from '../components/CustomButton';
import CustomNumberInput from '../components/CustomNumberInput';
import CustomTextInput from '../components/CustomTextInput';
import { ItemContext } from '../contexts/ItemContext';
import { LoadingContext } from '../contexts/LoadingContext';
import { ItemContextType, LoadingContextType } from '../interfaces/context';
import { NewItem } from '../interfaces/item';
import { CreateItemNavigationProp } from '../navigation/types.navigation';
import { permanentColors } from '../theme/colors';

function CreateItemScreen() {
  const { addItem } = useContext<ItemContextType>(ItemContext);
  const { colors } = useTheme();
  const navigation = useNavigation<CreateItemNavigationProp>();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [calories, setCalories] = useState<number>();
  const [carbohydrate, setCarbohydrate] = useState<number>();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [fat, setFat] = useState<number>();
  const [name, setName] = useState<string>('');
  const [protein, setProtein] = useState<number>();
  const [imageUri, setImageUri] = useState<undefined | string>(undefined);

  const handleCreation = async () => {
    showLoadingPopup(true, I18n.t('create'));
    if (name == null || name === '') return;
    if (calories == null || calories < 0) return;
    try {
      const newItem: NewItem = {
        calories: calories ?? 0,
        carbohydrates: carbohydrate ?? 0,
        fat: fat ?? 0,
        imgUrl: '',
        name,
        protein: protein ?? 0,
      };
      await addItem(newItem, imageUri);
      showLoadingPopup(false);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      // TODO übersetzung hinzufügen
      Alert.alert(I18n.t('errorTitle'), 'to add', [{ text: 'OK' }]);
      showLoadingPopup(false);
    }
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

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
        bounces={false}
      >
        <View style={styles.inputContainer}>
          <CustomTextInput
            onChangeText={(text) => setName(text)}
            placeholder="Sandwich..."
            title={I18n.t('itemName')}
            value={name}
          />
          <CustomNumberInput
            onChangeText={(input) => setCalories(input)}
            placeholder="123"
            title={I18n.t('calories')}
            value={calories}
          />
          {expanded && (
            <>
              <CustomNumberInput
                onChangeText={(input) => setFat(input)}
                placeholder="123"
                title={I18n.t('carbohydrates')}
                value={carbohydrate}
              />
              <CustomNumberInput
                onChangeText={(input) => setCarbohydrate(input)}
                placeholder="123"
                title={I18n.t('fat')}
                value={fat}
              />
              <CustomNumberInput
                onChangeText={(input) => setProtein(input)}
                placeholder="123"
                title={I18n.t('protein')}
                value={protein}
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
        {/* <AddImageButton onPress={camera} imageUri={imageUri} /> */}
        <AddImageButton onPress={pickImage} imageUri={imageUri} />
      </ScrollView>
      <View style={{ bottom: 30, position: 'absolute', right: 15 }}>
        <CustomButton
          value={I18n.t('create')}
          onPress={handleCreation}
          textColor={colors.primary}
          buttonColor={colors.background}
        />
      </View>
    </>
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
