import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { translations } from '../data/translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state: defaults to dark for sleek high-tech aesthetic
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('ecodrop_theme');
    return saved || 'dark';
  });

  // Multi-lingual state
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('ecodrop_lang');
    return saved || 'en';
  });

  // Navigation state
  const [activeTab, setActiveTab] = useState('ai-advisor');

  // User Gamification & Eco-Credits state: Starts from Level 1 at 0 XP!
  const [userCredits, setUserCredits] = useState(0);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [claimedVouchers, setClaimedVouchers] = useState([]);

  // Calculate dynamic level progression starting at Level 1 (0/50 XP to next)
  const userLevel = userCredits < 50 ? 1 : userCredits < 120 ? 2 : 3;
  const currentTierXp = userLevel === 1 ? userCredits : userLevel === 2 ? userCredits - 50 : userCredits - 120;
  const nextTierGoal = userLevel === 1 ? 50 : userLevel === 2 ? 70 : 100;
  const levelProgressPct = Math.min(100, Math.round((currentTierXp / nextTierGoal) * 100));

  // Expanded Bins Real-Time Ultrasonic Telemetry (7 specialized campus bins)
  const [bins, setBins] = useState([
    {
      id: 'alpha',
      code: 'BIN-ALPHA-01',
      name: 'Central Block - Bin Alpha',
      category: 'cables',
      categoryLabel: 'Cables & Power Cords',
      location: 'Academic Quad 1st Floor, East Wing',
      accepts: 'Standard cables, power adapters, USB cords, earphones, chargers',
      fullness: 82,
      maxWeightKg: 50,
      currentWeightKg: 41.2,
      tempC: 24.5,
      batteryPct: 94,
      status: 'warning',
      coordinates: { x: 38, y: 35 },
      distanceMeters: 120,
      walkTimeMinutes: 2,
      routeDescription: 'Via Central Quad Covered Walkway',
      color: 'emerald',
      pinColor: '#10b981'
    },
    {
      id: 'beta',
      code: 'BIN-BETA-02',
      name: 'Science Block - Bin Beta',
      category: 'batteries',
      categoryLabel: 'Alkaline & Chemical Cells',
      location: 'Chemistry Wing Ground Floor, Lab 12',
      accepts: 'Household alkaline AA/AAA, button cells, Ni-MH cells, zinc-carbon',
      fullness: 91,
      maxWeightKg: 40,
      currentWeightKg: 36.4,
      tempC: 28.1,
      batteryPct: 88,
      status: 'critical',
      coordinates: { x: 74, y: 30 },
      distanceMeters: 280,
      walkTimeMinutes: 4,
      routeDescription: 'Via Science Walkway & Chemistry Atrium',
      color: 'amber',
      pinColor: '#f59e0b'
    },
    {
      id: 'hazard',
      code: 'BIN-HAZARD-05',
      name: 'Tech Support Hub (Rm 204) - Hazard-X Bay',
      category: 'hazardous',
      categoryLabel: 'Critical Fire-Safe Containment',
      location: 'Tech Support Annex, Room 204 (Flame Retardant)',
      accepts: 'Swollen Li-Ion batteries, bulging power banks, ruptured cells, vapes',
      fullness: 28,
      maxWeightKg: 30,
      currentWeightKg: 8.4,
      tempC: 21.0,
      batteryPct: 99,
      status: 'optimal',
      coordinates: { x: 18, y: 32 },
      distanceMeters: 160,
      walkTimeMinutes: 2,
      routeDescription: 'Via North Quad Elevator to Room 204 (Sand Bucket Station)',
      color: 'rose',
      pinColor: '#f43f5e'
    },
    {
      id: 'delta',
      code: 'BIN-DELTA-04',
      name: 'Main Library Hub - Bin Delta',
      category: 'gadgets',
      categoryLabel: 'Smartphones & Tablets',
      location: 'Digital Media Section, Level 2 Atrium',
      accepts: 'Intact tablets, smartphones, calculators, e-readers, digital clocks',
      fullness: 34,
      maxWeightKg: 60,
      currentWeightKg: 20.4,
      tempC: 22.0,
      batteryPct: 98,
      status: 'optimal',
      coordinates: { x: 24, y: 70 },
      distanceMeters: 190,
      walkTimeMinutes: 3,
      routeDescription: 'Via Library South Garden Path',
      color: 'purple',
      pinColor: '#a855f7'
    },
    {
      id: 'gamma',
      code: 'BIN-GAMMA-03',
      name: 'Engineering Workshop - Bin Gamma',
      category: 'pcbs',
      categoryLabel: 'Heavy Electronics & PCBs',
      location: 'Mechanical Tech Block, Bay 4',
      accepts: 'Motherboards, RAM, CPUs, GPUs, motors, appliances, transformers',
      fullness: 56,
      maxWeightKg: 100,
      currentWeightKg: 56.0,
      tempC: 26.3,
      batteryPct: 91,
      status: 'optimal',
      coordinates: { x: 78, y: 74 },
      distanceMeters: 360,
      walkTimeMinutes: 5,
      routeDescription: 'Via South Service Road & Maker Hub',
      color: 'cyan',
      pinColor: '#06b6d4'
    },
    {
      id: 'epsilon',
      code: 'BIN-EPSILON-06',
      name: 'Student Activity Center - Bin Epsilon',
      category: 'audio',
      categoryLabel: 'Audio, Wearables & Accessories',
      location: 'Food Court Plaza Breezeway, Ground Level',
      accepts: 'Wireless earbuds, AirPods, fitness bands, smartwatches, USB flash drives',
      fullness: 48,
      maxWeightKg: 40,
      currentWeightKg: 19.2,
      tempC: 23.8,
      batteryPct: 95,
      status: 'optimal',
      coordinates: { x: 50, y: 48 },
      distanceMeters: 30,
      walkTimeMinutes: 1,
      routeDescription: 'Immediate Plaza Breezeway Adjacent to Cafeteria',
      color: 'blue',
      pinColor: '#3b82f6'
    },
    {
      id: 'eta',
      code: 'BIN-ETA-07',
      name: 'Hostel Quadrangle - Bin Eta',
      category: 'dorm',
      categoryLabel: 'Dormitory Small Electricals',
      location: 'Residential Hostel Blocks A-D Courtyard',
      accepts: 'Electric kettles, hair dryers, desk lamps, iron boxes, power extension strips',
      fullness: 65,
      maxWeightKg: 80,
      currentWeightKg: 52.0,
      tempC: 25.1,
      batteryPct: 89,
      status: 'optimal',
      coordinates: { x: 58, y: 72 },
      distanceMeters: 290,
      walkTimeMinutes: 4,
      routeDescription: 'Via East Pathway to Student Housing Courtyard',
      color: 'teal',
      pinColor: '#14b8a6'
    }
  ]);

  // Selected bin on map
  const [selectedBinId, setSelectedBinId] = useState('alpha');

  // Inter-Department Competition State
  const [departmentLadder, setDepartmentLadder] = useState([
    { id: 1, name: 'BTech Computer Science', kg: 45.4, warriors: 142, trend: '+12%', color: 'from-emerald-500 to-teal-600' },
    { id: 2, name: 'BCom Economics & Finance', kg: 38.2, warriors: 98, trend: '+8%', color: 'from-cyan-500 to-blue-600' },
    { id: 3, name: 'BTech Electronics & Comm', kg: 34.0, warriors: 87, trend: '+15%', color: 'from-amber-500 to-orange-600' },
    { id: 4, name: 'BA Humanities & Media', kg: 22.6, warriors: 64, trend: '+5%', color: 'from-purple-500 to-indigo-600' },
    { id: 5, name: 'MBA Management Studies', kg: 19.8, warriors: 51, trend: '+4%', color: 'from-rose-500 to-pink-600' },
  ]);

  // Campus Impact Metrics State
  const [metrics, setMetrics] = useState({
    totalDivertedKg: 240.2,
    carbonOffsetTons: 1.2,
    preciousMetalsGrams: 4.2
  });

  // Admin Automated Dispatch State
  const [dispatchStatus, setDispatchStatus] = useState({
    dispatched: false,
    taskId: null,
    timestamp: null,
    unit: null
  });

  // Apply Dark/Light theme class to html
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ecodrop_theme', theme);
  }, [theme]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('ecodrop_lang', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  // Trigger confetti and award Eco-Credits (+15 XP)
  const claimCredits = (itemTitle = 'Scanned E-Waste') => {
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#34d399', '#059669', '#38bdf8', '#fbbf24']
      });
    } catch (e) {
      console.log('Confetti error', e);
    }

    const newCode = `ECO-CAFE-${Math.floor(100 + Math.random() * 900)}-${Date.now().toString().slice(-3)}`;
    const newVoucher = {
      code: newCode,
      title: '₹50 Campus Nescafe / Canteen Meal Credit',
      points: 15,
      date: 'Just now',
      item: itemTitle
    };

    setUserCredits(prev => prev + 15);
    setClaimedVouchers(prev => [newVoucher, ...prev]);

    return newCode;
  };

  // Simulate a drop-off at a bin
  const simulateDropOff = (binId, weight = 1.8) => {
    setBins(prev => prev.map(bin => {
      if (bin.id === binId) {
        const newWeight = parseFloat((bin.currentWeightKg + weight).toFixed(1));
        const newFullness = Math.min(100, Math.round((newWeight / bin.maxWeightKg) * 100));
        return {
          ...bin,
          currentWeightKg: newWeight,
          fullness: newFullness,
          status: newFullness > 90 ? 'critical' : newFullness > 75 ? 'warning' : 'optimal'
        };
      }
      return bin;
    }));

    setMetrics(prev => ({
      totalDivertedKg: parseFloat((prev.totalDivertedKg + weight).toFixed(1)),
      carbonOffsetTons: parseFloat((prev.carbonOffsetTons + (weight * 0.005)).toFixed(3)),
      preciousMetalsGrams: parseFloat((prev.preciousMetalsGrams + (weight * 0.018)).toFixed(2))
    }));
  };

  // Boost department
  const boostDepartment = (deptId, extraKg = 2.5) => {
    setDepartmentLadder(prev => {
      const updated = prev.map(dept => {
        if (dept.id === deptId) {
          return {
            ...dept,
            kg: parseFloat((dept.kg + extraKg).toFixed(1)),
            warriors: dept.warriors + 1
          };
        }
        return dept;
      });
      return updated.sort((a, b) => b.kg - a.kg);
    });

    setMetrics(prev => ({
      ...prev,
      totalDivertedKg: parseFloat((prev.totalDivertedKg + extraKg).toFixed(1))
    }));

    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#14b8a6']
      });
    } catch (e) {}
  };

  // Automated Dispatch
  const triggerMaintenanceDispatch = () => {
    const taskId = `EW-${Math.floor(400 + Math.random() * 50)}`;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setDispatchStatus({
      dispatched: true,
      taskId,
      timestamp: now,
      unit: 'Maintenance Unit 3 (Estate Rapid Response)'
    });
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage: toggleLanguage,
        t,
        activeTab,
        setActiveTab,
        userCredits,
        userLevel,
        currentTierXp,
        nextTierGoal,
        levelProgressPct,
        claimedVouchers,
        claimCredits,
        isRewardsModalOpen,
        setIsRewardsModalOpen,
        bins,
        selectedBinId,
        setSelectedBinId,
        simulateDropOff,
        departmentLadder,
        boostDepartment,
        metrics,
        dispatchStatus,
        triggerMaintenanceDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
