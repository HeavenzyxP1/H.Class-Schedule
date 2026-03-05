import React, { useMemo } from 'react';
import { ScreenType, Note } from '../App';

export default function NotificationsScreen({ onNavigate, notes }: { onNavigate: (s: ScreenType, id?: string) => void, notes: Note[] }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const groupedNotes = useMemo(() => {
    const filtered = notes.filter(note => 
      note.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const sorted = [...filtered].sort((a, b) => b.timestamp - a.timestamp);
    const groups: Record<string, { date: string, dayOfWeek: string, notes: Note[] }> = {};
    
    sorted.forEach(note => {
      const key = `${note.date} ${note.dayOfWeek}`;
      if (!groups[key]) {
        groups[key] = { date: note.date, dayOfWeek: note.dayOfWeek, notes: [] };
      }
      groups[key].notes.push(note);
    });
    
    return Object.values(groups);
  }, [searchQuery, notes]);

  return (
    <div className="relative flex min-h-screen w-full max-w-md mx-auto flex-col liquid-bg overflow-x-hidden pb-10">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <button 
          onClick={() => onNavigate('schedule')}
          className="flex items-center justify-center size-10 rounded-full text-primary hover:bg-primary/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[28px]">arrow_back</span>
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100">通知</h1>
        <div className="size-10"></div>
      </header>

      {/* Search Bar */}
      <div className="px-5 py-2">
        <div className="relative flex items-center group">
          <span className="material-symbols-outlined absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input 
            className="w-full h-12 pl-12 pr-4 bg-white/50 dark:bg-slate-800/50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-800 transition-all placeholder:text-slate-400 text-sm outline-none" 
            placeholder="搜索随记内容..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <main className="flex-1">
        {groupedNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-slate-400">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">search_off</span>
            <p>没有找到相关随记</p>
          </div>
        ) : (
          groupedNotes.map((group, groupIdx) => (
            <div key={groupIdx} className="mt-6 px-5">
              <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">calendar_today</span>
                {group.date} {group.dayOfWeek}
              </h2>
              
              {group.notes.map(note => (
                <div 
                  key={note.id} 
                  onClick={() => onNavigate('view-note', note.id)}
                  className="frosted-glass rounded-2xl p-5 mb-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{note.courseName}</h3>
                    <span className="text-xs font-medium text-slate-400 mt-1">{note.time}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                        {note.content}
                      </p>
                    </div>
                    {note.image && (
                      <div className="size-16 shrink-0 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 border border-white/50 dark:border-slate-600/50">
                        <img 
                          className="w-full h-full object-cover" 
                          src={note.image} 
                          alt={note.courseName}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>
                  {note.tags && note.tags.length > 0 && (
                    <div className="mt-4 flex items-center gap-2">
                      {note.tags.map(tag => (
                        <span 
                          key={tag}
                          className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${
                            tag === '重点' 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </main>
    </div>
  );
}
