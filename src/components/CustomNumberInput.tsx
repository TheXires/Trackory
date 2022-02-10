import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import convertTextToInteger from '../util/numberconverter';
import InputContainer from './InputContainer';

interface Props {
  hideTitle?: boolean;
  onChangeText: (text: number | undefined) => void;
  placeholder: string;
  title?: string;
  value: number | undefined;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: 3,
  },
});

function CustomNumberInput({
  hideTitle = false,
  onChangeText,
  placeholder,
  title = '',
  value,
}: Props) {
  const { colors } = useTheme();

  return (
    <>
      {!hideTitle && (
        <Text style={[styles.heading, { color: colors.text }]}>{title}</Text>
      )}
      <InputContainer>
        <TextInput
          autoCorrect={false}
          keyboardType="numeric"
          onChangeText={(text) => onChangeText(convertTextToInteger(text))}
          placeholder={placeholder}
          style={{ color: colors.text }}
          value={value?.toString()}
        />
      </InputContainer>
    </>
  );
}

export default CustomNumberInput;
