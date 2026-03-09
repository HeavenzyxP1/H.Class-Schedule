import React, { useState } from 'react';
import { ScreenType, Note, Course } from '../App';

export default function AddNoteScreen({ onNavigate, notes, setNotes, course, week, editingNote }: { 
  onNavigate: (s: ScreenType, id?: string) => void, 
  notes: Note[], 
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
  course: Course | null,
  week: number,
  editingNote?: Note | null
}) {
  const [content, setContent] = useState(editingNote?.content || '');
  const [images, setImages] = useState<string[]>(editingNote?.image ? [editingNote.image] : []);

  const formatDateTimeLocal = (timestamp: number) => {
    const d = new Date(timestamp);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const [hasReminder, setHasReminder] = useState(editingNote?.hasReminder || false);
  const [reminderTimeStr, setReminderTimeStr] = useState(
    editingNote?.reminderTime 
      ? formatDateTimeLocal(editingNote.reminderTime) 
      : formatDateTimeLocal(Date.now() + 86400000)
  );

  const handleSave = () => {
    if (!content.trim() || !course) return;

    const reminderTime = new Date(reminderTimeStr).getTime();

    if (editingNote) {
      const updatedNote: Note = {
        ...editingNote,
        content: content,
        image: images[0],
        tags: images.length > 0 ? ['有附件'] : [],
        hasReminder,
        reminderTime
      };
      setNotes(prev => prev.map(n => n.id === editingNote.id ? updatedNote : n));
      onNavigate('view-note', editingNote.id);
    } else {
      const now = new Date();
      
      const newNote: Note = {
        id: Date.now().toString(),
        courseId: course.id,
        week: week,
        courseName: course.name,
        content: content,
        time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
        date: `${now.getMonth() + 1}月${now.getDate()}日`,
        dayOfWeek: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][now.getDay()],
        image: images[0], // For simplicity, just use the first image as the cover in the list
        timestamp: now.getTime(),
        tags: images.length > 0 ? ['有附件'] : [],
        hasReminder,
        reminderTime
      };

      setNotes(prev => [newNote, ...prev]);
      onNavigate('notifications');
    }
  };

  const handleAddImage = () => {
    // Simulate image selection by picking a random picsum image
    const randomId = Math.floor(Math.random() * 1000);
    const newImageUrl = `https://picsum.photos/seed/${randomId}/400/300`;
    setImages(prev => [...prev, newImageUrl]);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark pb-10">
      <header className="flex items-center justify-between p-4 sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <button onClick={() => {
          if (editingNote) {
            onNavigate('view-note', editingNote.id);
          } else {
            onNavigate('schedule');
          }
        }} className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">close</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight">{editingNote ? '编辑随记' : '随记'}</h1>
        <button 
          onClick={handleSave} 
          disabled={!content.trim()}
          className="px-4 py-1.5 bg-primary text-white rounded-full font-semibold text-sm shadow-lg shadow-primary/30 active:scale-95 transition-transform disabled:opacity-50 disabled:scale-100"
        >
          保存
        </button>
      </header>

      <main className="flex flex-col gap-6 p-4">
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary text-xl">image</span>
            <h2 className="text-base font-bold">添加图片</h2>
          </div>
          
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-2">
              {images.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-white/50 relative group">
                  <img src={img} className="w-full h-full object-cover" alt="Note" referrerPolicy="no-referrer" />
                  <button 
                    onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 size-5 bg-black/50 rounded-full flex items-center justify-center text-white"
                  >
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </div>
              ))}
              {images.length < 9 && (
                <button 
                  onClick={handleAddImage}
                  className="aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              )}
            </div>
          )}

          {images.length === 0 && (
            <div 
              onClick={handleAddImage}
              className="liquid-glass rounded-2xl p-6 flex flex-col items-center gap-4 transition-all active:scale-[0.98] cursor-pointer"
            >
              <div className="size-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">add_photo_alternate</span>
              </div>
              <div className="text-center">
                <p className="font-bold">点击添加课件或笔记图片</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">最多可上传9张，支持高清原图</p>
              </div>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary text-xl">edit_note</span>
            <h2 className="text-base font-bold">随记内容</h2>
          </div>
          <div className="liquid-glass rounded-2xl p-4">
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent border-0 focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 min-h-[160px] p-0 text-base leading-relaxed resize-none outline-none" 
              placeholder="记录点什么......"
            ></textarea>
          </div>
        </section>

        {!editingNote && (
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <span className="material-symbols-outlined text-primary text-xl">notifications</span>
              <h2 className="text-base font-bold">提醒</h2>
            </div>
            <div className="liquid-glass rounded-2xl overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-slate-200/30 dark:border-slate-700/30">
                <div className="flex flex-col">
                  <span className="font-medium">提醒我</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">开启后将通过系统推送提醒</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={hasReminder}
                    onChange={e => setHasReminder(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              {hasReminder && (
                <div className="flex items-center justify-between p-4 hover:bg-slate-500/5 transition-colors cursor-pointer relative">
                  <div className="flex flex-col">
                    <span className="font-medium">提醒时间</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">设置具体时间</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <input 
                      type="datetime-local" 
                      value={reminderTimeStr}
                      onChange={e => setReminderTimeStr(e.target.value)}
                      className="bg-transparent border-none outline-none text-right text-primary cursor-pointer"
                    />
                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
