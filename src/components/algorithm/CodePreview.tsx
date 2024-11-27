import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Algorithm } from '../../types';

interface CodePreviewProps {
  algorithm: Algorithm;
}

export default function CodePreview({ algorithm }: CodePreviewProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(algorithm.implementation || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="absolute right-4 top-4">
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 bg-gray-50 rounded-lg overflow-x-auto font-mono text-sm">
        <code className="language-javascript">
          {algorithm.implementation || 'Implementation not available'}
        </code>
      </pre>
    </div>
  );
}