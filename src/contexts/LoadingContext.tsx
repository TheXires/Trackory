import React, { createContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import Dialog from '../components/Dialog';
import { LoadingContextType } from '../types/context';

export const LoadingContext = createContext({} as LoadingContextType);

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
});

export function LoadingProvider(props: any) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState('');

  const showLoadingPopup = (isLoading: boolean, title?: string | undefined) => {
    setIsVisible(isLoading);
    setPopupTitle(title ?? '');
  };

  return (
    <LoadingContext.Provider
      value={{
        showLoadingPopup,
      }}
    >
      <>
        {props.children}
        <Dialog show={isVisible} onClose={() => null}>
          <View style={style.container}>
            <CustomActivityIndicator />
            <Text>{popupTitle}</Text>
          </View>
        </Dialog>
      </>
    </LoadingContext.Provider>
  );
}
