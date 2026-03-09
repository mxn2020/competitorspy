// i18n configuration for CompetitorSpy
const translations = {
    en: { appName: 'CompetitorSpy', description: 'SWOT-style competitive analysis reports' },
    de: { appName: 'CompetitorSpy', description: 'SWOT-style competitive analysis reports (DE)' },
} as const

export type Locale = keyof typeof translations
export const defaultLocale: Locale = 'en'
export const supportedLocales = Object.keys(translations) as Locale[]

export function t(key: keyof typeof translations.en, locale: Locale = defaultLocale): string {
    return translations[locale]?.[key] ?? translations.en[key] ?? key
}

export default translations
