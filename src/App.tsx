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

export interface Note {
  id: string;
  courseId: string;
  week: number;
  courseName: string;
  content: string;
  time: string;
  date: string;
  dayOfWeek: string;
  image?: string;
  tags?: string[];
  timestamp: number;
}

const defaultWeeks = Array.from({length: 18}, (_, i) => i + 1);

const initialNotes: Note[] = [
  {
    id: '1',
    courseId: '1',
    week: 1,
    courseName: '高等数学',
    time: '14:20',
    date: '3月12日',
    dayOfWeek: '周一',
    content: '关于微积分基本定理的推导过程，注意牛顿-莱布尼茨公式的应用条件。今天重点讲了变限积分的求导...',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYGxbaCXgfE6R2whx1UQcb95xYXoVLLEFMXn0tBsxjBOlJhriPGCXA-TnVtP53DAw2Qc4qz1nhobJToJ-o3TrqkzrgiHk3Y3J4_gGtwSfvoqzly4nO2vTc_y3MbRR8VRORG3UHX2Zw0f7M8-4DIRj979xhd6gz4LbeJzozcHZ2Jfv7ACi7QD8zAwzsfUMaQhmMb-Lc_c6MNdZB0V-7KhkikXwZ8_CIL_2dMaJF89WAdXDgo3yADKmZjt9VpfW58bc2-Nytf_j7wYQ0',
    tags: ['重点', '有附件'],
    timestamp: new Date('2026-03-12T14:20:00').getTime()
  },
  {
    id: '2',
    courseId: '99',
    week: 1,
    courseName: '大学物理',
    time: '10:15',
    date: '3月12日',
    dayOfWeek: '周一',
    content: '简谐振动的能量守恒。动能与势能的相互转化，注意相位差的概念...',
    timestamp: new Date('2026-03-12T10:15:00').getTime()
  },
  {
    id: '3',
    courseId: '98',
    week: 1,
    courseName: '线性代数',
    time: '15:45',
    date: '3月11日',
    dayOfWeek: '周日',
    content: '矩阵的特征值与特征向量的性质总结，重点看齐次线性方程组的解。克拉默法则的适用范围。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1yynWtn9UI2t-ntivIHoTQ6bGqf2D3ZAdGe6mUhfuCp2hc69NxN_mSDg0U6Xy-mVK75hJiZZm-s1JcjYJq_SaKlIIWKGIfVKszT-okBhY-lbftSlxTJHaVqjlu4ObgqRufbWyLwAR_J30jOCJOLDlxfz8imQ-347Wp7wbZWPmBFxsWR1QZ4N4XqmDy-WqzuFThNZd6NkYXHO2ATpj9Lb4A3y3N2Cf_uEtV91AI3ynhJuT_2jHeWpQ5V2faH1CMs54ObZwfVXwjFK5',
    timestamp: new Date('2026-03-11T15:45:00').getTime()
  }
];

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
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [noteSource, setNoteSource] = useState<ScreenType>('schedule');

  const navigate = (screen: ScreenType, payload?: any) => {
    if (screen === 'add-note') {
      const { course, week } = payload as { course: Course, week: number };
      if (course) {
        setSelectedCourse(course);
        setSelectedWeek(week);
        // Check if note exists for this course and week
        const existingNote = notes.find(n => n.courseId === course.id && n.week === week);
        if (existingNote) {
          setSelectedNoteId(existingNote.id);
          setCurrentScreen('view-note');
          return;
        }
      }
    }
    
    if (screen === 'view-note') {
      if (currentScreen !== 'view-note') {
        setNoteSource(currentScreen);
      }
      if (typeof payload === 'string') {
        setSelectedNoteId(payload);
      }
    }
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
      {currentScreen === 'add-note' && <AddNoteScreen onNavigate={navigate} notes={notes} setNotes={setNotes} course={selectedCourse} week={selectedWeek} />}
      {currentScreen === 'view-note' && <ViewNoteScreen onNavigate={navigate} from={noteSource} note={notes.find(n => n.id === selectedNoteId) || notes[0]} />}
      {currentScreen === 'notifications' && <NotificationsScreen onNavigate={navigate} notes={notes} />}
      {currentScreen === 'help' && <HelpScreen onNavigate={navigate} />}
      {currentScreen === 'settings-basic' && <BasicSettingsScreen onNavigate={navigate} totalWeeks={totalWeeks} setTotalWeeks={setTotalWeeks} startDate={startDate} setStartDate={setStartDate} currentSemester={currentSemester} showWeekends={showWeekends} setShowWeekends={setShowWeekends} morningClasses={morningClasses} setMorningClasses={setMorningClasses} afternoonClasses={afternoonClasses} setAfternoonClasses={setAfternoonClasses} eveningClasses={eveningClasses} setEveningClasses={setEveningClasses} courses={courses} weekStartDay={weekStartDay} setWeekStartDay={setWeekStartDay} />}
      {currentScreen === 'settings-appearance' && <AppearanceSettingsScreen onNavigate={navigate} />}
      {currentScreen === 'settings-notification' && <NotificationSettingsScreen onNavigate={navigate} />}
      {currentScreen === 'settings-time' && <TimeSettingsScreen onNavigate={navigate} morningClasses={morningClasses} afternoonClasses={afternoonClasses} eveningClasses={eveningClasses} classTimes={classTimes} setClassTimes={setClassTimes} />}
      {currentScreen === 'settings-account' && <AccountSettingsScreen onNavigate={navigate} />}
    </div>
  );
}
