import './banner.css';
import { motion } from 'framer-motion';

const Hero = ({ image, title }) => (
  <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden shadow-lg">
    {/* Background image */}
    <img
      src={image}
      alt={title || 'Banner'}
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
      {title && (
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-semibold text-white tracking-wide bg-theme/40 backdrop-blur-sm rounded-xl px-8 py-4 shadow-lg"
      >
        {title}
      </motion.h2>
      )}
    </div>
  </div>
);

export default Hero;
