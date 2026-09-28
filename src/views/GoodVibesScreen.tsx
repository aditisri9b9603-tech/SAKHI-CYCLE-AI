import React, { useState, useEffect } from 'react';
import { SOUNDSCAPES } from '../data/mockData';
import { playSolfeggioTone, stopSolfeggioTone } from '../utils/audioSynth';

export const GoodVibesScreen: React.FC = () => {
  // Spotify mock player state
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(44);
  const [volume, setVolume] = useState(78);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Vagus Nerve Breathing state
  const [isBreathingRunning, setIsBreathingRunning] = useState(true);
  const [breathPhaseIndex, setBreathPhaseIndex] = useState(0); // 0: Inhale (4s), 1: Hold (4s), 2: Exhale (6s)
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [breathCycle, setBreathCycle] = useState(3);

  // Solfeggio frequency active state & real audio playback
  const [activeFreq, setActiveFreq] = useState<number>(432);
  const [isAudioTonePlaying, setIsAudioTonePlaying] = useState(false);
  const [binauralMode, setBinauralMode] = useState<number>(10); // Alpha 10Hz, Theta 6Hz, Delta 2Hz

  // 3D Oracle flip card state
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [journalSaved, setJournalSaved] = useState(false);

  // Active soundscape previewing
  const [activeSoundscape, setActiveSoundscape] = useState<string | null>(null);

  const playlist = [
    { title: 'Somatic Drift & Follicular Flow', artist: 'Sakhi Sound Sanctuary • 432Hz Master Recording', time: '42:00' },
    { title: 'Vagal Release in Rain', artist: 'Dr. Elena Vance Acoustic Lab', time: '38:15' },
    { title: 'Golden Hour Endocrine Bloom', artist: 'Sakhi Cellular Harmonics', time: '45:30' }
  ];

  // Breathing timer loop
  const phases = [
    { label: 'Inhale', duration: 4, scale: 'scale-[1.38]', glow: 'scale-[1.48]' },
    { label: 'Hold', duration: 4, scale: 'scale-[1.38]', glow: 'scale-[1.48]' },
    { label: 'Exhale', duration: 6, scale: 'scale-[1.0]', glow: 'scale-[1.0]' }
  ];

  useEffect(() => {
    if (!isBreathingRunning) return;

    const interval = setInterval(() => {
      setBreathSeconds((prev) => {
        if (prev <= 1) {
          setBreathPhaseIndex((currPhase) => {
            const nextPhase = (currPhase + 1) % phases.length;
            if (nextPhase === 0) {
              setBreathCycle((c) => (c % 8) + 1);
            }
            return nextPhase;
          });
          return phases[(breathPhaseIndex + 1) % phases.length].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingRunning, breathPhaseIndex]);

  // Audio tone playback for selected frequency
  const handleSelectFrequency = (freq: number) => {
    setActiveFreq(freq);
    if (!isAudioTonePlaying) {
      playSolfeggioTone(freq, binauralMode, (volume / 100) * 0.15);
      setIsAudioTonePlaying(true);
    } else {
      playSolfeggioTone(freq, binauralMode, (volume / 100) * 0.15);
    }
  };

  const toggleAudioTone = (e: React.MouseEvent, freq: number) => {
    e.stopPropagation();
    if (isAudioTonePlaying && activeFreq === freq) {
      stopSolfeggioTone();
      setIsAudioTonePlaying(false);
    } else {
      setActiveFreq(freq);
      playSolfeggioTone(freq, binauralMode, (volume / 100) * 0.15);
      setIsAudioTonePlaying(true);
    }
  };

  // Cleanup tone on unmount
  useEffect(() => {
    return () => {
      stopSolfeggioTone();
    };
  }, []);

  const handleSaveToJournal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setJournalSaved(true);
    setTimeout(() => {
      setJournalSaved(false);
    }, 2800);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1280px] w-full mx-auto px-6 lg:px-10 py-6 flex flex-col gap-10">
        {/* Hero / Atmosphere Banner */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-white shadow-[0_12px_36px_-4px_rgba(153,0,36,0.07)] p-6 md:p-10 border border-[#eed4d8]/60">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#feaab7]/30 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-80 h-80 rounded-full bg-[#ffb3b2]/20 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-[#feaab7]/50 text-[#610011]">
                <span className="material-symbols-outlined text-[16px] text-[#610011]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  graphic_eq
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#610011] font-semibold">
                  Acoustic Bio-Harmonics
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-[#610011] tracking-tight font-semibold">
                The Good Vibes Sanctuary
              </h1>
              <p className="font-body-lg text-body-lg text-[#594140]">
                Immerse in scientifically tuned frequencies, vagal nerve resets, and intimate sound baths calibrated precisely to your Follicular Phase vitality.
              </p>
            </div>

            {/* Nervous State Pill */}
            <div className="flex items-center gap-4 bg-[#fff0f2] px-6 py-4 rounded-2xl shadow-sm self-start lg:self-center border border-[#eed4d8]/60">
              <div className="relative flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-[#8b001d] animate-ping absolute"></span>
                <span className="w-3 h-3 rounded-full bg-[#8b001d]"></span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase text-[#8d4a56] tracking-wider font-semibold">
                  Nervous State
                </span>
                <span className="font-title-md text-title-md text-[#26181b]">
                  Vagal Parasympathetic Tone
                </span>
              </div>
              <div className="pl-2">
                <span className="material-symbols-outlined text-[24px] text-[#610011]">spa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Spotify Player & Vagus Nerve Breathing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Spotify Embedded Player (7 cols) */}
          <div className="lg:col-span-7 flex flex-col bg-white rounded-2xl shadow-[0_12px_36px_-4px_rgba(153,0,36,0.07)] p-6 md:p-8 relative overflow-hidden border border-[#eed4d8]/60">
            <div className="flex items-center justify-between pb-4 border-b border-[#eed4d8]/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center text-white shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.217.356-.677.47-1.033.253-2.828-1.728-6.388-2.12-10.584-1.16-.407.094-.813-.16-.906-.566-.094-.407.16-.813.567-.907 4.595-1.05 8.528-.607 11.703 1.347.356.217.47.677.253 1.033zm1.468-3.265c-.274.444-.855.588-1.298.314-3.237-1.99-8.172-2.565-11.998-1.403-.498.152-1.03-.133-1.182-.63-.15-.499.133-1.031.63-1.183 4.38-1.33 9.816-.688 13.535 1.603.443.275.587.856.313 1.299zm.126-3.41c-3.882-2.305-10.29-2.518-14.004-1.39-.597.18-1.233-.162-1.414-.759-.181-.597.162-1.233.759-1.414 4.269-1.296 11.345-1.047 15.823 1.61.536.318.71 1.01.392 1.546-.318.536-1.01.71-1.556.392z"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#8d4a56] font-semibold">
                    Spotify Resonance Deck
                  </span>
                  <span className="font-title-md text-title-md text-[#26181b]">
                    Curated Synced Stream
                  </span>
                </div>
              </div>
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#feaab7]/40 text-[#610011] hover:bg-[#8b001d] hover:text-white transition-all text-xs font-semibold"
              >
                <span>Open in Spotify</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center pt-4">
              {/* Album Art */}
              <div className="relative w-44 h-44 rounded-2xl overflow-hidden shrink-0 shadow-[0_8px_24px_rgba(153,0,36,0.18)]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvFRiHnX3xgkUA2m8idEzh7YULIVnL6RcrhujU5bVBvBTHqgj1SSw38Od2LFroEkKpqoNqjYUfE5KTxvcbvs-v-oZyUcORvm27hEWbXO8zZAXg59rZ7kT5HhklzTbI3MabitwtNZq0MZsSqzMYFh3Q7u90ngDk_UUXq3YzS6HHGQ3VQwZzRpPMD58j1SsKkuOryOXraRYvHil6m9UYZLlmAbTI0aW-ZQZ2PW_dZaiBO_-NvslcL-0i"
                  alt="Somatic Album Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#610011]/80 via-transparent to-transparent flex items-end p-3">
                  <span className="font-label-sm text-label-sm text-white tracking-widest uppercase font-bold">
                    Follicular Vol. 04
                  </span>
                </div>
              </div>

              {/* Track Info */}
              <div className="flex flex-col justify-between w-full h-full min-w-0">
                <div>
                  <div className="flex items-center gap-1.5 text-[#610011] pb-1">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      favorite
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                      Recommended For Day 9
                    </span>
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-[#26181b] truncate font-semibold">
                    {playlist[currentTrackIndex].title}
                  </h2>
                  <p className="font-body-md text-body-md text-[#594140] truncate">
                    {playlist[currentTrackIndex].artist}
                  </p>
                </div>

                {/* Waveform Canvas */}
                <div className={`flex items-end gap-1.5 h-9 py-2 my-2 ${isPlaying ? '' : 'opacity-40'}`}>
                  {[4, 8, 3, 6, 9, 5, 7, 4, 8, 6, 9, 3, 7, 5, 8, 4].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h * 4}px` }}
                      className={`w-1.5 rounded-full transition-all duration-300 ${
                        i % 3 === 0
                          ? 'bg-[#610011] animate-pulse'
                          : i % 2 === 0
                          ? 'bg-[#8b001d]'
                          : 'bg-[#feaab7]'
                      }`}
                    />
                  ))}
                </div>

                {/* Progress Scrub Bar */}
                <div className="flex flex-col gap-1 w-full">
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const newPct = Math.round((clickX / rect.width) * 100);
                      setCurrentProgress(newPct);
                    }}
                    className="relative w-full h-1.5 bg-[#feaab7]/40 rounded-full cursor-pointer overflow-hidden"
                  >
                    <div
                      className="h-full bg-[#610011] rounded-full transition-all duration-150"
                      style={{ width: `${currentProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between font-label-sm text-label-sm text-[#8d706f]">
                    <span>18:24</span>
                    <span>{playlist[currentTrackIndex].time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls Dock */}
            <div className="flex items-center justify-between pt-5 mt-4 border-t border-[#eed4d8]/40">
              <div className="flex items-center gap-2 text-[#594140]">
                <button className="p-2 rounded-full hover:bg-[#feaab7]/30 transition-colors" title="Shuffle">
                  <span className="material-symbols-outlined text-[20px]">shuffle</span>
                </button>
                <button className="p-2 rounded-full hover:bg-[#feaab7]/30 transition-colors" title="Loop Sanctuary">
                  <span className="material-symbols-outlined text-[20px]">repeat</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length)}
                  className="p-2 rounded-full hover:bg-[#feaab7]/30 text-[#26181b] transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">skip_previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-[#8b001d] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(153,0,36,0.25)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[28px]">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTrackIndex((prev) => (prev + 1) % playlist.length)}
                  className="p-2 rounded-full hover:bg-[#feaab7]/30 text-[#26181b] transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">skip_next</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[#594140]">
                <span className="material-symbols-outlined text-[20px]">volume_up</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20 accent-[#610011] h-1 bg-[#feaab7]/40 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Vagus Nerve Breathing Chamber (5 cols) */}
          <div className="lg:col-span-5 flex flex-col bg-white rounded-2xl shadow-[0_12px_36px_-4px_rgba(153,0,36,0.07)] p-6 md:p-8 relative overflow-hidden h-full justify-between border border-[#eed4d8]/60">
            <div className="flex items-center justify-between pb-3 border-b border-[#eed4d8]/30">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#8d4a56] font-semibold">
                  Nervous Reset Protocol
                </span>
                <h3 className="font-headline-sm text-headline-sm text-[#610011] font-semibold">
                  Vagus Nerve Breathing
                </h3>
              </div>
              <span className="material-symbols-outlined text-[#610011] text-[24px]">air</span>
            </div>

            {/* Animated Sphere */}
            <div className="relative flex flex-col items-center justify-center my-8 min-h-[220px]">
              <div
                className={`absolute w-44 h-44 rounded-full bg-[#feaab7]/30 transition-transform duration-1000 ease-in-out ${
                  phases[breathPhaseIndex].glow
                }`}
              />
              <div
                className={`absolute w-36 h-36 rounded-full bg-[#ffb3b2]/30 transition-transform duration-1000 ease-in-out ${
                  phases[breathPhaseIndex].glow
                }`}
              />
              <div
                className={`relative w-28 h-28 rounded-full bg-gradient-to-tr from-[#610011] to-[#8b001d] shadow-[0_12px_32px_rgba(153,0,36,0.35)] flex flex-col items-center justify-center text-center text-white transition-all duration-1000 ease-in-out ${
                  phases[breathPhaseIndex].scale
                }`}
              >
                <span className="font-title-md text-title-md tracking-wide font-semibold">
                  {phases[breathPhaseIndex].label}
                </span>
                <span className="font-label-sm text-label-sm text-[#ffd9de]">
                  {breathSeconds}s
                </span>
              </div>
            </div>

            {/* Breathing Controls */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[#8d706f] font-label-sm text-label-sm">
                <span>Cycle: 4s In • 4s Hold • 6s Out</span>
                <span className="text-[#610011] font-semibold">Cycle {breathCycle} / 8</span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsBreathingRunning(!isBreathingRunning)}
                  className="flex-1 py-2.5 px-4 rounded-full bg-[#feaab7]/50 text-[#610011] hover:bg-[#8b001d] hover:text-white transition-all flex items-center justify-center gap-1.5 font-label-md text-label-md cursor-pointer font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isBreathingRunning ? 'motion_photos_paused' : 'play_circle'}
                  </span>
                  <span>{isBreathingRunning ? 'Pause Rhythm' : 'Resume Rhythm'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBreathSeconds(4);
                    setBreathPhaseIndex(0);
                  }}
                  className="py-2.5 px-4 rounded-full bg-[#fff0f2] text-[#26181b] hover:bg-[#feaab7]/40 transition-all flex items-center justify-center"
                  title="Reset Rhythm Cadence"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Solfeggio Harmonic Frequencies (4 Cards Bento) */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[#610011] pb-1">
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Cellular Bio-Acoustics
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-[#26181b] font-semibold">
                Solfeggio Harmonic Frequencies
              </h2>
              <p className="font-body-md text-body-md text-[#594140]">
                Tap any frequency sphere to instantly tune the sanctuary soundscape.
              </p>
            </div>

            {/* Binaural tuning mode selector */}
            <div className="flex items-center gap-1 bg-[#fff0f2] p-1 rounded-full border border-[#eed4d8]/60 self-start md:self-auto">
              {[
                { hz: 10, label: 'Alpha 10Hz (Focus)' },
                { hz: 6, label: 'Theta 6Hz (Deep Rest)' },
                { hz: 2, label: 'Delta 2Hz (Sleep)' }
              ].map((b) => (
                <button
                  key={b.hz}
                  type="button"
                  onClick={() => {
                    setBinauralMode(b.hz);
                    if (isAudioTonePlaying) {
                      playSolfeggioTone(activeFreq, b.hz, (volume / 100) * 0.15);
                    }
                  }}
                  className={`px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                    binauralMode === b.hz
                      ? 'bg-[#8b001d] text-white shadow-sm font-semibold'
                      : 'text-[#594140] hover:text-[#610011]'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Bento Frequency Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: 396 Hz */}
            <div
              onClick={() => handleSelectFrequency(396)}
              className={`frequency-card group rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between min-h-[220px] relative overflow-hidden border ${
                activeFreq === 396
                  ? 'bg-[#8b001d] text-white shadow-[0_16px_40px_rgba(153,0,36,0.25)] border-[#8b001d]'
                  : 'bg-white shadow-[0_12px_36px_-4px_rgba(153,0,36,0.05)] hover:shadow-[0_16px_40px_rgba(153,0,36,0.12)] border-[#eed4d8]/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3">
                  <span className={`font-headline-sm text-headline-sm font-semibold ${activeFreq === 396 ? 'text-white' : 'text-[#610011]'}`}>
                    396 Hz
                  </span>
                  <button
                    onClick={(e) => toggleAudioTone(e, 396)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                      activeFreq === 396
                        ? 'bg-white text-[#610011]'
                        : 'bg-[#feaab7]/50 text-[#610011] group-hover:bg-[#8b001d] group-hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isAudioTonePlaying && activeFreq === 396 ? 'volume_up' : 'play_arrow'}
                    </span>
                  </button>
                </div>
                {activeFreq === 396 && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white font-label-sm text-label-sm mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    <span>Currently Active</span>
                  </div>
                )}
                <h4 className={`font-title-md text-title-md ${activeFreq === 396 ? 'text-white' : 'text-[#26181b]'}`}>
                  Root Grounding
                </h4>
                <p className={`font-body-sm text-body-sm pt-1 ${activeFreq === 396 ? 'text-white/80' : 'text-[#594140]'}`}>
                  Dissolves subconscious tension, fear, and menstrual somatic cramps.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span className={`font-label-sm text-label-sm uppercase tracking-wider ${activeFreq === 396 ? 'text-white/80' : 'text-[#8d4a56]'}`}>
                  Root Chakra • Earth
                </span>
                <span className={`font-label-sm text-label-sm font-semibold ${activeFreq === 396 ? 'text-white' : 'text-[#610011]'}`}>
                  {activeFreq === 396 ? 'Active • Tuned' : 'Select →'}
                </span>
              </div>
            </div>

            {/* Card 2: 432 Hz */}
            <div
              onClick={() => handleSelectFrequency(432)}
              className={`frequency-card group rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between min-h-[220px] relative overflow-hidden border ${
                activeFreq === 432
                  ? 'bg-[#8b001d] text-white shadow-[0_16px_40px_rgba(153,0,36,0.25)] border-[#8b001d]'
                  : 'bg-white shadow-[0_12px_36px_-4px_rgba(153,0,36,0.05)] hover:shadow-[0_16px_40px_rgba(153,0,36,0.12)] border-[#eed4d8]/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3">
                  <span className={`font-headline-sm text-headline-sm font-semibold ${activeFreq === 432 ? 'text-white' : 'text-[#610011]'}`}>
                    432 Hz
                  </span>
                  <button
                    onClick={(e) => toggleAudioTone(e, 432)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                      activeFreq === 432
                        ? 'bg-white text-[#610011]'
                        : 'bg-[#feaab7]/50 text-[#610011] group-hover:bg-[#8b001d] group-hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isAudioTonePlaying && activeFreq === 432 ? 'volume_up' : 'play_arrow'}
                    </span>
                  </button>
                </div>
                {activeFreq === 432 && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white font-label-sm text-label-sm mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    <span>Currently Active</span>
                  </div>
                )}
                <h4 className={`font-title-md text-title-md ${activeFreq === 432 ? 'text-white' : 'text-[#26181b]'}`}>
                  Earth Heartbeat
                </h4>
                <p className={`font-body-sm text-body-sm pt-1 ${activeFreq === 432 ? 'text-white/80' : 'text-[#594140]'}`}>
                  Natural golden ratio harmonic. Calms heart rate variability and cortisol.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span className={`font-label-sm text-label-sm uppercase tracking-wider ${activeFreq === 432 ? 'text-white/80' : 'text-[#8d4a56]'}`}>
                  Universal Calm
                </span>
                <span className={`font-label-sm text-label-sm font-semibold ${activeFreq === 432 ? 'text-white' : 'text-[#610011]'}`}>
                  {activeFreq === 432 ? 'Active • Tuned' : 'Select →'}
                </span>
              </div>
            </div>

            {/* Card 3: 528 Hz */}
            <div
              onClick={() => handleSelectFrequency(528)}
              className={`frequency-card group rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between min-h-[220px] relative overflow-hidden border ${
                activeFreq === 528
                  ? 'bg-[#8b001d] text-white shadow-[0_16px_40px_rgba(153,0,36,0.25)] border-[#8b001d]'
                  : 'bg-white shadow-[0_12px_36px_-4px_rgba(153,0,36,0.05)] hover:shadow-[0_16px_40px_rgba(153,0,36,0.12)] border-[#eed4d8]/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3">
                  <span className={`font-headline-sm text-headline-sm font-semibold ${activeFreq === 528 ? 'text-white' : 'text-[#610011]'}`}>
                    528 Hz
                  </span>
                  <button
                    onClick={(e) => toggleAudioTone(e, 528)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                      activeFreq === 528
                        ? 'bg-white text-[#610011]'
                        : 'bg-[#feaab7]/50 text-[#610011] group-hover:bg-[#8b001d] group-hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isAudioTonePlaying && activeFreq === 528 ? 'volume_up' : 'play_arrow'}
                    </span>
                  </button>
                </div>
                {activeFreq === 528 && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white font-label-sm text-label-sm mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    <span>Currently Active</span>
                  </div>
                )}
                <h4 className={`font-title-md text-title-md ${activeFreq === 528 ? 'text-white' : 'text-[#26181b]'}`}>
                  Cellular Repair
                </h4>
                <p className={`font-body-sm text-body-sm pt-1 ${activeFreq === 528 ? 'text-white/80' : 'text-[#594140]'}`}>
                  The “Love Frequency”. Stimulates mitochondrial cellular rejuvenation.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span className={`font-label-sm text-label-sm uppercase tracking-wider ${activeFreq === 528 ? 'text-white/80' : 'text-[#8d4a56]'}`}>
                  DNA Resonance
                </span>
                <span className={`font-label-sm text-label-sm font-semibold ${activeFreq === 528 ? 'text-white' : 'text-[#610011]'}`}>
                  {activeFreq === 528 ? 'Active • Tuned' : 'Select →'}
                </span>
              </div>
            </div>

            {/* Card 4: 852 Hz */}
            <div
              onClick={() => handleSelectFrequency(852)}
              className={`frequency-card group rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between min-h-[220px] relative overflow-hidden border ${
                activeFreq === 852
                  ? 'bg-[#8b001d] text-white shadow-[0_16px_40px_rgba(153,0,36,0.25)] border-[#8b001d]'
                  : 'bg-white shadow-[0_12px_36px_-4px_rgba(153,0,36,0.05)] hover:shadow-[0_16px_40px_rgba(153,0,36,0.12)] border-[#eed4d8]/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3">
                  <span className={`font-headline-sm text-headline-sm font-semibold ${activeFreq === 852 ? 'text-white' : 'text-[#610011]'}`}>
                    852 Hz
                  </span>
                  <button
                    onClick={(e) => toggleAudioTone(e, 852)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                      activeFreq === 852
                        ? 'bg-white text-[#610011]'
                        : 'bg-[#feaab7]/50 text-[#610011] group-hover:bg-[#8b001d] group-hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isAudioTonePlaying && activeFreq === 852 ? 'volume_up' : 'play_arrow'}
                    </span>
                  </button>
                </div>
                {activeFreq === 852 && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white font-label-sm text-label-sm mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    <span>Currently Active</span>
                  </div>
                )}
                <h4 className={`font-title-md text-title-md ${activeFreq === 852 ? 'text-white' : 'text-[#26181b]'}`}>
                  Intuition & Clarity
                </h4>
                <p className={`font-body-sm text-body-sm pt-1 ${activeFreq === 852 ? 'text-white/80' : 'text-[#594140]'}`}>
                  Heightens third-eye perception and clears hormonal brain fog.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span className={`font-label-sm text-label-sm uppercase tracking-wider ${activeFreq === 852 ? 'text-white/80' : 'text-[#8d4a56]'}`}>
                  Ajna • Lucid Flow
                </span>
                <span className={`font-label-sm text-label-sm font-semibold ${activeFreq === 852 ? 'text-white' : 'text-[#610011]'}`}>
                  {activeFreq === 852 ? 'Active • Tuned' : 'Select →'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Shelf: Curated Drift Audio + Affirmation Oracle Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Curated Bedtime & Drift Audio (8 cols) */}
          <div className="lg:col-span-8 flex flex-col bg-white rounded-2xl shadow-[0_12px_36px_-4px_rgba(153,0,36,0.07)] p-6 md:p-8 border border-[#eed4d8]/60">
            <div className="flex items-center justify-between pb-4">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#8d4a56] font-semibold">
                  Acoustic Sanctuaries
                </span>
                <h3 className="font-headline-sm text-headline-sm text-[#610011] font-semibold">
                  Curated Bedtime & Drift Audio
                </h3>
              </div>
              <button className="text-[#610011] font-label-md text-label-md hover:underline flex items-center gap-1 font-semibold">
                <span>View All (18)</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {SOUNDSCAPES.map((sound) => {
                const isThisPlaying = activeSoundscape === sound.id;
                return (
                  <div
                    key={sound.id}
                    onClick={() => {
                      if (isThisPlaying) {
                        setActiveSoundscape(null);
                        stopSolfeggioTone();
                      } else {
                        setActiveSoundscape(sound.id);
                        playSolfeggioTone(432, 2, 0.1);
                      }
                    }}
                    className="group relative rounded-2xl overflow-hidden bg-[#fff0f2] flex flex-col cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md border border-[#eed4d8]/50"
                  >
                    <div className="relative w-full h-44 overflow-hidden">
                      <img
                        src={sound.image}
                        alt={sound.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <button
                        type="button"
                        className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${
                          isThisPlaying ? 'bg-emerald-600 text-white' : 'bg-[#8b001d] text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {isThisPlaying ? 'pause' : 'play_arrow'}
                        </span>
                      </button>
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-md text-[#26181b] font-label-sm text-label-sm font-semibold">
                        {sound.duration}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col gap-1">
                      <h4 className="font-title-md text-title-md text-[#26181b] group-hover:text-[#610011] transition-colors font-semibold">
                        {sound.title}
                      </h4>
                      <p className="font-body-sm text-body-sm text-[#594140] line-clamp-2">
                        {sound.desc}
                      </p>
                      <div className="flex items-center gap-1.5 text-[#8d4a56] font-label-sm text-label-sm pt-1">
                        <span className="material-symbols-outlined text-[14px]">{sound.icon}</span>
                        <span>{sound.tag}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Affirmation Oracle Card (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white rounded-2xl shadow-[0_12px_36px_-4px_rgba(153,0,36,0.07)] p-6 md:p-8 relative overflow-hidden border border-[#eed4d8]/60">
            <div>
              <div className="flex items-center justify-between pb-2">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#8d4a56] font-semibold">
                  Follicular Oracle
                </span>
                <span className="material-symbols-outlined text-[#610011] text-[20px]">auto_awesome</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#26181b] font-semibold">
                Daily Wisdom Card
              </h3>
              <p className="font-body-sm text-body-sm text-[#594140] pt-1">
                Click the card below to flip between sacred affirmation and biochemical insight.
              </p>
            </div>

            {/* 3D Flip Card Container */}
            <div
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="my-4 [perspective:1000px] cursor-pointer"
            >
              <div
                className={`relative w-full h-72 rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] shadow-md ${
                  isCardFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* Front Face: Sacred Affirmation */}
                <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#feaab7]/60 via-white to-[#ffd9de] p-6 flex flex-col justify-between [backface-visibility:hidden] border border-[#feaab7]/70">
                  <div className="flex justify-between items-center text-[#610011]">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
                      Phase 02 • Follicular
                    </span>
                    <span className="material-symbols-outlined text-[18px]">flare</span>
                  </div>
                  <div className="text-center px-2 my-auto">
                    <p className="font-headline-md text-headline-md text-[#610011] italic leading-snug">
                      “My rising vitality is not a race; it is a sacred blooming in divine rhythm.”
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[#594140] font-label-sm text-label-sm font-medium">
                    <span>Oracle No. 49</span>
                    <span className="inline-flex items-center gap-1 text-[#610011] font-semibold">
                      <span>Tap to Flip</span>
                      <span className="material-symbols-outlined text-[14px]">sync</span>
                    </span>
                  </div>
                </div>

                {/* Back Face: Somatic Action & Guidance */}
                <div className="absolute inset-0 w-full h-full rounded-2xl bg-[#610011] text-white p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] border border-[#8b001d]">
                  <div className="flex justify-between items-center text-[#ffdad9]">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                      Biological Guidance
                    </span>
                    <span className="material-symbols-outlined text-[18px]">water_ph</span>
                  </div>
                  <div className="flex flex-col gap-2 my-auto">
                    <span className="font-title-md text-title-md text-white font-semibold">
                      Estrogen Awakening
                    </span>
                    <p className="font-body-sm text-body-sm text-white/80 leading-relaxed">
                      Follicle-stimulating hormone is actively priming your dominant follicle. Embrace creative projects, expansive speech, and gentle aerobic dance today.
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[#ffdad9] font-label-sm text-label-sm">
                    <span>Day 9 Biochemical Peak</span>
                    <span className="inline-flex items-center gap-1 text-white font-semibold">
                      <span>Flip Back</span>
                      <span className="material-symbols-outlined text-[14px]">sync</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleSaveToJournal}
                className="flex-1 py-2.5 px-4 rounded-full bg-[#8b001d] text-white font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(153,0,36,0.2)] hover:bg-[#610011] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {journalSaved ? 'check' : 'bookmark_add'}
                </span>
                <span>{journalSaved ? 'Saved to Vault ✓' : 'Save to Journal'}</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Oracle insight copied to clipboard to share!')}
                className="py-2.5 px-4 rounded-full bg-[#feaab7]/40 text-[#610011] hover:bg-[#feaab7] font-label-md text-label-md flex items-center justify-center gap-1 transition-colors"
                title="Share Oracle"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
