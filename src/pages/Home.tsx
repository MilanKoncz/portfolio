import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useLanguage, translations } from '../context/LanguageContext';
import { ArrowRight, Code, Briefcase, Mail, Github, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { content } from '../config/content';
import { siteMeta, socialLinks } from '../config/site';

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const c = content[language]?.home || {};

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{siteMeta.title}</title>
        <meta name="description" content="Full Stack Developer specializing in modern web technologies. Based in Mannheim, Germany." />
        <meta name="keywords" content="Full Stack Developer, Web Development, React, TypeScript, Node.js, Mannheim" />
        <meta property="og:title" content="Milan Koncz | Full Stack Developer" />
        <meta property="og:description" content="Full Stack Developer specializing in modern web technologies. Based in Mannheim, Germany." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteMeta.baseUrl} />
        <link rel="canonical" href={siteMeta.baseUrl} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 animate-gradient" />

          {/* Animated circles */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
                variants={fadeInUp}
              >
                {c.title || t.home.title}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12"
                variants={fadeInUp}
              >
                {c.subtitle || t.home.subtitle}
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                variants={fadeInUp}
              >
                <Link
                  to="/skills"
                  className="group flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
                >
                  {t.home.viewWork}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="mailto:milan.koncz1@gmail.com"
                  className="group flex items-center px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
                >
                  {t.home.contactMe}
                  <Mail className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
          </div>



          {/* Scroll indicator
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div> */}

        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                  <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.home.features.development.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.home.features.development.description}
                </p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6">
                  <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.home.features.experience.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.home.features.experience.description}
                </p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.home.features.contact.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.home.features.contact.description}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
                variants={fadeInUp}
              >
                {t.home.connect}
              </motion.h2>
              <motion.div
                className="flex justify-center space-x-6"
                variants={fadeInUp}
              >
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6 text-gray-900 dark:text-white" />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-gray-900 dark:text-white" />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-gray-900 dark:text-white" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home; 