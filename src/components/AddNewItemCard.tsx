import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 20,
  },
  box: {
    width: '100%',
    height: 150,
    borderRadius: 25,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

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
