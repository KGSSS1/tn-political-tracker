'use client';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import { AlertCircle, Search, X } from 'lucide-react';

type NewsItem = { id: number; title: string; description: string; source_link: string; date: string };

// 1. Define the props so this component can communicate with page.tsx
type NewsFeedProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

// 2. Accept the props in the function signature
export default function NewsFeed({ searchQuery, onSearchChange }: NewsFeedProps) {
  const { data: news, error, isLoading } = useSWR<NewsItem[]>('/api/news', fetcher);

  // 3. Filter the news dynamically based on the search query
  const filteredNews = news?.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // 4. Added flex-col and max-h-[720px] to constrain the height
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full max-h-[720px]">
      
      {/* Sticky Header with Title and Search Bar */}
      <div className="mb-6 shrink-0">
        <h2 className="text-xl font-bold dark:text-white mb-4">Latest Updates</h2>
        
        {/* 5. The new Search Bar UI */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search news..."
            className="w-full pl-10 pr-10 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {/* Clear search button (only shows when there is text) */}
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* 6. Scrollable News Container: flex-1 and overflow-y-auto keeps the scrolling contained inside this div */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
        
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl flex items-start gap-3 text-red-600 dark:text-red-400">
             <AlertCircle size={20} className="shrink-0 mt-0.5" />
             <div className="text-sm">
               <p className="font-semibold">Failed to load news.</p>
               <p className="opacity-90 mt-1">Make sure your NEWS_API_KEY is correct.</p>
             </div>
          </div>
        )}

        {isLoading && (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-l-2 border-slate-200 dark:border-slate-800 pl-4">
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        )}

        {/* 7. Map over 'filteredNews' instead of the raw 'news' array */}
        {!isLoading && !error && Array.isArray(filteredNews) && (
          <>
            {filteredNews.length === 0 ? (
              <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                <p>No news found for <span className="font-bold text-slate-700 dark:text-slate-300">"{searchQuery}"</span>.</p>
                <button onClick={() => onSearchChange('')} className="text-blue-500 hover:underline text-sm mt-2">Clear search</button>
              </div>
            ) : (
              filteredNews.map(item => (
                <div key={item.id} className="border-l-2 border-blue-500 pl-4 group">
                  <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                  <h3 className="font-semibold text-base mt-1 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{item.description}</p>
                  <a href={item.source_link} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">
                    Read full article →
                  </a>
                </div>
              ))
            )}
          </>
        )}
      </div>

    </div>
  );
}