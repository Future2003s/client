'use client';

import { useTranslations, useLocale } from 'next-intl';

export function useTranslation() {
  const t = useTranslations();
  const locale = useLocale();

  return {
    t,
    locale,
    // Helper function để format số tiền theo locale
    formatCurrency: (amount: number, currency: string = 'VND') => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(amount);
    },
    // Helper function để format ngày tháng theo locale
    formatDate: (date: Date | string) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj);
    },
    // Helper function để format thời gian theo locale
    formatTime: (date: Date | string) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
      }).format(dateObj);
    },
    // Helper function để format số theo locale
    formatNumber: (number: number) => {
      return new Intl.NumberFormat(locale).format(number);
    },
  };
}