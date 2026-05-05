'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher, cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import { AlertCircle } from 'lucide-react';

type PromiseItem = { id: number; title: string; category: string; status: string; source: string; last_updated: string };

export default function PromiseTracker() {
  const [filter, setFilter] = useState('All');
  
  // SWR handles data fetching, caching, and state management effortlessly
  const { data: promises, error, isLoading } = useSWR<PromiseItem[]>('/api/promises', fetcher);

  const filtered = filter === 'All' 
    ? promises 
    : promises?.filter(p => p.status === filter);

  const getStatusStyles = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50';
      case 'In Progress': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50';
      case 'Not Started': return 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800/50';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold dark:text-white">Campaign Promises</h2>
        <select 
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white cursor-pointer"
          onChange={(e) => setFilter(e.target.value)}
          disabled={isLoading || !!error}
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Not Started">Not Started</option>
        </select>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
           <AlertCircle size={20} />
           <p className="text-sm font-medium">Failed to load promises. Please try again later.</p>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/60">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-6 w-3/4 mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Data Render */}
      {!isLoading && !error && filtered && (
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center text-slate-500 py-8">No promises found for this filter.</p>
          ) : (
            filtered.map(p => (
              <div key={p.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition-all dark:bg-slate-800/20 group">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{p.category}</span>
                    <h3 className="font-semibold text-lg mt-1 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{p.title}</h3>
                  </div>
                  <span className={cn("px-3 py-1 rounded-full text-xs font-bold w-max border", getStatusStyles(p.status))}>
                    {p.status}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <a href={p.source} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline underline-offset-2">View Source ↗</a>
                  <span>Updated: {p.last_updated}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}