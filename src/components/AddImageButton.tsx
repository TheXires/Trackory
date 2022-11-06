import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { permanentColors } from '../theme/colors';
import { i18n } from '../util/translation';
import ChangeImageButton from './ChangeImageButton';

interface Props {
  imageUri: string | undefined;
  onDelete: () => void;
  onPress: () => void;
}

function AddImageButton({ imageUri, onDelete, onPress }: Props) {
  return (
    <View style={styles.addPhotoButtonContainer}>
      {imageUri ? (
        <ChangeImageButton imgUri={{ uri: imageUri }} onDelete={onDelete} onPress={onPress} />
      ) : (
        <Pressable style={styles.addPhotoButton} onPress={onPress}>
          <Feather name="plus" size={46} style={styles.addPhotoButtonText} />
          <Text style={[styles.addPhotoButtonText, { fontSize: 18 }]}>{i18n.t('addPhoto')}</Text>
        </Pressable>
      )}
    </View>
  );
}

export default AddImageButton;

const styles = StyleSheet.create({
  addPhotoButton: {
    alignItems: 'center',
    aspectRatio: 1,
    borderColor: permanentColors.primary,
    borderRadius: 25,
    borderWidth: 6,
    justifyContent: 'center',
    width: 150,
  },
  addPhotoButtonContainer: {
    alignItems: 'center',
  },
  addPhotoButtonText: {
    color: permanentColors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
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
    width: 200,
  },
});
