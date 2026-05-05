'use client';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import { AlertCircle } from 'lucide-react';

type NewsItem = { id: number; title: string; description: string; source_link: string; date: string };

export default function NewsFeed() {
  const { data: news, error, isLoading } = useSWR<NewsItem[]>('/api/news', fetcher);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 h-full">
      <h2 className="text-xl font-bold dark:text-white mb-6">Latest Updates</h2>
      
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

      {!isLoading && !error && Array.isArray(news) && (
        <div className="space-y-6">
          {news.length === 0 ? (
            <p className="text-sm text-slate-500">No recent updates found.</p>
          ) : (
            news.map(item => (
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
        </div>
      )}
    </div>
  );
}