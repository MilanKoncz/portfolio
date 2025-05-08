import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import pacmanIcon from '../assets/icons/pacman.svg';

const PacmanIcon = () => {
  return (
    <Link
      to="/pacman"
      className="inline-block group"
      aria-label="Secret Pacman game"
    >
      <motion.div
        whileHover={{
          scale: 1.2,
          transition: {
            duration: 0.2
          }
        }}
        className="relative"
      >
        {/* Gray version */}
        <img 
          src={pacmanIcon} 
          alt="Pacman"
          className="w-6 h-6 [filter:brightness(0)_invert(0.7)] dark:[filter:brightness(0)_invert(0.5)]" 
        />
        {/* Yellow version */}
        <img 
          src={pacmanIcon} 
          alt="Pacman"
          className="w-6 h-6 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 [filter:brightness(0)_invert(1)_sepia(1)_saturate(10000%)_hue-rotate(0deg)_brightness(1.2)]" 
        />
      </motion.div>
    </Link>
  );
};

export default PacmanIcon; 