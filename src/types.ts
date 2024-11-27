export interface Algorithm {
  id: string;
  title: string;
  description: string;
  author: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  type: 'sale' | 'lease' | 'subscription';
  language: string;
  complexity: 'O(1)' | 'O(n)' | 'O(n²)' | 'O(log n)' | 'O(n log n)';
  tags: string[];
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'developer' | 'customer' | 'admin';
  earnings?: number;
  purchasedAlgos?: string[];
}