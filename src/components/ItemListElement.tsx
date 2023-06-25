import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';
import placeholderImg from '../../assets/itemPlaceholderImage.png';
import { Item } from '../types/item';
import HorizontalLine from './HorizontalLine';

interface Props {
  item: Item;
  onPress: () => void;
}

function ItemListElement({ item, onPress }: Props) {
  const { colors } = useTheme();

  const image = item.image ? { uri: item.image } : placeholderImg;

  return (
    <>
      <RectButton style={styles.container} onPress={onPress}>
        <View style={styles.dataContainer}>
          <SharedElement id={`item.${item._id.toHexString()}.image`}>
            <Image style={styles.image} source={image} />
          </SharedElement>
          <SharedElement id={`item.${item._id.toHexString()}.name`}>
            <Text
              style={[styles.itemName, { color: colors.text }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
          </SharedElement>
        </View>
        <Feather name="chevron-right" size={24} color={colors.text} />
      </RectButton>
      <HorizontalLine />
    </>
  );
}

export default ItemListElement;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 100,
    justifyContent: 'space-between',
    padding: 10,
  },
  dataContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    borderRadius: 10,
    height: 80,
    marginRight: 15,
    width: 50,
  },
  itemName: {
    fontSize: 16,
  },
});
