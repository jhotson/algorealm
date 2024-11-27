import React from 'react';
import { ChevronDown } from 'lucide-react';

const categories = [
  'All Categories',
  'Machine Learning',
  'Sorting',
  'Graph Theory',
  'Cryptography',
  'Data Structures',
  'Optimization',
  'Computer Vision',
  'NLP',
];

export default function CategoryFilter() {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200 flex items-center space-x-1"
        >
          <span>{category}</span>
          {category === 'All Categories' && <ChevronDown className="h-4 w-4" />}
        </button>
      ))}
    </div>
  );
}