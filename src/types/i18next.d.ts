import Resources from './localization';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'default';
    resources: Resources;
  }
}
