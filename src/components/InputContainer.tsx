import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
    padding: 5,
    width: '100%',
  },
});

function InputContainer({ children, style }: Props) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { borderColor: colors.border }, style]}>
      {children}
    </View>
  );
}

export default InputContainer;
