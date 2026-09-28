import React from 'react';
import { ScreenId } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import heroBgImage from '../assets/images/wellness_hero_bg_1790623244081.jpg';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenTranscriber?: (context?: string, title?: string, callback?: (text: string) => void) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenTranscriber }) => {
  const { userProfile, cycleEntries } = useAuth();
  const { t, language, formatNumber } = useLanguage();

  const cycleDay = userProfile?.cycleDay || 9;
  const currentPhase = userProfile?.currentPhase || (language === 'hi' ? 'उभरती ऊर्जा' : 'Rising Energy');

  // Circular dial calculation for 28-day cycle ring
  const circleRadius = 78;
  const circumference = 2 * Math.PI * circleRadius;
  const progressPercent = cycleDay / 28;
  const strokeDashoffset = circumference - progressPercent * circumference;

  return (
    <div className="relative min-h-screen flex flex-col w-full text-[#26181b] overflow-x-hidden selection:bg-[#db2777] selection:text-white bg-[#fffafb]">
      {/* AMBIENT BACKGROUND GLOWS (Slow, calm, reduced-motion friendly) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[36rem] h-[36rem] rounded-full bg-gradient-to-br from-[#ffd5df]/40 via-[#fce7f3]/30 to-transparent blur-[140px] motion-safe:animate-pulse-soft" />
        <div
          className="absolute -bottom-24 -left-20 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-[#ffe4eb]/50 via-[#fff0f3]/40 to-transparent blur-[150px] motion-safe:animate-pulse-soft"
          style={{ animationDelay: '3s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[44rem] rounded-full bg-[#fdf2f4]/40 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-16 sm:space-y-20">
        {/* =========================================================================
            HERO SECTION: REALISTIC WELLNESS BACKGROUND + TASTEFUL GLASS PANEL
            ========================================================================= */}
        <section className="relative overflow-hidden rounded-3xl min-h-[580px] lg:min-h-[640px] flex items-center shadow-[0_20px_60px_rgba(219,39,119,0.08)] border border-[#ffd5df]">
          {/* Realistic High-Quality Wellness Background Image */}
          <img
            src={heroBgImage}
            alt="Sakhi Cycle Wellness Sanctuary"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95"
            loading="eager"
          />

          {/* Soft Blush & Cream Gradient Overlays to preserve cohesion and guarantee text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-[#fff0f3]/85 to-white/70 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-white/40" />

          {/* Main Hero Content */}
          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Glass-Style Content Panel */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="lg:col-span-7 space-y-6 p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_12px_40px_rgba(131,24,67,0.06)]"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-[#db2777] text-xs font-bold uppercase tracking-wider shadow-2xs border border-[#ffd5df]"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#db2777] animate-ping" />
                  <span>{t('hero_badge')}</span>
                </motion.div>

                {/* Main Heading with Deep Plum Contrast */}
                <div className="space-y-3">
                  <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="font-display-lg text-display-lg sm:text-5xl lg:text-[52px] text-[#701a35] font-semibold tracking-tight leading-[1.15]"
                  >
                    {t('hero_title_main')} <br />
                    <span className="italic font-normal text-[#db2777]">{t('hero_title_highlight')}</span> <br />
                    {t('hero_title_end')}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="font-body-lg text-body-lg text-[#594140] max-w-xl leading-relaxed"
                  >
                    {t('hero_description')}
                  </motion.p>
                </div>

                {/* Status Indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="inline-flex flex-wrap items-center gap-3 p-2.5 rounded-2xl bg-[#fff5f7] border border-[#ffd5df] text-xs"
                >
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white text-[#db2777] font-bold shadow-2xs border border-[#ffd5df]">
                    <span className="w-2 h-2 rounded-full bg-[#db2777] animate-pulse" />
                    <span>
                      {language === 'hi' ? 'दिन' : 'Day'} {formatNumber(cycleDay)} of 28 • {currentPhase}
                    </span>
                  </div>
                  <span className="text-[#594140] font-medium hidden sm:inline">
                    {t('hero_estrogen_note')}
                  </span>
                  <span className="text-[11px] font-bold text-[#831843] bg-white px-2.5 py-0.5 rounded-full border border-[#ffd5df]">
                    {formatNumber(cycleEntries.length)} {t('hero_saved_entries')}
                  </span>
                </motion.div>

                {/* Primary Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="flex flex-wrap items-center gap-3 pt-1"
                >
                  <button
                    type="button"
                    onClick={() => onNavigate('cycle-tracker')}
                    className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#db2777] to-[#be185d] hover:from-[#be185d] hover:to-[#9d174d] text-white font-semibold text-sm shadow-md shadow-[#db2777]/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[19px]">edit_calendar</span>
                    <span>{t('btn_track_cycle')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('ai-companion')}
                    className="px-5 py-3.5 rounded-full bg-white hover:bg-[#fff0f3] text-[#701a35] border border-[#ffd5df] font-semibold text-sm shadow-2xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[19px] text-[#db2777]">auto_awesome</span>
                    <span>{t('btn_ask_sakhi')}</span>
                  </button>

                  {onOpenTranscriber && (
                    <button
                      type="button"
                      onClick={() => onOpenTranscriber('Homepage Voice Check-In', 'Daily Reflection')}
                      className="p-3.5 rounded-full bg-white hover:bg-[#fff0f3] text-[#db2777] border border-[#ffd5df] shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title={t('header_voice_checkin')}
                    >
                      <span className="material-symbols-outlined text-[20px]">mic</span>
                    </button>
                  )}
                </motion.div>
              </motion.div>

              {/* Right Column: Interactive Circular 28-Day Cycle Wheel */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.75, ease: 'easeOut' }}
                  className="relative group flex items-center justify-center"
                >
                  {/* Subtle Glowing Outer Halo */}
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#f472b6]/20 via-[#db2777]/20 to-[#c084fc]/20 blur-2xl opacity-90 group-hover:opacity-100 transition duration-700" />

                  {/* Circular Dial Card */}
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-white/95 backdrop-blur-md p-5 shadow-xl border-2 border-[#ffd5df] flex flex-col items-center justify-center overflow-hidden">
                    {/* SVG Circular Progress Track */}
                    <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 200 200">
                      <circle
                        cx="100"
                        cy="100"
                        r={circleRadius}
                        stroke="#fce7f3"
                        strokeWidth="10"
                        fill="none"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r={circleRadius}
                        stroke="url(#heroDialGradient)"
                        strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="none"
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient id="heroDialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f472b6" />
                          <stop offset="60%" stopColor="#db2777" />
                          <stop offset="100%" stopColor="#9333ea" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Centered Cycle Dial Metrics */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-4">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#db2777]">
                        {t('hero_cycle_indicator')}
                      </span>
                      <span className="text-4xl sm:text-5xl font-extrabold text-[#701a35] tracking-tight my-0.5">
                        {language === 'hi' ? 'दिन' : 'Day'} {formatNumber(cycleDay)}
                      </span>
                      <span className="text-xs font-semibold text-[#be185d]">
                        {currentPhase}
                      </span>
                      <span className="text-[11px] text-[#594140] mt-1">
                        {formatNumber(28 - cycleDay)} {t('hero_days_until_period')}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Subtitle / Disclaimer Link */}
                <div className="mt-4 text-center">
                  <div className="font-headline-sm text-headline-sm font-semibold text-[#701a35]">
                    {t('brand_title')}
                  </div>
                  <div className="text-[10px] text-[#831843] uppercase tracking-widest font-bold">
                    {t('brand_tagline')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ONE-TAP DAILY FEELINGS CHECK-IN STRIP
            ========================================================================= */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-7 rounded-3xl bg-white border border-[#ffd5df] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#db2777] flex items-center justify-center md:justify-start gap-1.5">
              <span className="material-symbols-outlined text-[16px]">mood</span>
              <span>{t('checkin_badge')}</span>
            </span>
            <h3 className="font-title-lg text-title-lg text-[#701a35] font-semibold">
              {t('checkin_title')}
            </h3>
            <p className="text-xs text-[#594140]">
              {t('checkin_desc')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: language === 'hi' ? '🌸 शांत और रिलैक्स्ड' : '🌸 Calm & Relaxed' },
              { label: language === 'hi' ? '✨ चमकदार ऊर्जा' : '✨ Radiant & Energized' },
              { label: language === 'hi' ? '😌 सुकून भरा' : '😌 Peaceful' },
              { label: language === 'hi' ? '😴 आराम की ज़रूरत' : '😴 Need Rest' },
              { label: language === 'hi' ? '⚡ सक्रिय और मज़बूत' : '⚡ Active & Strong' },
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => onNavigate('cycle-tracker')}
                className="px-4 py-2 rounded-full bg-[#fff5f7] hover:bg-[#ffe5ec] text-[#701a35] hover:text-[#db2777] border border-[#ffd5df] text-xs font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
              >
                {chip.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onNavigate('cycle-tracker')}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#db2777] to-[#be185d] text-white text-xs font-semibold hover:from-[#be185d] hover:to-[#9d174d] transition-all cursor-pointer shadow-xs"
            >
              + {t('btn_record_feelings')}
            </button>
          </div>
        </motion.section>

        {/* =========================================================================
            FLO-INSPIRED PRODUCT TOUR FLOW: STEP-BY-STEP CYCLE STORYTELLING
            ========================================================================= */}
        <section className="space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#db2777] font-bold">
              {t('tour_title')}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-[#701a35] font-semibold">
              {t('tour_subtitle')}
            </h2>
            <p className="font-body-md text-body-md text-[#594140]">
              {language === 'hi'
                ? 'सरल, सुंदर और वैज्ञानिक जानकारी के साथ अपने चक्र के हर दिन को सशक्त बनाएं।'
                : 'Empowering your daily wellness with clear science, gentle design, and caring support.'}
            </p>
          </div>

          {/* TOUR STEP 1: SMART CYCLE TRACKING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl bg-white border border-[#ffd5df] shadow-sm"
          >
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3 py-1 rounded-full bg-[#fff0f3] text-[#db2777] text-xs font-bold border border-[#ffd5df]">
                {t('tour_step1_badge')}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#701a35] font-semibold">
                {t('tour_step1_title')}
              </h3>
              <p className="text-sm text-[#594140] leading-relaxed">
                {t('tour_step1_desc')}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#594140] pt-1">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step1_bullet1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step1_bullet2')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step1_bullet3')}</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('cycle-tracker')}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#db2777] hover:bg-[#be185d] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>{t('tour_step1_cta')}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* UI Preview Card: 4 Cycle Phase Cards */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-[#fffafb] border border-[#ffd5df] grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white border border-[#ffd5df] space-y-1 shadow-2xs">
                <span className="text-[10px] font-bold text-[#be185d] uppercase">Days 1 - 5</span>
                <div className="font-semibold text-xs text-[#701a35]">Period Phase</div>
                <p className="text-[11px] text-[#594140]">Renewal, iron nourishment, gentle rest</p>
              </div>
              <div className="p-4 rounded-xl bg-[#fff0f3] border border-[#ffd5df] space-y-1 shadow-2xs">
                <span className="text-[10px] font-bold text-[#db2777] uppercase">Days 6 - 13</span>
                <div className="font-semibold text-xs text-[#701a35]">Rising Energy</div>
                <p className="text-[11px] text-[#594140]">Estrogen surge, sharp focus & stamina</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#ffd5df] space-y-1 shadow-2xs">
                <span className="text-[10px] font-bold text-[#e11d48] uppercase">Days 14 - 16</span>
                <div className="font-semibold text-xs text-[#701a35]">Ovulation Window</div>
                <p className="text-[11px] text-[#594140]">Peak confidence & natural vitality</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#ffd5df] space-y-1 shadow-2xs">
                <span className="text-[10px] font-bold text-[#9d174d] uppercase">Days 17 - 28</span>
                <div className="font-semibold text-xs text-[#701a35]">Gentle Nurture</div>
                <p className="text-[11px] text-[#594140]">Progesterone rise, calm teas & comfort</p>
              </div>
            </div>
          </motion.div>

          {/* TOUR STEP 2: DAILY QUICK-SELECT LOGGING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl bg-[#fffafb] border border-[#ffd5df] shadow-sm"
          >
            {/* UI Preview Card: Chips interactive demonstration */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-white border border-[#ffd5df] space-y-4 order-2 lg:order-1 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#ffe4eb]">
                <span className="text-xs font-bold text-[#701a35]">Interactive Daily Journal</span>
                <span className="text-[10px] text-[#db2777] font-semibold bg-[#fff0f3] px-2 py-0.5 rounded-full">
                  1-Tap Select
                </span>
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-[#831843]">Quick Symptoms:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Clear Glowing Skin', 'Mild Cramps', 'Energetic', 'Tender Breasts', 'Craving Sweet'].map((chip) => (
                    <span
                      key={chip}
                      className="px-2.5 py-1 rounded-full bg-[#fff5f7] border border-[#ffd5df] text-[11px] text-[#701a35] font-medium"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#fff0f3] border border-[#ffd5df] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#db2777]">mic</span>
                  <span className="text-xs text-[#701a35]">Voice Journal with Gemini Transcribe</span>
                </div>
                <span className="text-[10px] font-bold text-[#db2777]">Instant AI Text</span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <span className="px-3 py-1 rounded-full bg-[#fff0f3] text-[#db2777] text-xs font-bold border border-[#ffd5df]">
                {t('tour_step2_badge')}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#701a35] font-semibold">
                {t('tour_step2_title')}
              </h3>
              <p className="text-sm text-[#594140] leading-relaxed">
                {t('tour_step2_desc')}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#594140] pt-1">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step2_bullet1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step2_bullet2')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step2_bullet3')}</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('cycle-tracker')}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#db2777] hover:bg-[#be185d] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>{t('tour_step2_cta')}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </motion.div>

          {/* TOUR STEP 3: AI PREDICTIVE TREND LINE & FORECAST */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#fbf4ff] via-[#fff5f8] to-[#ffffff] border border-[#e9d5ff] shadow-sm"
          >
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-[#9333ea] text-xs font-bold border border-purple-200">
                {t('tour_step3_badge')}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#701a35] font-semibold">
                {t('tour_step3_title')}
              </h3>
              <p className="text-sm text-[#594140] leading-relaxed">
                {t('tour_step3_desc')}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#594140] pt-1">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#9333ea] text-[18px]">insights</span>
                  <span>{t('tour_step3_bullet1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#9333ea] text-[18px]">insights</span>
                  <span>{t('tour_step3_bullet2')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#9333ea] text-[18px]">insights</span>
                  <span>{t('tour_step3_bullet3')}</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('cycle-tracker')}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#9333ea] hover:bg-[#7e22ce] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>{t('tour_step3_cta')}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* UI Preview Card: Glowing Forecast Demonstration */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-white border border-[#e9d5ff] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-purple-100">
                <span className="text-xs font-bold text-[#701a35]">Forecast Corridor Simulation</span>
                <span className="text-[10px] font-bold text-[#9333ea] bg-purple-50 px-2 py-0.5 rounded-full">
                  🔮 AI Trend Line
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-[#9333ea]">
                  <span>Expected Comfort on Days 14–16:</span>
                  <span>88% High Vitality</span>
                </div>
                <p className="text-[11px] text-purple-950">
                  Estrogen surge predicted. Great time for social activities, important meetings, and creative work!
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#fff0f3] border border-[#ffd5df] text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-[#db2777]">
                  <span>Proactive Phase Food Prep:</span>
                  <span>Pumpkin & Flaxseeds</span>
                </div>
                <p className="text-[11px] text-[#594140]">
                  Supports smooth estrogen clearance and keeps pelvic comfort high.
                </p>
              </div>
            </div>
          </motion.div>

          {/* TOUR STEP 4: LIFESTYLE & PHASE NUTRITION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl bg-white border border-[#ffd5df] shadow-sm"
          >
            {/* UI Preview Card: Seed cycling & Nutrition */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-[#fffafb] border border-[#ffd5df] space-y-3 order-2 lg:order-1 shadow-2xs">
              <div className="text-xs font-bold text-[#701a35] pb-2 border-b border-[#ffe4eb]">
                Phase-Matched Seed Cycling Protocol
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#ffd5df]">
                  <span className="font-bold text-[#db2777]">Days 1 - 14</span>
                  <div className="text-[11px] text-[#701a35] font-semibold mt-1">Pumpkin & Flax</div>
                  <p className="text-[10px] text-[#594140] mt-0.5">Zinc & lignans for estrogen balance</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#ffd5df]">
                  <span className="font-bold text-[#be185d]">Days 15 - 28</span>
                  <div className="text-[11px] text-[#701a35] font-semibold mt-1">Sunflower & Sesame</div>
                  <p className="text-[10px] text-[#594140] mt-0.5">Selenium & Vitamin E for progesterone</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <span className="px-3 py-1 rounded-full bg-[#fff0f3] text-[#db2777] text-xs font-bold border border-[#ffd5df]">
                {t('tour_step4_badge')}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#701a35] font-semibold">
                {t('tour_step4_title')}
              </h3>
              <p className="text-sm text-[#594140] leading-relaxed">
                {t('tour_step4_desc')}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#594140] pt-1">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step4_bullet1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step4_bullet2')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step4_bullet3')}</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('lifestyle-nutrition')}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#db2777] hover:bg-[#be185d] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>{t('tour_step4_cta')}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </motion.div>

          {/* TOUR STEP 5: SAKHI AI COMPANION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl bg-[#fff5f7] border border-[#ffd5df] shadow-sm"
          >
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3 py-1 rounded-full bg-white text-[#db2777] text-xs font-bold border border-[#ffd5df]">
                {t('tour_step5_badge')}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#701a35] font-semibold">
                {t('tour_step5_title')}
              </h3>
              <p className="text-sm text-[#594140] leading-relaxed">
                {t('tour_step5_desc')}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#594140] pt-1">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step5_bullet1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step5_bullet2')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step5_bullet3')}</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('ai-companion')}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#db2777] hover:bg-[#be185d] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>{t('tour_step5_cta')}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* UI Preview Card: Sakhi AI Chat Demo */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-white border border-[#ffd5df] space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 pb-2 border-b border-[#ffe4eb]">
                <div className="w-7 h-7 rounded-full bg-[#db2777] text-white flex items-center justify-center text-xs font-bold">
                  🌸
                </div>
                <span className="text-xs font-bold text-[#701a35]">Sakhi AI Companion Live Demo</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fff5f7] border border-[#ffd5df] text-xs text-[#594140] leading-relaxed">
                "Hello friend! 🌸 On Day {formatNumber(cycleDay)}, your body is naturally building estrogen. Try sipping warm peppermint tea and staying hydrated. What else are you feeling today?"
              </div>
              <div className="flex gap-2 text-[10px]">
                <span className="px-2.5 py-1 rounded-full bg-white border border-[#ffd5df] text-[#701a35]">
                  How to ease bloating?
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white border border-[#ffd5df] text-[#701a35]">
                  Best tea for cramps?
                </span>
              </div>
            </div>
          </motion.div>

          {/* TOUR STEP 6: TOTAL PRIVACY & SECURE VAULT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl bg-white border border-[#ffd5df] shadow-sm"
          >
            {/* UI Preview Card: Data Privacy Control */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-[#fffafb] border border-[#ffd5df] space-y-3 order-2 lg:order-1 shadow-2xs">
              <div className="flex items-center gap-2 pb-2 border-b border-[#ffe4eb] text-xs font-bold text-[#701a35]">
                <span className="material-symbols-outlined text-[#db2777] text-[18px]">verified_user</span>
                <span>User Data Sovereign Rights</span>
              </div>
              <p className="text-xs text-[#594140]">
                All cycle entries are stored in your private database. You can export a JSON backup or purge your records at any time.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                  ✓ Encrypted Storage
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[#701a35] border border-[#ffd5df] text-[11px] font-semibold">
                  Zero Data Selling
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <span className="px-3 py-1 rounded-full bg-[#fff0f3] text-[#db2777] text-xs font-bold border border-[#ffd5df]">
                {t('tour_step6_badge')}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#701a35] font-semibold">
                {t('tour_step6_title')}
              </h3>
              <p className="text-sm text-[#594140] leading-relaxed">
                {t('tour_step6_desc')}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#594140] pt-1">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step6_bullet1')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step6_bullet2')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#db2777] text-[18px]">check_circle</span>
                  <span>{t('tour_step6_bullet3')}</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('settings')}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#db2777] hover:bg-[#be185d] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>{t('tour_step6_cta')}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* =========================================================================
            TRANSPARENT DISCLAIMERS & PRIVACY FOOTER CARD
            ========================================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#fff5f7] border border-[#ffd5df] space-y-3 text-xs text-[#594140]">
          <div className="flex items-center gap-2 text-[#701a35] font-bold text-xs">
            <span className="material-symbols-outlined text-[18px] text-[#db2777]">info</span>
            <span>Important Medical & Privacy Disclaimers</span>
          </div>
          <p className="leading-relaxed">
            {t('disclaimer_estimates')}
          </p>
          <p className="leading-relaxed border-t border-[#ffe4eb] pt-2">
            {t('disclaimer_privacy')}
          </p>
        </section>
      </div>
    </div>
  );
};
