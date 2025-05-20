import React, { useState } from 'react';
import { AlignJustify, Clock, X, ChevronDown, ChevronUp } from 'lucide-react';
import { HistoryItem } from '../types';

interface SummaryOutputProps {
  summary: string;
  error: string | null;
  history: HistoryItem[];
  onLoadHistoryItem: (item: HistoryItem) => void;
}

const SummaryOutput: React.FC<SummaryOutputProps> = ({ 
  summary, 
  error,
  history,
  onLoadHistoryItem
}) => {
  const [showHistory, setShowHistory] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <AlignJustify className="h-5 w-5 text-teal-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Summary Output</h2>
        </div>
        
        {history.length > 0 && (
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <Clock className="h-4 w-4 mr-1" />
            History
            {showHistory ? (
              <ChevronUp className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </button>
        )}
      </div>
      
      {showHistory && history.length > 0 && (
        <div className="mb-4 border rounded-md">
          <div className="max-h-40 overflow-y-auto">
            {history.map((item) => (
              <div 
                key={item.id} 
                className="p-2 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  onLoadHistoryItem(item);
                  setShowHistory(false);
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="truncate flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                  </div>
                  <div className="text-xs text-gray-500 ml-2">
                    {formatDate(item.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-start">
          <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      ) : null}
      
      <div className={`${summary ? 'border border-gray-200 rounded-md p-4' : ''}`}>
        {summary ? (
          <div className="prose max-w-none">
            <p className="text-gray-800 leading-relaxed">{summary}</p>
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <AlignJustify className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-lg mb-1">Your summary will appear here</p>
            <p className="text-gray-400 text-sm">
              Enter your article text and click "Generate Summary"
            </p>
          </div>
        )}
      </div>
      
      {summary && (
        <div className="mt-4 text-right">
          <p className="text-xs text-gray-500">
            {summary.split(/\s+/).length} words • {summary.split(/[.!?]+/).filter(Boolean).length} sentences
          </p>
        </div>
      )}
    </div>
  );
};

export default SummaryOutput;