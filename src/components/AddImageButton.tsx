import { Feather } from '@expo/vector-icons';
import I18n from 'i18n-js';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { permanentColors } from '../theme/colors';

interface Props {
  imageUri: string | undefined;
  onPress: () => void;
}

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
});

function AddImageButton({ imageUri, onPress }: Props) {
  return (
    <Pressable style={styles.addPhotoButtonContainer} onPress={onPress}>
      {imageUri ? (
        <Image
          source={{
            height: 300,
            uri: imageUri,
            width: 250,
          }}
          height={250}
          width={250}
        />
      ) : (
        <View style={styles.addPhotoButton}>
          <Feather name="plus" size={46} style={styles.addPhotoButtonText} />
          <Text style={[styles.addPhotoButtonText, { fontSize: 18 }]}>
            {I18n.t('addPhoto')}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export default AddImageButton;
