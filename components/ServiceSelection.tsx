"use client";

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ServiceSelectionProps {
  services: string[];
  onSelect: (service: string) => void;
}

export function ServiceSelection({ services, onSelect }: ServiceSelectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="my-4 space-y-2"
    >
      {services.map((service, index) => (
        <motion.div key={index} variants={item}>
          <button
            onClick={() => onSelect(service)}
            className="w-full text-left p-4 rounded-xl bg-white border border-gray-200 hover:border-[#8c52ff] shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between group"
          >
            <span className="text-gray-800">{service}</span>
            <CheckCircle className="h-5 w-5 text-gray-300 group-hover:text-[#8c52ff] transition-colors duration-200" />
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}