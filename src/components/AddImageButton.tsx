import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import I18n from 'i18n-js';
import { permanentColors } from '../theme/colors';

interface Props {
  imageUri: string | undefined;
  onPress: () => void;
}

const styles = StyleSheet.create({
  addPhotoButtonContainer: {
    alignItems: 'center',
  },
  addPhotoButton: {
    borderRadius: 25,
    borderColor: permanentColors.primary,
    borderWidth: 6,
    width: 150,
    aspectRatio: 1,
    justifyContent: 'center',
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
          source={{ uri: imageUri, width: 250, height: 300 }}
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
