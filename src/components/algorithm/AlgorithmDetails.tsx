import React, { useState } from 'react';
import { Star, Clock, Code2, Tag, User, ThumbsUp, MessageSquare, Share2, Download } from 'lucide-react';
import { Algorithm } from '../../types';
import CodePreview from './CodePreview';
import PricingOptions from './PricingOptions';
import ReviewSection from './ReviewSection';

interface AlgorithmDetailsProps {
  algorithm: Algorithm;
}

export default function AlgorithmDetails({ algorithm }: AlgorithmDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'reviews'>('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{algorithm.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{algorithm.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{algorithm.rating} ({algorithm.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                {algorithm.type}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Code2 className="h-4 w-4 mr-1" />
                {algorithm.language}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {algorithm.complexity}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {(['overview', 'code', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 mb-6">{algorithm.description}</p>

                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <ul className="list-disc list-inside text-gray-600 mb-6">
                  <li>High performance with {algorithm.complexity} time complexity</li>
                  <li>Well-documented and maintainable code</li>
                  <li>Comprehensive test coverage</li>
                  <li>Production-ready implementation</li>
                </ul>

                <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
                <ul className="list-disc list-inside text-gray-600 mb-6">
                  <li>Enterprise-scale applications</li>
                  <li>Real-time processing systems</li>
                  <li>Data analysis pipelines</li>
                  <li>Research and development</li>
                </ul>

                <div className="flex flex-wrap gap-2 mt-6">
                  {algorithm.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'code' && <CodePreview algorithm={algorithm} />}
            {activeTab === 'reviews' && <ReviewSection algorithm={algorithm} />}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <PricingOptions algorithm={algorithm} />

          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">About the Author</h3>
            <div className="flex items-center mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  algorithm.author
                )}&background=random`}
                alt={algorithm.author}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-3">
                <p className="font-medium text-gray-900">{algorithm.author}</p>
                <p className="text-sm text-gray-500">Algorithm Developer</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>Algorithms: 12</div>
              <div>Rating: 4.9/5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}