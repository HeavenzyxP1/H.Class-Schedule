import React from 'react';
import { ScreenType } from '../App';

export default function WelcomeScreen({ onNavigate }: { onNavigate: (s: ScreenType) => void }) {
  return (
    <div className="relative flex flex-col min-h-screen w-full max-w-md mx-auto overflow-hidden bg-gradient-to-b from-primary/5 via-background-light to-background-light dark:from-primary/10 dark:via-background-dark dark:to-background-dark">
      <div className="flex items-center p-6 justify-between">
        <h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight mx-auto">H.课表</h1>
      </div>
      <div className="px-6 pt-6 pb-2 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">欢迎使用</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">让高效成为一种校园生活习惯</p>
      </div>
      <div className="px-6 py-4 space-y-4">
        <div className="liquid-glass p-4 rounded-2xl flex items-start gap-4 transition-transform hover:scale-[1.02]">
          <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl">
            <span className="material-symbols-outlined text-primary">calendar_month</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100">灵动课表</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">直观展现每日课程，支持学期快速切换</p>
          </div>
        </div>
        <div className="liquid-glass p-4 rounded-2xl flex items-start gap-4 transition-transform hover:scale-[1.02]">
          <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl">
            <span className="material-symbols-outlined text-primary">edit_note</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100">智慧随记</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">课堂笔记、课程图片一键记录</p>
          </div>
        </div>
        <div className="liquid-glass p-4 rounded-2xl flex items-start gap-4 transition-transform hover:scale-[1.02]">
          <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl">
            <span className="material-symbols-outlined text-primary">notifications_active</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100">精准提醒</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">多重提醒设置，不再错过任何课程</p>
          </div>
        </div>
      </div>
      <div className="px-8 py-4">
        <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
          <span className="material-symbols-outlined text-base">info</span>
          <p className="text-[11px] leading-relaxed italic">
            底部导航轻松切换课表与个人设置，右侧悬浮按钮快速添加课程
          </p>
        </div>
      </div>
      <div className="mt-auto px-6 pb-10 pt-4">
        <button 
          onClick={() => onNavigate('schedule')}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/25 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>开始规划生活</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
