import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

function HorizontalLine() {
  const { colors } = useTheme();

  return (
    <View
      style={{ backgroundColor: colors.text, height: 1, opacity: 0.1, width: '100%' }}
    />
  );
}

export default HorizontalLine;
