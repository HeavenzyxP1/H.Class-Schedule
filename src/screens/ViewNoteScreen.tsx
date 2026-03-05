import React from 'react';
import { ScreenType, Note } from '../App';

export default function ViewNoteScreen({ onNavigate, from, note }: { 
  onNavigate: (s: ScreenType) => void, 
  from?: ScreenType,
  note: Note
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-50 liquid-glass px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate(from || 'schedule')} className="flex items-center justify-center size-10 rounded-full hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight">查看随记</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="px-6 pt-6 pb-2">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase">{note.date} {note.dayOfWeek}</p>
          <h2 className="text-3xl font-bold mt-1">{note.courseName}</h2>
        </div>

        <div className="px-4 mt-4">
          <div className="liquid-glass rounded-xl overflow-hidden shadow-sm">
            {note.image && (
              <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 relative">
                <img src={note.image} alt={note.courseName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            )}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">schedule</span>
                <p className="text-slate-600 dark:text-slate-400">{note.time}</p>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <p className="leading-relaxed whitespace-pre-wrap">{note.content}</p>
              </div>
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {note.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"># {tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="mt-8 flex flex-col gap-3 px-4">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary text-xl">notifications</span>
            <h2 className="text-base font-bold">提醒</h2>
          </div>
          <div className="liquid-glass rounded-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-200/30 dark:border-slate-700/30">
              <div className="flex flex-col">
                <span className="font-medium">提醒我</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">开启后将通过系统推送提醒</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-slate-500/5 transition-colors cursor-pointer">
              <div className="flex flex-col">
                <span className="font-medium">提醒时间</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">ddl来的</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-medium">
                <span>明天 09:00</span>
                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
