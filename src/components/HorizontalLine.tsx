import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

function HorizontalLine() {
  const { colors } = useTheme();

  return (
    <View
      style={{ width: '100%', height: 1, backgroundColor: colors.text, opacity: 0.1 }}
    />
  );
}

export default HorizontalLine;
