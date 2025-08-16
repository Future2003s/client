import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    throw new Error(`Locale '${locale}' is not supported`);
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default
  };
});