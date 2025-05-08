import { Helmet } from 'react-helmet';
import { useLanguage, translations } from '../context/LanguageContext';

const Pacman = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <Helmet>
        <title>Pacman | Milan Koncz</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto flex justify-center">
          <iframe 
            src="https://codepen.io/hellokatili/full/xwKRmo" 
            width="640" 
            height="480" 
            frameBorder="0" 
            scrolling="no"
            title="HTML5 Pacman"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </>
  );
};

export default Pacman; 