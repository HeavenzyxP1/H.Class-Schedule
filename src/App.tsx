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
}

const initialCourses: Course[] = [
  { id: '1', name: '高等数学', location: '教三 201', teacher: '王老师', dayOfWeek: 1, startClass: 1, duration: 2, color: 'primary' },
  { id: '2', name: '体育', location: '操场', teacher: '李老师', dayOfWeek: 1, startClass: 4, duration: 1, color: 'orange' },
  { id: '3', name: '大学英语', location: '外语楼 4A', teacher: 'Smith', dayOfWeek: 2, startClass: 2, duration: 2, color: 'emerald' },
  { id: '4', name: '近代史', location: '综B 102', teacher: '赵老师', dayOfWeek: 2, startClass: 4, duration: 1, color: 'purple' },
  { id: '5', name: '高等数学', location: '教三 201', teacher: '王老师', dayOfWeek: 3, startClass: 1, duration: 2, color: 'primary' },
  { id: '6', name: '设计导论', location: '艺楼 305', teacher: '陈老师', dayOfWeek: 3, startClass: 3, duration: 2, color: 'pink' },
  { id: '7', name: '计算机基础', location: '机房 102', teacher: '刘老师', dayOfWeek: 4, startClass: 2, duration: 2, color: 'blue' },
  { id: '8', name: '实验课', location: '实验中心', teacher: '黄老师', dayOfWeek: 5, startClass: 1, duration: 1, color: 'amber' },
  { id: '9', name: '英语视听', location: '语音室', teacher: '周老师', dayOfWeek: 5, startClass: 3, duration: 1, color: 'emerald' },
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
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const navigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="w-full min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
      {currentScreen === 'welcome' && <WelcomeScreen onNavigate={navigate} />}
      {currentScreen === 'schedule' && <ScheduleScreen onNavigate={navigate} totalWeeks={totalWeeks} startDate={startDate} currentSemester={currentSemester} setCurrentSemester={setCurrentSemester} showWeekends={showWeekends} morningClasses={morningClasses} afternoonClasses={afternoonClasses} eveningClasses={eveningClasses} courses={courses} setCourses={setCourses} />}
      {currentScreen === 'profile' && <ProfileScreen onNavigate={navigate} />}
      {currentScreen === 'add-course' && <AddCourseScreen onNavigate={navigate} courses={courses} setCourses={setCourses} />}
      {currentScreen === 'add-note' && <AddNoteScreen onNavigate={navigate} />}
      {currentScreen === 'view-note' && <ViewNoteScreen onNavigate={navigate} />}
      {currentScreen === 'notifications' && <NotificationsScreen onNavigate={navigate} />}
      {currentScreen === 'help' && <HelpScreen onNavigate={navigate} />}
      {currentScreen === 'settings-basic' && <BasicSettingsScreen onNavigate={navigate} totalWeeks={totalWeeks} setTotalWeeks={setTotalWeeks} startDate={startDate} setStartDate={setStartDate} currentSemester={currentSemester} showWeekends={showWeekends} setShowWeekends={setShowWeekends} morningClasses={morningClasses} setMorningClasses={setMorningClasses} afternoonClasses={afternoonClasses} setAfternoonClasses={setAfternoonClasses} eveningClasses={eveningClasses} setEveningClasses={setEveningClasses} />}
      {currentScreen === 'settings-appearance' && <AppearanceSettingsScreen onNavigate={navigate} />}
      {currentScreen === 'settings-notification' && <NotificationSettingsScreen onNavigate={navigate} />}
      {currentScreen === 'settings-time' && <TimeSettingsScreen onNavigate={navigate} />}
      {currentScreen === 'settings-account' && <AccountSettingsScreen onNavigate={navigate} />}
    </div>
  );
}
