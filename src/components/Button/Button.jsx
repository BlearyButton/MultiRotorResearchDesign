import React from 'react';
import './Button.scss';

import { motion } from 'framer-motion';

export default function Button({ children, onclick, buttonClasses }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onclick}
      whileHover={{ scale: 1 }}
      className={`button ${buttonClasses}`}
    >
      {children}
    </motion.button>
  );
}
