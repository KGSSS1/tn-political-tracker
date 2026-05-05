import Hero from '@/components/Hero';
import PromiseTracker from '@/components/PromiseTracker';
import NewsFeed from '@/components/NewsFeed';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Update this placeholder date once the CM is sworn in */}
        <Hero formationDate="2026-05-15" /> 
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="col-span-1 lg:col-span-2 space-y-6">
             {/* Analytics component can be dropped here using Recharts */}
             <PromiseTracker />
          </div>
          <div className="col-span-1 h-full">
             <NewsFeed />
          </div>
        </div>
      </div>
    </main>
  );
}