import { useNavigation, useRoute } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import { Realm } from '@realm/react';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import placeholderImage from '../../assets/images/itemPlaceholderImage.png';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import CustomButton from '../components/CustomButton';
import HorizontalLine from '../components/HorizontalLine';
import ItemDetailsRow from '../components/ItemDetailsRow';
import NavigationHeaderButton from '../components/NavigationHeaderButton';
import { LoadingContext } from '../contexts/LoadingContext';
import { RealmContext } from '../realm/RealmContext';
import { permanentColors } from '../theme/colors';
import { LoadingContextType } from '../types/context';
import { CustomError } from '../types/error';
import { Item } from '../types/item';
import { ItemDetailsNavigationProp, ItemDetailsRouteProp } from '../types/navigation';

const { useObject, useRealm } = RealmContext;

function ItemDetailsScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<ItemDetailsNavigationProp>();
  const route = useRoute<ItemDetailsRouteProp>();
  const realm = useRealm();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const item = useObject<Item>('Item', new Realm.BSON.ObjectId(route.params.itemId));

  useEffect(() => {
    if (!route.params.itemId) return;
    navigation.setOptions({
      headerRight: () =>
        NavigationHeaderButton({
          // TODO ab hier weiter machen
          onPress: () => navigation.navigate('EditItem', { itemId: route.params.itemId }),
          text: t('general.control.edit'),
        }),
    });
  }, [route, navigation]);

  const deleteItem = async () => {
    showLoadingPopup(true, t('general.control.delete'));
    try {
      if (!item) throw new CustomError('error.general.unexpectedError');
      realm.write(() => {
        realm.delete(item);
      });
      showLoadingPopup(false);
      navigation.goBack();
    } catch (error: any) {
      showLoadingPopup(false);
      Alert.alert(
        t('error.general.errorTitle'),
        t(error.code, { defaults: [{ scope: 'error.general.unexpectedError' }] }),
      );
    }
  };

  const deleteItemPopup = () => {
    Alert.alert(
      t('screen.itemDetails.deleteItemDialogTitle'),
      t('screen.itemDetails.deleteItemDialogText'),
      [
        { style: 'cancel', text: t('general.control.cancel') },
        { onPress: () => deleteItem(), style: 'destructive', text: t('general.control.delete') },
      ],
    );
  };

  if (!item) return <CustomActivityIndicator />;

  return (
    <View style={styles.container}>
      <View>
        {/* Item image */}
        <View style={styles.imageContainer}>
          <SharedElement id={`item.${route.params.itemId}.image`}>
            <Image
              style={styles.image}
              source={item.image !== '' ? { uri: item.image } : placeholderImage}
            />
          </SharedElement>
          {/* Item name */}
          <SharedElement id={`item.${route.params.itemId}.name`}>
            <Text
              style={[styles.itemName, { color: colors.text }]}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
          </SharedElement>
        </View>
        <View style={styles.dataContainer}>
          {/* calories */}
          <ItemDetailsRow
            description={t('general.item.calories')}
            unit={t('abbreviation.calorie')}
            value={item.calories}
          />
          <HorizontalLine />

          {/* fat */}
          <ItemDetailsRow
            description={t('general.item.fat')}
            unit={t('abbreviation.gram')}
            value={item.fat}
          />
          <HorizontalLine />

          {/* carbohydrates */}
          <ItemDetailsRow
            description={t('general.item.carbohydrates')}
            unit={t('abbreviation.gram')}
            value={item.carbohydrates}
          />
          <HorizontalLine />

          {/* protein */}
          <ItemDetailsRow
            description={t('general.item.protein')}
            unit={t('abbreviation.gram')}
            value={item.protein}
          />
        </View>
      </View>

      {/* delete button */}
      <View style={styles.buttonContainer}>
        <CustomButton
          value={t('general.control.delete')}
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
