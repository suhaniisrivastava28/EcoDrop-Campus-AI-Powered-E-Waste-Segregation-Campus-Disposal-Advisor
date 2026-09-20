import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  Truck, 
  CheckCircle2, 
  Cpu, 
  Clock, 
  Battery, 
  Thermometer, 
  Weight, 
  Bell, 
  Radio, 
  ArrowUpRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  BarChart3,
  Calendar
} from 'lucide-react';

export const AdminInsightsPage = () => {
  const { 
    t, 
    bins, 
    dispatchStatus, 
    triggerMaintenanceDispatch 
  } = useApp();

  const [hoveredBar, setHoveredBar] = useState(null);

  // Chart data points for 14-day inflow and forecast
  const chartData = [
    { day: 'Day 1', actual: 12, forecast: null, note: 'Regular Semester Baseline' },
    { day: 'Day 2', actual: 15, forecast: null, note: 'Standard Discards' },
    { day: 'Day 3', actual: 11, forecast: null, note: 'Mid-week Normal' },
    { day: 'Day 4', actual: 19, forecast: null, note: 'CS Lab Hardware Swap' },
    { day: 'Day 5', actual: 22, forecast: null, note: 'Friday Clearout' },
    { day: 'Day 6', actual: 26, forecast: null, note: 'Weekend Dorm Purge' },
    { day: 'Day 7', actual: 24, forecast: 24, note: 'Pre-Exam Preparation' },
    { day: 'Day 8', actual: null, forecast: 38, note: 'Exam Week Kickoff: Old Chargers' },
    { day: 'Day 9', actual: null, forecast: 46, note: 'Broken Calculator Surge' },
    { day: 'Day 10', actual: null, forecast: 62, note: 'PEAK EXAMS: High Tech Discards' },
    { day: 'Day 11', actual: null, forecast: 55, note: 'Secondary Exam Rush' },
    { day: 'Day 12', actual: null, forecast: 48, note: 'Lab Exam Conclusion' },
    { day: 'Day 13', actual: null, forecast: 32, note: 'Post-Exam Dorm Packout' },
    { day: 'Day 14', actual: null, forecast: 20, note: 'Semester Break Cooldown' },
  ];

  // Maximum value for SVG scaling
  const maxVal = 70;

  return (
    <div className="space-y-6">
      
      {/* Header Headline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Activity className="w-6 h-6" />
            </span>
            <span>{t.admin.title}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time ultrasonic sensor telemetry, predictive volume forecasting, and automated maintenance dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-[#13241b] border border-slate-200 dark:border-emerald-900/60 text-slate-700 dark:text-emerald-400 text-xs font-mono font-bold flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            Telemetry: 7/7 Campus Nodes Active
          </span>
        </div>
      </div>

      {/* Critical Predictive AI Alert Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-rose-500/15 to-amber-500/10 border-2 border-amber-500/60 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-amber-500 text-amber-950 shrink-0 shadow-lg shadow-amber-500/30">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {t.admin.alertTitle}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold">
                  Confidence: 94.2% (Exam Discard Spike)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed max-w-3xl">
                {t.admin.alertDesc}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            {dispatchStatus.dispatched ? (
              <div className="p-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30">
                <CheckCircle2 className="w-4 h-4" />
                <div>
                  <div>{t.admin.dispatchSuccess}</div>
                  <div className="text-[10px] text-emerald-100 font-normal">
                    Assigned at {dispatchStatus.timestamp} • Team En Route
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={triggerMaintenanceDispatch}
                className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs tracking-wider uppercase shadow-xl shadow-rose-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>{t.admin.dispatchButton}</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Bi-Weekly E-Waste Inflow Chart with Distinct High-Contrast Colored Background Zones */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1410] border border-slate-200 dark:border-emerald-950/80 shadow-xl space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-emerald-950/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-500">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Bi-Weekly E-Waste Volume Inflow & Predictive Exam Surge
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Color-coded dual-zone chart contrasting recorded discards vs AI exam-week volume forecasts.
            </p>
          </div>

          {/* Chart Legend with distinct visual badges */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Historical Baseline
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              AI Exam Surge
            </span>
          </div>
        </div>

        {/* Hovered Bar Detail Callout */}
        <div className="h-7 flex items-center justify-between text-xs px-2 text-slate-600 dark:text-slate-300 font-medium">
          {hoveredBar ? (
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{hoveredBar.day}:</span>
              <span>{hoveredBar.actual ? `Recorded: ${hoveredBar.actual} kg` : `Forecast: ${hoveredBar.forecast} kg (Exam Surge)`}</span>
              <span className="text-slate-400">• {hoveredBar.note}</span>
            </div>
          ) : (
            <span className="text-slate-400 italic">Hover over any bar to view daily breakdown & exam notes</span>
          )}
          <span className="font-mono text-[11px] text-slate-400">Peak Exam Surge: +158% Volume</span>
        </div>

        {/* SVG Responsive Analytical Area & Bar Forecast Chart with Colored Backgrounds */}
        <div className="w-full relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 bg-[#070e0a]">
          <svg className="w-full h-72" viewBox="0 0 740 230" preserveAspectRatio="none">
            <defs>
              {/* Gradient for historical bars */}
              <linearGradient id="barGradHistorical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>

              {/* Gradient for exam surge bars */}
              <linearGradient id="barGradSurge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>

            {/* ZONE 1 BACKGROUND (Days 1–7): Deep Midnight Emerald Tint */}
            <rect x="35" y="15" width="345" height="175" rx="4" fill="#072016" stroke="#134e32" strokeWidth="1" />
            <text x="207" y="32" fill="#34d399" fontSize="10.5" textAnchor="middle" fontWeight="bold" letterSpacing="0.5">
              ZONE A: RECORDED CAMPUS BASELINE (DAYS 1–7)
            </text>

            {/* ZONE 2 BACKGROUND (Days 8–14): High-Contrast Deep Crimson/Amber Surge Tint */}
            <rect x="385" y="15" width="345" height="175" rx="4" fill="#2d101b" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="557" y="32" fill="#fbbf24" fontSize="10.5" textAnchor="middle" fontWeight="bold" letterSpacing="0.5">
              ⚡ ZONE B: PREDICTED EXAM WEEK INFLOW SPIKE (DAYS 8–14)
            </text>

            {/* Horizontal Grid Guide Lines & Y-Axis Labels */}
            <line x1="45" y1="50" x2="720" y2="50" stroke="#334155" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.5" />
            <text x="32" y="53" fill="#cbd5e1" fontSize="9" textAnchor="end" fontWeight="bold">60kg</text>

            <line x1="45" y1="95" x2="720" y2="95" stroke="#334155" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.5" />
            <text x="32" y="98" fill="#cbd5e1" fontSize="9" textAnchor="end" fontWeight="bold">40kg</text>

            <line x1="45" y1="140" x2="720" y2="140" stroke="#334155" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.5" />
            <text x="32" y="143" fill="#cbd5e1" fontSize="9" textAnchor="end" fontWeight="bold">20kg</text>

            <line x1="45" y1="185" x2="720" y2="185" stroke="#64748b" strokeWidth="1.2" opacity="0.8" />
            <text x="32" y="188" fill="#cbd5e1" fontSize="9" textAnchor="end" fontWeight="bold">0kg</text>

            {/* Render Bars with Ultra-Clear High-Contrast Number Pills */}
            {chartData.map((d, idx) => {
              const x = 60 + (idx * 48);
              const isForecast = d.actual === null;
              const val = isForecast ? d.forecast : d.actual;
              const barHeight = (val / maxVal) * 140;
              const y = 185 - barHeight;

              return (
                <g 
                  key={idx} 
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredBar(d)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Vertical bar */}
                  <rect
                    x={x - 13}
                    y={y}
                    width="26"
                    height={barHeight}
                    rx="5"
                    fill={isForecast ? 'url(#barGradSurge)' : 'url(#barGradHistorical)'}
                    stroke={isForecast ? '#fde047' : '#6ee7b7'}
                    strokeWidth="1.2"
                    className="transition-all duration-200 hover:brightness-125"
                  />

                  {/* ULTRA-CLEAR HIGH CONTRAST NUMBER BADGE ON TOP */}
                  <rect
                    x={x - 17}
                    y={y - 20}
                    width="34"
                    height="16"
                    rx="4"
                    fill="#020617"
                    stroke={isForecast ? '#fbbf24' : '#34d399'}
                    strokeWidth="1.4"
                    className="drop-shadow"
                  />
                  <text
                    x={x}
                    y={y - 8}
                    fill="#ffffff"
                    fontSize="10"
                    textAnchor="middle"
                    fontWeight="800"
                    className="font-mono select-none"
                  >
                    {val}kg
                  </text>

                  {/* Day Label Below Bar */}
                  <text
                    x={x}
                    y="205"
                    fill={isForecast ? '#fbbf24' : '#a7f3d0'}
                    fontSize="9"
                    textAnchor="middle"
                    fontWeight={isForecast ? 'bold' : 'normal'}
                    className="font-mono"
                  >
                    {d.day}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-emerald-950/60 gap-2">
          <span>Forecasting Engine: ARIMA + IBM Granite Multimodal Sensor Discard Model v2.4</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Accuracy Metric: 98.2% Correlation</span>
        </div>
      </div>

      {/* Smart Bin Ultrasonic Telemetry Matrix Table (All 7 Bins) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1410] border border-slate-200 dark:border-emerald-950/80 shadow-xl space-y-4">
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-500" />
              {t.admin.telemetryTitle} ({bins.length} Active Nodes)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct LoRaWAN connection to bin ultrasonic distance sensors and strain gauge load cells.
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl">
            Live Stream Online
          </span>
        </div>

        {/* Telemetry Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-emerald-950 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">{t.admin.colId}</th>
                <th className="py-3 px-4">{t.admin.colLocation}</th>
                <th className="py-3 px-4">Waste Stream</th>
                <th className="py-3 px-4">{t.admin.colFill}</th>
                <th className="py-3 px-4">{t.admin.colWeight}</th>
                <th className="py-3 px-4">{t.admin.colTemp}</th>
                <th className="py-3 px-4">{t.admin.colBattery}</th>
                <th className="py-3 px-4 text-right">{t.admin.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-950/60">
              {bins.map((bin) => {
                const isCritical = bin.fullness >= 90;
                const isWarning = bin.fullness >= 75;

                return (
                  <tr key={bin.id} className="hover:bg-slate-50 dark:hover:bg-[#111f18] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                      {bin.code}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                      <div>{bin.name}</div>
                      <div className="text-[11px] text-slate-400">{bin.location}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-black/40 text-slate-700 dark:text-emerald-300 border border-emerald-500/20">
                        {bin.categoryLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold">{bin.fullness}%</span>
                        <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${bin.fullness}%`,
                              backgroundColor: isCritical ? '#f43f5e' : isWarning ? '#f59e0b' : bin.pinColor
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700 dark:text-slate-300">
                      {bin.currentWeightKg} / {bin.maxWeightKg} kg
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700 dark:text-slate-300">
                      {bin.tempC} °C
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700 dark:text-slate-300">
                      {bin.batteryPct}%
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-xl text-[11px] font-bold ${
                        isCritical
                          ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                          : isWarning
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {isCritical ? t.admin.critical : isWarning ? t.admin.warning : t.admin.optimal}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
