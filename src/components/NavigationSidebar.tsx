import React from 'react';
import { ScreenId } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface NavigationSidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartCount: number;
  onOpenCart: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  onOpenCart,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { t, formatNumber } = useLanguage();

  const navItems: Array<{ id: ScreenId; labelKey: any; icon: string; count?: number }> = [
    { id: 'home', labelKey: 'nav_home', icon: 'home' },
    { id: 'cycle-tracker', labelKey: 'nav_cycle_tracker', icon: 'edit_calendar' },
    { id: 'ai-companion', labelKey: 'nav_ai_companion', icon: 'auto_awesome' },
    { id: 'doctors', labelKey: 'nav_doctors', icon: 'medical_services' },
    { id: 'good-vibes', labelKey: 'nav_sound_bath', icon: 'graphic_eq' },
    { id: 'period-products', labelKey: 'nav_period_products', icon: 'favorite', count: cartCount > 0 ? cartCount : undefined },
    { id: 'community', labelKey: 'nav_community', icon: 'groups' },
    { id: 'lifestyle-nutrition', labelKey: 'nav_lifestyle_nutrition', icon: 'nutrition' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-[#fff5f7] z-50 flex flex-col justify-between shadow-[0_10px_35px_rgba(219,39,119,0.08)] border-r border-[#ffd5df] transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Brand Header with Sakhi Cycle Logo */}
          <div
            onClick={() => {
              onNavigate('home');
              if (onCloseMobile) onCloseMobile();
            }}
            className="h-24 px-5 flex items-center gap-3.5 bg-white/95 backdrop-blur-xl cursor-pointer hover:bg-white transition-colors border-b border-[#ffd5df] group"
            title="Sakhi Cycle - Understand • Track • Thrive"
          >
            <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-md border-2 border-[#ffd5df] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/sakhi_logo.jpg"
                alt="Sakhi Cycle Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-[#831843] tracking-tight font-semibold flex items-center gap-1.5">
                {t('brand_title')}
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-[#db2777] uppercase tracking-wider">
                {t('brand_tagline')}
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="px-4 pt-5">
            <div className="px-3 pb-2 text-[11px] font-bold text-[#db2777] uppercase tracking-wider">
              {t('brand_title')} Menu
            </div>
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = currentScreen === item.id;
                const label = t(item.labelKey);
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#db2777] to-[#be185d] text-white font-medium shadow-md shadow-[#db2777]/25'
                        : 'text-[#594140] hover:bg-[#ffe5ec] hover:text-[#831843]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        {item.icon}
                      </span>
                      <span className="font-title-md text-title-md truncate">{label}</span>
                    </div>
                    {item.count ? (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-white text-[#db2777]' : 'bg-[#db2777] text-white'
                        }`}
                      >
                        {formatNumber(item.count)}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer Settings & Status */}
        <div className="p-4">
          {/* Cart Quick trigger */}
          {cartCount > 0 && (
            <button
              onClick={onOpenCart}
              className="w-full mb-3 py-2 px-3 rounded-2xl bg-[#fce7f3] text-[#831843] hover:bg-[#ffd5df] flex items-center justify-between text-xs font-semibold transition-all cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                <span>{t('nav_cart')}</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#db2777] text-white font-bold">
                {formatNumber(cartCount)}
              </span>
            </button>
          )}

          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xs flex flex-col gap-1 mb-2 border border-[#ffd5df]">
            <div className="flex items-center gap-1.5 text-[#db2777]">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span className="text-[11px] uppercase tracking-wider font-bold">
                {t('header_encrypted_vault')}
              </span>
            </div>
            <p className="text-[11px] text-[#594140]">
              {t('disclaimer_privacy')}
            </p>
          </div>

          <nav className="flex flex-col gap-1">
            <button
              onClick={() => {
                onNavigate('settings');
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-2xl transition-all text-left cursor-pointer ${
                currentScreen === 'settings'
                  ? 'bg-gradient-to-r from-[#db2777] to-[#be185d] text-white font-medium shadow-md shadow-[#db2777]/25'
                  : 'text-[#594140] hover:bg-[#ffe5ec] hover:text-[#831843]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="font-title-md text-title-md">{t('nav_settings')}</span>
            </button>

            <button
              onClick={() => {
                onNavigate('gateway');
                if (onCloseMobile) onCloseMobile();
              }}
              className="w-full flex items-center gap-3 px-4 py-1.5 rounded-xl text-xs text-[#9d174d] hover:text-[#db2777] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              <span>{t('nav_sign_in')}</span>
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
};
