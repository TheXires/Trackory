import { Feather } from '@expo/vector-icons';
import I18n from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import placeholderImg from '../../assets/itemPlaceholderImage.png';
import { ConsumedItem } from '../interfaces/item';
import { permanentColors } from '../theme/colors';

interface Props {
  consumedItem: ConsumedItem;
  onSave: (quantity: number) => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 120,
    backgroundColor: permanentColors.primary,
    borderRadius: 25,
  },
  imgContainer: {
    height: 120,
    width: '25%',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  informationContainer: {
    width: '75%',
    height: '100%',
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    color: permanentColors.textWhite,
    opacity: 0.87,
    fontSize: 15,
  },
  text: {
    color: permanentColors.textWhite,
    opacity: 0.6,
    fontSize: 13,
  },
  bottomBar: {
    flexDirection: 'row',
    width: '100%',
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomEditContainer: {
    flexDirection: 'row',
    width: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantity: {
    fontWeight: 'bold',
    color: permanentColors.textWhite,
    fontSize: 16,
  },
  icon: {
    color: permanentColors.textWhite,
    padding: 5,
  },
});

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
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.informationContainer}>
        <View>
          <Text style={styles.title}>{consumedItem.name}</Text>
          <Text style={styles.text}>
            {I18n.t('caloriesPerItem', { itemCalories: consumedItem.calories })}
          </Text>
        </View>
        <View style={styles.bottomBar}>
          {edit ? (
            <>
              <View style={styles.bottomEditContainer}>
                <Feather
                  name="minus"
                  size={18}
                  style={styles.icon}
                  onPress={handleDecrease}
                />
                <Text style={styles.quantity}>
                  <Feather name="x" />
                  {quantity}
                </Text>
                <Feather
                  name="plus"
                  size={18}
                  style={styles.icon}
                  onPress={handleIncrease}
                />
              </View>
              <Feather name="check" size={18} style={styles.icon} onPress={saveChanges} />
            </>
          ) : (
            <>
              <Text style={styles.quantity}>
                <Feather name="x" />
                {consumedItem.quantity}
              </Text>
              <Feather
                name="edit-2"
                size={18}
                style={styles.icon}
                onPress={() => setEdit(!edit)}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

export default OverviewItem;
