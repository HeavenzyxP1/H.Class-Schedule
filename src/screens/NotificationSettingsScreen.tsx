import React, { useState } from 'react';
import { ScreenType } from '../App';

export default function NotificationSettingsScreen({ onNavigate }: { onNavigate: (s: ScreenType) => void }) {
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [reminderTime, setReminderTime] = useState('5分钟前');
  const [tempReminderTime, setTempReminderTime] = useState('5分钟前');

  const reminderOptions = [
    '不提醒',
    '准时',
    '5分钟前',
    '10分钟前',
    '15分钟前',
    '30分钟前',
    '1小时前'
  ];

  const handleOpenModal = () => {
    setTempReminderTime(reminderTime);
    setShowTimeModal(true);
  };

  const handleConfirm = () => {
    setReminderTime(tempReminderTime);
    setShowTimeModal(false);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full max-w-md mx-auto flex-col overflow-x-hidden pb-10">
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <div onClick={() => onNavigate('profile')} className="text-primary flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1">通知设置</h2>
        <div className="size-12 shrink-0"></div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-6 relative z-10">
        <section>
          <div className="liquid-glass rounded-xl overflow-hidden">
            <div className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between border-b border-white/10 dark:border-white/5">
              <div className="flex"><p className="text-lg font-medium leading-normal">系统通知</p></div>
              <div className="shrink-0">
                <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-slate-200 dark:bg-slate-700 p-0.5 has-[:checked]:justify-end has-[:checked]:bg-primary">
                  <div className="h-full w-[27px] rounded-full bg-white shadow-sm"></div>
                  <input type="checkbox" className="invisible absolute" defaultChecked />
                </label>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between border-b border-white/10 dark:border-white/5">
              <div className="flex"><p className="text-lg font-medium leading-normal">灵动岛设置</p></div>
              <div className="shrink-0">
                <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-slate-200 dark:bg-slate-700 p-0.5 has-[:checked]:justify-end has-[:checked]:bg-primary">
                  <div className="h-full w-[27px] rounded-full bg-white shadow-sm"></div>
                  <input type="checkbox" className="invisible absolute" defaultChecked />
                </label>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between border-b border-white/10 dark:border-white/5">
              <div className="flex"><p className="text-lg font-medium leading-normal">上课提醒</p></div>
              <div className="shrink-0">
                <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-slate-200 dark:bg-slate-700 p-0.5 has-[:checked]:justify-end has-[:checked]:bg-primary">
                  <div className="h-full w-[27px] rounded-full bg-white shadow-sm"></div>
                  <input type="checkbox" className="invisible absolute" defaultChecked />
                </label>
              </div>
            </div>
            <div onClick={handleOpenModal} className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
              <div className="flex"><p className="text-lg font-medium leading-normal">提前提醒时间</p></div>
              <div className="shrink-0 text-primary flex items-center">
                <span className="text-sm font-medium mr-1">{reminderTime}</span>
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showTimeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-[2px]">
          <div className="liquid-glass w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
            <div className="pt-8 pb-4 text-center">
              <h1 className="text-xl font-bold tracking-tight">提前提醒时间</h1>
            </div>
            <div className="px-4 py-2 space-y-1">
              {reminderOptions.map((option) => (
                <div 
                  key={option}
                  onClick={() => setTempReminderTime(option)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors cursor-pointer group ${tempReminderTime === option ? 'bg-primary/10' : 'hover:bg-primary/5'}`}
                >
                  <span className={`text-base ${tempReminderTime === option ? 'text-primary font-semibold' : 'font-medium'}`}>{option}</span>
                  {tempReminderTime === option ? (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-6">
              <button onClick={handleConfirm} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98]">
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
