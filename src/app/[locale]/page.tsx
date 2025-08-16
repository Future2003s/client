import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('home.welcome')} LALA-LYCHEEE
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {t('home.hero_title')}
          </p>
          <p className="text-lg text-gray-500">
            {t('home.hero_subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {t('home.featured_products')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('home.hero_subtitle')}
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {t('home.view_all')}
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {t('home.latest_products')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('home.hero_subtitle')}
            </p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              {t('home.view_all')}
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {t('home.trending')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('home.hero_subtitle')}
            </p>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              {t('home.view_all')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}