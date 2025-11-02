import { Helmet } from 'react-helmet';
import { Code2, Briefcase, GraduationCap, Download } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import { content } from '../config/content';
import { siteMeta, documents } from '../config/site';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const c = content[language]?.about || {};

  return (
    <>
      <Helmet>
        <title>About Me | {siteMeta.title.split(' - ')[0]}</title>
        <meta name="description" content="Learn more about Milan Koncz, a Full Stack Developer and Business Informatics student at the University of Mannheim. View my professional journey and technical skills." />
        <meta name="keywords" content="About Milan Koncz, Full Stack Developer, Business Informatics, University of Mannheim, Technical Skills" />
        <meta property="og:title" content="About Me | Milan Koncz" />
        <meta property="og:description" content="Learn more about Milan Koncz, a Full Stack Developer and Business Informatics student at the University of Mannheim. View my professional journey and technical skills." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteMeta.baseUrl}/about`} />
        <link rel="canonical" href={`${siteMeta.baseUrl}/about`} />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        {/* About Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t.about.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t.about.subtitle}
          </p>
          <a
            href={documents.cvUrl}
            download="CVMilanKoncz.pdf"
            className="inline-flex items-center mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            {t.about.downloadCV}
          </a>
        </div>

        {/* Bio Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              {t.about.myStory}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>{c.story1 || t.about.story1}</p>
              <p>{c.story2 || t.about.story2}</p>
            </div>
          </div>

          {/* Professional Journey */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              {t.about.professionalJourney}
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <Briefcase className="w-6 h-6 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Student Assistant at University IT Department
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">02.2025 - Present</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Full-stack development and software development projects
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-6 h-6 text-purple-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    B. Sc. in Business Informatics
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">09.2024 - Present</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Current semester: 3rd, German GPA: 1.6
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center mb-4">
                  <Code2 className="w-6 h-6 text-green-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Head of IT — Enactus Mannheim e.V.
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">2025 - Present</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Leading IT initiatives and supporting project teams with modern web solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              {t.about.technicalSkills}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.about.programming}
                </h3>
                <ul className="space-y-2">
                  <li className="text-gray-600 dark:text-gray-300">Java - Very Good</li>
                  <li className="text-gray-600 dark:text-gray-300">PHP - Very Good</li>
                  <li className="text-gray-600 dark:text-gray-300">HTML/CSS - Very Good</li>
                  <li className="text-gray-600 dark:text-gray-300">JavaScript - Good</li>
                  <li className="text-gray-600 dark:text-gray-300">Python - Good</li>
                  <li className="text-gray-600 dark:text-gray-300">C# - Good</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.about.tools}
                </h3>
                <ul className="space-y-2">
                  <li className="text-gray-600 dark:text-gray-300">Git - Very Good</li>
                  <li className="text-gray-600 dark:text-gray-300">MySQL - Good</li>
                  <li className="text-gray-600 dark:text-gray-300">Node.js/Express - Good</li>
                  <li className="text-gray-600 dark:text-gray-300">Unity Engine - Good</li>
                  <li className="text-gray-600 dark:text-gray-300">MS Office Suite - Very Good</li>
                  <li className="text-gray-600 dark:text-gray-300">Video & Image Editing - Good</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Languages Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              {t.about.languages}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-green-500">
              <ul className="space-y-2">
                <li className="text-gray-600 dark:text-gray-300">German - Native</li>
                <li className="text-gray-600 dark:text-gray-300">Hungarian - Native</li>
                <li className="text-gray-600 dark:text-gray-300">English - C1</li>
                <li className="text-gray-600 dark:text-gray-300">Latin - Latinum</li>
                <li className="text-gray-600 dark:text-gray-300">Korean - A2</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About; 