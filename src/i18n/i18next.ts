import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './de/default.json';
import en from './en/default.json';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  defaultNS: 'default',
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    de: { default: de },
    en: { default: en },
  },
});

export default i18next;
