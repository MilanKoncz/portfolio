import { Helmet } from 'react-helmet';
import { useLanguage, translations } from '../context/LanguageContext';
import { Code, Database, Server, Layout, Terminal, GitBranch, Shield, Zap } from 'lucide-react';

const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Layout className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'HTML5/CSS3', level: 95 },
      ],
    },
    {
      title: 'Backend Development',
      icon: <Server className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'REST APIs', level: 90 },
        { name: 'GraphQL', level: 75 },
      ],
    },
    {
      title: 'Database & Storage',
      icon: <Database className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'Redis', level: 75 },
        { name: 'Firebase', level: 85 },
      ],
    },
    {
      title: 'DevOps & Tools',
      icon: <Terminal className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 80 },
        { name: 'CI/CD', level: 75 },
        { name: 'AWS', level: 70 },
      ],
    },
    {
      title: 'Security & Performance',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      skills: [
        { name: 'Web Security', level: 85 },
        { name: 'Performance Optimization', level: 80 },
        { name: 'Testing', level: 75 },
        { name: 'Accessibility', level: 85 },
      ],
    },
    {
      title: 'Version Control & Collaboration',
      icon: <GitBranch className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      skills: [
        { name: 'GitHub', level: 90 },
        { name: 'GitLab', level: 85 },
        { name: 'Code Review', level: 80 },
        { name: 'Team Collaboration', level: 90 },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Skills | Milan Koncz</title>
        <meta name="description" content="Explore Milan Koncz's technical skills and expertise in web development, including React, TypeScript, Node.js, and more." />
        <meta name="keywords" content="Technical Skills, Web Development, React, TypeScript, Node.js, Full Stack Development" />
        <meta property="og:title" content="Skills | Milan Koncz" />
        <meta property="og:description" content="Explore Milan Koncz's technical skills and expertise in web development, including React, TypeScript, Node.js, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://milan-koncz.com/skills" />
        <link rel="canonical" href="https://milan-koncz.com/skills" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={category.title}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                <div className={`p-6 bg-gradient-to-r ${category.color} text-white`}>
                  <div className="flex items-center space-x-3">
                    {category.icon}
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                </div>
                <div className="p-6">
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
              <p>{t.skills.alwaysLearning}</p>
            </div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {t.skills.learningDesc}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills; 