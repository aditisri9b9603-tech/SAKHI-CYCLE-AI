import React, { useState } from 'react';
import { ScreenId } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface TopHeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenAudioTranscriber?: (context?: string) => void;
  onToggleMobileMenu?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount = 0,
  onOpenCart,
  onOpenAudioTranscriber,
  onToggleMobileMenu,
}) => {
  const { user, userProfile, logout } = useAuth();
  const { language, setLanguage, t, formatNumber } = useLanguage();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const displayName = userProfile?.displayName || user?.displayName || 'Devi Priya';
  const displayEmail = userProfile?.email || user?.email || 'devi.priya@sakhi.bio';
  const initialLetters = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const cycleDayNumber = userProfile?.cycleDay || 9;

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-20 bg-white/90 backdrop-blur-xl z-30 shadow-[0_2px_16px_rgba(219,39,119,0.06)] border-b border-[#ffd5df] transition-all">
      <div className="w-full h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Left: Mobile hamburger & Phase status */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="p-2 rounded-2xl bg-white border border-[#ffd5df] text-[#831843] lg:hidden hover:bg-[#fff0f3] transition-colors cursor-pointer shadow-2xs"
            title="Toggle Menu"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>

          {/* Phase Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff0f3] text-[#db2777] shadow-xs border border-[#ffd5df]">
            <span className="w-2 h-2 rounded-full bg-[#db2777] animate-pulse"></span>
            <span className="font-bold text-xs sm:text-sm text-[#831843]">
              {language === 'hi' ? 'दिन' : 'Day'} {formatNumber(cycleDayNumber)} • {userProfile?.currentPhase || (language === 'hi' ? 'उभरती ऊर्जा' : 'Rising Energy')}
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-[#594140]">
            <span className="material-symbols-outlined text-[16px] text-[#db2777]">sparkles</span>
            <span className="text-xs font-medium">
              {language === 'hi' ? 'संतुलित शारीरिक लय • प्राकृतिक ऊर्जा' : 'Natural biological rhythm • Good vitality'}
            </span>
          </div>
        </div>

        {/* Quick Nav Pills in soft pastel pink */}
        <div className="hidden md:flex items-center gap-1 bg-[#fff5f7] p-1 rounded-full border border-[#ffd5df] shadow-inner">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'home'
                ? 'bg-gradient-to-r from-[#db2777] to-[#be185d] text-white shadow-xs'
                : 'text-[#831843] hover:text-[#db2777]'
            }`}
          >
            {t('nav_home')}
          </button>
          <button
            onClick={() => onNavigate('cycle-tracker')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'cycle-tracker'
                ? 'bg-gradient-to-r from-[#db2777] to-[#be185d] text-white shadow-xs'
                : 'text-[#831843] hover:text-[#db2777]'
            }`}
          >
            {t('nav_cycle_tracker')}
          </button>
          <button
            onClick={() => onNavigate('ai-companion')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'ai-companion'
                ? 'bg-gradient-to-r from-[#db2777] to-[#be185d] text-white shadow-xs'
                : 'text-[#831843] hover:text-[#db2777]'
            }`}
          >
            {t('nav_ai_companion')}
          </button>
          <button
            onClick={() => onNavigate('doctors')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'doctors'
                ? 'bg-gradient-to-r from-[#db2777] to-[#be185d] text-white shadow-xs'
                : 'text-[#831843] hover:text-[#db2777]'
            }`}
          >
            {t('nav_doctors')}
          </button>
        </div>

        {/* Right Action Icons & LANGUAGE SELECTOR */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* VISIBLE LANGUAGE SELECTOR PILL */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff0f3] hover:bg-[#ffe5ec] text-[#831843] border border-[#ffd5df] text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
              title="Change Language / भाषा बदलें"
            >
              <span className="material-symbols-outlined text-[16px] text-[#db2777]">translate</span>
              <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
              <span className="material-symbols-outlined text-[14px] text-[#831843]">expand_more</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white shadow-xl border border-[#ffd5df] p-2 space-y-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('en');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer font-semibold ${
                    language === 'en' ? 'bg-[#fff0f3] text-[#db2777]' : 'text-[#594140] hover:bg-[#fff5f7]'
                  }`}
                >
                  <span>English (EN)</span>
                  {language === 'en' && <span className="material-symbols-outlined text-[16px]">check</span>}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLanguage('hi');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer font-semibold ${
                    language === 'hi' ? 'bg-[#fff0f3] text-[#db2777]' : 'text-[#594140] hover:bg-[#fff5f7]'
                  }`}
                >
                  <span>हिंदी (Hindi)</span>
                  {language === 'hi' && <span className="material-symbols-outlined text-[16px]">check</span>}
                </button>
              </div>
            )}
          </div>

          {/* Voice Check-in Icon */}
          {onOpenAudioTranscriber && (
            <button
              type="button"
              onClick={() => onOpenAudioTranscriber('Voice Bio-Log')}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#fff0f3] hover:bg-[#ffe5ec] text-[#db2777] border border-[#ffd5df] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
              title={t('header_voice_checkin')}
            >
              <span className="material-symbols-outlined text-[17px]">mic</span>
              <span className="hidden sm:inline">{t('header_voice_checkin')}</span>
            </button>
          )}

          {/* Cart Icon */}
          {onOpenCart && (
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-2xl bg-white border border-[#ffd5df] text-[#831843] hover:bg-[#fff0f3] transition-colors cursor-pointer shadow-xs"
              title={t('nav_cart')}
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#db2777] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                  {formatNumber(cartCount)}
                </span>
              )}
            </button>
          )}

          {/* User Profile dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-[#fff0f3] transition-colors cursor-pointer border border-[#ffd5df]"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#db2777] to-[#be185d] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {initialLetters}
              </div>
              <span className="hidden md:inline text-xs font-semibold text-[#831843] pr-2">
                {displayName.split(' ')[0]}
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-3xl bg-white shadow-xl border border-[#ffd5df] p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="pb-3 border-b border-[#ffe4eb]">
                  <div className="font-bold text-[#831843] text-sm">{displayName}</div>
                  <div className="text-[11px] text-[#594140] truncate">{displayEmail}</div>
                  <div className="text-[10px] text-[#db2777] mt-1 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{t('header_encrypted_vault')}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('settings');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#831843] hover:bg-[#fff0f3] flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#db2777]">settings</span>
                    <span>{t('nav_settings')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('gateway');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#831843] hover:bg-[#fff0f3] flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#db2777]">login</span>
                    <span>{t('nav_sign_in')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      await logout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
