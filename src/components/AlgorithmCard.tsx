import React from 'react';
import { Star, Clock, Code2, Tag } from 'lucide-react';
import { Algorithm } from '../types';

interface AlgorithmCardProps {
  algorithm: Algorithm;
}

export default function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {algorithm.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">by {algorithm.author}</p>
          </div>
          <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
            {algorithm.type}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{algorithm.description}</p>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">{algorithm.rating}</span>
          </div>
          <div className="flex items-center">
            <Code2 className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-600">{algorithm.language}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-600">{algorithm.complexity}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {algorithm.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <Tag className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-xl font-bold text-gray-900">
              ${algorithm.price}
            </span>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
            {algorithm.type === 'subscription' ? 'Subscribe' : 'Purchase'}
          </button>
        </div>
      </div>
    </div>
  );
}