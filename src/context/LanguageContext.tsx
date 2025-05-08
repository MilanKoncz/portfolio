import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

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
      skills: 'Fähigkeiten',
      contact: 'Kontakt',
    },
    home: {
      title: "Hallo, ich bin Milan Koncz",
      subtitle: "Full Stack Entwickler für moderne Web-Erlebnisse",
      viewWork: "Meine Arbeit",
      contactMe: "Kontakt",
      features: {
        development: {
          title: "Web-Entwicklung",
          description: "Entwicklung moderner, responsiver Webanwendungen mit React, TypeScript und Node.js"
        },
        experience: {
          title: "Berufserfahrung",
          description: "Über 2 Jahre Erfahrung in Full-Stack-Entwicklung und Software-Engineering"
        },
        contact: {
          title: "Kontakt",
          description: "Immer offen für neue Projekte, kreative Ideen oder Möglichkeiten"
        }
      },
      connect: "Verbinden Sie sich mit mir"
    },
    about: {
      title: 'Über Mich',
      subtitle: 'Lernen Sie mehr über meinen Werdegang, meine Erfahrungen und was mich antreibt',
      downloadCV: 'Lebenslauf herunterladen',
      myStory: 'Meine Geschichte',
      story1: 'Ich bin ein leidenschaftlicher Entwickler und Student der Wirtschaftsinformatik an der Universität Mannheim, derzeit im zweiten Semester mit einem beeindruckenden Notendurchschnitt von 1,2. Meine Reise in der Technologie begann mit einer soliden Grundlage in Informatik während meines bilingualen Abiturs am Anno-Gymnasium Siegburg.',
      story2: 'Als studentische Hilfskraft in der Universitäts-IT-Abteilung bin ich aktiv in der Full-Stack-Entwicklung und Softwareentwicklung tätig. Ich bin auch stolz darauf, Projektmanager bei Google Developer Groups on Campus und Kernmitglied bei Enactus Mannheim e.V. zu sein, wo ich zu nachhaltigen Tech-Initiativen beitrage.',
      professionalJourney: 'Beruflicher Werdegang',
      technicalSkills: 'Technische Fähigkeiten',
      programming: 'Programmierung & Web-Entwicklung',
      tools: 'Werkzeuge & Technologien',
      languages: 'Sprachen',
    },
    skills: {
      title: 'Technische Fähigkeiten',
      subtitle: 'Ein umfassender Überblick über meine technische Expertise und Fähigkeiten',
      alwaysLearning: 'Immer am Lernen',
      learningDesc: 'Ich erweitere ständig meine Fähigkeiten und bleibe auf dem neuesten Stand der Technologien und Best Practices in der Branche.',
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Haben Sie eine Frage oder möchten Sie zusammenarbeiten? Kontaktieren Sie mich!',
      contactInfo: 'Kontaktinformationen',
      connect: 'Verbinden Sie sich mit mir',
      sendMessage: 'Nachricht senden',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      send: 'Nachricht senden',
    },
    notFound: {
      title: 'Seite nicht gefunden',
      description: 'Die gesuchte Seite wurde möglicherweise entfernt, umbenannt oder ist vorübergehend nicht verfügbar.',
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