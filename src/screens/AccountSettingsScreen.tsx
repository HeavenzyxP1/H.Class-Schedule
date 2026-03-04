import React from 'react';
import { ScreenType } from '../App';

export default function AccountSettingsScreen({ onNavigate }: { onNavigate: (s: ScreenType) => void }) {
  return (
    <div className="relative flex h-auto min-h-screen w-full max-w-md mx-auto flex-col overflow-x-hidden pb-10">
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <div onClick={() => onNavigate('profile')} className="text-primary flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1">账户与安全</h2>
        <div className="size-12 shrink-0"></div>
      </header>

      <div className="px-6 flex flex-col gap-6 py-6">
        <div className="dark:bg-slate-800 p-8 shadow-sm flex items-center justify-between rounded-xl liquid-glass">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-cover bg-center border-4 border-orange-50" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBgtvFSynsfu9YYEWFPnmkE-o-mKt7gugB0qTnxZJXVZF0UmZJqW_XSUQS6HGKKrILY6KzUVcfK8uU00mPmu1YD3vm_HSrJXXFanr0SlLD_vSFQaQwEOCRmEg6hf9CfP7Q8OQ2jArUQA1R9Z6vv1dPNise6modVWeh5coVU2wYzWnGAcA1LJIQwBD5J_6XC8WCO45MGQWLFNbaRTc7LclSpWrUoqB9FXKb-Zs3A7ysDmcZ8fuOC2SfgeHQfPd5GeTnE1K8s-gnX9Anb")' }}></div>
            <div>
              <p className="text-xl font-bold">陈同学</p>
              <p className="text-slate-400 text-sm mt-1">UID: 8829401</p>
            </div>
          </div>
          <button className="px-5 py-2 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-full">编辑资料</button>
        </div>

        <div className="dark:bg-slate-800 p-8 shadow-sm flex flex-col gap-8 rounded-xl liquid-glass">
          <div className="flex flex-col gap-8">
            <h3 className="text-slate-400 text-sm font-bold">账号绑定</h3>
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg">手机号</p>
              <div className="flex items-center gap-2">
                <p className="text-primary font-semibold text-base">138 **** 8888</p>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg">微信账号</p>
              <div className="flex items-center gap-2">
                <p className="text-primary font-semibold text-base">帅陈</p>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg">QQ账号</p>
              <div className="flex items-center gap-2">
                <p className="text-slate-300 font-semibold text-base">未绑定</p>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-700"></div>

          <div className="flex flex-col gap-8">
            <h3 className="text-slate-400 text-sm font-bold">安全设置</h3>
            <div className="flex items-center justify-between cursor-pointer">
              <p className="font-medium text-lg">修改登录密码</p>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
            </div>
            <div className="flex items-center justify-between cursor-pointer">
              <p className="font-medium text-lg">账号注销</p>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
