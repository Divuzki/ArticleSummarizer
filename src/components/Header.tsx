import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6" />
            <h1 className="text-xl font-bold">ArticleSummarizer</h1>
          </div>
          <div>
            <span className="text-xs bg-indigo-500 rounded-full px-2 py-1">
              Beta
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;