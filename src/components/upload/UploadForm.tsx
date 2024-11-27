import React, { useState } from 'react';
import { Upload, X, FileCode, AlertCircle } from 'lucide-react';
import { useAlgorithms } from '../../hooks/useAlgorithms';

const SUPPORTED_LANGUAGES = ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'Rust', 'Go'];
const COMPLEXITY_OPTIONS = ['O(1)', 'O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'];
const CATEGORIES = [
  'Machine Learning',
  'Sorting',
  'Graph Theory',
  'Cryptography',
  'Data Structures',
  'Optimization',
  'Computer Vision',
  'NLP',
];

export default function UploadForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [complexity, setComplexity] = useState<string>('');
  const [type, setType] = useState<'sale' | 'lease' | 'subscription'>('sale');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [code, setCode] = useState('');
  const [validationError, setValidationError] = useState('');

  const { upload, isUploading } = useAlgorithms();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!code.trim()) {
      setValidationError('Please provide the algorithm implementation');
      return;
    }

    try {
      await upload({
        title,
        description,
        price: parseFloat(price),
        category,
        language,
        complexity,
        type,
        tags,
        implementation: code,
      });
      onClose();
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : 'Failed to upload algorithm');
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim() && !tags.includes(currentTag.trim())) {
      e.preventDefault();
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl w-full max-w-4xl p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mb-8">
            <div className="flex items-center space-x-2">
              <Upload className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Upload Algorithm</h2>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Share your algorithm with the community and start earning
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Algorithm Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price (USD)
                </label>
                <input
                  type="number"
                  id="price"
                  required
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  Programming Language
                </label>
                <select
                  id="language"
                  required
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="">Select language</option>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="complexity" className="block text-sm font-medium text-gray-700">
                  Time Complexity
                </label>
                <select
                  id="complexity"
                  required
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="">Select complexity</option>
                  {COMPLEXITY_OPTIONS.map((comp) => (
                    <option key={comp} value={comp}>
                      {comp}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  License Type
                </label>
                <div className="mt-1 grid grid-cols-3 gap-3">
                  {(['sale', 'lease', 'subscription'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`px-3 py-2 text-sm font-medium rounded-md capitalize ${
                        type === t
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Describe your algorithm's functionality, use cases, and advantages..."
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleAddTag}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Press Enter to add tags"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-purple-600 hover:text-purple-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Implementation
              </label>
              <div className="mt-1 relative">
                <FileCode className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <textarea
                  id="code"
                  required
                  rows={10}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="block w-full rounded-md border-gray-300 pl-10 font-mono text-sm shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Paste your algorithm implementation here..."
                />
              </div>
            </div>

            {validationError && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{validationError}</span>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Upload Algorithm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}