import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

/**
 * LanguageContext
 * - Provides current language ('en' | 'de') and a toggle function
 * - Translations object contains page strings used throughout the app
 */
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      skills: 'Skills',
      contact: 'Contact',
    },
    home: {
      title: "Hi, I'm Milan Koncz",
      subtitle: "Full Stack Developer crafting modern web experiences",
      viewWork: "View My Work",
      contactMe: "Contact Me",
      features: {
        development: {
          title: "Web Development",
          description: "Building modern, responsive web applications using React, TypeScript, and Node.js"
        },
        experience: {
          title: "Professional Experience",
          description: "Over 2 years of experience in full-stack development and software engineering"
        },
        contact: {
          title: "Let's Connect",
          description: "Always open to discussing new projects, creative ideas, or opportunities"
        }
      },
      connect: "Connect with me"
    },
    about: {
      title: 'About Me',
      subtitle: 'Get to know more about my journey, experience, and what drives me',
      downloadCV: 'Download CV',
      myStory: 'My Story',
      story1: "I'm a passionate developer and business informatics student at the University of Mannheim, currently in my second semester with an impressive GPA of 1.2. My journey in technology began with a strong foundation in computer science during my bilingual Abitur at Anno-Gymnasium Siegburg.",
      story2: "As a student assistant at the University IT Department, I'm actively involved in full-stack development and software development projects. I'm also proud to be a Project Manager at Google Developer Groups on Campus and a Core Member at Enactus Mannheim e.V., where I contribute to sustainable tech initiatives.",
      professionalJourney: 'Professional Journey',
      technicalSkills: 'Technical Skills',
      programming: 'Programming & Web Development',
      tools: 'Tools & Technologies',
      languages: 'Languages',
    },
    skills: {
      title: 'Technical Skills',
      subtitle: 'A comprehensive overview of my technical expertise and capabilities',
      alwaysLearning: 'Always Learning',
      learningDesc: "I'm constantly expanding my skill set and staying up-to-date with the latest technologies and best practices in the industry.",
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Have a question or want to work together? Feel free to reach out!',
      contactInfo: 'Contact Information',
      connect: 'Connect with Me',
      sendMessage: 'Send a Message',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
    },
    notFound: {
      title: 'Page Not Found',
      description: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
      homeButton: 'Go to Homepage',
      backButton: 'Go Back'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      about: 'Über Mich',
      portfolio: 'Portfolio',
      skills: 'Skills',
      contact: 'Kontakt',
    },
    home: {
      title: "Hallo, ich bin Milan Koncz",
      subtitle: "Full‑Stack‑Entwickler für moderne Web‑Erlebnisse",
      viewWork: "Meine Arbeit",
      contactMe: "Kontakt aufnehmen",
      features: {
        development: {
          title: "Webentwicklung",
          description: "Moderne, responsive Webanwendungen mit React, TypeScript und Node.js"
        },
        experience: {
          title: "Erfahrung",
          description: "Über 2 Jahre Erfahrung in Full‑Stack‑Entwicklung und Software‑Engineering"
        },
        contact: {
          title: "Kontakt",
          description: "Offen für neue Projekte, Ideen und Möglichkeiten"
        }
      },
      connect: "Vernetzen wir uns"
    },
    about: {
      title: 'Über mich',
      subtitle: 'Mehr über meinen Werdegang, meine Erfahrungen und was mich antreibt',
      downloadCV: 'Lebenslauf herunterladen',
      myStory: 'Meine Geschichte',
      story1: 'Ich bin ein leidenschaftlicher Entwickler und studiere Wirtschaftsinformatik an der Universität Mannheim. Aktuell bin ich im dritten Semester (deutscher Notenschnitt: 1,6).',
      story2: 'Ich arbeite als studentische Hilfskraft in der Universitäts‑IT, bin Head of IT bei Enactus Mannheim e.V. und Projektmanager bei den Google Developer Groups on Campus.',
      professionalJourney: 'Werdegang',
      technicalSkills: 'Technische Skills',
      programming: 'Programmiersprachen',
      tools: 'Werkzeuge & Technologien',
      languages: 'Sprachen',
    },
    skills: {
      title: 'Skills',
      subtitle: 'Ein Überblick über meine technischen Stärken',
      alwaysLearning: 'Immer am Lernen',
      learningDesc: 'Ich erweitere ständig meine Fähigkeiten und bleibe bei neuen Technologien am Ball.',
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Hast du eine Frage oder ein Projekt? Melde dich gern!',
      contactInfo: 'Kontaktinformationen',
      connect: 'Vernetze dich mit mir',
      sendMessage: 'Nachricht senden',
      name: 'Name',
      email: 'E‑Mail',
      message: 'Nachricht',
      send: 'Nachricht senden',
    },
    notFound: {
      title: 'Seite nicht gefunden',
      description: 'Diese Seite wurde möglicherweise entfernt, umbenannt oder ist vorübergehend nicht erreichbar.',
      homeButton: 'Zur Startseite',
      backButton: 'Zurück'
    }
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'de' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 