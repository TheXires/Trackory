import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomTextInput from './CustomTextInput';

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

function Searchbar({ searchTerm, setSearchTerm }: Props) {
  const { t } = useTranslation();

  return (
    <CustomTextInput
      hideTitle
      onChangeText={(text) => setSearchTerm(text)}
      placeholder={t('component.searchbar.search')}
      value={searchTerm}
    />
  );
}

export default Searchbar;
