import React from 'react';
import { ScreenId } from '../types';

interface NavigationSidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  onOpenCart
}) => {
  const navItems: Array<{ id: ScreenId; label: string; icon: string; count?: number }> = [
    { id: 'cycle-tracker', label: 'Cycle Tracker', icon: 'cycle' },
    { id: 'ai-companion', label: 'Sakhi AI Companion', icon: 'auto_awesome' },
    { id: 'lifestyle-nutrition', label: 'Lifestyle & Phase Nutrition', icon: 'nutrition' },
    { id: 'doctors', label: '24/7 Gynaec & Doctors', icon: 'medical_services' },
    { id: 'community', label: 'Community & Buddy Forum', icon: 'groups' },
    { id: 'good-vibes', label: 'Good Vibes Sanctuary', icon: 'graphic_eq' },
    { id: 'period-products', label: 'Period Products', icon: 'video_library', count: cartCount > 0 ? cartCount : undefined },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-[#fff0f2] z-50 flex flex-col justify-between shadow-[0_12px_36px_-4px_rgba(153,0,36,0.07)] border-r border-[#eed4d8]/40">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div 
          onClick={() => onNavigate('gateway')} 
          className="h-20 px-6 flex items-center gap-3 bg-white/70 backdrop-blur-xl cursor-pointer hover:bg-white/90 transition-colors border-b border-[#eed4d8]/30 group"
          title="Return to Sovereign Gateway"
        >
          <div className="w-10 h-10 rounded-full bg-[#8b001d] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(153,0,36,0.25)] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">spa</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-[#610011] tracking-tight font-semibold">
              Sakhi Cycle
            </span>
            <span className="font-label-sm text-label-sm text-[#8d4a56] uppercase tracking-widest">
              Intimate Care
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="px-4 pt-6">
          <div className="px-3 pb-2 font-label-sm text-label-sm text-[#8d706f] uppercase tracking-wider font-semibold">
            Sanctuary Protocol
          </div>
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all text-left ${
                    isActive
                      ? 'bg-[#8b001d] text-white font-medium shadow-[0_8px_20px_rgba(153,0,36,0.2)]'
                      : 'text-[#594140] hover:bg-[#feaab7]/40 hover:text-[#610011]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="material-symbols-outlined text-[20px]" 
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {item.icon}
                    </span>
                    <span className="font-title-md text-title-md">{item.label}</span>
                  </div>
                  {item.count ? (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white text-[#8b001d]' : 'bg-[#8b001d] text-white'
                    }`}>
                      {item.count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer HIPAA & Settings */}
      <div className="p-4">
        {/* Cart Quick trigger */}
        {cartCount > 0 && (
          <button
            onClick={onOpenCart}
            className="w-full mb-3 py-2 px-3 rounded-xl bg-[#feaab7]/50 text-[#610011] hover:bg-[#feaab7] flex items-center justify-between text-xs font-semibold transition-all"
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
              <span>Sanctuary Kit</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#8b001d] text-white font-bold">{cartCount} items</span>
          </button>
        )}

        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-[0_4px_12px_-2px_rgba(153,0,36,0.04)] flex flex-col gap-1.5 mb-2 border border-[#eed4d8]/40">
          <div className="flex items-center gap-1.5 text-[#610011]">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="font-label-md text-label-md uppercase tracking-wider font-bold">HIPAA Certified</span>
          </div>
          <p className="font-body-sm text-body-sm text-[#594140]">
            Zero-knowledge biometric and cycle telemetry encryption.
          </p>
        </div>

        <nav className="flex flex-col gap-1">
          <button
            onClick={() => onNavigate('settings')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all text-left ${
              currentScreen === 'settings'
                ? 'bg-[#8b001d] text-white font-medium shadow-[0_8px_20px_rgba(153,0,36,0.2)]'
                : 'text-[#594140] hover:bg-[#feaab7]/40 hover:text-[#610011]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="font-title-md text-title-md">Settings</span>
          </button>

          <button
            onClick={() => onNavigate('gateway')}
            className="w-full flex items-center gap-3 px-4 py-1.5 rounded-xl text-xs text-[#8d706f] hover:text-[#610011] transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Gateway Screen</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};
