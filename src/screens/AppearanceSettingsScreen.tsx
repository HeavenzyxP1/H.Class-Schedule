import React from 'react';
import { ScreenType } from '../App';

export default function AppearanceSettingsScreen({ onNavigate }: { onNavigate: (s: ScreenType) => void }) {
  return (
    <div className="relative flex h-auto min-h-screen w-full max-w-md mx-auto flex-col overflow-x-hidden pb-10">
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <div onClick={() => onNavigate('profile')} className="text-primary flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1">外观设置</h2>
        <div className="size-12 shrink-0"></div>
      </header>

      <div className="px-4 py-2 space-y-6">
        <section>
          <div className="liquid-glass rounded-xl overflow-hidden">
            <div className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between border-b border-white/10 dark:border-white/5">
              <div className="flex"><p className="text-lg font-medium leading-normal">深色模式</p></div>
              <div className="shrink-0">
                <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-slate-200 dark:bg-slate-700 p-0.5 has-[:checked]:justify-end has-[:checked]:bg-primary">
                  <div className="h-full w-[27px] rounded-full bg-white shadow-sm"></div>
                  <input type="checkbox" className="invisible absolute" defaultChecked />
                </label>
              </div>
            </div>
            
            <div className="flex flex-col px-4 py-4 border-white/10 dark:border-white/5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-medium leading-normal">主题颜色</p>
              </div>
              <div className="flex justify-between items-center">
                <label className="relative flex items-center justify-center cursor-pointer">
                  <input type="radio" name="theme-color" className="sr-only peer" defaultChecked />
                  <div className="w-10 h-10 rounded-full bg-[#4c7fe6] ring-offset-2 ring-primary transition-all peer-checked:ring-2"></div>
                  <span className="material-symbols-outlined absolute text-white scale-0 peer-checked:scale-100 transition-transform text-sm">check</span>
                </label>
                <label className="relative flex items-center justify-center cursor-pointer">
                  <input type="radio" name="theme-color" className="sr-only peer" />
                  <div className="w-10 h-10 rounded-full bg-[#ff2d55] ring-offset-2 ring-[#ff2d55] transition-all peer-checked:ring-2"></div>
                  <span className="material-symbols-outlined absolute text-white scale-0 peer-checked:scale-100 transition-transform text-sm">check</span>
                </label>
                <label className="relative flex items-center justify-center cursor-pointer">
                  <input type="radio" name="theme-color" className="sr-only peer" />
                  <div className="w-10 h-10 rounded-full bg-[#5856d6] ring-offset-2 ring-[#5856d6] transition-all peer-checked:ring-2"></div>
                  <span className="material-symbols-outlined absolute text-white scale-0 peer-checked:scale-100 transition-transform text-sm">check</span>
                </label>
                <label className="relative flex items-center justify-center cursor-pointer">
                  <input type="radio" name="theme-color" className="sr-only peer" />
                  <div className="w-10 h-10 rounded-full bg-[#ff9500] ring-offset-2 ring-[#ff9500] transition-all peer-checked:ring-2"></div>
                  <span className="material-symbols-outlined absolute text-white scale-0 peer-checked:scale-100 transition-transform text-sm">check</span>
                </label>
                <label className="relative flex items-center justify-center cursor-pointer">
                  <input type="radio" name="theme-color" className="sr-only peer" />
                  <div className="w-10 h-10 rounded-full bg-[#4cd964] ring-offset-2 ring-[#4cd964] transition-all peer-checked:ring-2"></div>
                  <span className="material-symbols-outlined absolute text-white scale-0 peer-checked:scale-100 transition-transform text-sm">check</span>
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
