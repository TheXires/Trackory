import I18n from 'i18n-js';
import React from 'react';
import CustomTextInput from './CustomTextInput';

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

function Searchbar({ searchTerm, setSearchTerm }: Props) {
  return (
    <CustomTextInput
      hideTitle
      onChangeText={(text) => setSearchTerm(text)}
      placeholder={I18n.t('search')}
      value={searchTerm}
    />
  );
}

export default Searchbar;
