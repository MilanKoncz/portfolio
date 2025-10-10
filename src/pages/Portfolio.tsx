import { Helmet } from 'react-helmet';
import { useLanguage, translations } from '../context/LanguageContext';
import { Github, ExternalLink } from 'lucide-react';
import { siteMeta } from '../config/site';
import { projects } from '../config/projects';

const Portfolio = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // projects are now read from src/config/projects.ts

  return (
    <>
      <Helmet>
        <title>Portfolio | {siteMeta.title.split(' - ')[0]}</title>
        <meta name="description" content="Explore Milan Koncz's portfolio of web development projects, showcasing expertise in React, Node.js, and modern web technologies." />
        <meta name="keywords" content="Portfolio, Web Development Projects, React, Node.js, Full Stack Development" />
        <meta property="og:title" content="Portfolio | Milan Koncz" />
        <meta property="og:description" content="Explore Milan Koncz's portfolio of web development projects, showcasing expertise in React, Node.js, and modern web technologies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteMeta.baseUrl}/portfolio`} />
        <link rel="canonical" href={`${siteMeta.baseUrl}/portfolio`} />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A collection of my recent work and personal projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-20`} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Portfolio; 