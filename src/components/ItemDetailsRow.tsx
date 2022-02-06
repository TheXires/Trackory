import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});

function ItemDetailsRow({ left, right }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <Text style={[styles.text, { color: colors.text }]}>{left}</Text>
      <Text style={[styles.text, { color: colors.text }]}>{right}</Text>
    </View>
  );
}

export default ItemDetailsRow;
