import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

interface Props {
  onPress: () => void;
  icon: keyof typeof Feather.glyphMap;
}

function FloatingActionButton({ onPress, icon }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { backgroundColor: colors.border }]}
    >
      <Feather name={icon} size={24} color={colors.text} onPress={onPress} />
    </Pressable>
  );
}

export default FloatingActionButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 31,
    bottom: 20,
    elevation: 4,
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: 56,
  },
});
