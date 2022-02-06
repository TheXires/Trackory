import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Item } from '../interfaces/item';
import placeholderImg from '../../assets/itemPlaceholderImage.png';
import HorizontalLine from './HorizontalLine';

interface Props {
  item: Item;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 100,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 50,
    marginRight: 15,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 16,
  },
});

function ItemListElement({ item, onPress }: Props) {
  const { colors } = useTheme();

  const image = item.imgUrl ? { uri: item.imgUrl } : placeholderImg;

  return (
    <>
      <RectButton style={styles.container} onPress={() => onPress()}>
        <View style={styles.dataContainer}>
          <Image style={styles.image} source={image} />
          <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
        </View>
        <Feather name="chevron-right" size={24} color={colors.text} />
      </RectButton>
      <HorizontalLine />
    </>
  );
}

export default ItemListElement;
