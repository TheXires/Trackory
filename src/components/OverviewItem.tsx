import { Feather } from '@expo/vector-icons';
import I18n from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import placeholderImg from '../../assets/itemPlaceholderImage.png';
import { ConsumedItem } from '../types/item';
import { permanentColors } from '../theme/colors';

interface Props {
  consumedItem: ConsumedItem;
  onSave: (quantity: number) => void;
}

function OverviewItem({ consumedItem, onSave }: Props) {
  const [edit, setEdit] = useState(false);
  const [quantity, setQuantity] = useState(consumedItem.quantity);

  useEffect(() => {
    setQuantity(consumedItem.quantity);
  }, [consumedItem]);

  const handleDecrease = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const saveChanges = () => {
    if (edit) onSave(quantity);
    setEdit(!edit);
  };

  const image = consumedItem.imgUrl ? { uri: consumedItem.imgUrl } : placeholderImg;

  return (
    <View style={[styles.container, { backgroundColor: permanentColors.primary }]}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.informationContainer}>
        <View>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {consumedItem.name}
          </Text>
          <Text style={styles.text}>
            {I18n.t('caloriesPerItem', { itemCalories: consumedItem.calories })}
          </Text>
        </View>
        <View style={styles.bottomBar}>
          {edit ? (
            <>
              <View style={styles.bottomEditContainer}>
                <Feather name="minus" size={18} style={styles.icon} onPress={handleDecrease} />
                <Text style={styles.quantity}>
                  <Feather name="x" />
                  {quantity}
                </Text>
                <Feather name="plus" size={18} style={styles.icon} onPress={handleIncrease} />
              </View>
              <Feather name="check" size={18} style={styles.icon} onPress={saveChanges} />
            </>
          ) : (
            <>
              <Text style={styles.quantity}>
                <Feather name="x" />
                {consumedItem.quantity}
              </Text>
              <Feather name="edit-2" size={18} style={styles.icon} onPress={() => setEdit(!edit)} />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

export default OverviewItem;

const styles = StyleSheet.create({
  bottomBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    width: '100%',
  },
  bottomEditContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
  },
  container: {
    backgroundColor: permanentColors.primary,
    borderRadius: 25,
    flexDirection: 'row',
    height: 120,
    width: '100%',
  },
  icon: {
    color: permanentColors.textWhite,
    padding: 5,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    height: 120,
    overflow: 'hidden',
    width: '25%',
  },
  informationContainer: {
    height: '100%',
    justifyContent: 'space-between',
    padding: 10,
    width: '75%',
  },
  quantity: {
    color: permanentColors.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: permanentColors.textWhite,
    fontSize: 13,
    opacity: 0.6,
  },
  title: {
    color: permanentColors.textWhite,
    fontSize: 15,
    fontWeight: 'bold',
    opacity: 0.87,
  },
});
