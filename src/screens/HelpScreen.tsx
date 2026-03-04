import React from 'react';
import { ScreenType } from '../App';

export default function HelpScreen({ onNavigate }: { onNavigate: (s: ScreenType) => void }) {
  return (
    <div className="relative flex h-auto min-h-screen w-full max-w-md mx-auto flex-col overflow-x-hidden pb-10">
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <div onClick={() => onNavigate('profile')} className="text-primary flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1">帮助与支持</h2>
        <div className="size-12 shrink-0"></div>
      </div>
      <main className="flex-1 w-full max-w-2xl mx-auto pb-10">
        <div className="px-4 py-2 space-y-6">
          <section>
            <div className="liquid-glass rounded-xl overflow-hidden">
              <div className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between border-b border-white/10 dark:border-white/5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
                <div className="flex"><p className="text-lg font-medium leading-normal">如何添加我的本学期课程？</p></div>
                <div className="shrink-0 text-primary flex items-center">
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between border-b border-white/10 dark:border-white/5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
                <div className="flex"><p className="text-lg font-medium leading-normal">课表数据无法同步怎么办？</p></div>
                <div className="shrink-0 text-primary flex items-center">
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between border-b border-white/10 dark:border-white/5 bg-primary/5">
                <div className="flex"><p className="text-primary text-lg font-bold leading-normal">意见反馈</p></div>
                <div className="shrink-0 text-primary">
                  <span className="material-symbols-outlined text-lg">edit_note</span>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between border-b border-white/10 dark:border-white/5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
                <div className="flex"><p className="text-lg font-medium leading-normal">反馈类型</p></div>
                <div className="shrink-0 text-primary flex items-center">
                  <span className="text-sm font-medium mr-1">程序错误</span>
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
                <div className="flex"><p className="text-lg font-medium leading-normal">提交反馈内容</p></div>
                <div className="shrink-0 text-slate-400">
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
