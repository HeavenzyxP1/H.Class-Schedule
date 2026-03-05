import React, { useState, useEffect, useRef } from 'react';
import { ScreenType, Course } from '../App';

function ScrollPicker({ items, value, onChange }: { items: {label: string, value: any}[], value: any, onChange: (val: any) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ITEM_HEIGHT = 56; // h-14 = 56px
  const PADDING = 68; // (192 - 56) / 2 = 68px

  useEffect(() => {
    if (containerRef.current) {
      const index = items.findIndex(item => item.value === value);
      if (index !== -1) {
        containerRef.current.scrollTop = index * ITEM_HEIGHT;
      }
    }
  }, []); // Initial scroll position

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    if (items[index] && items[index].value !== value) {
      onChange(items[index].value);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-48 overflow-y-auto snap-y snap-mandatory w-full relative z-10"
      onScroll={handleScroll}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`::-webkit-scrollbar { display: none; }`}</style>
      <div style={{ height: PADDING }} className="shrink-0" />
      {items.map((item, i) => (
        <div 
          key={i} 
          className="h-14 flex items-center justify-center snap-center cursor-pointer shrink-0"
          onClick={() => {
            if (containerRef.current) {
              containerRef.current.scrollTo({ top: i * ITEM_HEIGHT, behavior: 'smooth' });
            }
          }}
        >
          <span className={`transition-all duration-200 ${item.value === value ? 'text-primary text-xl font-bold' : 'text-slate-400 text-lg opacity-70'}`}>
            {item.label}
          </span>
        </div>
      ))}
      <div style={{ height: PADDING }} className="shrink-0" />
    </div>
  );
}

export default function BasicSettingsScreen({ 
  onNavigate, 
  totalWeeks, 
  setTotalWeeks, 
  startDate, 
  setStartDate,
  currentSemester,
  showWeekends,
  setShowWeekends,
  morningClasses,
  setMorningClasses,
  afternoonClasses,
  setAfternoonClasses,
  eveningClasses,
  setEveningClasses,
  courses,
  weekStartDay,
  setWeekStartDay
}: { 
  onNavigate: (s: ScreenType, id?: string) => void,
  totalWeeks: number,
  setTotalWeeks: (w: number) => void,
  startDate: Date,
  setStartDate: (d: Date) => void,
  currentSemester: string,
  showWeekends: boolean,
  setShowWeekends: (v: boolean) => void,
  morningClasses: number,
  setMorningClasses: (v: number) => void,
  afternoonClasses: number,
  setAfternoonClasses: (v: number) => void,
  eveningClasses: number,
  setEveningClasses: (v: number) => void,
  courses: Course[],
  weekStartDay: number,
  setWeekStartDay: (v: number) => void
}) {
  const [showStartDayModal, setShowStartDayModal] = useState(false);
  const [showWeeksModal, setShowWeeksModal] = useState(false);
  const [showStartDateModal, setShowStartDateModal] = useState(false);
  const [showClassesModal, setShowClassesModal] = useState(false);

  // Temporary state for modals
  const [tempWeeks, setTempWeeks] = useState(totalWeeks);
  const [tempYear, setTempYear] = useState(startDate.getFullYear());
  const [tempMonth, setTempMonth] = useState(startDate.getMonth() + 1);
  const [tempDay, setTempDay] = useState(startDate.getDate());
  
  const [tempMorning, setTempMorning] = useState(morningClasses);
  const [tempAfternoon, setTempAfternoon] = useState(afternoonClasses);
  const [tempEvening, setTempEvening] = useState(eveningClasses);

  const semesterYearMatch = currentSemester.match(/(\d{4})/);
  const semesterYear = semesterYearMatch ? parseInt(semesterYearMatch[1]) : new Date().getFullYear();

  // Update temp state when modals open
  useEffect(() => {
    if (showWeeksModal) setTempWeeks(totalWeeks);
  }, [showWeeksModal, totalWeeks]);

  useEffect(() => {
    if (showStartDateModal) {
      let initialYear = startDate.getFullYear();
      if (initialYear < semesterYear - 1 || initialYear > semesterYear + 1) {
        initialYear = semesterYear;
      }
      setTempYear(initialYear);
      setTempMonth(startDate.getMonth() + 1);
      setTempDay(startDate.getDate());
    }
  }, [showStartDateModal, startDate, semesterYear]);

  // Generate items for pickers
  const weeksItems = Array.from({ length: 30 }, (_, i) => ({ label: `${i + 1}周`, value: i + 1 }));
  const yearItems = [
    { label: `${semesterYear - 1}年`, value: semesterYear - 1 },
    { label: `${semesterYear}年`, value: semesterYear },
    { label: `${semesterYear + 1}年`, value: semesterYear + 1 },
  ];
  const monthItems = Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}月`, value: i + 1 }));
  
  const daysInMonth = new Date(tempYear, tempMonth, 0).getDate();
  const dayItems = Array.from({ length: daysInMonth }, (_, i) => ({ label: `${i + 1}日`, value: i + 1 }));

  // Ensure day is valid when month/year changes
  useEffect(() => {
    if (tempDay > daysInMonth) {
      setTempDay(daysInMonth);
    }
  }, [tempYear, tempMonth, daysInMonth, tempDay]);

  useEffect(() => {
    if (showClassesModal) {
      setTempMorning(morningClasses);
      setTempAfternoon(afternoonClasses);
      setTempEvening(eveningClasses);
    }
  }, [showClassesModal, morningClasses, afternoonClasses, eveningClasses]);

  const handleSaveStartDate = () => {
    setStartDate(new Date(tempYear, tempMonth - 1, tempDay));
    setShowStartDateModal(false);
  };

  const handleSaveWeeks = () => {
    setTotalWeeks(tempWeeks);
    setShowWeeksModal(false);
  };

  const handleSaveClasses = () => {
    setMorningClasses(tempMorning);
    setAfternoonClasses(tempAfternoon);
    setEveningClasses(tempEvening);
    setShowClassesModal(false);
  };

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}/${m}/${d}`;
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full max-w-md mx-auto flex-col overflow-x-hidden pb-10">
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <div onClick={() => onNavigate('profile')} className="text-primary flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1">基本设置</h2>
        <div className="size-12 shrink-0"></div>
      </div>
      
      <div className="px-4 py-2 space-y-6">
        <section>
          <div className="liquid-glass rounded-xl overflow-hidden">
            <div onClick={() => setShowStartDateModal(true)} className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between border-b border-white/10 dark:border-white/5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
              <div className="flex"><p className="text-lg font-medium leading-normal">开始上课日期</p></div>
              <div className="shrink-0 text-primary flex items-center">
                <span className="text-sm font-medium mr-1">{formatDate(startDate)}</span>
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </div>
            </div>
            <div onClick={() => setShowWeeksModal(true)} className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between border-b border-white/10 dark:border-white/5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
              <div className="flex"><p className="text-lg font-medium leading-normal">本学期总周数</p></div>
              <div className="shrink-0 text-primary flex items-center">
                <span className="text-sm font-medium mr-1">{totalWeeks}周</span>
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between border-b border-white/10 dark:border-white/5">
              <div className="flex"><p className="text-lg font-medium leading-normal">是否显示周末</p></div>
              <div className="shrink-0">
                <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-slate-200 dark:bg-slate-700 p-0.5 has-[:checked]:justify-end has-[:checked]:bg-primary">
                  <div className="h-full w-[27px] rounded-full bg-white shadow-sm"></div>
                  <input 
                    type="checkbox" 
                    className="invisible absolute" 
                    checked={showWeekends} 
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      if (!newValue) {
                        const hasWeekendCourses = courses.some(c => c.dayOfWeek === 6 || c.dayOfWeek === 7);
                        if (hasWeekendCourses) {
                          alert('当前已有周末课程安排，无法关闭显示周末。');
                          return;
                        }
                        // Reset weekStartDay to Monday if weekends are hidden
                        setWeekStartDay(1);
                      }
                      setShowWeekends(newValue);
                    }} 
                  />
                </label>
              </div>
            </div>
            <div onClick={() => setShowClassesModal(true)} className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between border-b border-white/10 dark:border-white/5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
              <div className="flex"><p className="text-lg font-medium leading-normal">节数设置</p></div>
              <div className="shrink-0 text-primary flex items-center">
                <span className="text-sm font-medium mr-1">{morningClasses}/{afternoonClasses}/{eveningClasses}</span>
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </div>
            </div>
            <div onClick={() => onNavigate('settings-time')} className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between border-b border-white/10 dark:border-white/5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
              <div className="flex"><p className="text-lg font-medium leading-normal">时间设置</p></div>
              <div className="shrink-0 text-slate-400 flex items-center">
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </div>
            </div>
            <div 
              onClick={() => {
                if (!showWeekends) {
                  alert('关闭显示周末时，每周起始日固定为周一，无法更改。');
                  return;
                }
                setShowStartDayModal(true);
              }} 
              className={`flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 ${!showWeekends ? 'opacity-50' : ''}`}
            >
              <div className="flex"><p className="text-lg font-medium leading-normal">每周起始日</p></div>
              <div className="shrink-0 text-primary flex items-center">
                <span className="text-sm font-medium mr-1">
                  {weekStartDay === 1 ? '周一' : weekStartDay === 7 ? '周日' : '周六'}
                </span>
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showStartDateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-[2px]">
          <div className="liquid-glass w-full max-w-sm rounded-2xl overflow-hidden flex flex-col items-center p-6 animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-1.5 bg-slate-300/50 rounded-full mb-6"></div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">更改开始上课日期</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">设置本学期的第一周开始日期</p>
            
            <div className="relative w-full h-48 overflow-hidden flex flex-col items-center">
              <div className="absolute top-1/2 -translate-y-1/2 w-full h-14 bg-primary/10 border-y border-primary/20 pointer-events-none z-0"></div>
              
              <div className="flex justify-around w-full items-center h-full">
                <div className="flex-1 flex justify-center">
                  <ScrollPicker items={yearItems} value={tempYear} onChange={setTempYear} />
                </div>
                <div className="flex-1 flex justify-center">
                  <ScrollPicker items={monthItems} value={tempMonth} onChange={setTempMonth} />
                </div>
                <div className="flex-1 flex justify-center">
                  <ScrollPicker items={dayItems} value={tempDay} onChange={setTempDay} />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 w-full mt-8">
              <button onClick={() => setShowStartDateModal(false)} className="flex-1 h-12 rounded-xl bg-slate-200/50 text-slate-600 font-bold hover:bg-slate-200 transition-colors">
                取消
              </button>
              <button onClick={handleSaveStartDate} className="flex-1 h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-transform active:scale-95">
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}

      {showStartDayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-[2px]">
          <div className="liquid-glass w-full max-w-sm rounded-[2rem] overflow-hidden flex flex-col">
            <div className="p-6 pb-2 text-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">每周起始日</h3>
              <p className="text-sm text-slate-500 mt-1">选择课程表显示的起始日期</p>
            </div>
            <div className="p-4 space-y-2">
              <div 
                onClick={() => setWeekStartDay(1)}
                className={`group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${weekStartDay === 1 ? 'bg-primary/10 border border-primary/20' : 'hover:bg-white/50'}`}
              >
                <span className={`text-base font-semibold ${weekStartDay === 1 ? 'text-primary' : 'text-slate-700 dark:text-slate-300'}`}>周一 (Monday)</span>
                {weekStartDay === 1 ? (
                  <div className="size-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                  </div>
                ) : (
                  <div className="size-6 rounded-full border-2 border-slate-300"></div>
                )}
              </div>
              <div 
                onClick={() => setWeekStartDay(7)}
                className={`group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${weekStartDay === 7 ? 'bg-primary/10 border border-primary/20' : 'hover:bg-white/50'}`}
              >
                <span className={`text-base font-semibold ${weekStartDay === 7 ? 'text-primary' : 'text-slate-700 dark:text-slate-300'}`}>周日 (Sunday)</span>
                {weekStartDay === 7 ? (
                  <div className="size-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                  </div>
                ) : (
                  <div className="size-6 rounded-full border-2 border-slate-300"></div>
                )}
              </div>
              <div 
                onClick={() => setWeekStartDay(6)}
                className={`group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${weekStartDay === 6 ? 'bg-primary/10 border border-primary/20' : 'hover:bg-white/50'}`}
              >
                <span className={`text-base font-semibold ${weekStartDay === 6 ? 'text-primary' : 'text-slate-700 dark:text-slate-300'}`}>周六 (Saturday)</span>
                {weekStartDay === 6 ? (
                  <div className="size-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                  </div>
                ) : (
                  <div className="size-6 rounded-full border-2 border-slate-300"></div>
                )}
              </div>
            </div>
            <div className="p-6 pt-2 flex gap-3">
              <button onClick={() => setShowStartDayModal(false)} className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-primary shadow-lg shadow-primary/30 hover:brightness-110 transition-all">确认</button>
            </div>
          </div>
        </div>
      )}

      {showWeeksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-[2px]">
          <div className="liquid-glass w-full max-w-sm rounded-2xl overflow-hidden flex flex-col items-center p-6 animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-1.5 bg-slate-300/50 rounded-full mb-6"></div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-8">本学期总周数</h3>
            <div className="relative w-full h-48 overflow-hidden flex flex-col items-center">
              <div className="absolute top-1/2 -translate-y-1/2 w-full h-14 bg-primary/10 border-y border-primary/20 pointer-events-none z-0"></div>
              <div className="flex justify-around w-full items-center h-full">
                <div className="flex-1 flex justify-center">
                  <ScrollPicker items={weeksItems} value={tempWeeks} onChange={setTempWeeks} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 w-full mt-8">
              <button onClick={() => setShowWeeksModal(false)} className="flex-1 h-12 rounded-xl bg-slate-200/50 text-slate-600 font-bold hover:bg-slate-200 transition-colors">
                取消
              </button>
              <button onClick={handleSaveWeeks} className="flex-1 h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-transform active:scale-95">
                确认
              </button>
            </div>
          </div>
        </div>
      )}

      {showClassesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-[2px]">
          <div className="liquid-glass w-full max-w-sm rounded-2xl overflow-hidden flex flex-col items-center p-6 animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-1.5 bg-slate-300/50 rounded-full mb-6"></div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">设置课程节数</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">请设置上午、下午及晚上的课节数量</p>
            
            <div className="w-full space-y-4">
              {/* Morning */}
              <div className="flex items-center justify-between bg-white/50 dark:bg-slate-800/50 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500">
                    <span className="material-symbols-outlined">light_mode</span>
                  </div>
                  <span className="font-medium">上午</span>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setTempMorning(Math.max(0, tempMorning - 1))} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/50 hover:bg-slate-300/50 transition-colors">
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="text-lg font-bold w-4 text-center">{tempMorning}</span>
                  <button onClick={() => setTempMorning(Math.min(10, tempMorning + 1))} className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
              
              {/* Afternoon */}
              <div className="flex items-center justify-between bg-white/50 dark:bg-slate-800/50 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500">
                    <span className="material-symbols-outlined">sunny</span>
                  </div>
                  <span className="font-medium">下午</span>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setTempAfternoon(Math.max(0, tempAfternoon - 1))} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/50 hover:bg-slate-300/50 transition-colors">
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="text-lg font-bold w-4 text-center">{tempAfternoon}</span>
                  <button onClick={() => setTempAfternoon(Math.min(10, tempAfternoon + 1))} className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
              
              {/* Evening */}
              <div className="flex items-center justify-between bg-white/50 dark:bg-slate-800/50 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-500">
                    <span className="material-symbols-outlined">dark_mode</span>
                  </div>
                  <span className="font-medium">晚上</span>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setTempEvening(Math.max(0, tempEvening - 1))} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/50 hover:bg-slate-300/50 transition-colors">
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="text-lg font-bold w-4 text-center">{tempEvening}</span>
                  <button onClick={() => setTempEvening(Math.min(10, tempEvening + 1))} className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 w-full mt-8">
              <button onClick={() => setShowClassesModal(false)} className="flex-1 h-12 rounded-xl bg-slate-200/50 text-slate-600 font-bold hover:bg-slate-200 transition-colors">
                取消
              </button>
              <button onClick={handleSaveClasses} className="flex-1 h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-transform active:scale-95">
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
