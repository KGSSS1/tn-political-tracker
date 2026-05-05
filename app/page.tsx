'use client';
import { useState } from 'react';
import Hero from '@/components/Hero';
import PromiseTracker from '@/components/PromiseTracker';
import NewsFeed from '@/components/NewsFeed';

export default function Dashboard() {
  // Shared state: When a promise is clicked, this updates the news search
  const [newsQuery, setNewsQuery] = useState('');

  const handlePromiseClick = (category: string) => {
    setNewsQuery(category);
    
    // On mobile, automatically scroll down to the news feed so the user sees the result
    if (window.innerWidth < 1024) {
      document.getElementById('news-feed')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-6">
        <Hero formationDate="2026-05-15" /> 
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="col-span-1 lg:col-span-2 space-y-6">
             {/* Pass the click handler down to the tracker */}
             <PromiseTracker onPromiseClick={handlePromiseClick} />
          </div>
          <div className="col-span-1 h-full" id="news-feed">
             {/* Pass the query state down to the news feed */}
             <NewsFeed searchQuery={newsQuery} onSearchChange={setNewsQuery} />
          </div>
        </div>
      </div>
    </main>
  );
}