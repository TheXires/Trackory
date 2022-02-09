import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    height: 40,
    padding: 5,
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 10,
  },
});

function InputContainer({ children, style }: Props) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { borderColor: colors.border }, style]}>{children}</View>
  );
}

export default InputContainer;
