import React, { createContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import Dialog from '../components/Dialog';
import { LoadingContextType } from '../interfaces/context';

export const LoadingContext = createContext({} as LoadingContextType);

const style = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        showLoadingPopup,
      }}
    >
      <>
        {/* eslint-disable-next-line react/destructuring-assignment */}
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
