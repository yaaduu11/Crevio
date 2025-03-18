import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LoaderProps {
    onComplete?: () => void;
  }
  
const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <motion.div
        className="grid w-16 h-16 grid-cols-2 gap-1"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        {["#000", "#333", "#666", "#999"].map((color, index) => (
          <motion.div
            key={index}
            className="w-7 h-7"
            style={{ backgroundColor: color }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loader;
