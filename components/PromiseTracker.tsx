'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher, cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import { AlertCircle, Search } from 'lucide-react';

type PromiseItem = { id: number; title: string; category: string; status: string; source: string; last_updated: string };

// 1. Added the prop definition right here to fix the TypeScript error
export default function PromiseTracker({ onPromiseClick }: { onPromiseClick?: (category: string) => void }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState(''); 
  
  const { data: promises, error, isLoading } = useSWR<PromiseItem[]>('/api/promises', fetcher);

  const uniqueCategories = ['All', ...Array.from(new Set(promises?.map(p => p.category) || []))];

  // Apply Search, Status, and Category filters simultaneously
  const filtered = promises?.filter(p => {
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesCategory && matchesSearch;
  });

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
      
      {/* Header and Search Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold dark:text-white whitespace-nowrap">Campaign Promises</h2>
        
        {/* Search Bar UI */}
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search promises (e.g. Loans, AI, Women)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading || !!error}
          />
        </div>
      </div>

      {/* Dropdown Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full pb-6 border-b border-slate-100 dark:border-slate-800">
        <select 
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white cursor-pointer w-full sm:w-auto"
          onChange={(e) => setCategoryFilter(e.target.value)}
          value={categoryFilter}
          disabled={isLoading || !!error}
        >
          {uniqueCategories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <select 
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white cursor-pointer w-full sm:w-auto"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
          disabled={isLoading || !!error}
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Not Started">Not Started</option>
        </select>
        
        {/* Quick stat showing how many promises are currently visible */}
        {!isLoading && filtered && (
          <div className="hidden sm:flex items-center ml-auto text-sm text-slate-500 dark:text-slate-400">
            Showing {filtered.length} of {promises?.length} promises
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 mb-4">
           <AlertCircle size={20} />
           <p className="text-sm font-medium">Failed to load promises. Please try again later.</p>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
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
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <Search className="mx-auto h-8 w-8 text-slate-400 mb-3" />
              <p className="text-slate-600 dark:text-slate-400 font-medium">No matching promises found</p>
              <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            filtered.map(p => (
              <div 
                key={p.id} 
                // 2. Added onClick and hover styling to make it clickable
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 transition-all dark:bg-slate-800/20 group cursor-pointer hover:shadow-md hover:ring-2 hover:ring-blue-500 hover:border-transparent"
                onClick={() => onPromiseClick && onPromiseClick(p.category)}
              >
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
                  {/* 3. Added e.stopPropagation() so clicking the link doesn't trigger the news search */}
                  <a href={p.source} target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline underline-offset-2" onClick={(e) => e.stopPropagation()}>View Source ↗</a>
                  <span>Updated: {new Date(p.last_updated).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}