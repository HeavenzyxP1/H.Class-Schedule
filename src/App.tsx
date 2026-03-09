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
  hasReminder?: boolean;
  reminderTime?: number;
}

const defaultWeeks = Array.from({length: 18}, (_, i) => i + 1);

const initialNotes: Note[] = [];

const initialCourses: Course[] = [];

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

  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem('themeColor') || '#4c7fe6';
  });

  React.useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  React.useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
    document.documentElement.style.setProperty('--color-primary', themeColor);
  }, [themeColor]);

  const navigate = (screen: ScreenType, payload?: any) => {
    if (screen === 'add-note') {
      const { course, week, note } = (payload || {}) as { course?: Course, week?: number, note?: Note };
      if (course && week !== undefined) {
        setSelectedCourse(course);
        setSelectedWeek(week);
        if (note) {
          setEditingNote(note);
        } else {
          setEditingNote(null);
          // Check if note exists for this course and week
          const existingNote = notes.find(n => n.courseId === course.id && n.week === week);
          if (existingNote) {
            setSelectedNoteId(existingNote.id);
            setCurrentScreen('view-note');
            return;
          }
        }
      }
    }
    
    if (screen === 'view-note') {
      if (currentScreen !== 'view-note' && currentScreen !== 'add-note') {
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

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    navigate(noteSource);
  };

  const handleEditNote = (note: Note) => {
    const course = courses.find(c => c.id === note.courseId);
    if (course) {
      navigate('add-note', { course, week: note.week, note });
    }
  };

  return (
    <div className="w-full min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
      {currentScreen === 'welcome' && <WelcomeScreen onNavigate={navigate} />}
      {currentScreen === 'schedule' && <ScheduleScreen onNavigate={navigate} onEditCourse={handleEditCourse} totalWeeks={totalWeeks} startDate={startDate} currentSemester={currentSemester} setCurrentSemester={setCurrentSemester} showWeekends={showWeekends} morningClasses={morningClasses} afternoonClasses={afternoonClasses} eveningClasses={eveningClasses} courses={courses} setCourses={setCourses} weekStartDay={weekStartDay} classTimes={classTimes} />}
      {currentScreen === 'profile' && <ProfileScreen onNavigate={navigate} />}
      {currentScreen === 'add-course' && <AddCourseScreen onNavigate={navigate} courses={courses} setCourses={setCourses} totalWeeks={totalWeeks} morningClasses={morningClasses} afternoonClasses={afternoonClasses} eveningClasses={eveningClasses} showWeekends={showWeekends} editingCourse={editingCourse} />}
      {currentScreen === 'add-note' && <AddNoteScreen onNavigate={navigate} notes={notes} setNotes={setNotes} course={selectedCourse} week={selectedWeek} editingNote={editingNote} />}
      {currentScreen === 'view-note' && <ViewNoteScreen onNavigate={navigate} from={noteSource} note={notes.find(n => n.id === selectedNoteId) || notes[0]} onDelete={handleDeleteNote} onEdit={handleEditNote} setNotes={setNotes} />}
      {currentScreen === 'notifications' && <NotificationsScreen onNavigate={navigate} notes={notes} />}
      {currentScreen === 'help' && <HelpScreen onNavigate={navigate} />}
      {currentScreen === 'settings-basic' && <BasicSettingsScreen onNavigate={navigate} totalWeeks={totalWeeks} setTotalWeeks={setTotalWeeks} startDate={startDate} setStartDate={setStartDate} currentSemester={currentSemester} showWeekends={showWeekends} setShowWeekends={setShowWeekends} morningClasses={morningClasses} setMorningClasses={setMorningClasses} afternoonClasses={afternoonClasses} setAfternoonClasses={setAfternoonClasses} eveningClasses={eveningClasses} setEveningClasses={setEveningClasses} courses={courses} weekStartDay={weekStartDay} setWeekStartDay={setWeekStartDay} />}
      {currentScreen === 'settings-appearance' && <AppearanceSettingsScreen onNavigate={navigate} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} themeColor={themeColor} setThemeColor={setThemeColor} />}
      {currentScreen === 'settings-notification' && <NotificationSettingsScreen onNavigate={navigate} />}
      {currentScreen === 'settings-time' && <TimeSettingsScreen onNavigate={navigate} morningClasses={morningClasses} afternoonClasses={afternoonClasses} eveningClasses={eveningClasses} classTimes={classTimes} setClassTimes={setClassTimes} />}
      {currentScreen === 'settings-account' && <AccountSettingsScreen onNavigate={navigate} />}
    </div>
  );
}
