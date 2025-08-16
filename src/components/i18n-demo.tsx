'use client';

import { useTranslation } from '@/hooks/use-translation';
import LanguageSwitcher from './language-switcher';

export default function I18nDemo() {
  const { t, formatCurrency, formatDate, formatNumber } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('common.loading')} - Internationalization Demo
        </h1>
        <LanguageSwitcher />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Navigation Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            {t('navigation.title')}
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t('navigation.home')}:</span>
              <span className="font-medium">{t('navigation.home')}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('navigation.products')}:</span>
              <span className="font-medium">{t('navigation.products')}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('navigation.about')}:</span>
              <span className="font-medium">{t('navigation.about')}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('navigation.contact')}:</span>
              <span className="font-medium">{t('navigation.contact')}</span>
            </div>
          </div>
        </div>

        {/* Common Actions Section */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-green-900 mb-4">
            {t('common.title')}
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t('common.save')}:</span>
              <span className="font-medium">{t('common.save')}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('common.delete')}:</span>
              <span className="font-medium">{t('common.delete')}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('common.edit')}:</span>
              <span className="font-medium">{t('common.edit')}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('common.search')}:</span>
              <span className="font-medium">{t('common.search')}</span>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            {t('products.title')}
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t('products.price')}:</span>
              <span className="font-medium">{formatCurrency(1500000)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('products.quantity')}:</span>
              <span className="font-medium">{formatNumber(42)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('products.add_to_cart')}:</span>
              <span className="font-medium">{t('products.add_to_cart')}</span>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-orange-900 mb-4">
            {t('orders.title')}
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t('orders.order_date')}:</span>
              <span className="font-medium">{formatDate(new Date())}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('orders.status')}:</span>
              <span className="font-medium">{t('orders.pending')}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('orders.total_amount')}:</span>
              <span className="font-medium">{formatCurrency(2500000)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Language Information */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Language Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">🇻🇳</div>
            <div className="text-sm text-gray-600">Tiếng Việt</div>
            <div className="text-xs text-gray-500">Vietnamese</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">🇺🇸</div>
            <div className="text-sm text-gray-600">English</div>
            <div className="text-xs text-gray-500">Tiếng Anh</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">🇯🇵</div>
            <div className="text-sm text-gray-600">日本語</div>
            <div className="text-xs text-gray-500">Japanese</div>
          </div>
        </div>
      </div>
    </div>
  );
}