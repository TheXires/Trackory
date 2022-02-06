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
  primary: '#6666FF',
  background: DefaultTheme.colors.background,
  card: DefaultTheme.colors.card,
  text: DefaultTheme.colors.text,
  textWhite: '#ffffff',
  border: DefaultTheme.colors.border,
  notification: DefaultTheme.colors.notification,
  success: '#47C24B',
  error: '#ff0000',
};
