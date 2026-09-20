import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Cpu, Leaf, Heart, ExternalLink } from 'lucide-react';

export const Footer = () => {
  const { t } = useApp();

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-emerald-950/80 bg-white dark:bg-[#070e0a] text-slate-600 dark:text-slate-400 text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Portfolio attribution */}
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Leaf className="w-4 h-4" />
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-200 text-sm tracking-tight">
                EcoDrop Campus (SDG 12)
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              {t.footer.portfolio}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-500">
              {t.footer.mission}
            </p>
          </div>

          {/* Right: Technical Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
            {/* UN SDG 12 Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>UN SDG 12 Certified</span>
            </div>

            {/* IBM Granite Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 font-semibold text-[11px]">
              <Cpu className="w-3.5 h-3.5 text-blue-500" />
              <span>{t.footer.graniteBadge}</span>
            </div>

            {/* AICTE / 1M1B Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
              <Heart className="w-3.5 h-3.5 fill-emerald-500/20 text-emerald-500" />
              <span>AICTE & 1M1B Skills</span>
            </div>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-emerald-950/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-500">
          <p>© 2026 EcoDrop Campus. All Rights Reserved. Built for University Campus Sustainability Initiative.</p>
          <p className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">IBM Granite 3.0</span>
            <span>& AICTE Green Curriculum</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
