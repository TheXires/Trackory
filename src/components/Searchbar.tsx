import React from 'react';
import { i18n } from '../i18n/i18n';
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
      placeholder={i18n.t('search')}
      value={searchTerm}
    />
  );
}

export default Searchbar;
