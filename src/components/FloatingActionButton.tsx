import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 56,
    height: 56,
    right: 20,
    bottom: 20,
    borderRadius: 31,
    justifyContent: 'center',
    alignItems: 'center',
    // shadow for ios
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.3,
    // shadow for android
    elevation: 4,
  },
});

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
