import React from 'react';
import { Sparkles } from 'lucide-react';

export default function FeaturedSection() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-8 text-white mb-12">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Featured Algorithms</h2>
      </div>
      <p className="text-purple-100 mb-6">
        Discover top-performing algorithms trusted by leading companies worldwide
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-20 transition-colors duration-200 cursor-pointer"
          >
            <h3 className="text-lg font-semibold mb-2">
              Advanced Image Recognition
            </h3>
            <p className="text-purple-100 text-sm mb-4">
              State-of-the-art computer vision algorithm with 99.9% accuracy
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">By TensorFlow Team</span>
              <span className="text-purple-200">$299/mo</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}