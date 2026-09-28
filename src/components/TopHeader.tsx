import React, { useState } from 'react';
import { ScreenId } from '../types';
import { useAuth } from '../context/AuthContext';

interface TopHeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenAudioTranscriber?: (context?: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount = 0,
  onOpenCart,
  onOpenAudioTranscriber,
}) => {
  const { user, userProfile, logout, voiceNotes } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: '1',
      title: 'Dr. Ananya Sen responded',
      time: '12m ago',
      desc: 'Your follicular AMH telemetry review note is available in your vault.',
      unread: true,
    },
    {
      id: '2',
      title: 'Vagal Reset Calibrated',
      time: '1h ago',
      desc: '432 Hz Solfeggio sound bath calibrated for Day 9 evening relaxation.',
      unread: true,
    },
    {
      id: '3',
      title: 'Cycle Twin Whisper',
      time: '3h ago',
      desc: 'Sister #428 sent warm herbal tea vibes to your sanctuary.',
      unread: false,
    },
  ];

  const displayName = userProfile?.displayName || user?.displayName || 'Devi Priya';
  const displayEmail = userProfile?.email || user?.email || 'devi.priya@sanctuary.bio';
  const initialLetters = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-[#fff8f7]/85 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eed4d8]/40">
      <div className="w-full h-full px-6 lg:px-10 flex items-center justify-between">
        {/* Phase Telemetry Strip */}
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#feaab7]/50 text-[#610011] shadow-sm border border-[#feaab7]/60">
            <span className="w-2 h-2 rounded-full bg-[#8b001d] animate-pulse"></span>
            <span className="font-label-md text-label-md text-[#610011] font-bold">
              Day {userProfile?.cycleDay || 9} • {userProfile?.currentPhase || 'Follicular'} Phase
            </span>
          </div>
          <div className="hidden xl:flex items-center gap-1.5 text-[#594140]">
            <span className="material-symbols-outlined text-[16px] text-[#610011]">bolt</span>
            <span className="font-body-sm text-body-sm font-medium">
              High Estrogen Rising • Peak Mental Clarity
            </span>
          </div>
        </div>

        {/* Quick Screen Quick-Jump Pill Bar */}
        <div className="hidden lg:flex items-center gap-1 bg-[#fff0f2] p-1 rounded-full border border-[#eed4d8]/60 shadow-inner">
          <button
            onClick={() => onNavigate('gateway')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              currentScreen === 'gateway'
                ? 'bg-[#8b001d] text-white shadow-sm'
                : 'text-[#8d4a56] hover:text-[#610011]'
            }`}
          >
            Gateway
          </button>
          <button
            onClick={() => onNavigate('doctors')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              currentScreen === 'doctors'
                ? 'bg-[#8b001d] text-white shadow-sm'
                : 'text-[#8d4a56] hover:text-[#610011]'
            }`}
          >
            Doctors
          </button>
          <button
            onClick={() => onNavigate('good-vibes')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              currentScreen === 'good-vibes'
                ? 'bg-[#8b001d] text-white shadow-sm'
                : 'text-[#8d4a56] hover:text-[#610011]'
            }`}
          >
            Good Vibes
          </button>
          <button
            onClick={() => onNavigate('period-products')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              currentScreen === 'period-products'
                ? 'bg-[#8b001d] text-white shadow-sm'
                : 'text-[#8d4a56] hover:text-[#610011]'
            }`}
          >
            Period Care
          </button>
          <button
            onClick={() => onNavigate('community')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              currentScreen === 'community'
                ? 'bg-[#8b001d] text-white shadow-sm'
                : 'text-[#8d4a56] hover:text-[#610011]'
            }`}
          >
            Community
          </button>
        </div>

        {/* Action Controls & Profile */}
        <div className="flex items-center gap-3 relative">
          {/* Audio Transcription Button (Feature: Transcribe audio with gemini-3.5-transcribe) */}
          <button
            type="button"
            onClick={() => onOpenAudioTranscriber?.('Daily Check-in')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#610011] to-[#8b001d] hover:from-[#8b001d] hover:to-[#610011] text-white text-xs font-semibold shadow-md shadow-[#610011]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            title="Transcribe audio with Gemini 3.5 Transcribe"
          >
            <span className="material-symbols-outlined text-[17px] group-hover:animate-pulse">
              speech_to_text
            </span>
            <span className="hidden sm:inline">Voice Bio-Log</span>
            {voiceNotes.length > 0 && (
              <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px] font-mono">
                {voiceNotes.length}
              </span>
            )}
          </button>

          {/* Cart Icon if items */}
          {onOpenCart && cartCount > 0 && (
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-[#594140] hover:bg-[#feaab7]/40 hover:text-[#610011] transition-colors"
              title="View Sanctuary Kit"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#8b001d] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          )}

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-2 rounded-full text-[#594140] hover:bg-[#feaab7]/40 hover:text-[#610011] transition-colors cursor-pointer"
              type="button"
              aria-label="View notifications"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#8b001d] ring-2 ring-[#fff8f7] animate-ping"></span>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#8b001d] ring-2 ring-[#fff8f7]"></span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-[#eed4d8]/80 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#eed4d8]/40">
                  <span className="font-title-md text-title-md text-[#610011]">Sanctuary Signals</span>
                  <span className="text-[10px] uppercase font-bold text-[#8d4a56] bg-[#feaab7]/30 px-2 py-0.5 rounded-full">
                    2 New
                  </span>
                </div>
                <div className="divide-y divide-[#eed4d8]/20 max-h-72 overflow-y-auto pt-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="py-2.5 px-1 hover:bg-[#fff0f2] rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#26181b] flex items-center gap-1.5">
                          {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#8b001d]"></span>}
                          {n.title}
                        </span>
                        <span className="text-[10px] text-[#8d706f]">{n.time}</span>
                      </div>
                      <p className="text-xs text-[#594140] mt-1 line-clamp-2">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 text-center border-t border-[#eed4d8]/40">
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-[#8b001d] font-semibold hover:underline"
                  >
                    Close Signals
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Badge */}
          <div
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 pl-2 cursor-pointer group"
          >
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="font-label-lg text-label-lg text-[#26181b] font-semibold group-hover:text-[#610011] transition-colors max-w-[120px] truncate">
                {displayName}
              </span>
              <span className="font-label-sm text-label-sm text-[#8d4a56]">
                {user ? 'Firebase Synced' : 'Guest Member'}
              </span>
            </div>
            <div className="relative">
              {user?.photoURL ? (
                <img
                  alt={displayName}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#feaab7] group-hover:ring-[#8b001d] transition-all shadow-sm"
                  src={user.photoURL}
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#610011] to-[#8b001d] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#feaab7] group-hover:ring-[#8b001d] transition-all shadow-sm">
                  {initialLetters || 'SP'}
                </div>
              )}
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                  user ? 'bg-emerald-500' : 'bg-amber-400'
                }`}
              ></span>
            </div>
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-2xl border border-[#eed4d8]/80 p-4 z-50 animate-in fade-in duration-150">
              <div className="flex items-center gap-3 pb-3 border-b border-[#eed4d8]/40">
                <div className="w-10 h-10 rounded-full bg-[#feaab7] flex items-center justify-center font-bold text-[#610011]">
                  {initialLetters || 'SP'}
                </div>
                <div className="overflow-hidden">
                  <div className="font-title-md text-sm text-[#26181b] truncate font-semibold">
                    {displayName}
                  </div>
                  <div className="text-[11px] text-[#8d706f] truncate">{displayEmail}</div>
                </div>
              </div>
              <div className="py-2.5 text-xs text-[#594140] flex flex-col gap-1.5">
                <div className="flex justify-between py-0.5">
                  <span>Firebase Auth:</span>
                  <span className={`font-semibold ${user ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {user ? 'Authenticated ✓' : 'Local Preview'}
                  </span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>Current Baseline:</span>
                  <span className="font-semibold text-[#610011]">
                    Cycle Day {userProfile?.cycleDay || 9}
                  </span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>Voice Transcriptions:</span>
                  <span className="font-semibold text-[#610011]">{voiceNotes.length} saved</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>Vault Encryption:</span>
                  <span className="font-semibold text-emerald-700">Firestore Rules Active</span>
                </div>
              </div>
              <div className="pt-2 border-t border-[#eed4d8]/40 flex flex-col gap-1.5">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigate('settings');
                  }}
                  className="w-full py-1.5 text-xs text-left px-2 rounded hover:bg-[#fff0f2] text-[#26181b] flex items-center justify-between"
                >
                  <span>Manage Security & Biometrics</span>
                  <span className="material-symbols-outlined text-[15px] text-[#8d4a56]">settings</span>
                </button>
                {user ? (
                  <button
                    onClick={async () => {
                      setShowProfileMenu(false);
                      await logout();
                      onNavigate('gateway');
                    }}
                    className="w-full py-1.5 text-xs text-center rounded bg-[#fff0f2] text-[#8b001d] font-semibold hover:bg-[#feaab7]/50 transition-colors"
                  >
                    Sign Out of Firebase
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onNavigate('gateway');
                    }}
                    className="w-full py-1.5 text-xs text-center rounded bg-[#610011] text-white font-semibold hover:bg-[#8b001d] transition-colors"
                  >
                    Authenticate / Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
