import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { permanentColors } from '../theme/colors';

interface Props {
  imgUri: { uri: string };
  onDelete: () => void;
  onPress: () => void;
}

function ChangeImageButton({ imgUri, onDelete, onPress }: Props) {
  return (
    <View style={styles.imageContainer}>
      <ImageBackground style={styles.image} imageStyle={{ borderRadius: 100 }} source={imgUri}>
        <Pressable style={styles.imageOverlay} onPress={onPress}>
          <Feather name="edit" size={34} color={permanentColors.textWhite} />
        </Pressable>
        <View style={styles.deleteButtonContainer}>
          <RectButton style={styles.deleteButton} onPress={onDelete} activeOpacity={0.5}>
            <Feather name="trash-2" size={20} color={permanentColors.textWhite} />
          </RectButton>
        </View>
      </ImageBackground>
    </View>
  );
}

export default ChangeImageButton;

const styles = StyleSheet.create({
  deleteButton: {
    borderRadius: 50,
    padding: 10,
  },
  deleteButtonContainer: {
    backgroundColor: permanentColors.error,
    borderRadius: 50,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  image: {
    aspectRatio: 1 / 1,
    borderRadius: 100,
    height: 200,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageOverlay: {
    alignItems: 'center',
    backgroundColor: '#66666688',
    borderRadius: 100,
    height: 200,
    justifyContent: 'center',
    position: 'relative',
    width: 200,
  },
});
