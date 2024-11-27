import React from 'react';
import { Download, Clock, Repeat } from 'lucide-react';
import { Algorithm } from '../../types';
import { useAlgorithms } from '../../hooks/useAlgorithms';

interface PricingOptionsProps {
  algorithm: Algorithm;
}

export default function PricingOptions({ algorithm }: PricingOptionsProps) {
  const { purchase, isPurchasing } = useAlgorithms();

  const handlePurchase = (type: 'sale' | 'lease' | 'subscription') => {
    purchase({ algorithmId: algorithm.id, type });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Pricing Options</h3>
      
      <div className="space-y-4">
        {algorithm.type === 'sale' && (
          <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Download className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-medium">One-time Purchase</span>
              </div>
              <span className="text-xl font-bold">${algorithm.price}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Full access to the algorithm with lifetime updates
            </p>
            <button
              onClick={() => handlePurchase('sale')}
              disabled={isPurchasing}
              className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50"
            >
              {isPurchasing ? 'Processing...' : 'Buy Now'}
            </button>
          </div>
        )}

        {algorithm.type === 'lease' && (
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium">30-Day License</span>
              </div>
              <span className="text-xl font-bold">${algorithm.price}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Full access to the algorithm for 30 days
            </p>
            <button
              onClick={() => handlePurchase('lease')}
              disabled={isPurchasing}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
            >
              {isPurchasing ? 'Processing...' : 'Lease Now'}
            </button>
          </div>
        )}

        {algorithm.type === 'subscription' && (
          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Repeat className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium">Monthly Subscription</span>
              </div>
              <span className="text-xl font-bold">${algorithm.price}/mo</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Continuous access with regular updates and support
            </p>
            <button
              onClick={() => handlePurchase('subscription')}
              disabled={isPurchasing}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
            >
              {isPurchasing ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-start space-x-2">
          <div className="h-5 w-5 text-green-500">✓</div>
          <span className="text-sm text-gray-600">
            Commercial use license included
          </span>
        </div>
        <div className="flex items-start space-x-2">
          <div className="h-5 w-5 text-green-500">✓</div>
          <span className="text-sm text-gray-600">
            Access to documentation and examples
          </span>
        </div>
        <div className="flex items-start space-x-2">
          <div className="h-5 w-5 text-green-500">✓</div>
          <span className="text-sm text-gray-600">
            Email support response within 24h
          </span>
        </div>
      </div>
    </div>
  );
}