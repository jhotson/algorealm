import React from 'react';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import FeaturedSection from './components/FeaturedSection';
import AlgorithmCard from './components/AlgorithmCard';
import { Algorithm } from './types';

const sampleAlgorithms: Algorithm[] = [
  {
    id: '1',
    title: 'Advanced Face Recognition',
    description: 'State-of-the-art facial recognition algorithm with deep learning capabilities. Achieves 99.9% accuracy on standard benchmarks.',
    author: 'AI Labs',
    price: 299,
    category: 'Computer Vision',
    rating: 4.9,
    reviews: 128,
    type: 'subscription',
    language: 'Python',
    complexity: 'O(n log n)',
    tags: ['AI', 'Deep Learning', 'Computer Vision', 'Neural Networks'],
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Quantum-Resistant Encryption',
    description: 'Post-quantum cryptographic algorithm designed to withstand attacks from quantum computers.',
    author: 'CryptoSecure',
    price: 499,
    category: 'Cryptography',
    rating: 4.8,
    reviews: 89,
    type: 'sale',
    language: 'Rust',
    complexity: 'O(n)',
    tags: ['Cryptography', 'Security', 'Quantum', 'Enterprise'],
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Optimized Graph Pathfinding',
    description: 'Ultra-fast pathfinding algorithm optimized for large-scale graph networks and real-time applications.',
    author: 'GraphTech',
    price: 149,
    category: 'Graph Theory',
    rating: 4.7,
    reviews: 256,
    type: 'lease',
    language: 'C++',
    complexity: 'O(log n)',
    tags: ['Graphs', 'Optimization', 'Real-time', 'Networks'],
    createdAt: new Date(),
  },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <FeaturedSection />
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Browse Algorithms
          </h2>
          <CategoryFilter />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleAlgorithms.map((algo) => (
            <AlgorithmCard key={algo.id} algorithm={algo} />
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            © 2024 AlgoMarket. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;