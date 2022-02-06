import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import InputContainer from './InputContainer';

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  textInput: {
    width: '100%',
  },
});

function Searchbar({ searchTerm, setSearchTerm }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <InputContainer>
        <TextInput
          style={[
            styles.textInput,
            { color: colors.text, opacity: searchTerm.length === 0 ? 0.6 : 1 },
          ]}
          placeholderTextColor={colors.text}
          placeholder={I18n.t('search')}
          value={searchTerm}
          onChangeText={(input: string) => setSearchTerm(input)}
        />
      </InputContainer>
    </View>
  );
}

export default Searchbar;
