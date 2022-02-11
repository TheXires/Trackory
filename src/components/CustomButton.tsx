import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { permanentColors } from '../theme/colors';

interface Props {
  onPress: () => void;
  value: string;
  buttonColor?: string;
  enabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
}

function CustomButton({
  value,
  onPress,
  buttonColor = permanentColors.primary,
  enabled = true,
  style = undefined,
  textColor = permanentColors.textWhite,
}: Props) {
  const { colors } = useTheme();

  return (
    <RectButton
      enabled={enabled}
      onPress={() => onPress()}
      style={[
        styles.button,
        { backgroundColor: enabled ? buttonColor : colors.border },
        style,
      ]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{value}</Text>
    </RectButton>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
