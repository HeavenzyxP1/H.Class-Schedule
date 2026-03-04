import React from 'react';
import { ScreenType } from '../App';

export default function ViewNoteScreen({ onNavigate }: { onNavigate: (s: ScreenType) => void }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-50 liquid-glass px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('schedule')} className="flex items-center justify-center size-10 rounded-full hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight">查看随记</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="px-6 pt-6 pb-2">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase">10月24日 星期四</p>
          <h2 className="text-3xl font-bold mt-1">高等数学</h2>
        </div>

        <div className="px-4 mt-4">
          <div className="liquid-glass rounded-xl overflow-hidden shadow-sm">
            <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCadl6vplfrYoBHycJTmAVFWgyq3Zb3IrtX_Rt1FYgjrR3zqxIdh2N9Ju2p0ayf-etix6YSLcAAmVPY8yt79C2zfN_gZPPU4mNmFMcBpZgpzvQmThPr2ZQ9Xph6CmAz5jfz5fGp89Ds4aDJp_13YRD1vcr_5TPX87hM0fTLpf7g0ubTzoQLmq58HaONfrfsqpfE9dKJfYdmJm_Y-GZ-Z3Z1yl0CRlbyTA9QRFMHW-nRNKCmcKIAdMvAVdFhQWECzvNOIhpRUwksy9_2" alt="Blackboard" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">location_on</span>
                <p className="text-slate-600 dark:text-slate-400">教学楼 A-302</p>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <p className="leading-relaxed">今天课堂上讲的微积分中值定理非常重要，尤其是拉格朗日中值定理的几何意义。</p>
                <p className="mt-4 leading-relaxed">课后需要完成习题册第45页的练习。注意：洛必达法则的应用条件必须在答题纸上明确标出。</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"># 期中考试</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"># 重点笔记</span>
              </div>
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
