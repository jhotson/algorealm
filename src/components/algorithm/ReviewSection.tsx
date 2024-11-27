import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Algorithm } from '../../types';

interface ReviewSectionProps {
  algorithm: Algorithm;
}

const sampleReviews = [
  {
    id: 1,
    author: 'John Doe',
    rating: 5,
    date: '2024-02-20',
    comment: 'Excellent algorithm! The implementation is clean and well-documented. Performance is outstanding.',
    helpful: 12,
  },
  {
    id: 2,
    author: 'Jane Smith',
    rating: 4,
    date: '2024-02-18',
    comment: 'Very good implementation. Would be perfect with more detailed documentation.',
    helpful: 8,
  },
];

export default function ReviewSection({ algorithm }: ReviewSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="text-xl font-bold">{algorithm.rating}</span>
          <span className="text-gray-500">({algorithm.reviews} reviews)</span>
        </div>
        <button className="px-4 py-2 text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100">
          Write a Review
        </button>
      </div>

      <div className="space-y-6">
        {sampleReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    review.author
                  )}&background=random`}
                  alt={review.author}
                  className="h-8 w-8 rounded-full"
                />
                <span className="font-medium">{review.author}</span>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-3">{review.comment}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(review.date).toLocaleDateString()}</span>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 hover:text-gray-700">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-gray-700">
                  <MessageSquare className="h-4 w-4" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}