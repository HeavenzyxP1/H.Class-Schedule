import React, { useState } from 'react';
import { ScreenType, Course } from '../App';

export default function AddCourseScreen({ 
  onNavigate,
  courses,
  setCourses,
  totalWeeks,
  morningClasses,
  afternoonClasses,
  eveningClasses,
  showWeekends,
  editingCourse
}: { 
  onNavigate: (s: ScreenType, id?: string) => void,
  courses: Course[],
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>,
  totalWeeks: number,
  morningClasses: number,
  afternoonClasses: number,
  eveningClasses: number,
  showWeekends: boolean,
  editingCourse: Course | null
}) {
  const [selectedColor, setSelectedColor] = useState(editingCourse?.color || 'blue');
  const [courseName, setCourseName] = useState(editingCourse?.name || '');
  const [teacher, setTeacher] = useState(editingCourse?.teacher || '');
  const [location, setLocation] = useState(editingCourse?.location || '');
  const [dayOfWeek, setDayOfWeek] = useState(editingCourse?.dayOfWeek || 1);
  const [startClass, setStartClass] = useState<number>(editingCourse?.startClass || 1);
  const [endClass, setEndClass] = useState<number>(editingCourse ? editingCourse.startClass + editingCourse.duration - 1 : 2);
  const [selectedWeeks, setSelectedWeeks] = useState<number[]>(editingCourse?.weeks || Array.from({length: Math.min(18, totalWeeks)}, (_, i) => i + 1));

  const totalClasses = morningClasses + afternoonClasses + eveningClasses;

  const isSlotOccupied = (week: number, day: number, classIdx: number) => {
    return courses.some(course => 
      course.id !== editingCourse?.id && 
      course.weeks.includes(week) && 
      course.dayOfWeek === day && 
      classIdx >= course.startClass && 
      classIdx < course.startClass + course.duration
    );
  };

  const isWeekAvailable = (week: number) => {
    for (let i = startClass; i <= endClass; i++) {
      if (isSlotOccupied(week, dayOfWeek, i)) return false;
    }
    return true;
  };

  const colors = [
    { id: 'blue', bg: 'bg-blue-500', ring: 'ring-blue-500' },
    { id: 'orange', bg: 'bg-orange-500', ring: 'ring-orange-500' },
    { id: 'emerald', bg: 'bg-emerald-500', ring: 'ring-emerald-500' },
    { id: 'purple', bg: 'bg-purple-500', ring: 'ring-purple-500' },
    { id: 'pink', bg: 'bg-pink-500', ring: 'ring-pink-500' },
    { id: 'amber', bg: 'bg-amber-500', ring: 'ring-amber-500' },
  ];

  const [isCopied, setIsCopied] = useState(false);
  const [isPasted, setIsPasted] = useState(false);

  const handleCopyCourse = () => {
    const copiedCourse = {
      name: courseName,
      teacher,
      location,
      dayOfWeek,
      startClass,
      endClass,
      weeks: selectedWeeks,
      color: selectedColor
    };
    localStorage.setItem('copiedCourse', JSON.stringify(copiedCourse));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePasteCourse = () => {
    const copiedCourseStr = localStorage.getItem('copiedCourse');
    if (copiedCourseStr) {
      try {
        const copiedCourse = JSON.parse(copiedCourseStr);
        setCourseName(copiedCourse.name || '');
        setTeacher(copiedCourse.teacher || '');
        setLocation(copiedCourse.location || '');
        setDayOfWeek(copiedCourse.dayOfWeek || 1);
        setStartClass(copiedCourse.startClass || 1);
        setEndClass(copiedCourse.endClass || 2);
        setSelectedWeeks(copiedCourse.weeks || []);
        setSelectedColor(copiedCourse.color || 'blue');
        setIsPasted(true);
        setTimeout(() => setIsPasted(false), 2000);
      } catch (e) {
        alert('粘贴失败，剪贴板数据无效');
      }
    } else {
      alert('没有可粘贴的课程');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark">
      <div className="flex items-center px-4 py-6 justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark">
        <div onClick={() => onNavigate('schedule')} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer">
          <span className="material-symbols-outlined">arrow_back</span>
        </div>
        <h2 className="text-xl font-bold leading-tight tracking-tight flex-1 text-center">{editingCourse ? '编辑课程' : '添加课程'}</h2>
        <div className="size-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-32">
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">课程名称</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">book</span>
            <input 
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="flex w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-10 h-14 focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
              placeholder="例如：高等数学" 
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">任课教师</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">person</span>
            <input 
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              className="flex w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-10 h-14 focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
              placeholder="请输入教师姓名（选填）" 
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">上课地点</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">location_on</span>
            <input 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-10 h-14 focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
              placeholder="请输入教学楼/教室（选填）" 
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">上课周数</label>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: totalWeeks }).map((_, i) => {
              const week = i + 1;
              const isSelected = selectedWeeks.includes(week);
              const available = isWeekAvailable(week);
              
              return (
                <button
                  key={week}
                  disabled={!available && !isSelected}
                  onClick={() => {
                    if (!available && !isSelected) return;
                    setSelectedWeeks(prev => 
                      prev.includes(week) 
                        ? prev.filter(w => w !== week)
                        : [...prev, week].sort((a, b) => a - b)
                    );
                  }}
                  className={`h-10 rounded-xl font-medium text-sm transition-all ${
                    isSelected 
                      ? 'bg-blue-500 text-white shadow-sm shadow-blue-500/30' 
                      : !available
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-50'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {week}
                  {!available && isSelected && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                  )}
                </button>
              );
            })}
          </div>
          {selectedWeeks.some(w => !isWeekAvailable(w)) && (
            <p className="text-xs text-red-500 font-medium">部分选中的周次在当前时间段已有课程冲突</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">上课星期</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">calendar_today</span>
              <select 
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(parseInt(e.target.value))}
                className="flex w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-10 h-14 focus:border-primary focus:ring-1 focus:ring-primary appearance-none outline-none"
              >
                <option value={1}>星期一</option>
                <option value={2}>星期二</option>
                <option value={3}>星期三</option>
                <option value={4}>星期四</option>
                <option value={5}>星期五</option>
                {showWeekends && (
                  <>
                    <option value={6}>星期六</option>
                    <option value={7}>星期日</option>
                  </>
                )}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">上课时间</label>
            <div className="flex items-center w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 h-14 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
              <span className="text-slate-500 text-sm">第</span>
              <select 
                value={startClass}
                onChange={(e) => {
                  const newStart = parseInt(e.target.value);
                  setStartClass(newStart);
                  if (newStart > endClass) setEndClass(newStart);
                }}
                className="flex-1 bg-transparent outline-none text-center appearance-none text-slate-900 dark:text-slate-100 font-medium cursor-pointer"
              >
                {Array.from({length: totalClasses}).map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
              <span className="text-slate-500 text-sm">-</span>
              <select 
                value={endClass}
                onChange={(e) => {
                  const newEnd = parseInt(e.target.value);
                  setEndClass(newEnd);
                  if (newEnd < startClass) setStartClass(newEnd);
                }}
                className="flex-1 bg-transparent outline-none text-center appearance-none text-slate-900 dark:text-slate-100 font-medium cursor-pointer"
              >
                {Array.from({length: totalClasses}).map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
              <span className="text-slate-500 text-sm">节</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">课程颜色</label>
          <div className="flex items-center justify-between py-2">
            {colors.map((color) => (
              <label key={color.id} className="relative flex items-center justify-center cursor-pointer">
                <input 
                  type="radio" 
                  name="course-color" 
                  className="sr-only peer" 
                  checked={selectedColor === color.id}
                  onChange={() => setSelectedColor(color.id)}
                />
                <div className={`w-10 h-10 rounded-full ${color.bg} ring-offset-2 dark:ring-offset-slate-900 transition-all peer-checked:ring-2 ${color.ring}`}></div>
                <span className="material-symbols-outlined absolute text-white scale-0 peer-checked:scale-100 transition-transform text-sm">check</span>
              </label>
            ))}
            <label className="relative flex items-center justify-center cursor-pointer">
              <input 
                type="color" 
                className="sr-only peer" 
                value={selectedColor.startsWith('#') ? selectedColor : '#3b82f6'}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
              <div 
                className={`w-10 h-10 rounded-full ring-offset-2 dark:ring-offset-slate-900 transition-all flex items-center justify-center overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600 ${selectedColor.startsWith('#') ? 'ring-2 ring-primary border-transparent' : ''}`}
                style={selectedColor.startsWith('#') ? { backgroundColor: selectedColor, borderColor: selectedColor } : {}}
              >
                {!selectedColor.startsWith('#') && <span className="material-symbols-outlined text-slate-400">add</span>}
              </div>
              {selectedColor.startsWith('#') && <span className="material-symbols-outlined absolute text-white scale-100 transition-transform text-sm drop-shadow-md">check</span>}
            </label>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleCopyCourse} 
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border backdrop-blur-sm font-medium transition-all active:scale-95 ${
                isCopied 
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/20' 
                  : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20 dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{isCopied ? 'check' : 'content_copy'}</span>
              <span className="text-sm">{isCopied ? '已复制' : '复制课程'}</span>
            </button>
            <button 
              onClick={handlePasteCourse} 
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border backdrop-blur-sm font-medium transition-all active:scale-95 ${
                isPasted 
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/20' 
                  : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20 dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{isPasted ? 'check' : 'content_paste'}</span>
              <span className="text-sm">{isPasted ? '已粘贴' : '粘贴课程'}</span>
            </button>
          </div>
          <button 
            onClick={() => {
              if (!courseName) {
                alert('请填写课程名称');
                return;
              }
              if (selectedWeeks.length === 0) {
                alert('请至少选择一个上课周数');
                return;
              }
              
              const conflictedWeeks = selectedWeeks.filter(w => !isWeekAvailable(w));
              if (conflictedWeeks.length > 0) {
                alert(`第 ${conflictedWeeks.join(', ')} 周在当前时间段已有课程冲突，请调整后再保存`);
                return;
              }

              if (editingCourse) {
                setCourses(prev => prev.map(c => c.id === editingCourse.id ? {
                  ...c,
                  name: courseName,
                  teacher: teacher,
                  location: location,
                  dayOfWeek: dayOfWeek,
                  startClass: startClass,
                  duration: endClass - startClass + 1,
                  color: selectedColor,
                  weeks: selectedWeeks
                } : c));
              } else {
                const newCourse: Course = {
                  id: Math.random().toString(36).substr(2, 9),
                  name: courseName,
                  teacher: teacher,
                  location: location,
                  dayOfWeek: dayOfWeek,
                  startClass: startClass,
                  duration: endClass - startClass + 1,
                  color: selectedColor,
                  weeks: selectedWeeks
                };
                setCourses([...courses, newCourse]);
              }
              onNavigate('schedule');
            }}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">save</span>
            保存课程
          </button>
        </div>
      </div>
    </div>
  );
}
