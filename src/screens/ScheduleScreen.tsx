import React, { useState, useMemo } from 'react';
import { ScreenType, Course } from '../App';
import BottomNav from './BottomNav';

function CourseBlock({ 
  children, 
  className, 
  onNavigate, 
  onActionRequest,
  courseId
}: { 
  children: React.ReactNode, 
  className: string, 
  onNavigate: (s: ScreenType) => void,
  onActionRequest: (id: string) => void,
  courseId: string
}) {
  const longPressTriggered = React.useRef(false);
  const longPressTimer = React.useRef<NodeJS.Timeout | null>(null);

  const handlePointerDown = () => {
    longPressTriggered.current = false;
    longPressTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      onActionRequest(courseId);
    }, 500);
  };

  const handlePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handlePointerLeave = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (longPressTriggered.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onNavigate('add-note');
  };

  return (
    <div 
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onClick={handleClick}
      className={`${className} cursor-pointer select-none`}
    >
      {children}
    </div>
  );
}

export default function ScheduleScreen({ 
  onNavigate, 
  onEditCourse,
  totalWeeks, 
  startDate, 
  currentSemester, 
  setCurrentSemester, 
  showWeekends,
  morningClasses = 4,
  afternoonClasses = 4,
  eveningClasses = 2,
  courses,
  setCourses,
  weekStartDay,
  classTimes
}: { 
  onNavigate: (s: ScreenType) => void, 
  onEditCourse: (course: Course) => void,
  totalWeeks: number, 
  startDate: Date, 
  currentSemester: string, 
  setCurrentSemester: (s: string) => void, 
  showWeekends: boolean,
  morningClasses?: number,
  afternoonClasses?: number,
  eveningClasses?: number,
  courses: Course[],
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>,
  weekStartDay: number,
  classTimes: { start: string, end: string }[]
}) {
  const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [courseActionId, setCourseActionId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentWeek(prev => prev < totalWeeks ? prev + 1 : prev);
    }
    if (isRightSwipe) {
      setCurrentWeek(prev => prev > 1 ? prev - 1 : prev);
    }
  };

  const daysCount = showWeekends ? 7 : 5;

  // Define the sequence of days of week (1-7) based on weekStartDay
  const daySequence = useMemo(() => {
    if (!showWeekends) return [1, 2, 3, 4, 5];
    
    const fullSequence = [1, 2, 3, 4, 5, 6, 7];
    const startIndex = fullSequence.indexOf(weekStartDay === 7 ? 7 : weekStartDay);
    if (startIndex === -1) return fullSequence;
    
    return [
      ...fullSequence.slice(startIndex),
      ...fullSequence.slice(0, startIndex)
    ];
  }, [weekStartDay, showWeekends]);

  // Calculate dates for the current week
  const weekDates = useMemo(() => {
    const dates = [];
    // Start date is the first day of week 1
    const baseDate = new Date(startDate);
    // Add days to reach the start of the current week
    baseDate.setDate(baseDate.getDate() + (currentWeek - 1) * 7);
    
    // Find the starting day of the current week based on weekStartDay
    const currentDayOfWeek = baseDate.getDay(); // 0 (Sun) to 6 (Sat)
    const targetDayOfWeek = weekStartDay === 7 ? 0 : weekStartDay; // Convert 7 to 0 for Sunday
    
    let diff = targetDayOfWeek - currentDayOfWeek;
    // We want the closest start day in the past or today
    if (diff > 0) diff -= 7;
    
    const startOfWeekDate = new Date(baseDate);
    startOfWeekDate.setDate(baseDate.getDate() + diff);

    // Generate dates for the sequence
    for (let i = 0; i < daysCount; i++) {
      const date = new Date(startOfWeekDate);
      date.setDate(startOfWeekDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, [startDate, currentWeek, daysCount, weekStartDay]);

  const dayNamesMap: Record<number, string> = {
    1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六', 7: '周日'
  };

  const dayNames = daySequence.map(d => dayNamesMap[d]);

  // Row definitions for the grid
  const rowDefinitions = useMemo(() => {
    const rows: { type: 'class' | 'break', index?: number, label?: string }[] = [];
    for (let i = 1; i <= morningClasses; i++) rows.push({ type: 'class', index: i });
    if (morningClasses > 0) rows.push({ type: 'break', label: '午休' });
    for (let i = 1; i <= afternoonClasses; i++) rows.push({ type: 'class', index: morningClasses + i });
    if (afternoonClasses > 0) rows.push({ type: 'break', label: '晚休' });
    for (let i = 1; i <= eveningClasses; i++) rows.push({ type: 'class', index: morningClasses + afternoonClasses + i });
    return rows;
  }, [morningClasses, afternoonClasses, eveningClasses]);

  const classToRow = useMemo(() => {
    const mapping: Record<number, number> = {};
    let currentRow = 1;
    for (let i = 1; i <= morningClasses; i++) {
      mapping[i] = currentRow++;
    }
    if (morningClasses > 0) currentRow++; // Skip break row
    for (let i = 1; i <= afternoonClasses; i++) {
      mapping[morningClasses + i] = currentRow++;
    }
    if (afternoonClasses > 0) currentRow++; // Skip break row
    for (let i = 1; i <= eveningClasses; i++) {
      mapping[morningClasses + afternoonClasses + i] = currentRow++;
    }
    return mapping;
  }, [morningClasses, afternoonClasses, eveningClasses]);

  const getGridRow = (startClass: number, duration: number) => {
    const startRow = classToRow[startClass];
    const endClass = startClass + duration - 1;
    const endRow = classToRow[endClass];
    if (!startRow || !endRow) return 'auto';
    return `${startRow} / ${endRow + 1}`;
  };

  const semesters = ['2026年秋', '2026年春', '2025年秋', '2025年春', '2024年秋'];

  const colorMap: Record<string, { bg: string, border: string, text: string, textSecondary: string }> = {
    primary: {
      bg: 'bg-primary/10 dark:bg-primary/20',
      border: 'border-primary',
      text: 'text-primary dark:text-primary',
      textSecondary: 'text-primary/80 dark:text-primary/80'
    },
    orange: {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      border: 'border-orange-400',
      text: 'text-orange-600 dark:text-orange-300',
      textSecondary: 'text-orange-600/80 dark:text-orange-300/80'
    },
    emerald: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      border: 'border-emerald-400',
      text: 'text-emerald-600 dark:text-emerald-300',
      textSecondary: 'text-emerald-600/80 dark:text-emerald-300/80'
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      border: 'border-purple-400',
      text: 'text-purple-600 dark:text-purple-300',
      textSecondary: 'text-purple-600/80 dark:text-purple-300/80'
    },
    pink: {
      bg: 'bg-pink-100 dark:bg-pink-900/30',
      border: 'border-pink-400',
      text: 'text-pink-600 dark:text-pink-300',
      textSecondary: 'text-pink-600/80 dark:text-pink-300/80'
    },
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      border: 'border-blue-400',
      text: 'text-blue-600 dark:text-blue-300',
      textSecondary: 'text-blue-600/80 dark:text-blue-300/80'
    },
    amber: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      border: 'border-amber-400',
      text: 'text-amber-600 dark:text-amber-300',
      textSecondary: 'text-amber-600/80 dark:text-amber-300/80'
    }
  };

  return (
    <div className="relative flex flex-col h-screen w-full max-w-md mx-auto overflow-hidden">
      <main 
        className="flex-1 overflow-y-auto w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
          <div className="flex items-center p-4 justify-between w-full relative h-16">
            <button 
              onClick={() => setShowSemesterDropdown(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/60 dark:border-slate-700/50 shadow-sm transition-all hover:bg-white/60"
            >
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{currentSemester}</span>
              <span className="material-symbols-outlined text-[16px] text-slate-500">expand_more</span>
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <h2 className="text-lg font-bold tracking-tight">我的课表</h2>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <button 
                  onClick={() => setCurrentWeek(prev => prev > 1 ? prev - 1 : prev)}
                  className="flex items-center justify-center text-slate-400 hover:text-primary transition-colors active:scale-90"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                <p className="font-medium text-slate-400 text-sm min-w-[3rem] text-center">第{currentWeek}周</p>
                <button 
                  onClick={() => setCurrentWeek(prev => prev < totalWeeks ? prev + 1 : prev)}
                  className="flex items-center justify-center text-slate-400 hover:text-primary transition-colors active:scale-90"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('notifications')}
              className="size-10 flex items-center justify-center rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/60 dark:border-slate-700/50 shadow-sm text-slate-600 dark:text-slate-300 hover:bg-white/60 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
          </div>
          {/* Weekly Tabs */}
          <div className="px-4 relative">
            <div 
              className="grid border-x border-transparent"
              style={{
                gridTemplateColumns: `3rem repeat(${daysCount}, minmax(0, 1fr))`,
                gap: '1px',
                paddingLeft: '1px',
                paddingRight: '1px'
              }}
            >
              <div className="w-[3rem]"></div>
              {weekDates.map((date, index) => {
                const isToday = new Date().toDateString() === date.toDateString();
                return (
                  <div key={index} className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 cursor-pointer ${isToday ? 'border-primary text-primary' : 'border-transparent text-slate-500'}`}>
                    <p className="text-[10px] opacity-70">{date.getMonth() + 1}/{date.getDate()}</p>
                    <p className="text-xs font-bold">{dayNames[index]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        <div className="p-4 space-y-4 pb-24">
        <div className="relative bg-white/40 dark:bg-slate-900/20 backdrop-blur-sm rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-white/60 dark:border-slate-800/50 overflow-hidden">
          <div 
            className="grid bg-slate-100 dark:bg-slate-800 bg-slate-200/20 dark:bg-slate-800/40"
            style={{
              gridTemplateColumns: `3rem repeat(${daysCount}, minmax(0, 1fr))`,
              gridTemplateRows: rowDefinitions.map(r => r.type === 'break' ? '24px' : '150px').join(' '),
              gap: '1px'
            }}
          >
            {/* Time Column & Background Cells */}
            {rowDefinitions.map((row, rowIndex) => {
              const rIdx = rowIndex + 1;
              
              if (row.type === 'break') {
                return (
                  <div 
                    key={`row-${rowIndex}`}
                    className="bg-primary/5 flex items-center justify-center border-b border-primary/5"
                    style={{ 
                      gridRow: rIdx, 
                      gridColumn: `1 / span ${daysCount + 1}`
                    }}
                  >
                    <span className="text-[10px] text-primary/60 font-bold tracking-[0.5em] ml-[0.5em]">{row.label}</span>
                  </div>
                );
              }

              return (
                <React.Fragment key={`row-${rowIndex}`}>
                  {/* Time Label */}
                  <div 
                    className="flex flex-col items-center justify-center border-r border-slate-200/50 dark:border-slate-800/50 py-4"
                    style={{ gridRow: rIdx, gridColumn: 1 }}
                  >
                    <span className="text-slate-600 dark:text-slate-300 font-bold text-xs">{row.index}</span>
                    <span className="text-[9px] text-slate-400 mt-1 opacity-70">{classTimes[(row.index || 1) - 1]?.start}</span>
                    <span className="text-[9px] text-slate-400 opacity-70">{classTimes[(row.index || 1) - 1]?.end}</span>
                  </div>

                  {/* Background Cells for each day */}
                  {daySequence.map((_, dayIndex) => (
                    <div 
                      key={`bg-${rowIndex}-${dayIndex}`}
                      className={`border-b border-primary/5 ${dayIndex % 2 !== 0 ? 'bg-slate-50/30 dark:bg-slate-800/10' : ''}`}
                      style={{ gridRow: rIdx, gridColumn: dayIndex + 2 }}
                    />
                  ))}
                </React.Fragment>
              );
            })}

            {/* Courses */}
            {daySequence.map((dayOfWeek, dayIndex) => {
              const dayCourses = courses.filter(c => c.dayOfWeek === dayOfWeek && c.weeks.includes(currentWeek));
              return dayCourses.map(course => {
                const colors = colorMap[course.color] || colorMap.primary;
                return (
                  <div 
                    key={course.id} 
                    className="p-1"
                    style={{ 
                      gridRow: getGridRow(course.startClass, course.duration), 
                      gridColumn: dayIndex + 2,
                      zIndex: 1
                    }}
                  >
                    <CourseBlock 
                      courseId={course.id} 
                      onNavigate={onNavigate} 
                      onActionRequest={setCourseActionId} 
                      className={`h-full w-full rounded-xl ${colors.bg} border-l-4 ${colors.border} p-2 flex flex-col items-center justify-center backdrop-blur-sm shadow-sm overflow-hidden`}
                    >
                      <span 
                        className={`text-sm font-bold ${colors.text} leading-tight text-center break-all`}
                        style={{ writingMode: 'vertical-lr' }}
                      >
                        {course.name}
                      </span>
                      <div 
                        className="flex flex-col items-center mt-1 opacity-80"
                        style={{ writingMode: 'vertical-lr' }}
                      >
                        <span className={`text-[10px] ${colors.textSecondary}`}>{course.location}</span>
                        <span className={`text-[10px] ${colors.textSecondary}`}>{course.teacher}</span>
                      </div>
                    </CourseBlock>
                  </div>
                );
              });
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">今日剩余课程</h3>
          <div onClick={() => onNavigate('add-note')} className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-white/40 dark:border-slate-700/50 rounded-2xl p-4 flex items-center gap-4 shadow-xl shadow-primary/5 cursor-pointer">
            <div className="size-12 rounded-lg bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <div className="flex-1">
              <p className="font-bold">大学物理</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">14:00 - 15:40 | 实验楼 302 | 张老师</p>
            </div>
            <div className="text-primary font-bold text-xs bg-primary/10 px-2 py-1 rounded">进行中</div>
          </div>
        </div>
      </div>
      </main>

      {showSemesterDropdown && (
        <div className="fixed inset-0 z-[60] bg-slate-900/20 backdrop-blur-[2px] transition-opacity" onClick={() => setShowSemesterDropdown(false)}>
          <div className="max-w-md mx-auto w-full relative h-full p-4">
            <div className="absolute top-16 left-4 w-56 border border-white/40 dark:border-slate-700/50 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden liquid-glass" onClick={e => e.stopPropagation()}>
              <div className="p-1.5 flex flex-col gap-1">
                {semesters.map(semester => (
                  <button 
                    key={semester}
                    onClick={() => {
                      setCurrentSemester(semester);
                      setShowSemesterDropdown(false);
                    }}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors text-left ${
                      currentSemester === semester 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className={`text-sm ${currentSemester === semester ? 'font-bold' : 'font-medium'}`}>{semester}</span>
                    {currentSemester === semester && (
                      <span className="material-symbols-outlined text-[18px] active-icon">check_circle</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="border-t border-slate-200/50 dark:border-slate-700/50 p-1.5">
                <button className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">history</span>
                  <span className="text-xs font-medium">查看更多历史学期</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {courseActionId && !showDeleteConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-[2px]" onClick={() => setCourseActionId(null)}>
          <div className="liquid-glass w-full max-w-sm rounded-3xl overflow-hidden flex flex-col p-4 animate-in zoom-in fade-in duration-300" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => {
                  const course = courses.find(c => c.id === courseActionId);
                  if (course) onEditCourse(course);
                  setCourseActionId(null);
                }}
                className="flex items-center gap-3 w-full p-4 rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <span className="material-symbols-outlined">edit</span>
                <span className="font-bold">编辑课程</span>
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-3 w-full p-4 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
              >
                <span className="material-symbols-outlined">delete</span>
                <span className="font-bold">删除课程</span>
              </button>
              <button 
                onClick={() => setCourseActionId(null)}
                className="w-full p-4 mt-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && courseActionId && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-[2px]">
          <div className="liquid-glass w-full max-w-sm rounded-2xl overflow-hidden flex flex-col items-center p-6 animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 text-red-500">
              <span className="material-symbols-outlined text-2xl">delete</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">删除课程</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 text-center">
              确定要删除 <span className="font-bold text-slate-700 dark:text-slate-300">{courses.find(c => c.id === courseActionId)?.name}</span> 吗？<br/>此操作无法撤销。
            </p>
            
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setCourseActionId(null);
                }} 
                className="flex-1 h-12 rounded-xl bg-slate-200/50 text-slate-600 font-bold hover:bg-slate-200 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  setCourses(prev => prev.filter(c => c.id !== courseActionId));
                  setShowDeleteConfirm(false);
                  setCourseActionId(null);
                }} 
                className="flex-1 h-12 rounded-xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/30 hover:bg-red-600 transition-transform active:scale-95"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav onNavigate={onNavigate} current="schedule" />
    </div>
  );
}
