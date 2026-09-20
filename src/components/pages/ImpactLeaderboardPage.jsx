import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, 
  TrendingUp, 
  Award, 
  Zap, 
  Recycle, 
  CloudRain, 
  Sparkles, 
  Users, 
  PlusCircle, 
  Check, 
  ChevronRight,
  ShieldCheck,
  Gem,
  TreePine,
  Clock
} from 'lucide-react';

export const ImpactLeaderboardPage = () => {
  const { t, departmentLadder, boostDepartment, metrics } = useApp();
  const [selectedDeptId, setSelectedDeptId] = useState(1);
  const [depositWeight, setDepositWeight] = useState(2.5);
  const [boostSuccess, setBoostSuccess] = useState(false);

  // Handle department cheer / deposit
  const handleBoost = () => {
    boostDepartment(selectedDeptId, depositWeight);
    setBoostSuccess(true);
    setTimeout(() => setBoostSuccess(false), 3000);
  };

  // Recent verified transactions stream
  const recentActivities = [
    { student: 'Aarav S. (CS 3rd Year)', item: '3 Broken Motherboards & RAM', weight: '2.8 kg', time: '12 mins ago', badge: 'Silicon Savior' },
    { student: 'Priya M. (BCom 2nd Year)', item: 'Batch of 12 AA Alkaline Cells', weight: '0.9 kg', time: '45 mins ago', badge: 'Battery Warden' },
    { student: 'Dev K. (ECE Final Year)', item: 'Burned Out Oscilloscope Transformer', weight: '4.5 kg', time: '2 hours ago', badge: 'Heavy Metal Pioneer' },
    { student: 'Ananya R. (Humanities)', item: '4 Frayed USB-C and HDMI Cables', weight: '0.6 kg', time: '3 hours ago', badge: 'Cable Conscious' },
  ];

  // Badges catalog
  const campusBadges = [
    { title: 'Silicon Savior', desc: 'Recycled 5+ PCBs or microprocessors', icon: Zap, unlocked: true, color: 'text-amber-500 bg-amber-500/10' },
    { title: 'Lithium Guardian', desc: 'Safely neutralized 3 swollen batteries', icon: ShieldCheck, unlocked: true, color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Precious Alchemist', desc: 'Salvaged &gt;1.0g gold and palladium', icon: Gem, unlocked: true, color: 'text-cyan-500 bg-cyan-500/10' },
    { title: 'Zero-Landfill Scholar', desc: 'Achieved 100% verified campus segregation', icon: Award, unlocked: false, color: 'text-purple-500 bg-purple-500/10' },
  ];

  const goalPercentage = Math.min(100, Math.round((metrics.totalDivertedKg / 500) * 100));

  return (
    <div className="space-y-6">
      
      {/* Header Headline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Trophy className="w-6 h-6" />
            </span>
            <span>{t.impact.title}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t.impact.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Semester Cup Active
          </span>
        </div>
      </div>

      {/* 3 Metric Savings Counter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Metric 1: Total E-Waste Diverted */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl shadow-emerald-700/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="p-2 rounded-xl bg-white/20 text-white backdrop-blur-md">
              <Recycle className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-black/25 px-2.5 py-1 rounded-full text-emerald-200">
              SDG 12.5 Target
            </span>
          </div>

          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight mb-1">
            {metrics.totalDivertedKg} <span className="text-lg font-bold text-emerald-200">kg</span>
          </div>
          <div className="text-xs font-bold text-emerald-100 mb-4">{t.impact.counter1Title}</div>

          {/* Goal progress */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-semibold text-emerald-100">
              <span>{t.impact.counter1Sub}</span>
              <span>{goalPercentage}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/25 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${goalPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Metric 2: Carbon Offset Equivalent */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-xl shadow-cyan-700/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="p-2 rounded-xl bg-white/20 text-white backdrop-blur-md">
              <TreePine className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-black/25 px-2.5 py-1 rounded-full text-cyan-200">
              Greenhouse Averted
            </span>
          </div>

          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight mb-1">
            {metrics.carbonOffsetTons} <span className="text-lg font-bold text-cyan-200">Tons</span>
          </div>
          <div className="text-xs font-bold text-cyan-100 mb-4">{t.impact.counter2Title}</div>

          <div className="p-2.5 rounded-2xl bg-black/20 border border-white/10 text-[11px] text-cyan-100 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
            <span>{t.impact.counter2Sub}</span>
          </div>
        </div>

        {/* Metric 3: Precious Metals Salvaged */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl shadow-amber-600/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="p-2 rounded-xl bg-white/20 text-white backdrop-blur-md">
              <Gem className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-black/25 px-2.5 py-1 rounded-full text-amber-100">
              Circular Economy
            </span>
          </div>

          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight mb-1">
            {metrics.preciousMetalsGrams} <span className="text-lg font-bold text-amber-100">grams</span>
          </div>
          <div className="text-xs font-bold text-amber-100 mb-4">{t.impact.counter3Title}</div>

          <div className="p-2.5 rounded-2xl bg-black/20 border border-white/10 text-[11px] text-amber-100 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>{t.impact.counter3Sub}</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Inter-Department Ladder & Department Boost Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Inter-Department Ladder (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1410] border border-slate-200 dark:border-emerald-950/80 shadow-xl">
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  {t.impact.ladderTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.impact.ladderSubtitle}
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl">
                LIVE SYNC
              </span>
            </div>

            {/* Department Leaderboard Rows */}
            <div className="space-y-3">
              {departmentLadder.map((dept, index) => {
                const isTop1 = index === 0;
                const isTop2 = index === 1;
                const isTop3 = index === 2;

                return (
                  <div
                    key={dept.id}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                      isTop1
                        ? 'bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent border-amber-500/40 shadow-sm'
                        : 'bg-slate-50 dark:bg-[#121f18] border-slate-200/80 dark:border-emerald-950/60 hover:border-emerald-500/40'
                    }`}
                  >
                    {/* Rank Badge */}
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isTop1
                          ? 'bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30'
                          : isTop2
                          ? 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                          : isTop3
                          ? 'bg-amber-700/60 text-amber-100'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        #{index + 1}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {dept.name}
                          </h4>
                          {isTop1 && (
                            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-400 text-amber-950">
                              Leading
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-emerald-500" />
                            {dept.warriors} Students
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                            {dept.trend}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Weight Metric */}
                    <div className="text-right">
                      <div className="text-base sm:text-lg font-black font-mono text-slate-900 dark:text-white">
                        {dept.kg} <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">kg</span>
                      </div>
                      <div className="w-24 sm:w-32 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 mt-1 overflow-hidden ml-auto">
                        <div
                          className={`h-full bg-gradient-to-r ${dept.color} rounded-full transition-all duration-500`}
                          style={{ width: `${Math.min(100, (dept.kg / 50) * 100)}%` }}
                        ></div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Right Column: Boost Department & Eco-Badges (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Boost Department Interactive Simulator Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-[#10241a] text-white border border-emerald-500/30 shadow-xl space-y-4">
            
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <PlusCircle className="w-5 h-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                  {t.impact.boostDepartment}
                </h4>
                <p className="text-[11px] text-slate-300">
                  {t.impact.boostDesc}
                </p>
              </div>
            </div>

            {/* Department Picker */}
            <div>
              <label className="text-xs font-semibold text-emerald-300 mb-1.5 block">
                Choose Your Department
              </label>
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-black/60 border border-emerald-500/40 text-xs font-semibold text-white focus:outline-none focus:border-emerald-400"
              >
                {departmentLadder.map((d) => (
                  <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                    {d.name} (Current: {d.kg} kg)
                  </option>
                ))}
              </select>
            </div>

            {/* Weight Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1 font-semibold text-slate-300">
                <span>Verified E-Waste Drop-off Weight:</span>
                <span className="font-mono text-emerald-400 font-bold">{depositWeight} kg</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.5"
                value={depositWeight}
                onChange={(e) => setDepositWeight(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>0.5 kg (Cables)</span>
                <span>5.0 kg (Laptops)</span>
                <span>10 kg (Monitors)</span>
              </div>
            </div>

            {/* Boost Action Button */}
            <button
              onClick={handleBoost}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-400 text-emerald-950 font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-emerald-950" />
              <span>Simulate Verified Drop-off (+{depositWeight} kg)</span>
            </button>

            {boostSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-xs font-bold text-emerald-300 text-center flex items-center justify-center gap-2 animate-bounce">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Department Score Updated & Confetti Dispatched!</span>
              </div>
            )}
          </div>

          {/* Campus Eco-Badges Grid */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0c1410] border border-slate-200 dark:border-emerald-950/80 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              {t.impact.badgesTitle}
            </h4>

            <div className="grid grid-cols-2 gap-2.5">
              {campusBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between ${
                      badge.unlocked
                        ? 'bg-slate-50 dark:bg-[#121f18] border-emerald-500/30'
                        : 'opacity-50 bg-slate-100 dark:bg-black/30 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${badge.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100">{badge.title}</h5>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{badge.desc}</p>
                    </div>

                    <div className="mt-2 pt-1 border-t border-slate-200 dark:border-emerald-950/60 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      {badge.unlocked ? '✓ Unlocked' : 'Locked'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Recent Drop-off Feed */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0c1410] border border-slate-200 dark:border-emerald-950/80 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              {t.impact.recentFeedTitle}
            </h4>

            <div className="space-y-2.5">
              {recentActivities.map((act, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#111e17] border border-slate-100 dark:border-emerald-950/40 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{act.student}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{act.item}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">+{act.weight}</span>
                    <div className="text-[10px] text-slate-400">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
