import React from 'react';
import { FileText, Sparkles, RefreshCw, X } from 'lucide-react';

interface ArticleInputProps {
  article: string;
  setArticle: (article: string) => void;
  sentenceCount: number;
  setSentenceCount: (count: number) => void;
  onSummarize: () => void;
  onClear: () => void;
  loading: boolean;
}

const ArticleInput: React.FC<ArticleInputProps> = ({
  article,
  setArticle,
  sentenceCount,
  setSentenceCount,
  onSummarize,
  onClear,
  loading
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="flex items-center mb-4">
        <FileText className="h-5 w-5 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Article Input</h2>
      </div>
      
      <div className="mb-4">
        <label htmlFor="article" className="block text-sm font-medium text-gray-700 mb-1">
          Paste your article here
        </label>
        <textarea
          id="article"
          className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Paste or type your English news article here..."
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          disabled={loading}
        />
      </div>
      
      <div className="mb-5">
        <label htmlFor="sentenceCount" className="block text-sm font-medium text-gray-700 mb-1">
          Summary Length (sentences)
        </label>
        <div className="flex items-center">
          <input
            type="range"
            id="sentenceCount"
            min="1"
            max="10"
            value={sentenceCount}
            onChange={(e) => setSentenceCount(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            disabled={loading}
          />
          <span className="ml-3 w-8 text-center text-gray-700">{sentenceCount}</span>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={onSummarize}
          disabled={loading || !article.trim()}
          className={`flex items-center px-4 py-2 rounded-md ${
            loading || !article.trim() 
              ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4 mr-2" />
          )}
          {loading ? 'Processing...' : 'Generate Summary'}
        </button>
        
        <button
          onClick={onClear}
          disabled={loading || (!article.trim() && !sentenceCount)}
          className={`flex items-center px-4 py-2 rounded-md ${
            loading || (!article.trim() && !sentenceCount)
              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
        >
          <X className="h-4 w-4 mr-2" />
          Clear
        </button>
      </div>
    </div>
  );
};

export default ArticleInput;