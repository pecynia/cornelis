export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'de'] //'es', 'pt', 'fr', 'it', 'de', 'sv', 'no', 'da', 'fi', 'pl', 'cs', 'ro', 'hu', 'tr']
} as const;

export type Locale = (typeof i18n)['locales'][number];
