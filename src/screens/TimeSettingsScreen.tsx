import React, { useState } from 'react';
import { ScreenType, ClassTime } from '../App';

export default function TimeSettingsScreen({ 
  onNavigate, 
  morningClasses, 
  afternoonClasses, 
  eveningClasses, 
  classTimes, 
  setClassTimes 
}: { 
  onNavigate: (s: ScreenType) => void,
  morningClasses: number,
  afternoonClasses: number,
  eveningClasses: number,
  classTimes: ClassTime[],
  setClassTimes: React.Dispatch<React.SetStateAction<ClassTime[]>>
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempStart, setTempStart] = useState('');
  const [tempEnd, setTempEnd] = useState('');

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setTempStart(classTimes[index].start);
    setTempEnd(classTimes[index].end);
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const newTimes = [...classTimes];
      newTimes[editingIndex] = { start: tempStart, end: tempEnd };
      setClassTimes(newTimes);
      setEditingIndex(null);
    }
  };

  const renderSection = (title: string, icon: string, startIdx: number, count: number) => {
    if (count <= 0) return null;
    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
          <h3 className="text-base font-bold tracking-tight">{title}</h3>
        </div>
        <div className="space-y-3">
          {Array.from({ length: count }).map((_, i) => {
            const index = startIdx + i;
            const time = classTimes[index] || { start: '--:--', end: '--:--' };
            return (
              <div 
                key={index} 
                onClick={() => handleEdit(index)}
                className="flex items-center gap-4 liquid-glass p-4 rounded-xl cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-sm font-semibold">第{index + 1}节</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">点击修改上课时间</p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <p className="text-sm font-medium">{time.start} - {time.end}</p>
                  <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

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
        {renderSection("上午阶段", "wb_sunny", 0, morningClasses)}
        {renderSection("下午阶段", "sunny", morningClasses, afternoonClasses)}
        {renderSection("晚上阶段", "dark_mode", morningClasses + afternoonClasses, eveningClasses)}
      </main>
      
      <div className="p-4 bg-white/40 dark:bg-slate-900/40 border-t border-slate-200/50 dark:border-slate-700/50 sticky bottom-0">
        <button onClick={() => onNavigate('settings-basic')} className="w-full bg-primary py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all">
          <span className="material-symbols-outlined">check_circle</span> 确认修改
        </button>
      </div>

      {editingIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-[2px]">
          <div className="liquid-glass w-full max-w-sm rounded-2xl overflow-hidden flex flex-col items-center p-6 animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">修改第{editingIndex + 1}节时间</h3>
            
            <div className="w-full space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-500">开始时间</label>
                <input 
                  type="time" 
                  value={tempStart} 
                  onChange={(e) => setTempStart(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-500">结束时间</label>
                <input 
                  type="time" 
                  value={tempEnd} 
                  onChange={(e) => setTempEnd(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            
            <div className="flex gap-3 w-full mt-8">
              <button onClick={() => setEditingIndex(null)} className="flex-1 h-12 rounded-xl bg-slate-200/50 text-slate-600 font-bold hover:bg-slate-200 transition-colors">
                取消
              </button>
              <button onClick={handleSave} className="flex-1 h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-transform active:scale-95">
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
