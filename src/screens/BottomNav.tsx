import React from 'react';
import { ScreenType } from '../App';

export default function BottomNav({ current, onNavigate }: { current: ScreenType, onNavigate: (s: ScreenType) => void }) {
  return (
    <div className="fixed bottom-8 left-6 right-6 flex items-end justify-between z-40 max-w-md mx-auto">
      <div className="flex items-center gap-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 px-8 py-3 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
        <button 
          onClick={() => onNavigate('schedule')}
          className={`flex flex-col items-center justify-center gap-1 ${current === 'schedule' ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary transition-colors'}`}
        >
          <span className={`material-symbols-outlined ${current === 'schedule' ? 'active-icon' : ''}`} style={{ fontSize: '24px' }}>calendar_month</span>
          <p className="text-[10px] font-bold leading-tight">课表</p>
        </button>
        <button 
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center justify-center gap-1 ${current === 'profile' ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary transition-colors'}`}
        >
          <span className={`material-symbols-outlined ${current === 'profile' ? 'active-icon' : ''}`} style={{ fontSize: '24px' }}>person</span>
          <p className="text-[10px] font-bold leading-tight">我的</p>
        </button>
      </div>
      
      <button 
        onClick={() => onNavigate('add-course')}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 text-slate-900 dark:text-white transition-transform active:scale-95"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
          add
        </span>
      </button>
    </div>
  );
}
