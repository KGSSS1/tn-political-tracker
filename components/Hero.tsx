'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function Hero({ formationDate }: { formationDate: string }) {
  const [days, setDays] = useState(0);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const start = new Date(formationDate).getTime();
    const today = new Date().getTime();
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    setDays(diff > 0 ? diff : 0); // Shows 0 if date is in the future
  }, [formationDate]);

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative">
      <div className="absolute top-6 right-6">
        {mounted && (
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Tamil Nadu Political Tracker</h1>
      <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time governance dashboard</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
         <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
           <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">Ruling Party</p>
           <p className="text-lg font-bold">Tamilaga Vettri Kazhagam (TVK)</p>
         </div>
         <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
           <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">Chief Minister</p>
           <p className="text-lg font-bold">Vijay</p>
         </div>
         <div className="p-4 bg-emerald-500 dark:bg-emerald-600 rounded-xl text-white shadow-inner flex flex-col items-center justify-center">
            <p className="text-sm uppercase tracking-wider font-semibold opacity-90">Days in Power</p>
            <p className="text-4xl font-extrabold mt-1">{days}</p>
         </div>
      </div>
    </div>
  );
}