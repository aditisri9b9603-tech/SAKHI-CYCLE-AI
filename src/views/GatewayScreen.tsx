import React, { useState, useRef } from 'react';
import { ScreenId } from '../types';
import { GATEWAY_TESTIMONIALS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface GatewayScreenProps {
  onEnterSanctuary: () => void;
  onNavigateDirect?: (screen: ScreenId) => void;
}

export const GatewayScreen: React.FC<GatewayScreenProps> = ({ onEnterSanctuary, onNavigateDirect }) => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 200, y: 200 });

  const [formData, setFormData] = useState({
    name: 'Devi Priya',
    email: 'devi.priya@sakhi.bio',
    password: 'SakhiCycle2026!',
  });

  const stageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      setSpotlightPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      onEnterSanctuary();
    } catch (err: any) {
      console.warn('Google sign-in notice:', err?.message || err);
      setAuthError(err?.message || 'Google sign-in could not be completed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmitting(true);
    try {
      if (isRegisterMode) {
        await registerWithEmail(formData.email, formData.password, formData.name, 'balance');
      } else {
        await loginWithEmail(formData.email, formData.password);
      }
      onEnterSanctuary();
    } catch (err: any) {
      console.warn('Auth notice:', err?.message || err);
      // If user not found during login or invalid credential, provide clear message
      setAuthError(err?.message?.replace('Firebase: ', '') || 'Authentication error. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextQuote = () => {
    setCurrentQuoteIdx((prev) => (prev + 1) % GATEWAY_TESTIMONIALS.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIdx((prev) => (prev - 1 + GATEWAY_TESTIMONIALS.length) % GATEWAY_TESTIMONIALS.length);
  };

  const activeQuote = GATEWAY_TESTIMONIALS[currentQuoteIdx];

  return (
    <div className="relative min-h-screen bg-[#fff5f7] text-[#26181b] overflow-x-hidden flex flex-col justify-between selection:bg-[#db2777] selection:text-white">
      {/* Background Soft Pink Orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10rem] -right-[8rem] w-[35rem] h-[35rem] rounded-full bg-[#fce7f3]/40 blur-[130px] animate-pulse-soft"></div>
        <div className="absolute -bottom-[10rem] -left-[8rem] w-[35rem] h-[35rem] rounded-full bg-[#ffe4eb]/50 blur-[140px] animate-pulse-soft"></div>
        <div className="absolute top-1/2 -right-24 w-[380px] h-[380px] rounded-full bg-[#fff0f3]/60 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto py-6 px-4 sm:px-8 lg:px-12 flex-1 flex flex-col">
        {/* Top Header */}
        <header className="w-full flex items-center justify-between py-3 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden p-1 shadow-md bg-white border-2 border-[#ffd5df] transition-transform hover:scale-105 duration-300">
              <img
                alt="Sakhi Cycle - Understand • Track • Thrive"
                className="w-full h-full object-contain rounded-xl"
                src="/sakhi_logo.jpg"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-[#831843] tracking-tight font-semibold flex items-center gap-2">
                Sakhi Cycle
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#fff0f3] text-[#db2777] border border-[#ffd5df]">
                  Sanctuary
                </span>
              </span>
              <span className="text-[10px] font-bold text-[#db2777] tracking-widest uppercase">
                Understand • Track • Thrive
              </span>
            </div>
          </div>

          {/* Right Header Badges */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md shadow-xs border border-[#ffd5df]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-[#594140] font-medium">
                Private & Secure
              </span>
            </div>

            {/* Direct preview bypass button */}
            <button
              type="button"
              onClick={onEnterSanctuary}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#db2777] to-[#be185d] text-white text-xs font-semibold hover:from-[#be185d] hover:to-[#9d174d] shadow-md shadow-[#db2777]/25 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore as Guest</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>
        </header>

        {/* Main Split Suite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch flex-1">
          {/* LEFT PANEL: Cursor-Reactive Showcase (7 Cols) */}
          <section
            ref={stageRef}
            onMouseMove={handleMouseMove}
            className="lg:col-span-7 relative flex flex-col justify-between p-6 sm:p-10 rounded-3xl bg-white/70 backdrop-blur-2xl shadow-xl border border-[#ffd5df] overflow-hidden group transition-all duration-500"
          >
            {/* Interactive Spotlight Orb */}
            <div
              className="pointer-events-none absolute w-96 h-96 rounded-full bg-radial from-[#f472b6]/20 via-[#fce7f3]/30 to-transparent blur-2xl transition-all duration-150 ease-out -z-0"
              style={{
                left: `${spotlightPos.x - 192}px`,
                top: `${spotlightPos.y - 192}px`,
              }}
            />

            {/* Headline & Welcoming Statement */}
            <div className="relative z-10 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-[#fff0f3] text-[#db2777] border border-[#ffd5df]">
                <span className="material-symbols-outlined text-[16px]">favorite</span>
                <span className="text-[10px] font-bold tracking-widest uppercase">
                  Simple & Gentle Women's Health
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg text-[#831843] tracking-tight leading-[1.08] max-w-xl">
                Feel in tune with your <span className="italic font-normal text-[#db2777]">natural rhythm.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-[#594140] max-w-lg leading-relaxed">
                Log symptoms in seconds, see your hormones mapped on a friendly 28-day chart, and receive warm answers from doctors and your AI friend.
              </p>
            </div>

            {/* 3 Simple Value Cards */}
            <div className="relative z-10 my-8 flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-white/80 shadow-xs border border-[#ffd5df] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#fff0f3] text-[#db2777] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">edit_calendar</span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-[#831843] font-semibold">
                    1-Tap Daily Symptom Journaling
                  </h4>
                  <p className="text-xs text-[#594140]">
                    Quick-select your mood, flow, energy, and body signs with no medical jargon.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 shadow-xs border border-[#ffd5df] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#fff0f3] text-[#db2777] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">insights</span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-[#831843] font-semibold">
                    28-Day Hormonal Chart
                  </h4>
                  <p className="text-xs text-[#594140]">
                    See how estrogen and progesterone naturally connect to your vitality and comfort.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 shadow-xs border border-[#ffd5df] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#fff0f3] text-[#db2777] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-[#831843] font-semibold">
                    Warm AI & Doctor Support
                  </h4>
                  <p className="text-xs text-[#594140]">
                    Ask real-time questions, talk by voice, and get comforting guidance anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="relative z-10 pt-4 flex flex-col gap-2 border-t border-[#ffd5df]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#db2777] font-bold">
                  Words from Our Community
                </span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={prevQuote}
                    className="w-7 h-7 rounded-full bg-white hover:bg-[#fff0f3] flex items-center justify-center text-[#831843] shadow-xs transition-colors cursor-pointer border border-[#ffd5df]"
                    aria-label="Previous quote"
                  >
                    <span className="material-symbols-outlined text-[15px]">arrow_back</span>
                  </button>
                  <button
                    type="button"
                    onClick={nextQuote}
                    className="w-7 h-7 rounded-full bg-white hover:bg-[#fff0f3] flex items-center justify-center text-[#831843] shadow-xs transition-colors cursor-pointer border border-[#ffd5df]"
                    aria-label="Next quote"
                  >
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#831843] italic">
                “{activeQuote.quote}”
              </p>
              <span className="text-[11px] text-[#594140] font-medium">
                — {activeQuote.author}
              </span>
            </div>
          </section>

          {/* RIGHT PANEL: Glass Authentication Console (5 Cols) */}
          <section className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative w-full rounded-3xl bg-white/90 backdrop-blur-2xl p-6 sm:p-8 md:p-9 shadow-xl border border-[#ffd5df] transition-all">
              {/* Top Mode Switcher */}
              <div className="w-full p-1 rounded-full bg-[#fff0f3] border border-[#ffd5df] flex items-center mb-6">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    !isRegisterMode
                      ? 'bg-[#db2777] text-white shadow-xs'
                      : 'text-[#831843] hover:text-[#db2777]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isRegisterMode
                      ? 'bg-[#db2777] text-white shadow-xs'
                      : 'text-[#831843] hover:text-[#db2777]'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Form Heading */}
              <div className="mb-5">
                <h2 className="font-headline-sm text-headline-sm text-[#831843] font-semibold">
                  {isRegisterMode ? 'Join Sakhi Cycle' : 'Welcome Back'}
                </h2>
                <p className="text-xs text-[#594140] mt-0.5">
                  {isRegisterMode
                    ? 'Create your free private cycle space in seconds.'
                    : 'Sign in to sync your symptoms, journal logs, and doctor notes.'}
                </p>
              </div>

              {/* 1-Click Guest Access Card */}
              <button
                type="button"
                onClick={onEnterSanctuary}
                className="w-full mb-5 p-3.5 rounded-2xl bg-[#fff5f7] hover:bg-[#ffe5ec] transition-all cursor-pointer group flex items-center justify-between border border-[#ffd5df]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center text-[#db2777] group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">flash_on</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#831843]">
                      Instant Guest Demo
                    </div>
                    <div className="text-[10px] text-[#db2777]">
                      Explore all features without signing in
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#db2777] text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="w-full h-px bg-[#ffd5df]"></div>
                <span className="absolute bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-[#db2777]">
                  Or use account
                </span>
              </div>

              {/* Credentials Form */}
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5">
                {isRegisterMode && (
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#831843]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff5f7] text-[#26181b] text-xs focus:outline-none focus:bg-white border border-[#ffd5df] focus:border-[#db2777] transition-all"
                      placeholder="e.g. Devi Priya"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#831843]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff5f7] text-[#26181b] text-xs focus:outline-none focus:bg-white border border-[#ffd5df] focus:border-[#db2777] transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-[#831843]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Password reset instructions will be sent to your email.')}
                      className="text-[11px] text-[#db2777] hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#fff5f7] text-[#26181b] text-xs focus:outline-none focus:bg-white border border-[#ffd5df] focus:border-[#db2777] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#831843] hover:text-[#db2777] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-[#db2777] to-[#be185d] hover:from-[#be185d] hover:to-[#9d174d] text-white font-semibold text-xs shadow-md shadow-[#db2777]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>{isRegisterMode ? 'Create Account' : 'Sign In'}</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Google Sign-in */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-[#fff5f7] text-[#831843] border border-[#ffd5df] text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
