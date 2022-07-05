import { resources, defaultNS } from './i18n';

declare module 'react-i18next' {
  type DefaultResources = typeof resources['en'];

  type Resources = DefaultResources;
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources['en'];
  }
}
