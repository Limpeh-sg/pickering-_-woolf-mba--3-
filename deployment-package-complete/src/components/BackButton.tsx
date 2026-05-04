import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className = '' }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <motion.button
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      onClick={handleClick}
      className={`fixed top-24 left-4 md:top-28 md:left-8 z-[80] flex items-center gap-2 min-h-12 rounded-full bg-primary px-4 text-white hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl active:scale-95 ${className}`}
      aria-label="Go back"
      title="Go back"
    >
      <ArrowLeft size={22} className="md:w-6 md:h-6" />
      <span className="text-sm font-black">Back</span>
    </motion.button>
  );
}
