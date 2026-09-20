import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Leaf, 
  Zap, 
  Moon, 
  Sun, 
  Globe, 
  Gift, 
  Menu, 
  X, 
  Bot, 
  MapPin, 
  Trophy, 
  Activity, 
  ChevronDown 
} from 'lucide-react';

export const Header = () => {
  const { 
    theme, 
    toggleTheme, 
    language, 
    setLanguage, 
    activeTab, 
    setActiveTab, 
    userCredits, 
    setIsRewardsModalOpen,
    t 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'ai-advisor', label: t.nav.aiAdvisor, icon: Bot },
    { id: 'map-directory', label: t.nav.mapBins, icon: MapPin },
    { id: 'impact', label: t.nav.impact, icon: Trophy },
    { id: 'admin', label: t.nav.admin, icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/85 dark:bg-[#070e0a]/90 border-b border-slate-200 dark:border-emerald-950/80 transition-colors duration-300">
      {/* Top micro banner for SDG 12 */}
      <div className="bg-emerald-600 dark:bg-emerald-950 text-white text-[11px] font-medium py-1 px-4 text-center flex items-center justify-center gap-2 tracking-wide border-b border-emerald-500/20">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
        <span>{t.header.sdgBadge}</span>
        <span className="hidden md:inline text-emerald-300">•</span>
        <span className="hidden md:inline text-emerald-100">{t.tagline}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Brand Logo with Leaf & Plug graphic */}
          <div 
            onClick={() => setActiveTab('ai-advisor')} 
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
              {/* Leaf & Electric plug hybrid wire graphic */}
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white transform -rotate-12 transition-transform group-hover:rotate-0" />
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 p-0.5 rounded-full border-2 border-white dark:border-[#070e0a]">
                <Zap className="w-2.5 h-2.5 fill-current" />
              </span>
            </div>
            
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  {t.brand}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hidden sm:inline-block">
                  SDG 12
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-emerald-400/80 font-medium hidden sm:block">
                E-Waste Intelligence Hub
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#0f1a14] border border-slate-200/80 dark:border-emerald-950/60 shadow-inner">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200/60 dark:hover:bg-emerald-950/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 dark:text-emerald-400/70'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar: Eco-Credits XP, Language Switcher, Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Global User Eco-Credits Badge */}
            <button
              onClick={() => setIsRewardsModalOpen(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/20 dark:from-emerald-950/70 dark:to-teal-950/50 border border-emerald-500/40 hover:border-emerald-500 text-slate-800 dark:text-slate-100 transition-all duration-300 group shadow-sm hover:shadow-emerald-500/20"
              title="Click to view & redeem Campus Cafeteria Vouchers"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gift className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 leading-none">
                  <span className="text-xs sm:text-sm font-black text-emerald-700 dark:text-emerald-400">
                    +{userCredits}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">XP</span>
                </div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400 hidden sm:block leading-none mt-0.5">
                  {t.header.redeemable}
                </div>
              </div>
            </button>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-slate-100 dark:bg-[#0f1a14] border border-slate-200 dark:border-emerald-900/50 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors"
                title="Toggle Language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="uppercase">{language === 'en' ? 'EN' : 'हिन्दी'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-32 py-1.5 bg-white dark:bg-[#121c17] rounded-xl border border-slate-200 dark:border-emerald-900/50 shadow-xl z-50 text-xs font-medium">
                  <button
                    onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-emerald-950/60 ${
                      language === 'en' ? 'text-emerald-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-emerald-950/60 ${
                      language === 'hi' ? 'text-emerald-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>हिन्दी</span>
                    {language === 'hi' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                  </button>
                </div>
              )}
            </div>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-[#0f1a14] border border-slate-200 dark:border-emerald-900/50 text-slate-700 dark:text-amber-300 hover:text-emerald-600 dark:hover:text-amber-200 transition-all hover:scale-105 active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 -rotate-12 hover:rotate-0" />
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-[#0f1a14] border border-slate-200 dark:border-emerald-900/50 text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 dark:border-emerald-950 grid grid-cols-2 gap-2 pb-4">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-100 dark:bg-[#0f1a14] text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
