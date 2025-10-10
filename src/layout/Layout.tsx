import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useLanguage, translations } from '../context/LanguageContext';
import { Sun, Moon, Menu, X, Globe, Home } from 'lucide-react';
import LoadingBar from '../components/LoadingBar';
import BackToTop from '../components/BackToTop';
import SkipToContent from '../components/SkipToContent';
import PacmanIcon from '../components/PacmanIcon';
import { navigation, featureToggles } from '../config/site';
import Analytics from '../components/Analytics';

/**
 * Layout component
 * - Renders the app shell (header, footer, navigation)
 * - Provides theme toggle (dark/light) and language toggle (en/de)
 * - Uses centralized navigation config to show/hide links
 */
const Layout = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Map navigation config to localized labels and styles
  const navLinks = navigation
    .filter((item) => item.enabled)
    .map((item) => {
      const label = t.nav[item.key as keyof typeof t.nav];
      const hoverMap: Record<string, string> = {
        home: 'hover:text-blue-500 dark:hover:text-blue-400',
        about: 'hover:text-green-500 dark:hover:text-green-400',
        portfolio: 'hover:text-orange-500 dark:hover:text-orange-400',
        skills: 'hover:text-purple-500 dark:hover:text-purple-400',
        contact: 'hover:text-red-500 dark:hover:text-red-400',
      };
      return {
        path: item.path,
        label,
        ariaLabel: item.ariaLabel ?? label,
        hoverColor: hoverMap[item.key] ?? 'hover:text-blue-500 dark:hover:text-blue-400',
      };
    });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Analytics />
      <SkipToContent />
      <LoadingBar />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50" role="banner">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-900 dark:text-white hover:text-sky-400 dark:hover:text-sky-400 transition-colors"
              aria-label="Home"
            >
              <Home className="w-6 h-6" />
              <span className="font-semibold">Home</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-gray-600 dark:text-gray-300 transition-colors ${location.pathname === link.path
                      ? 'text-blue-600 dark:text-blue-400 font-semibold'
                      : link.hoverColor
                    }`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Theme and Language Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Toggle language"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-white dark:bg-gray-900 shadow-lg" role="navigation" aria-label="Mobile navigation">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-gray-600 dark:text-gray-300 transition-colors ${location.pathname === link.path
                        ? 'text-blue-600 dark:text-blue-400 font-semibold'
                        : link.hoverColor
                      }`}
                    onClick={toggleMenu}
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={toggleLanguage}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="Toggle language"
                  >
                    <Globe className="w-5 h-5" />
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="Toggle theme"
                  >
                    {isDarkMode ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="pt-16" role="main">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8" role="contentinfo">
        <div className="container mx-auto px-4 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {featureToggles.showPacmanIcon && <PacmanIcon />}
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">© 2025 Milan Koncz. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
};

export default Layout; 