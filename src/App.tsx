import React, { useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddCourseScreen from './screens/AddCourseScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import ViewNoteScreen from './screens/ViewNoteScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import HelpScreen from './screens/HelpScreen';
import BasicSettingsScreen from './screens/BasicSettingsScreen';
import AppearanceSettingsScreen from './screens/AppearanceSettingsScreen';
import NotificationSettingsScreen from './screens/NotificationSettingsScreen';
import TimeSettingsScreen from './screens/TimeSettingsScreen';
import AccountSettingsScreen from './screens/AccountSettingsScreen';

export type ScreenType = 
  | 'welcome' | 'schedule' | 'profile' | 'add-course' 
  | 'add-note' | 'view-note' | 'notifications' | 'help'
  | 'settings-basic' | 'settings-appearance' | 'settings-notification'
  | 'settings-time' | 'settings-account';

export interface Course {
  id: string;
  name: string;
  location: string;
  teacher: string;
  dayOfWeek: number; // 1-7
  startClass: number;
  duration: number;
  color: string;
  weeks: number[];
}

export interface ClassTime {
  start: string;
  end: string;
}

const defaultWeeks = Array.from({length: 18}, (_, i) => i + 1);

const initialCourses: Course[] = [
  { id: '1', name: '高等数学', location: '教三 201', teacher: '王老师', dayOfWeek: 1, startClass: 1, duration: 2, color: 'primary', weeks: defaultWeeks },
  { id: '2', name: '体育', location: '操场', teacher: '李老师', dayOfWeek: 1, startClass: 4, duration: 1, color: 'orange', weeks: defaultWeeks },
  { id: '3', name: '大学英语', location: '外语楼 4A', teacher: 'Smith', dayOfWeek: 2, startClass: 2, duration: 2, color: 'emerald', weeks: defaultWeeks },
  { id: '4', name: '近代史', location: '综B 102', teacher: '赵老师', dayOfWeek: 2, startClass: 4, duration: 1, color: 'purple', weeks: defaultWeeks },
  { id: '5', name: '高等数学', location: '教三 201', teacher: '王老师', dayOfWeek: 3, startClass: 1, duration: 2, color: 'primary', weeks: defaultWeeks },
  { id: '6', name: '设计导论', location: '艺楼 305', teacher: '陈老师', dayOfWeek: 3, startClass: 3, duration: 2, color: 'pink', weeks: defaultWeeks },
  { id: '7', name: '计算机基础', location: '机房 102', teacher: '刘老师', dayOfWeek: 4, startClass: 2, duration: 2, color: 'blue', weeks: defaultWeeks },
  { id: '8', name: '实验课', location: '实验中心', teacher: '黄老师', dayOfWeek: 5, startClass: 1, duration: 1, color: 'amber', weeks: defaultWeeks },
  { id: '9', name: '英语视听', location: '语音室', teacher: '周老师', dayOfWeek: 5, startClass: 3, duration: 1, color: 'emerald', weeks: defaultWeeks },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [totalWeeks, setTotalWeeks] = useState(20);
  const [startDate, setStartDate] = useState(new Date('2026-09-01'));
  const [currentSemester, setCurrentSemester] = useState('2026年秋');
  const [showWeekends, setShowWeekends] = useState(true);
  const [morningClasses, setMorningClasses] = useState(4);
  const [afternoonClasses, setAfternoonClasses] = useState(4);
  const [eveningClasses, setEveningClasses] = useState(2);
  const [weekStartDay, setWeekStartDay] = useState(1); // 1: Mon, 7: Sun, 6: Sat
  const [classTimes, setClassTimes] = useState<ClassTime[]>(() => {
    const times: ClassTime[] = [];
    // Default times for up to 30 classes
    for (let i = 0; i < 30; i++) {
      // Generate some reasonable defaults
      const hour = 8 + Math.floor(i / 2) + (i >= 4 ? 2 : 0) + (i >= 8 ? 2 : 0);
      const startMin = (i % 2 === 0) ? "00" : "50";
      const endMin = (i % 2 === 0) ? "45" : "35";
      const startHour = String(hour).padStart(2, '0');
      const endHour = (i % 2 === 0) ? startHour : String(hour).padStart(2, '0');
      
      // Better defaults for the first 12
      const defaultStarts = ["08:00", "08:50", "10:00", "10:50", "14:00", "14:50", "16:00", "16:50", "19:00", "19:50", "20:40", "21:30"];
      const defaultEnds = ["08:45", "09:35", "10:45", "11:35", "14:45", "15:35", "16:45", "17:35", "19:45", "20:35", "21:25", "22:15"];
      
      if (i < 12) {
        times.push({ start: defaultStarts[i], end: defaultEnds[i] });
      } else {
        times.push({ start: "00:00", end: "00:00" });
      }
    }
    return times;
  });
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const navigate = (screen: ScreenType) => {
    setEditingCourse(null);
    setCurrentScreen(screen);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCurrentScreen('add-course');
  };

  return (
    <div className="w-full min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
      {currentScreen === 'welcome' && <WelcomeScreen onNavigate={navigate} />}
      {currentScreen === 'schedule' && <ScheduleScreen onNavigate={navigate} onEditCourse={handleEditCourse} totalWeeks={totalWeeks} startDate={startDate} currentSemester={currentSemester} setCurrentSemester={setCurrentSemester} showWeekends={showWeekends} morningClasses={morningClasses} afternoonClasses={afternoonClasses} eveningClasses={eveningClasses} courses={courses} setCourses={setCourses} weekStartDay={weekStartDay} classTimes={classTimes} />}
      {currentScreen === 'profile' && <ProfileScreen onNavigate={navigate} />}
      {currentScreen === 'add-course' && <AddCourseScreen onNavigate={navigate} courses={courses} setCourses={setCourses} totalWeeks={totalWeeks} morningClasses={morningClasses} afternoonClasses={afternoonClasses} eveningClasses={eveningClasses} showWeekends={showWeekends} editingCourse={editingCourse} />}
      {currentScreen === 'add-note' && <AddNoteScreen onNavigate={navigate} />}
      {currentScreen === 'view-note' && <ViewNoteScreen onNavigate={navigate} />}
      {currentScreen === 'notifications' && <NotificationsScreen onNavigate={navigate} />}
      {currentScreen === 'help' && <HelpScreen onNavigate={navigate} />}
      {currentScreen === 'settings-basic' && <BasicSettingsScreen onNavigate={navigate} totalWeeks={totalWeeks} setTotalWeeks={setTotalWeeks} startDate={startDate} setStartDate={setStartDate} currentSemester={currentSemester} showWeekends={showWeekends} setShowWeekends={setShowWeekends} morningClasses={morningClasses} setMorningClasses={setMorningClasses} afternoonClasses={afternoonClasses} setAfternoonClasses={setAfternoonClasses} eveningClasses={eveningClasses} setEveningClasses={setEveningClasses} courses={courses} weekStartDay={weekStartDay} setWeekStartDay={setWeekStartDay} />}
      {currentScreen === 'settings-appearance' && <AppearanceSettingsScreen onNavigate={navigate} />}
      {currentScreen === 'settings-notification' && <NotificationSettingsScreen onNavigate={navigate} />}
      {currentScreen === 'settings-time' && <TimeSettingsScreen onNavigate={navigate} morningClasses={morningClasses} afternoonClasses={afternoonClasses} eveningClasses={eveningClasses} classTimes={classTimes} setClassTimes={setClassTimes} />}
      {currentScreen === 'settings-account' && <AccountSettingsScreen onNavigate={navigate} />}
    </div>
  );
}
