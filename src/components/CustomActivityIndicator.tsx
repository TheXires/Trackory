import { ActivityIndicator, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { permanentColors } from '../theme/colors';

interface Props {
  size?: 'small' | 'large';
  color?: string;
  style?: StyleProp<ViewStyle> | undefined;
}

const styles = StyleSheet.create({
  activityIndicator: {
    margin: 25,
  },
});

function CustomActivityIndicator({
  size = 'large',
  color = permanentColors.primary,
  style = undefined,
}: Props) {
  return (
    <ActivityIndicator
      size={size}
      color={color}
      style={[styles.activityIndicator, style]}
    />
  );
}

export default CustomActivityIndicator;
