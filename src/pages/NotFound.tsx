import { Helmet } from 'react-helmet';
import { useLanguage, translations } from '../context/LanguageContext';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Milan Koncz</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center px-4">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            {t.notFound.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            {t.notFound.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
            >
              <Home className="w-5 h-5 mr-2" />
              {t.notFound.homeButton}
            </a>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t.notFound.backButton}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound; 