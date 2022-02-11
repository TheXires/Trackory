import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { permanentColors } from '../theme/colors';

interface Props {
  text: string;
  onPress: () => void;
}

function NavigationHeaderButton({ text, onPress }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={[styles.text, { color: permanentColors.primary }]}>{text}</Text>
    </Pressable>
  );
}

export default NavigationHeaderButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  text: {
    fontSize: 17,
  },
});
