import { Helmet } from 'react-helmet';
import { useLanguage } from '../context/LanguageContext';
import { siteMeta } from '../config/site';

const Pacman = () => {
  useLanguage();

  return (
    <>
      <Helmet>
        <title>Pacman | {siteMeta.title.split(' - ')[0]}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto flex justify-center">
          <iframe
            src="https://codepen.io/hellokatili/full/xwKRmo"
            width="1000"
            height="800"
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