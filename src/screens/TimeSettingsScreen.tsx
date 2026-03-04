import React from 'react';
import { ScreenType } from '../App';

export default function TimeSettingsScreen({ onNavigate }: { onNavigate: (s: ScreenType) => void }) {
  return (
    <div className="relative flex h-auto min-h-screen w-full max-w-md mx-auto flex-col overflow-x-hidden pb-10">
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <div onClick={() => onNavigate('settings-basic')} className="text-primary flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1">时间设置</h2>
        <div className="size-12 shrink-0"></div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-xl">wb_sunny</span>
            <h3 className="text-base font-bold tracking-tight">上午阶段</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-4 liquid-glass p-4 rounded-xl cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-semibold">第1节</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">点击修改上课时间</p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <p className="text-sm font-medium">08:00 - 08:45</p>
                <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
              </div>
            </div>
            <div className="flex items-center gap-4 liquid-glass p-4 rounded-xl cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-semibold">第2节</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">点击修改上课时间</p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <p className="text-sm font-medium">08:55 - 09:40</p>
                <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
              </div>
            </div>
            <div className="flex items-center gap-4 liquid-glass p-4 rounded-xl cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-semibold">第3节</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">点击修改上课时间</p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <p className="text-sm font-medium">10:00 - 10:45</p>
                <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-xl">dark_mode</span>
            <h3 className="text-base font-bold tracking-tight">下午阶段</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-4 liquid-glass p-4 rounded-xl cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-semibold">第4节</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">点击修改上课时间</p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <p className="text-sm font-medium">14:00 - 14:45</p>
                <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
              </div>
            </div>
            <div className="flex items-center gap-4 liquid-glass p-4 rounded-xl cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-semibold">第5节</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">点击修改上课时间</p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <p className="text-sm font-medium">14:55 - 15:40</p>
                <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <div className="p-4 bg-white/40 dark:bg-slate-900/40 border-t border-slate-200/50 dark:border-slate-700/50 sticky bottom-0">
        <button onClick={() => onNavigate('settings-basic')} className="w-full bg-primary py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all">
          <span className="material-symbols-outlined">check_circle</span> 确认修改
        </button>
      </div>
    </div>
  );
}
