import React, { useState, useRef } from 'react';
import { ScreenId } from '../types';
import { GATEWAY_TESTIMONIALS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface GatewayScreenProps {
  onEnterSanctuary: () => void;
  onNavigateDirect?: (screen: ScreenId) => void;
}

export const GatewayScreen: React.FC<GatewayScreenProps> = ({ onEnterSanctuary, onNavigateDirect }) => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, user } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [activeObjective, setActiveObjective] = useState<'balance' | 'fertility'>('balance');
  const [showPassword, setShowPassword] = useState(false);
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [passkeyStatus, setPasskeyStatus] = useState<string | null>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 200, y: 200 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(0);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: 'Genevieve Thorne',
    email: 'genevieve.t@sanctuary.bio',
    password: 'LutealVitality2026!'
  });

  const stageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      setSpotlightPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handlePasskeyClick = () => {
    setPasskeyStatus('Scanning Biometrics...');
    setTimeout(() => {
      setPasskeyStatus('Touch ID Authenticated ✓');
      setTimeout(() => {
        onEnterSanctuary();
      }, 700);
    }, 900);
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      onEnterSanctuary();
    } catch (err: any) {
      console.error('Google sign-in error:', err);
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
        await registerWithEmail(formData.email, formData.password, formData.name, activeObjective);
      } else {
        await loginWithEmail(formData.email, formData.password);
      }
      onEnterSanctuary();
    } catch (err: any) {
      console.error('Auth error:', err);
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
    <div className="relative min-h-screen bg-[#fff8f7] text-[#26181b] overflow-x-hidden flex flex-col justify-between selection:bg-[#610011] selection:text-white">
      {/* Background Ambient Glow Orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10rem] -right-[8rem] w-[35rem] h-[35rem] rounded-full bg-[#feaab7]/30 blur-[130px]"></div>
        <div className="absolute -bottom-[10rem] -left-[8rem] w-[35rem] h-[35rem] rounded-full bg-[#ffdad9]/30 blur-[140px]"></div>
        <div className="absolute top-1/2 -right-24 w-[380px] h-[380px] rounded-full bg-[#ffe088]/15 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto py-6 px-4 sm:px-8 lg:px-12 flex-1 flex flex-col">
        {/* Top Header */}
        <header className="w-full flex items-center justify-between py-3 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden p-1 shadow-md bg-white/80 backdrop-blur-md transition-transform hover:scale-105 duration-300">
              <img
                alt="Sakhi Cycle Emblem"
                className="w-full h-full object-cover rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDInec3b4ED1Vb71DOnBV_WKa6AZSe26baxSuX44Q_ZsM7WwYOUUiIrLmNKjk5Ak8fBKVV_jasOD93EgiUSn6O7zZWUzWdxBtUvukcpUtnJiEZp567_gv98PwhZBMJfNe3oaLJRQnLDv-_PFJdutvmG7-Je00Z_3QMrv3wyTEQJbKlu9dbd3q8zRNnNVPqDUH8jR_zPei0OGu1ouBbR4dFhXfaeEpNQVS28zzydn_aoz4qRmmw91LrDJpChHpsYqr55bw"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-[#610011] tracking-tight font-semibold flex items-center gap-2">
                Sakhi Cycle
                <span className="font-label-sm text-label-sm uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#610011]/10 text-[#610011]">
                  Sanctuary
                </span>
              </span>
              <span className="font-label-sm text-label-sm text-[#8d4a56] tracking-widest uppercase">
                Endocrine Longevity · Infradian Bio-Intelligence
              </span>
            </div>
          </div>

          {/* Right Header Badges */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md shadow-sm border border-[#eed4d8]/40">
              <span className="material-symbols-outlined text-[18px] text-[#610011]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="font-label-md text-label-md text-[#594140] font-medium">
                Stanford & Oxford Bio-Advisory
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md shadow-sm border border-[#eed4d8]/40">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 -ml-4"></span>
              <span className="font-label-md text-label-md text-[#594140] font-medium">
                HIPAA Zero-Knowledge Protected
              </span>
            </div>

            {/* Direct preview bypass button */}
            <button
              onClick={onEnterSanctuary}
              className="px-4 py-1.5 rounded-full bg-[#8b001d] text-white text-xs font-semibold hover:bg-[#610011] shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Explore Sanctuary</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </header>

        {/* Main Split Suite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch flex-1">
          {/* LEFT PANEL: Cursor-Reactive Showcase (7 Cols) */}
          <section
            ref={stageRef}
            onMouseMove={handleMouseMove}
            className="lg:col-span-7 relative flex flex-col justify-between p-6 sm:p-10 rounded-3xl bg-white/60 backdrop-blur-2xl shadow-xl border border-[#eed4d8]/60 overflow-hidden cursor-crosshair group transition-all duration-500"
          >
            {/* Interactive Spotlight Orb */}
            <div
              className="pointer-events-none absolute w-96 h-96 rounded-full bg-radial from-[#8b001d]/15 via-[#feaab7]/20 to-transparent blur-2xl transition-all duration-150 ease-out -z-0"
              style={{
                left: `${spotlightPos.x - 192}px`,
                top: `${spotlightPos.y - 192}px`
              }}
            />

            {/* Watermark Logo */}
            <div className="absolute -bottom-16 -right-16 w-80 h-80 opacity-10 pointer-events-none select-none -z-10 mix-blend-multiply">
              <img
                alt="Sakhi Watermark"
                className="w-full h-full object-contain filter grayscale contrast-125"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFqnouwW7nraNPoH1DdviiYA1B642cUTdLo8nBU0I9e6-eh_XoBKQxuD7fh8x_rOvJluRBUh22zddFW_gAAalo7cQ2N5AuSXXz4Vl6VBHMjIu-rTqpr_f6B001gNPjN1QJyR3N41pit4Jisf9p_eS1Gq_NXA06EP84ydNWzap5ksVpeRuRpOUp_oWnL0BTsmeLP1-ITggp_7g30hYEF_T4jNNXfIfDPp5QCCiVTDnpqGwY5pybu_ECYoVtCxwGuDM5uQ"
              />
            </div>

            {/* Headline & Editorial Statement */}
            <div className="relative z-10 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 w-fit rounded-full bg-[#610011]/10 text-[#610011]">
                <span className="material-symbols-outlined text-[16px]">all_inclusive</span>
                <span className="font-label-sm text-label-sm font-bold tracking-widest uppercase">
                  The Sovereign Cellular Gateway
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg text-[#610011] tracking-tight leading-[1.08] max-w-xl">
                Harmonize with your <span className="italic font-normal text-[#8d4a56]">infradian</span> vitality.
              </h1>
              <p className="font-body-lg text-body-lg text-[#594140] max-w-lg leading-relaxed">
                The world’s pinnacle endocrine sanctuary. Medical-grade biomarker telemetry calibrated with luxury somatic restorative science.
              </p>
            </div>

            {/* Telemetry Nodes Bento */}
            <div className="relative z-10 my-8 flex flex-col gap-3">
              {/* Node 1: Infradian Rhythm AI */}
              <div
                onMouseEnter={() => setHoveredCard(0)}
                className={`p-4 rounded-2xl transition-all duration-300 border ${
                  hoveredCard === 0
                    ? 'bg-white/95 shadow-md scale-[1.01] border-[#feaab7]'
                    : 'bg-white/60 shadow-sm border-transparent'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#610011] text-white flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[20px]">ecg_heart</span>
                    </div>
                    <div>
                      <h4 className="font-title-md text-title-md text-[#26181b] font-semibold flex items-center gap-2">
                        Infradian Rhythm AI
                        <span className="font-label-sm text-label-sm text-[#610011] uppercase font-bold tracking-wider bg-[#610011]/10 px-2 py-0.5 rounded-full">
                          99.4% Precision
                        </span>
                      </h4>
                      <p className="font-body-md text-body-md text-[#594140] mt-0.5">
                        Real-time luteal & follicular hormone forecasting engine.
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="font-label-sm text-label-sm text-[#8d4a56] font-mono tracking-wider">LH/E2 RATIO</span>
                    <span className="font-headline-sm text-headline-sm text-[#610011] font-bold">1:1.08</span>
                  </div>
                </div>

                {/* Micro Biomarker Sparkline SVG */}
                <div className="mt-3 pt-3 flex items-center justify-between text-[#8d4a56] border-t border-[#eed4d8]/40">
                  <div className="flex items-center gap-2 font-label-md text-label-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8b001d] animate-ping"></span>
                    <span>Predictive Ovulatory Surge Window: 32 hrs</span>
                  </div>
                  <svg className="w-32 h-6 text-[#610011]" fill="none" viewBox="0 0 120 24">
                    <path
                      d="M0 18 Q 20 22, 40 14 T 70 8 T 95 3 T 120 16"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                    <circle cx="95" cy="3" fill="#8b001d" r="3" />
                  </svg>
                </div>
              </div>

              {/* Node 2: Cellular Bio-Sync */}
              <div
                onMouseEnter={() => setHoveredCard(1)}
                className={`p-4 rounded-2xl transition-all duration-300 border ${
                  hoveredCard === 1
                    ? 'bg-white/95 shadow-md scale-[1.01] border-[#feaab7]'
                    : 'bg-white/60 shadow-sm border-transparent'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#feaab7] text-[#610011] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">science</span>
                    </div>
                    <div>
                      <h4 className="font-title-md text-title-md text-[#26181b] font-semibold flex items-center gap-2">
                        Cellular Bio-Sync
                        <span className="font-label-sm text-label-sm text-[#8d4a56] uppercase font-bold tracking-wider bg-[#8d4a56]/10 px-2 py-0.5 rounded-full">
                          OB-GYN Curated
                        </span>
                      </h4>
                      <p className="font-body-md text-body-md text-[#594140] mt-0.5">
                        Phase-matched micronutrient protocols & bio-identical replenishment.
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="font-label-sm text-label-sm text-[#8d4a56] font-mono tracking-wider">MAGNESIUM GLYCINATE</span>
                    <span className="font-headline-sm text-headline-sm text-[#610011] font-bold">420mg</span>
                  </div>
                </div>
              </div>

              {/* Node 3: Somatic Sanctuary */}
              <div
                onMouseEnter={() => setHoveredCard(2)}
                className={`p-4 rounded-2xl transition-all duration-300 border ${
                  hoveredCard === 2
                    ? 'bg-white/95 shadow-md scale-[1.01] border-[#feaab7]'
                    : 'bg-white/60 shadow-sm border-transparent'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#fce2e6] text-[#610011] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">spatial_audio_off</span>
                    </div>
                    <div>
                      <h4 className="font-title-md text-title-md text-[#26181b] font-semibold flex items-center gap-2">
                        Somatic Sanctuary
                        <span className="font-label-sm text-label-sm text-[#610011] uppercase font-bold tracking-wider bg-[#ffe088]/40 px-2 py-0.5 rounded-full">
                          432 Hz Solfeggio
                        </span>
                      </h4>
                      <p className="font-body-md text-body-md text-[#594140] mt-0.5">
                        Vagus nerve parasympathetic activation & deep uterine relaxation soundscapes.
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="font-label-sm text-label-sm text-[#8d4a56] font-mono tracking-wider">HRV COHERENCE</span>
                    <span className="font-headline-sm text-headline-sm text-[#610011] font-bold">+38%</span>
                  </div>
                </div>
              </div>

              {/* Node 4: HIPAA Medical Vault */}
              <div
                onMouseEnter={() => setHoveredCard(3)}
                className={`p-4 rounded-2xl transition-all duration-300 border ${
                  hoveredCard === 3
                    ? 'bg-white/95 shadow-md scale-[1.01] border-[#feaab7]'
                    : 'bg-white/60 shadow-sm border-transparent'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#8b001d] text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">lock_clock</span>
                    </div>
                    <div>
                      <h4 className="font-title-md text-title-md text-[#26181b] font-semibold flex items-center gap-2">
                        Clinical PDF Telemetry
                        <span className="font-label-sm text-label-sm text-[#610011] uppercase font-bold tracking-wider bg-[#610011]/10 px-2 py-0.5 rounded-full">
                          Zero-Knowledge
                        </span>
                      </h4>
                      <p className="font-body-md text-body-md text-[#594140] mt-0.5">
                        Export physician-ready PDF dossiers formatted for your gynecologist.
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="font-label-sm text-label-sm text-[#8d4a56] font-mono tracking-wider">ENCRYPTION</span>
                    <span className="font-headline-sm text-headline-sm text-[#610011] font-bold">AES-256</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Carousel */}
            <div className="relative z-10 pt-4 flex flex-col gap-2 border-t border-[#eed4d8]/40">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#8d4a56] font-semibold">
                  Endorsements from Clinical Medicine
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={prevQuote}
                    className="w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#610011] shadow-sm transition-colors"
                    aria-label="Previous testimony"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  </button>
                  <button
                    onClick={nextQuote}
                    className="w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#610011] shadow-sm transition-colors"
                    aria-label="Next testimony"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="min-h-[52px] flex items-center">
                <p className="font-headline-sm text-headline-sm text-[#610011] italic transition-all duration-300">
                  “{activeQuote.quote}”
                </p>
              </div>
              <span className="font-label-md text-label-md text-[#594140] font-medium">
                — {activeQuote.author}
              </span>
            </div>
          </section>

          {/* RIGHT PANEL: Glass Authentication Console (5 Cols) */}
          <section className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative w-full rounded-3xl bg-white/85 backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-2xl border border-[#eed4d8]/80 transition-all">
              {/* Subtle Top Brand Flare */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#610011] text-white font-label-sm text-label-sm font-bold uppercase tracking-widest shadow-lg shadow-[#610011]/30 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">key</span>
                <span>Encrypted Gateway</span>
              </div>

              {/* Mode Switcher */}
              <div className="w-full p-1.5 rounded-full bg-[#ffe8ec] flex items-center mb-7 mt-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className={`flex-1 py-2 rounded-full font-label-lg text-label-lg font-semibold tracking-wide transition-all duration-200 ${
                    !isRegisterMode
                      ? 'bg-[#610011] text-white shadow-md'
                      : 'text-[#594140] hover:text-[#610011]'
                  }`}
                >
                  Member Access
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className={`flex-1 py-2 rounded-full font-label-lg text-label-lg font-semibold tracking-wide transition-all duration-200 ${
                    isRegisterMode
                      ? 'bg-[#610011] text-white shadow-md'
                      : 'text-[#594140] hover:text-[#610011]'
                  }`}
                >
                  Create Sanctuary
                </button>
              </div>

              {/* Form Heading */}
              <div className="mb-6">
                <h2 className="font-headline-lg text-headline-lg text-[#610011] font-medium tracking-tight">
                  {isRegisterMode ? 'Commence Sacred Bio-Sync' : 'Welcome Home'}
                </h2>
                <p className="font-body-md text-body-md text-[#594140] mt-1">
                  {isRegisterMode
                    ? 'Create an encrypted biological ledger and calibrate your cellular infradian baseline.'
                    : 'Authenticate to sync your real-time endocrine telemetry and circadian bio-markers.'}
                </p>
              </div>

              {/* Passkey Trigger Hero Card */}
              <div
                onClick={handlePasskeyClick}
                className="mb-6 p-4 rounded-2xl bg-[#fff0f2] hover:bg-[#ffe8ec] transition-all cursor-pointer group flex items-center justify-between border border-[#eed4d8]/40"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#610011] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">fingerprint</span>
                  </div>
                  <div>
                    <div className="font-label-lg text-label-lg font-bold text-[#26181b] flex items-center gap-1.5">
                      Biometric Passkey
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    <div className="font-label-sm text-label-sm text-[#8d4a56]">
                      {passkeyStatus || 'Touch ID / Face ID Instant Key'}
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#610011] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </div>

              {/* Silk Divider */}
              <div className="relative flex items-center justify-center my-6">
                <div className="w-full h-px bg-[#eed4d8]"></div>
                <span className="absolute bg-white px-3 font-label-sm text-label-sm uppercase tracking-widest text-[#8d4a56] font-semibold">
                  Or enter credential
                </span>
              </div>

              {/* Credentials Form */}
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                {/* Name (if Register) */}
                {isRegisterMode && (
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-[#26181b] font-semibold tracking-wide">
                      Full Legal or Chosen Name
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#8d4a56]">
                        person
                      </span>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#fff0f2] text-[#26181b] font-body-md text-body-md focus:outline-none focus:bg-white border border-[#eed4d8]/50 focus:border-[#8b001d] transition-all"
                        placeholder="e.g. Genevieve Thorne"
                      />
                    </div>
                  </div>
                )}

                {/* Email / Identifier */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-[#26181b] font-semibold tracking-wide">
                    Registered Medical Identifier / Email
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#8d4a56]">
                      alternate_email
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#fff0f2] text-[#26181b] font-body-md text-body-md focus:outline-none focus:bg-white border border-[#eed4d8]/50 focus:border-[#8b001d] transition-all"
                    />
                  </div>
                </div>

                {/* Sanctuary Cipher (Password) */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-label-md text-label-md text-[#26181b] font-semibold tracking-wide">
                      Sanctuary Cipher
                    </label>
                    <a
                      href="#recover"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Cipher recovery token sent to registered medical vault key.');
                      }}
                      className="font-label-sm text-label-sm text-[#610011] hover:text-[#8b001d] font-semibold tracking-wider transition-colors"
                    >
                      Recover Key?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#8d4a56]">
                      lock
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#fff0f2] text-[#26181b] font-body-md text-body-md focus:outline-none focus:bg-white border border-[#eed4d8]/50 focus:border-[#8b001d] transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8d4a56] hover:text-[#610011] transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      <span className="material-symbols-outlined text-[19px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Objective Chips (if Register) */}
                {isRegisterMode && (
                  <div className="flex flex-col gap-1.5 mt-1">
                    <label className="font-label-md text-label-md text-[#26181b] font-semibold tracking-wide">
                      Primary Endocrine Objective
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveObjective('balance')}
                        className={`p-2.5 rounded-xl text-left font-label-md text-label-md font-medium transition-all ${
                          activeObjective === 'balance'
                            ? 'bg-[#610011] text-white shadow-sm'
                            : 'bg-[#fff0f2] text-[#26181b] hover:bg-[#ffe8ec]'
                        }`}
                      >
                        Hormonal Balance
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveObjective('fertility')}
                        className={`p-2.5 rounded-xl text-left font-label-md text-label-md font-medium transition-all ${
                          activeObjective === 'fertility'
                            ? 'bg-[#610011] text-white shadow-sm'
                            : 'bg-[#fff0f2] text-[#26181b] hover:bg-[#ffe8ec]'
                        }`}
                      >
                        Fertility Optimizing
                      </button>
                    </div>
                  </div>
                )}

                {/* Auth Error Display */}
                {authError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    <span>{authError}</span>
                  </div>
                )}

                {/* Primary Luxury CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-3 py-3.5 px-6 rounded-full bg-[#610011] hover:bg-[#8b001d] disabled:opacity-60 text-white font-title-md text-title-md font-semibold tracking-wide shadow-xl shadow-[#610011]/25 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>
                        {isRegisterMode ? 'Establish Sanctuary Vault' : 'Access Your Cycle Sanctuary'}
                      </span>
                      <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>

                {/* Social Quick Access Hub */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    type="button"
                    onClick={onEnterSanctuary}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.85-11.96-14.42-6-9.16-10.74-19.46-14.22-30.9-3.48-11.44-5.22-22.39-5.22-32.84 0-14.54 3.73-26.68 11.19-36.43 7.46-9.75 16.73-14.73 27.81-14.95 5.56 0 11.26 1.34 17.11 4.02 5.85 2.68 9.94 4.08 12.28 4.2 1.8.12 5.76-1.27 11.89-4.17 6.13-2.9 11.75-4.22 16.85-3.97 12.63.78 22.84 5.34 30.63 13.68-11.06 6.7-16.5 15.82-16.32 27.36.19 9.17 3.76 16.85 10.71 23.03 6.95 6.18 15.13 9.77 24.54 10.78-2.34 7.26-5.33 14.78-8.98 22.56zM119.22 33.15c0-7.39 2.66-14.37 7.98-20.94 5.32-6.57 11.88-10.75 19.68-12.54 1.05 7.15-.81 14.19-5.58 21.12-4.77 6.93-11.05 11.1-18.84 12.51-.78-.05-1.85-.08-3.24-.15z" />
                    </svg>
                    <span className="font-label-md text-label-md font-medium tracking-wide">Apple</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white text-[#26181b] hover:bg-[#fff0f2] transition-colors shadow-sm border border-[#eed4d8]/60 cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4" />
                      <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853" />
                      <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z" fill="#FBBC05" />
                      <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
                    </svg>
                    <span className="font-label-md text-label-md font-medium tracking-wide">Google</span>
                  </button>
                </div>
              </form>

              {/* Compliance Footer */}
              <div className="mt-8 pt-4 border-t border-[#eed4d8]/40 flex items-center justify-between text-[#594140]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#610011]">security</span>
                  <span className="font-label-sm text-label-sm">256-Bit Zero-Knowledge</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#610011]">shield_person</span>
                  <span className="font-label-sm text-label-sm">FD&C Act Harmonized</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
