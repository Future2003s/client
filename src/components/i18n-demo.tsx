"use client";

import { useTranslation } from "@/hooks/use-translation";
import LanguageSwitcher from "./language-switcher";

export default function I18nDemo() {
  const { t, formatCurrency, formatDate, formatNumber } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {t("loading")} - Internationalization Demo
        </h1>
        <LanguageSwitcher />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Navigation Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Navigation
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Home:</span>
              <span className="font-medium">Trang Chủ</span>
            </div>
            <div className="flex justify-between">
              <span>Products:</span>
              <span className="font-medium">Sản Phẩm</span>
            </div>
            <div className="flex justify-between">
              <span>About:</span>
              <span className="font-medium">Giới Thiệu</span>
            </div>
            <div className="flex justify-between">
              <span>Contact:</span>
              <span className="font-medium">Liên Hệ</span>
            </div>
          </div>
        </div>

        {/* Common Actions Section */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-green-900 mb-4">
            Common Actions
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t("save")}:</span>
              <span className="font-medium">{t("save")}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("delete")}:</span>
              <span className="font-medium">{t("delete")}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("edit")}:</span>
              <span className="font-medium">{t("edit")}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("search")}:</span>
              <span className="font-medium">{t("search")}</span>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Products
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Price:</span>
              <span className="font-medium">{formatCurrency(1500000)}</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity:</span>
              <span className="font-medium">{formatNumber(42)}</span>
            </div>
            <div className="flex justify-between">
              <span>Add to Cart:</span>
              <span className="font-medium">Thêm vào giỏ</span>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-orange-900 mb-4">Orders</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Order Date:</span>
              <span className="font-medium">{formatDate(new Date())}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="font-medium">Pending</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
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
            <div className="text-xs text-gray-500">Japanese</div>
          </div>
        </div>
      </div>
    </div>
  );
}
