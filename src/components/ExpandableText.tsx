import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableTextProps {
  title: string;
  expandedText: string;
  className?: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  title,
  expandedText,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`border-t border-gray-200 pt-4 ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <span className="text-sm font-medium text-gray-900">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm text-gray-600">{expandedText}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableText; 