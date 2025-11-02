import { Helmet } from 'react-helmet';
import { useLanguage, translations } from '../context/LanguageContext';
import { Database, Layout, Terminal, GitBranch, Zap } from 'lucide-react';
import { content } from '../config/content';
import { siteMeta } from '../config/site';

const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const c = content[language]?.skills || {};

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Layout className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      skills: [
        { name: 'React', level: 60 },
        { name: 'TypeScript', level: 65 },
        { name: 'Tailwind CSS', level: 70 },
        { name: 'HTML5/CSS3', level: 80 },
      ],
    },
    {
      title: 'Databases',
      icon: <Database className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      skills: [
        { name: 'MySQL', level: 75 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MongoDB', level: 70 },
        { name: 'SQLite', level: 95 },
      ],
    },
    {
      title: 'Version Control',
      icon: <GitBranch className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'GitHub', level: 85 },
        { name: 'GitLab', level: 85 },
      ],
    },
    {
      title: 'Programming Languages',
      icon: <Terminal className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      skills: [
        { name: 'Java', level: 95 },
        { name: 'PHP', level: 70 },
        { name: 'Python', level: 75 },
        { name: 'JavaScript', level: 60 },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Skills | {siteMeta.title.split(' - ')[0]}</title>
        <meta name="description" content="Explore Milan Koncz's technical skills and expertise in web development, including React, TypeScript, Node.js, and more." />
        <meta name="keywords" content="Technical Skills, Web Development, React, TypeScript, Node.js, Full Stack Development" />
        <meta property="og:title" content="Skills | Milan Koncz" />
        <meta property="og:description" content="Explore Milan Koncz's technical skills and expertise in web development, including React, TypeScript, Node.js, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteMeta.baseUrl}/skills`} />
        <link rel="canonical" href={`${siteMeta.baseUrl}/skills`} />
      </Helmet>

      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.skills.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t.skills.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 flex flex-col h-full"
              >
                <div className={`p-6 bg-gradient-to-r ${category.color} text-white`}>
                  <div className="flex items-center space-x-3">
                    {category.icon}
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                </div>
                <div className="p-6 grow">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                        <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Zap className="w-5 h-5 text-yellow-500" />
              <p>{c.alwaysLearning || t.skills.alwaysLearning}</p>
            </div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {c.learningDesc || t.skills.learningDesc}
            </p>

            {/* Badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['React', 'TypeScript', 'Tailwind', 'Java', 'PHP', 'Python', 'JavaScript', 'MySQL', 'PostgreSQL', 'MongoDB', 'Git', 'GitHub', 'GitLab'].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills; 