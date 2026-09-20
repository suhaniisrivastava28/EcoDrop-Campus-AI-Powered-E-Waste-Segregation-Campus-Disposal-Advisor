import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Gift, Copy, Check, X, Coffee, Printer, Utensils, Sparkles, User, Leaf } from 'lucide-react';

export const RewardsModal = () => {
  const { 
    isRewardsModalOpen, 
    setIsRewardsModalOpen, 
    userCredits, 
    userLevel, 
    currentTierXp, 
    nextTierGoal, 
    levelProgressPct,
    claimedVouchers, 
    t 
  } = useApp();
  
  const [copiedCode, setCopiedCode] = useState(null);

  if (!isRewardsModalOpen) return null;

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const partnerKiosks = [
    {
      name: "Nescafe Student Corner",
      desc: "₹40 off Hot Brew, Cappuccino, or Iced Tea",
      cost: "15 XP",
      icon: Coffee,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    },
    {
      name: "Campus Canteen Annex",
      desc: "₹60 off Healthy Bowl or Thali Combo",
      cost: "30 XP",
      icon: Utensils,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      name: "Central Library Print Station",
      desc: "25 Free Double-Sided Academic Document Prints",
      cost: "20 XP",
      icon: Printer,
      color: "text-sky-500 bg-sky-500/10 border-sky-500/20"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#0c1310] rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/60 overflow-hidden transform transition-all">
        
        {/* Top Close Button */}
        <button
          onClick={() => setIsRewardsModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/20 dark:bg-white/10 hover:bg-black/40 text-slate-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 space-y-5">
          
          {/* USER'S EXACT PROFILE CARD DESIGN */}
          <div className="rounded-2xl p-5 bg-[#0e1713] dark:bg-[#09120e] border border-emerald-500/20 text-white relative shadow-lg">
            
            {/* Top User Header */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-full bg-emerald-200 text-emerald-950 flex items-center justify-center font-bold shadow-md">
                <User className="w-6 h-6 text-emerald-800" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Campus User</h3>
                <p className="text-xs text-slate-400 font-medium">EcoDrop Member</p>
              </div>
            </div>

            {/* Inner Eco-Credits Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>ECO-CREDITS</span>
                <Leaf className="w-4 h-4 text-emerald-400" />
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black font-mono text-emerald-400">
                  {userCredits}
                </span>
                <span className="text-lg font-bold text-slate-400">XP</span>
              </div>

              <p className="text-xs text-slate-400 font-medium">
                Redeemable at Campus Cafeteria
              </p>

              {/* Level Progress Bar starting from Level 1 */}
              <div className="pt-3">
                <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                  <span className="text-slate-300">Level {userLevel}</span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {currentTierXp}/{nextTierGoal} XP to next
                  </span>
                </div>
                
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                    style={{ width: `${levelProgressPct}%` }}
                  ></div>
                </div>
              </div>

            </div>

          </div>

          {/* Claimed Vouchers list */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500" />
                Active Cafeteria Vouchers ({claimedVouchers.length})
              </h4>
            </div>

            {claimedVouchers.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#121c17] border border-dashed border-slate-200 dark:border-emerald-950 text-center text-xs text-slate-400">
                No vouchers claimed yet. Scan or drop off e-waste in the AI Advisor to earn +15 XP!
              </div>
            ) : (
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {claimedVouchers.map((v, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-500/20 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200">
                          {v.code}
                        </span>
                        <span className="text-[10px] text-slate-400">{v.date}</span>
                      </div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5">{v.title}</p>
                    </div>

                    <button
                      onClick={() => handleCopy(v.code)}
                      className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold border border-emerald-500/30 flex items-center gap-1 shadow-sm"
                    >
                      {copiedCode === v.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode === v.code ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Campus Cafeteria Kiosks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2 flex items-center gap-2">
              <Gift className="w-4 h-4 text-emerald-500" />
              Eligible Campus Outlets
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {partnerKiosks.map((k, i) => (
                <div key={i} className="p-3 rounded-xl border bg-slate-50 dark:bg-[#101a14] border-slate-200 dark:border-emerald-950 flex flex-col justify-between">
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">{k.name}</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">{k.desc}</p>
                  </div>
                  <span className="mt-2 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-[11px]">
                    Cost: {k.cost}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 dark:bg-[#070e0a] border-t border-slate-200 dark:border-emerald-950/60 flex justify-end">
          <button
            onClick={() => setIsRewardsModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-slate-800 dark:bg-emerald-700 hover:bg-slate-900 text-white text-xs font-semibold"
          >
            Close Wallet
          </button>
        </div>

      </div>
    </div>
  );
};
