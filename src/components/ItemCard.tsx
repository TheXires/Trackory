import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import placeholderImg from '../../assets/itemPlaceholderImage.png';
import { Item } from '../interfaces/item';

interface Props {
  item: Item;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  image: {
    borderRadius: 25,
    height: 150,
    width: '100%',
  },
  text: {
    fontWeight: 'bold',
    paddingTop: 5,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
});

function ItemCard({ item, onPress }: Props) {
  const { colors } = useTheme();

  const image = item.imgUrl ? { uri: item.imgUrl } : placeholderImg;

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Image source={image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={[styles.text, { color: colors.text }]}>{item.name}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default ItemCard;
