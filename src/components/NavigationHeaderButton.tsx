import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  text: string;
  onPress: () => void;
}

function NavigationHeaderButton({ text, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={[styles.text, { color: colors.primary }]}>{text}</Text>
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
