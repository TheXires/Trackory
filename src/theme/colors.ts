import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';


/**
 * Custom light theme based on default light theme with changed primary color
 */
export const MyLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6666FF',
  },
};

/**
 * Custom dark theme based on default dark theme with changed primary color
 */
export const MyDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#6666FF',
  },
};

/**
 * Theme colors that are permanent and do not change with system theme 
 */
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
