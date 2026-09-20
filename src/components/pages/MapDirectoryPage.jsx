import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  Search, 
  CheckCircle2, 
  Layers, 
  Footprints, 
  BatteryMedium, 
  Cable, 
  Smartphone, 
  Cpu, 
  ArrowRight,
  Flame,
  Headphones,
  Coffee,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Clock,
  Zap,
  Play,
  Check,
  Radio,
  Mic,
  Activity,
  Maximize2,
  X,
  Info
} from 'lucide-react';

export const MapDirectoryPage = () => {
  const { 
    t, 
    bins, 
    selectedBinId, 
    setSelectedBinId, 
    simulateDropOff 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mapMode, setMapMode] = useState('digital-twin'); // 'digital-twin' | 'heatmap' | 'density'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isWalkingSimulation, setIsWalkingSimulation] = useState(false);
  const [walkProgress, setWalkProgress] = useState(0);
  const [dropOffNotice, setDropOffNotice] = useState(null);
  const [isCardDismissed, setIsCardDismissed] = useState(false);

  const selectedBin = bins.find(b => b.id === selectedBinId) || bins[0];

  // Re-show card if user clicks a different bin
  useEffect(() => {
    setIsCardDismissed(false);
  }, [selectedBinId]);

  // Category filter tabs
  const categories = [
    { id: 'all', label: 'All Bins (7)' },
    { id: 'hazardous', label: '🔥 Fire-Safe Hazard' },
    { id: 'cables', label: '🔌 Cables & Cords' },
    { id: 'batteries', label: '🔋 Batteries' },
    { id: 'gadgets', label: '📱 Smart Gadgets' },
    { id: 'pcbs', label: '💻 PCBs & Motors' },
    { id: 'audio', label: '🎧 Audio & Wearables' },
    { id: 'dorm', label: '☕ Dorm Electricals' }
  ];

  // Filter bins
  const filteredBins = bins.filter(bin => {
    const matchesCategory = selectedCategory === 'all' || bin.category === selectedCategory;
    const matchesSearch = 
      bin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bin.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bin.accepts.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bin.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Handle Walking Simulation Animation
  const handleStartWalk = () => {
    if (isWalkingSimulation) return;
    setIsWalkingSimulation(true);
    setWalkProgress(0);

    const interval = setInterval(() => {
      setWalkProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsWalkingSimulation(false);
          setDropOffNotice(`You have arrived at ${selectedBin.name}! Ready for verified deposit.`);
          setTimeout(() => setDropOffNotice(null), 4000);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  const handleSimulateDrop = (binId) => {
    simulateDropOff(binId, 1.5);
    setDropOffNotice(`Drop-off logged at ${selectedBin.name}! Ultrasonic sensors updated.`);
    setTimeout(() => setDropOffNotice(null), 3500);
  };

  // Node spatial coordinates on 1000 x 600 schematic canvas (EcoSync style layout with balanced spacing)
  const nodeMap = {
    'hazard':  { x: 160, y: 310, label: 'Hazard-X Bay', sub: 'Rm 204 Isolation' },
    'alpha':   { x: 310, y: 160, label: 'Student Quad Hub', sub: 'Bin Alpha' },
    'beta':    { x: 680, y: 160, label: 'Science Wing', sub: 'Bin Beta' },
    'gamma':   { x: 840, y: 310, label: 'Workshop Bay', sub: 'Bin Gamma' },
    'epsilon': { x: 270, y: 450, label: 'Activity Center', sub: 'Bin Epsilon' },
    'eta':     { x: 500, y: 460, label: 'Hostel Quad', sub: 'Bin Eta' },
    'delta':   { x: 740, y: 450, label: 'Library Commons', sub: 'Bin Delta' }
  };

  // User position at Student Quad Center (schematic coordinate)
  const userPos = { x: 500, y: 300 };

  // Icon mapping per category
  const getBinIcon = (category) => {
    switch(category) {
      case 'hazardous': return Flame;
      case 'cables': return Cable;
      case 'batteries': return BatteryMedium;
      case 'gadgets': return Smartphone;
      case 'pcbs': return Cpu;
      case 'audio': return Headphones;
      case 'dorm': return Coffee;
      default: return MapPin;
    }
  };

  // Safe coordinate lookup
  const getCoords = (binId) => nodeMap[binId] || { x: 500, y: 300, label: 'Bin', sub: 'Node' };
  const targetPos = getCoords(selectedBin.id);

  // Smart dodging: If target node is on the right side of the canvas (x > 500), float card on the left!
  // If target node is on the left side (x <= 500), float card on the right!
  const isTargetOnRight = targetPos.x > 500;

  // Smooth curved route from User Quad to destination
  const routePath = `M ${userPos.x} ${userPos.y} Q ${(userPos.x + targetPos.x) / 2} ${targetPos.y < userPos.y ? targetPos.y + 30 : targetPos.y - 30}, ${targetPos.x} ${targetPos.y}`;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
              <Compass className="w-6 h-6" />
            </span>
            <span>Campus Interactive Map & Bin Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Explore 7 specialized university collection nodes categorized by chemical safety and recovery stream.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            7 Live Sensors Synced
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                : 'bg-white dark:bg-[#0c1410] border border-slate-200 dark:border-emerald-950 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Drop-off notice banner */}
      {dropOffNotice && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-lg flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5" />
            <span>{dropOffNotice}</span>
          </div>
          <button onClick={() => setDropOffNotice(null)} className="text-white/80 hover:text-white text-xs font-bold">
            ✕
          </button>
        </div>
      )}

      {/* 2-Column Split: Directory on Left (4 cols) & Clean Geospatial Schematic Map on Right (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Verified Directory List */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location, cable, battery, vape, laptop..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#0c1410] border border-slate-200 dark:border-emerald-950/80 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 placeholder:text-slate-400 shadow-sm"
            />
          </div>

          {/* List of 7 Bins */}
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredBins.map((bin) => {
              const isSelected = selectedBinId === bin.id;
              const BinIcon = getBinIcon(bin.category);

              return (
                <div
                  key={bin.id}
                  onClick={() => setSelectedBinId(bin.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer border transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-50 to-teal-50/50 dark:from-[#11241a] dark:to-[#0e1d15] border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : 'bg-white dark:bg-[#0c1410] hover:bg-slate-50 dark:hover:bg-[#111e17] border-slate-200 dark:border-emerald-950/80 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div 
                        className="p-2.5 rounded-xl text-white shadow-sm flex-shrink-0"
                        style={{ backgroundColor: bin.pinColor }}
                      >
                        <BinIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                          {bin.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-black/40 text-slate-700 dark:text-emerald-400 font-mono">
                            {bin.categoryLabel}
                          </span>
                          <span className="text-[11px] text-slate-400">• {bin.code}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                          📍 {bin.location}
                        </p>
                      </div>
                    </div>

                    {/* Capacity pill */}
                    <div className="text-right flex-shrink-0">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                        bin.fullness >= 90
                          ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                          : bin.fullness >= 75
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {bin.fullness}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-emerald-950/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 dark:text-slate-400 truncate max-w-[220px]">
                      <strong className="text-slate-800 dark:text-slate-200">Accepts:</strong> {bin.accepts}
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 shrink-0 font-mono">
                      {bin.walkTimeMinutes}m walk
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Capacity bar */}
                  <div className="mt-1.5 w-full h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${bin.fullness}%`,
                        backgroundColor: bin.fullness >= 90 ? '#f43f5e' : bin.fullness >= 75 ? '#f59e0b' : bin.pinColor
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: EcoSync OS Clean Geospatial Smart Zone Map */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Main Card Container */}
          <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-[#f7f3ea] dark:bg-[#151916] shadow-xl overflow-hidden transition-all duration-300">
            
            {/* EcoSync OS Style Header */}
            <div className="p-4 sm:px-6 border-b border-stone-200/80 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-3 bg-[#faf6ef]/90 dark:bg-[#1a1f1b]/90 backdrop-blur-md">
              
              {/* Left Title & Digital Twin Layer badge */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white tracking-tight">
                      Geospatial Smart Zone Map
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold border border-emerald-500/20">
                      Digital Twin Layer
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    Interactive schematic campus micro-grid • Real-time reactive nodes
                  </p>
                </div>
              </div>

              {/* Right Mode Toggle Pills */}
              <div className="flex items-center gap-1.5 bg-stone-200/60 dark:bg-stone-900/80 p-1 rounded-full border border-stone-300/60 dark:border-stone-700/50 text-xs">
                <button
                  onClick={() => setMapMode('digital-twin')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    mapMode === 'digital-twin'
                      ? 'bg-[#1c1f20] text-white shadow'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  Digital Twin
                </button>
                <button
                  onClick={() => setMapMode('heatmap')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    mapMode === 'heatmap'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  Thermal Heatmap
                </button>
                <button
                  onClick={() => setMapMode('density')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    mapMode === 'density'
                      ? 'bg-emerald-700 text-white shadow'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  Fill Density
                </button>
              </div>

              {/* Zoom & Reset Controls */}
              <div className="flex items-center gap-1 ml-auto sm:ml-0">
                <button
                  onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.15))}
                  className="p-1.5 rounded-lg bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(prev => Math.max(0.85, prev - 0.15))}
                  className="p-1.5 rounded-lg bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 rounded-lg bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                  title="Reset View"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Interactive Schematic Canvas Area */}
            <div className="relative w-full h-[470px] sm:h-[510px] overflow-hidden select-none bg-[#f6f1e8] dark:bg-[#131714]">
              
              {/* Scaled SVG Container */}
              <div 
                className="w-full h-full transition-transform duration-300 origin-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <svg 
                  className="w-full h-full" 
                  viewBox="0 0 1000 600" 
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    {/* Architectural soft grid pattern */}
                    <pattern id="ecoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <rect width="40" height="40" fill="none" />
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
                    </pattern>

                    {/* Drop shadow for nodes */}
                    <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.18" />
                    </filter>

                    {/* Soft glow for routes and active items */}
                    <filter id="mintGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* 1. Sand Canvas Background */}
                  <rect 
                    width="1000" 
                    height="600" 
                    className="text-stone-300/70 dark:text-stone-800/60"
                    fill="url(#ecoGrid)" 
                  />

                  {/* 2. Soft Architectural Corridors & Roadways (Sand / Latte Bands) */}
                  {/* Upper curving highway corridor */}
                  <path
                    d="M 60 210 C 220 180, 420 220, 580 240 S 760 260, 940 250"
                    fill="none"
                    stroke="#eae0d2"
                    strokeWidth="32"
                    strokeLinecap="round"
                    className="dark:stroke-[#202722]"
                  />
                  {/* Lower horizontal roadway */}
                  <path
                    d="M 120 395 C 280 400, 480 390, 680 410 S 840 400, 920 390"
                    fill="none"
                    stroke="#eae0d2"
                    strokeWidth="28"
                    strokeLinecap="round"
                    className="dark:stroke-[#202722]"
                  />
                  {/* Subtle connecting vertical transit paths */}
                  <line 
                    x1="490" y1="120" x2="490" y2="480" 
                    stroke="#decbb7" 
                    strokeWidth="2" 
                    strokeDasharray="4 4" 
                    opacity="0.7"
                    className="dark:stroke-[#2f3932]" 
                  />
                  <line 
                    x1="680" y1="140" x2="680" y2="460" 
                    stroke="#decbb7" 
                    strokeWidth="2" 
                    strokeDasharray="4 4" 
                    opacity="0.7"
                    className="dark:stroke-[#2f3932]" 
                  />

                  {/* 3. Mint Dotted Connector Lines Between All Nodes (EcoSync Mesh) */}
                  <g stroke="#73cba3" strokeWidth="2.2" strokeDasharray="5 5" fill="none" opacity="0.85">
                    {/* Hazard to Alpha */}
                    <line x1={nodeMap.hazard.x} y1={nodeMap.hazard.y} x2={nodeMap.alpha.x} y2={nodeMap.alpha.y} />
                    {/* Alpha to Beta */}
                    <line x1={nodeMap.alpha.x} y1={nodeMap.alpha.y} x2={nodeMap.beta.x} y2={nodeMap.beta.y} />
                    {/* Beta to Gamma */}
                    <line x1={nodeMap.beta.x} y1={nodeMap.beta.y} x2={nodeMap.gamma.x} y2={nodeMap.gamma.y} />
                    {/* Alpha to Epsilon */}
                    <path d={`M ${nodeMap.alpha.x} ${nodeMap.alpha.y} Q 360 300, ${nodeMap.epsilon.x} ${nodeMap.epsilon.y}`} />
                    {/* Beta to Eta */}
                    <path d={`M ${nodeMap.beta.x} ${nodeMap.beta.y} Q 620 320, ${nodeMap.eta.x} ${nodeMap.eta.y}`} />
                    {/* Epsilon to Eta */}
                    <line x1={nodeMap.epsilon.x} y1={nodeMap.epsilon.y} x2={nodeMap.eta.x} y2={nodeMap.eta.y} />
                    {/* Eta to Delta */}
                    <line x1={nodeMap.eta.x} y1={nodeMap.eta.y} x2={nodeMap.delta.x} y2={nodeMap.delta.y} />
                    {/* Gamma to Delta */}
                    <line x1={nodeMap.gamma.x} y1={nodeMap.gamma.y} x2={nodeMap.delta.x} y2={nodeMap.delta.y} />
                  </g>

                  {/* Heatmap Layer Overlays (when in Heatmap mode) */}
                  {mapMode === 'heatmap' && (
                    <g opacity="0.6">
                      <circle cx={nodeMap.beta.x} cy={nodeMap.beta.y} r="85" fill="#f43f5e" filter="url(#mintGlow)" opacity="0.45" />
                      <circle cx={nodeMap.eta.x} cy={nodeMap.eta.y} r="70" fill="#f59e0b" filter="url(#mintGlow)" opacity="0.4" />
                      <circle cx={nodeMap.gamma.x} cy={nodeMap.gamma.y} r="60" fill="#eab308" filter="url(#mintGlow)" opacity="0.35" />
                    </g>
                  )}

                  {/* 4. Active Walking Route (when simulating or selected) */}
                  <path
                    d={routePath}
                    fill="none"
                    stroke="#0bb882"
                    strokeWidth="3.5"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    filter="url(#mintGlow)"
                    className="animate-pulse"
                  />

                  {/* User Student Quad Anchor Origin */}
                  <g transform={`translate(${userPos.x}, ${userPos.y})`}>
                    <circle r="7" fill="#0284c7" opacity="0.25" className="animate-ping" />
                    <circle r="4.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                    <text 
                      x="0" 
                      y="-10" 
                      fill="#0369a1" 
                      fontSize="11" 
                      textAnchor="middle" 
                      fontWeight="bold"
                      className="select-none pointer-events-none font-sans"
                    >
                      YOU (Quad Center)
                    </text>
                  </g>

                  {/* Animated walking avatar along path */}
                  {isWalkingSimulation && (
                    <g 
                      transform={`translate(${
                        userPos.x + (targetPos.x - userPos.x) * (walkProgress / 100)
                      }, ${
                        userPos.y + (targetPos.y - userPos.y) * (walkProgress / 100)
                      })`}
                    >
                      <circle r="14" fill="#0bb882" opacity="0.3" className="animate-ping" />
                      <circle r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                      <text x="0" y="-14" fill="#065f46" fontSize="12" textAnchor="middle" fontWeight="bold">
                        🚶 Walking ({walkProgress}%)
                      </text>
                    </g>
                  )}

                  {/* 5. The 7 Large Green Circular Nodes (EcoSync OS Exact Style) */}
                  {bins.map((bin) => {
                    const coords = getCoords(bin.id);
                    const isSelected = bin.id === selectedBinId;
                    const isHazard = bin.category === 'hazardous';
                    const BinIcon = getBinIcon(bin.category);

                    return (
                      <g 
                        key={bin.id} 
                        transform={`translate(${coords.x}, ${coords.y})`}
                        className="cursor-pointer group"
                        onClick={() => setSelectedBinId(bin.id)}
                      >
                        {/* Outer Selection Highlight Ring (Like Main Solar Farm in screenshot) */}
                        {isSelected && (
                          <g>
                            <circle
                              r="29"
                              fill="none"
                              stroke="#111827"
                              strokeWidth="4"
                              className="dark:stroke-white transition-all duration-300"
                            />
                            <circle
                              r="36"
                              fill="#0bb882"
                              opacity="0.18"
                              className="animate-ping"
                            />
                          </g>
                        )}

                        {/* Large Circular Green Node */}
                        <g filter="url(#nodeShadow)">
                          <circle
                            r="22"
                            fill={isHazard ? "#e11d48" : "#0bb882"}
                            className="transition-transform duration-200 group-hover:scale-110"
                          />
                        </g>

                        {/* White Icon Inside Circle */}
                        <foreignObject x="-11" y="-11" width="22" height="22" className="pointer-events-none">
                          <div className="w-full h-full flex items-center justify-center text-white">
                            <BinIcon className="w-4 h-4 text-white" strokeWidth={2.4} />
                          </div>
                        </foreignObject>

                        {/* Node Label Capsule Below Circle (EcoSync Style) */}
                        <g transform="translate(0, 32)">
                          {/* Capsule Pill Background */}
                          <rect
                            x="-68"
                            y="0"
                            width="136"
                            height="24"
                            rx="12"
                            fill="#ffffff"
                            stroke="#e2d9cd"
                            strokeWidth="1"
                            filter="url(#nodeShadow)"
                            className="dark:fill-[#1b221d] dark:stroke-stone-700 transition-colors"
                          />

                          {/* Node Title & Status text */}
                          <text
                            x="0"
                            y="15"
                            textAnchor="middle"
                            className="font-sans select-none pointer-events-none"
                          >
                            <tspan 
                              fontSize="11" 
                              fontWeight="700" 
                              fill="#1c1f20" 
                              className="dark:fill-white"
                            >
                              {coords.label}
                            </tspan>
                            <tspan 
                              fontSize="10" 
                              fontWeight="600" 
                              fill={bin.fullness >= 90 ? "#e11d48" : "#059669"}
                              dx="4"
                            >
                              • {bin.fullness >= 90 ? 'Full' : 'Optimized'}
                            </tspan>
                          </text>
                        </g>

                      </g>
                    );
                  })}

                </svg>
              </div>

              {/* FLOATING DETAIL CARD (Smart Auto-Dodging: Never covers the selected bin) */}
              {!isCardDismissed ? (
                <div 
                  className={`absolute ${
                    isTargetOnRight ? 'top-4 left-4' : 'top-4 right-4'
                  } z-20 w-72 sm:w-80 rounded-2xl bg-[#1e2224]/95 dark:bg-[#121614]/95 text-white p-4 sm:p-5 shadow-2xl border border-stone-700/60 backdrop-blur-md transition-all duration-300 animate-in fade-in zoom-in-95`}
                >
                  {/* Top Row: Code Badge, Ambient Temp & Close Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-mono text-[11px] font-bold tracking-wide">
                        {selectedBin.code}
                      </span>
                      <span className="text-stone-400 font-mono text-xs">
                        {selectedBin.tempC}°C • GPS Sync
                      </span>
                    </div>

                    {/* Close / Dismiss Button to completely uncover map */}
                    <button
                      onClick={() => setIsCardDismissed(true)}
                      className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-stone-400 hover:text-white transition-colors"
                      title="Hide card (uncover map)"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Node Title */}
                  <h3 className="text-base font-bold text-white mt-2 tracking-tight">
                    {selectedBin.name}
                  </h3>

                  {/* Accepts description */}
                  <p className="text-xs text-stone-300 leading-relaxed mt-1 line-clamp-2">
                    {selectedBin.accepts}
                  </p>

                  {/* Metrics Row: Demand/Capacity & Yield/Offset */}
                  <div className="mt-3 pt-3 border-t border-stone-700/60 grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                        Fill Volume:
                      </div>
                      <div className="text-sm font-bold text-amber-400 font-mono mt-0.5">
                        {selectedBin.fullness}% Cap
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                        Collection Yield:
                      </div>
                      <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                        {selectedBin.currentWeightKg} kg Recycled
                      </div>
                    </div>
                  </div>

                  {/* Route & Action button */}
                  <div className="mt-3 pt-2.5 flex items-center justify-between gap-2">
                    <div className="text-[11px] text-stone-400 font-mono flex items-center gap-1">
                      <Footprints className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{selectedBin.distanceMeters}m ({selectedBin.walkTimeMinutes}m walk)</span>
                    </div>

                    <button
                      onClick={() => handleSimulateDrop(selectedBin.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Drop E-Waste</span>
                    </button>
                  </div>

                </div>
              ) : (
                /* Re-open Info Chip when dismissed */
                <button
                  onClick={() => setIsCardDismissed(false)}
                  className={`absolute ${
                    isTargetOnRight ? 'top-4 left-4' : 'top-4 right-4'
                  } z-20 px-3.5 py-1.5 rounded-xl bg-[#1e2224]/90 dark:bg-[#121614]/90 text-white text-xs font-semibold border border-stone-700/60 shadow-lg flex items-center gap-1.5 backdrop-blur-md hover:bg-black transition-all`}
                >
                  <Info className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Show {selectedBin.code} Card</span>
                </button>
              )}

              {/* FLOATING BOTTOM-LEFT LEGEND BAR (EcoSync Exact Replica) */}
              <div className="absolute bottom-4 left-4 z-10">
                <div className="px-4 py-2 rounded-full bg-white/95 dark:bg-[#1c221e]/95 backdrop-blur-md border border-stone-200 dark:border-stone-700 shadow-lg flex items-center gap-4 text-xs font-medium text-stone-700 dark:text-stone-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0bb882] shadow-sm animate-pulse"></span>
                    <span className="text-[11px] font-semibold">Glow Mint (Optimized)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm"></span>
                    <span className="text-[11px] font-semibold">Pulse Amber (Spike Load)</span>
                  </div>
                </div>
              </div>

              {/* FLOATING BOTTOM-RIGHT ACTION BUTTON (Voice / Walk Simulation) */}
              <div className="absolute bottom-4 right-4 z-10">
                <button
                  onClick={handleStartWalk}
                  disabled={isWalkingSimulation}
                  className="px-4 py-2 rounded-full bg-[#1c1f20] hover:bg-black text-white text-xs font-bold flex items-center gap-2 shadow-xl border border-stone-700/40 transition-all cursor-pointer"
                >
                  <Footprints className="w-4 h-4 text-emerald-400" />
                  <span>{isWalkingSimulation ? `Walking (${walkProgress}%)` : 'Simulate Walk Route'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Navigation Route Guidance Card Below Map */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0c1410] border border-slate-200 dark:border-emerald-950/80 shadow-lg space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-emerald-950/80 pb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="p-3 rounded-2xl text-white shadow-md flex-shrink-0"
                  style={{ backgroundColor: selectedBin.pinColor }}
                >
                  {React.createElement(getBinIcon(selectedBin.category), { className: "w-5 h-5" })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Destination Bin
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-black/40 text-slate-700 dark:text-slate-300">
                      {selectedBin.code}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedBin.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSimulateDrop(selectedBin.id)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Log Verified Drop-off</span>
                </button>
              </div>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#121e17] border border-slate-200/80 dark:border-emerald-900/30 text-center">
                <Footprints className="w-4 h-4 mx-auto text-emerald-500 mb-1" />
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Walking Distance</div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                  {selectedBin.distanceMeters} m
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#121e17] border border-slate-200/80 dark:border-emerald-900/30 text-center">
                <Clock className="w-4 h-4 mx-auto text-teal-500 mb-1" />
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Estimated Walk</div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                  {selectedBin.walkTimeMinutes} mins
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#121e17] border border-slate-200/80 dark:border-emerald-900/30 text-center">
                <Activity className="w-4 h-4 mx-auto text-amber-500 mb-1" />
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Bin Fill Status</div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                  {selectedBin.fullness}%
                </div>
              </div>
            </div>

            {/* Route guidance */}
            <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">Active Pathway:</strong> {selectedBin.routeDescription}
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase shrink-0 font-mono">
                Optimal Route
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
