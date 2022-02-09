import { Feather } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AddImageButton from '../components/AddImageButton';
import CustomButton from '../components/CustomButton';
import InputContainer from '../components/InputContainer';
import { ItemContext } from '../contexts/ItemContext';
import { LoadingContext } from '../contexts/LoadingContext';
import { ItemContextType, LoadingContextType } from '../interfaces/context';
import { NewItem } from '../interfaces/item';
import { CreateItemNavigationProp } from '../navigation/types.navigation';
import { permanentColors } from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    marginVertical: 5,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    opacity: 0.6,
  },
  expandButtonContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 50,
  },
  expandButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: permanentColors.primary,
  },
});

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
        carbonHydrates: carbohydrate ?? 0,
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
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.9,
        maxHeight: 400,
        maxWidth: 400,
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
        mediaType: 'photo',
        quality: 0.9,
        maxHeight: 400,
        maxWidth: 400,
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
          <Text style={[styles.title, { color: colors.text }]}>{I18n.t('itemName')}</Text>
          <InputContainer>
            <TextInput
              placeholderTextColor={colors.text}
              style={[styles.input, { color: colors.text }]}
              placeholder="Sandwich..."
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </InputContainer>

          <Text style={[styles.title, { color: colors.text }]}>{I18n.t('calories')}</Text>
          <InputContainer>
            <TextInput
              keyboardType="numeric"
              placeholder="123"
              placeholderTextColor={colors.text}
              style={[styles.input, { color: colors.text }]}
              value={calories?.toString()}
              onChangeText={(text: string) => {
                if (Number.isInteger(parseInt(text, 10))) {
                  setCalories(parseInt(text, 10));
                }
              }}
            />
          </InputContainer>
          {expanded && (
            <>
              <Text style={[styles.title, { color: colors.text }]}>
                {I18n.t('carbohydrates')}
              </Text>
              <InputContainer>
                <TextInput
                  keyboardType="numeric"
                  placeholder="123"
                  placeholderTextColor={colors.text}
                  style={[styles.input, { color: colors.text }]}
                  value={carbohydrate?.toString()}
                  onChangeText={(text: string) => {
                    if (Number.isInteger(text)) {
                      setCarbohydrate(parseInt(text, 10));
                    }
                  }}
                />
              </InputContainer>
              <Text style={[styles.title, { color: colors.text }]}>{I18n.t('fat')}</Text>
              <InputContainer>
                <TextInput
                  keyboardType="numeric"
                  placeholder="123"
                  placeholderTextColor={colors.text}
                  style={[styles.input, { color: colors.text }]}
                  value={fat?.toString()}
                  onChangeText={(text: string) => {
                    if (Number.isInteger(text)) {
                      setFat(parseInt(text, 10));
                    }
                  }}
                />
              </InputContainer>
              <Text style={[styles.title, { color: colors.text }]}>
                {I18n.t('protein')}
              </Text>
              <InputContainer>
                <TextInput
                  keyboardType="numeric"
                  placeholder="123"
                  placeholderTextColor={colors.text}
                  style={[styles.input, { color: colors.text }]}
                  value={protein?.toString()}
                  onChangeText={(text: string) => {
                    if (Number.isInteger(text)) {
                      setProtein(parseInt(text, 10));
                    }
                  }}
                />
              </InputContainer>
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
      <View style={{ position: 'absolute', bottom: 30, right: 15 }}>
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
