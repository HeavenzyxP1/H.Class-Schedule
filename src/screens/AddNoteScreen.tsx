import React from 'react';
import { ScreenType } from '../App';

export default function AddNoteScreen({ onNavigate }: { onNavigate: (s: ScreenType) => void }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark pb-10">
      <header className="flex items-center justify-between p-4 sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <button onClick={() => onNavigate('schedule')} className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">close</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight">随记</h1>
        <button onClick={() => onNavigate('schedule')} className="px-4 py-1.5 bg-primary text-white rounded-full font-semibold text-sm shadow-lg shadow-primary/30 active:scale-95 transition-transform">
          保存
        </button>
      </header>

      <main className="flex flex-col gap-6 p-4">
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary text-xl">image</span>
            <h2 className="text-base font-bold">添加图片</h2>
          </div>
          <div className="liquid-glass rounded-2xl p-6 flex flex-col items-center gap-4 transition-all active:scale-[0.98] cursor-pointer">
            <div className="size-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">add_photo_alternate</span>
            </div>
            <div className="text-center">
              <p className="font-bold">点击添加课件或笔记图片</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">最多可上传9张，支持高清原图</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary text-xl">edit_note</span>
            <h2 className="text-base font-bold">随记内容</h2>
          </div>
          <div className="liquid-glass rounded-2xl p-4">
            <textarea className="w-full bg-transparent border-0 focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 min-h-[160px] p-0 text-base leading-relaxed resize-none outline-none" placeholder="记录点什么......"></textarea>
          </div>
        </section>

        <section className="flex flex-col gap-3">
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
