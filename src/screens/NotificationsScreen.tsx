import React from 'react';
import { ScreenType } from '../App';

export default function NotificationsScreen({ onNavigate }: { onNavigate: (s: ScreenType) => void }) {
  return (
    <div className="relative flex h-auto min-h-screen w-full max-w-md mx-auto flex-col overflow-x-hidden pb-10">
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <div onClick={() => onNavigate('schedule')} className="text-primary flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1">通知</h2>
        <div className="size-12 shrink-0"></div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-6 relative z-10">
        <div className="liquid-glass rounded-xl overflow-hidden transition-all duration-300 active:scale-95 cursor-pointer">
          <div className="flex flex-col">
            <div className="w-full h-40 bg-primary/10 relative overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDi1yoOoIPHLheyv4LEwAD6XJLs3NAyH4rSwxU28-fiJdbFhRw_nqFYIfOthwjoX5J3UbBeIOzeqeSwvA_CeyJAA1t95joykYuDCe9LdJqO6h8ruPKWug3I7AxPOvYVEmGOMhLII8I1HjQjar44n4mH03YcWq5VLibiVYkwI-5HoG3VudY3rt-B4D-UL5j7NMbKkSAdQLay-ghHpGhB-b-x_BZnO7LqSs3d0mnoCDUjz7UMp09xhtcywSsIi7_8X785rQpORrPksGTJ')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute top-3 right-3 px-2 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider">
                NEW
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">更新通知</h2>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">10:30 AM</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                版本 2.0.1 现已推出。新增了深色模式支持和更流畅的课表视图切换功能，快来体验吧！
              </p>
              <div className="mt-2 flex items-center text-primary text-sm font-semibold">
                立即查看 <span className="material-symbols-outlined text-sm ml-1">chevron_right</span>
              </div>
            </div>
          </div>
        </div>

        <div onClick={() => onNavigate('view-note')} className="liquid-glass rounded-xl overflow-hidden transition-all duration-300 active:scale-95 cursor-pointer">
          <div className="flex flex-col">
            <div className="w-full h-40 bg-primary/10 relative overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAr8B-QABCNFKcwM3L6VS0DKiKx-zNr4McSYfnhcx1ReXTDpI8Woo4-fX2CV3vM7ADwI19Ld5mIApFT5fb-m75DFjzw6XDevIWYHRCHMUbS2w3IVxlNkn10dwbL0JdmxPz9ob22A8iXTVmXe6hyzvsBA1Iy3nAuGs5-jvRD_7YejDMPmcwgtRi9i1TujoyhfCjP6Ca6S9nx9CbVWuoeFIX7gKBkpvSkLI5j1XWbUyvMwLrpzdSatLzw6R6ALehtw0RKd2z7TOlS25Nk')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">随记通知</h2>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">昨天 14:20</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                您在“高级数学”课程中记录了一条关于“拉格朗日中值定理”的笔记，点击查看详情。
              </p>
              <div className="mt-2 flex items-center text-primary text-sm font-semibold">
                打开随记 <span className="material-symbols-outlined text-sm ml-1">chevron_right</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
