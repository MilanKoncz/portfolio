import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './layout/Layout';
import Pacman from './pages/Pacman';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Skills = lazy(() => import('./pages/Skills'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

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
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App; 