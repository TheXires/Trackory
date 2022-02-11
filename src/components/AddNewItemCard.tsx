import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  onPress: () => void;
}

function AddNewItemCard({ onPress }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={[styles.box, { borderColor: colors.primary }]}>
          <View style={styles.innerBox}>
            <Feather name="plus" style={[styles.icon, { color: colors.primary }]} />
            <Text style={[styles.text, { color: colors.primary }]}>
              {I18n.t('create')}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default AddNewItemCard;

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 6,
    height: 150,
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  icon: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  innerBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
