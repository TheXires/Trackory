import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import convertTextToInteger from '../util/numberconverter';
import InputContainer from './InputContainer';

interface Props {
  description: string;
  unit: string;
  value: number | null;
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
  isEditing: boolean;
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    paddingVertical: 15,
  },
  inputContainer: {
    alignItems: 'center',
    width: 60,
    marginBottom: 0,
  },
});

function ItemDetailsRow({ description, unit, value, setValue, isEditing }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <Text style={[styles.text, { color: colors.text }]}>{description}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isEditing && (
          <InputContainer style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={colors.text}
              placeholder="0"
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={(text) => setValue(convertTextToInteger(text))}
              maxLength={4}
              style={{ paddingHorizontal: 5, color: colors.text }}
            />
          </InputContainer>
        )}
        <Text style={[styles.text, { color: colors.text }]}>{`${
          isEditing ? '' : value
        } ${unit}`}</Text>
      </View>
    </View>
  );
}

export default ItemDetailsRow;
