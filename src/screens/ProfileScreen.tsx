import React from 'react';
import { ScreenType } from '../App';
import BottomNav from './BottomNav';

export default function ProfileScreen({ onNavigate }: { onNavigate: (s: ScreenType) => void }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto pb-24">
      <div className="flex items-center p-4 justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">我的</h2>
      </div>
      
      <div className="flex p-6">
        <div className="flex w-full flex-col items-center sm:flex-row sm:justify-start gap-4">
          <div className="relative">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 border-4 border-white dark:border-slate-800 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD98ITjvaswngH0h5tpSfZZsfyFHf7MiDWMWKi89zHW6kOSbdZ1_KJ6mJAlSf6_Uqp6VmnQ7mF5Wmy5jD5eVea24JMFFmud2uRZVEJQjYEnIG7t5uujj1MV43xLS-CEAQRs4LJEmcR3KsZ0R0G-GiEf3q8Um_21L27595mrqdEBjz2xtLqnh_i_YsAmba33Cr-qatvtjy8H9G-CC0eXzXLvZ6fi_4BH_QLAaJG6vH6Uz_a9xDmZjE-uEGRpAuiUdTlRM3G9pj7F12nm")' }}>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center sm:items-start">
            <p className="text-2xl font-bold leading-tight">陈同学</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-4">
        <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 ml-1">通用设置</h3>
        
        <div onClick={() => onNavigate('settings-basic')} className="flex items-center gap-4 dark:bg-slate-800/50 px-4 py-3 rounded-xl mb-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors backdrop-blur-md bg-white/40 dark:bg-slate-800/30 border border-white/10 dark:border-slate-700/20">
          <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
            <span className="material-symbols-outlined">settings</span>
          </div>
          <div className="flex-1">
            <p className="text-base font-medium">基本设置</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs">课表基本设置</p>
          </div>
          <span className="material-symbols-outlined text-slate-400">chevron_right</span>
        </div>

        <div onClick={() => onNavigate('settings-notification')} className="flex items-center gap-4 dark:bg-slate-800/50 px-4 py-3 rounded-xl mb-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors backdrop-blur-md bg-white/40 dark:bg-slate-800/30 border border-white/10 dark:border-slate-700/20">
          <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
            <span className="material-symbols-outlined">notifications</span>
          </div>
          <div className="flex-1">
            <p className="text-base font-medium">通知</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs">消息提醒与系统通知</p>
          </div>
          <span className="material-symbols-outlined text-slate-400">chevron_right</span>
        </div>

        <div onClick={() => onNavigate('settings-account')} className="flex items-center gap-4 dark:bg-slate-800/50 px-4 py-3 rounded-xl mb-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors backdrop-blur-md bg-white/40 dark:bg-slate-800/30 border border-white/10 dark:border-slate-700/20">
          <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="flex-1">
            <p className="text-base font-medium">账户</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs">安全、绑定、隐私设置</p>
          </div>
          <span className="material-symbols-outlined text-slate-400">chevron_right</span>
        </div>

        <div onClick={() => onNavigate('settings-appearance')} className="flex items-center gap-4 dark:bg-slate-800/50 px-4 py-3 rounded-xl mb-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors backdrop-blur-md bg-white/40 dark:bg-slate-800/30 border border-white/10 dark:border-slate-700/20">
          <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
            <span className="material-symbols-outlined">palette</span>
          </div>
          <div className="flex-1">
            <p className="text-base font-medium">外观</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs">深色模式、主题色</p>
          </div>
          <span className="material-symbols-outlined text-slate-400">chevron_right</span>
        </div>

        <div onClick={() => onNavigate('help')} className="flex items-center gap-4 dark:bg-slate-800/50 px-4 py-3 rounded-xl mb-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors backdrop-blur-md bg-white/40 dark:bg-slate-800/30 border border-white/10 dark:border-slate-700/20">
          <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
            <span className="material-symbols-outlined">help</span>
          </div>
          <div className="flex-1">
            <p className="text-base font-medium">帮助与支持</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs">常见问题、反馈建议</p>
          </div>
          <span className="material-symbols-outlined text-slate-400">chevron_right</span>
        </div>
      </div>

      <BottomNav current="profile" onNavigate={onNavigate} />
    </div>
  );
}
