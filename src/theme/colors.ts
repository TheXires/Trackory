import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

export const MyLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6666FF',
  },
};

export const MyDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#6666FF',
  },
};

export const permanentColors = {
  background: DefaultTheme.colors.background,
  border: DefaultTheme.colors.border,
  card: DefaultTheme.colors.card,
  error: '#ff0000',
  notification: DefaultTheme.colors.notification,
  primary: '#6666FF',
  success: '#47C24B',
  text: DefaultTheme.colors.text,
  textWhite: '#ffffff',
};
