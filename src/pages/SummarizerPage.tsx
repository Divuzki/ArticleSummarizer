import React, { useState } from 'react';
import ArticleInput from '../components/ArticleInput';
import SummaryOutput from '../components/SummaryOutput';
import LoadingSpinner from '../components/LoadingSpinner';
import { summarizeArticle } from '../services/api';
import { HistoryItem } from '../types';

const SummarizerPage: React.FC = () => {
  const [article, setArticle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sentenceCount, setSentenceCount] = useState<number>(5);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleSummarize = async () => {
    if (!article.trim()) {
      setError('Please enter an article to summarize');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await summarizeArticle(article, sentenceCount);
      
      setSummary(result.summary);
      
      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        title: article.substring(0, 50) + (article.length > 50 ? '...' : ''),
        originalText: article,
        summary: result.summary,
        date: new Date(),
        sentenceCount
      };
      
      setHistory([newHistoryItem, ...history.slice(0, 9)]); // Keep last 10 items
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
      setSummary('');
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    setArticle('');
    setSummary('');
    setError(null);
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setArticle(item.originalText);
    setSummary(item.summary);
    setSentenceCount(item.sentenceCount);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ArticleInput 
            article={article} 
            setArticle={setArticle}
            sentenceCount={sentenceCount}
            setSentenceCount={setSentenceCount}
            onSummarize={handleSummarize}
            onClear={handleClearAll}
            loading={loading}
          />
        </div>
        <div>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner message="Analyzing and summarizing article..." />
            </div>
          ) : (
            <SummaryOutput 
              summary={summary} 
              error={error}
              history={history}
              onLoadHistoryItem={loadHistoryItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SummarizerPage;