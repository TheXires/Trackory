import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import InputContainer from './InputContainer';

interface Props {
  autoCompleteType?: 'password' | 'email' | 'name' | 'username' | undefined;
  autoCorrect?: boolean;
  hideTitle?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | undefined;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  title?: string;
  value: string;
}

function CustomTextInput({
  autoCompleteType = undefined,
  autoCorrect = false,
  hideTitle = false,
  keyboardType = 'default',
  onChangeText,
  placeholder,
  secureTextEntry = false,
  title = '',
  value,
}: Props) {
  const { colors } = useTheme();

  return (
    <>
      {!hideTitle && <Text style={[styles.heading, { color: colors.text }]}>{title}</Text>}
      <InputContainer>
        <TextInput
          autoCompleteType={autoCompleteType}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          onChangeText={(text) => onChangeText(text)}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={{ color: colors.text }}
          value={value}
        />
      </InputContainer>
    </>
  );
}

export default CustomTextInput;

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 3,
  },
});
