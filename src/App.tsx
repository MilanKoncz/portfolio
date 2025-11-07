import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { lazyImportWithRetry } from './utils/lazyWithRetry';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './layout/Layout';
import Pacman from './pages/Pacman';

// Lazy load pages
const Home = lazy(lazyImportWithRetry(() => import('./pages/Home')));
const About = lazy(lazyImportWithRetry(() => import('./pages/About')));
const Portfolio = lazy(lazyImportWithRetry(() => import('./pages/Portfolio')));
const Skills = lazy(lazyImportWithRetry(() => import('./pages/Skills')));
const Contact = lazy(lazyImportWithRetry(() => import('./pages/Contact')));
const NotFound = lazy(lazyImportWithRetry(() => import('./pages/NotFound')));
const Impressum = lazy(lazyImportWithRetry(() => import('./pages/Impressum')));
const Datenschutz = lazy(lazyImportWithRetry(() => import('./pages/Datenschutz')));

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

/**
 * Application routes
 * Note: Header navigation visibility is controlled by src/config/site.ts
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        )
      },
      {
        path: 'portfolio',
        element: (
          <Suspense fallback={<Loading />}>
            <Portfolio />
          </Suspense>
        )
      },
      {
        path: 'skills',
        element: (
          <Suspense fallback={<Loading />}>
            <Skills />
          </Suspense>
        )
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        )
      },
      {
        path: 'pacman',
        element: (
          <Suspense fallback={<Loading />}>
            <Pacman />
          </Suspense>
        )
      },
      {
        path: 'impressum',
        element: (
          <Suspense fallback={<Loading />}>
            <Impressum />
          </Suspense>
        )
      },
      {
        path: 'datenschutz',
        element: (
          <Suspense fallback={<Loading />}>
            <Datenschutz />
          </Suspense>
        )
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        )
      }
    ]
  }
]);

function App() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </LanguageProvider>
  );
}

export default App; 