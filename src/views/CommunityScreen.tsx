import React, { useState } from 'react';
import { FORUM_THREADS } from '../data/mockData';
import { ForumThread } from '../types';

interface CommunityScreenProps {
  onOpenTranscriber?: (context?: string, title?: string, callback?: (text: string) => void) => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({ onOpenTranscriber }) => {
  const [threads, setThreads] = useState<ForumThread[]>(FORUM_THREADS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'follicular' | 'luteal' | 'seeds'>('all');
  const [likedThreads, setLikedThreads] = useState<{ [id: string]: boolean }>({});
  
  // Cycle Twin state
  const twinsList = [
    { name: 'Sister #428', phase: 'Day 9 Follicular • Bangalore, IN' },
    { name: 'Sister #211', phase: 'Day 9 Follicular • London, UK' },
    { name: 'Sister #705', phase: 'Day 9 Follicular • Toronto, CA' },
    { name: 'Sister #982', phase: 'Day 9 Follicular • Melbourne, AU' }
  ];
  const [twinIndex, setTwinIndex] = useState(0);
  const [whisperText, setWhisperText] = useState('');
  const [whisperAlert, setWhisperAlert] = useState(false);

  // New Thread modal
  const [isNewThreadModalOpen, setIsNewThreadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newBadge, setNewBadge] = useState('Follicular Wisdom');

  // Charter Modal
  const [isCharterModalOpen, setIsCharterModalOpen] = useState(false);

  const handleRematchTwin = () => {
    setTwinIndex((prev) => (prev + 1) % twinsList.length);
  };

  const handleSendWhisper = () => {
    if (!whisperText.trim()) return;
    setWhisperAlert(true);
    setWhisperText('');
    setTimeout(() => {
      setWhisperAlert(false);
    }, 3800);
  };

  const handleLikeThread = (id: string) => {
    setLikedThreads((prev) => {
      const isLiked = !!prev[id];
      const newStatus = !isLiked;

      setThreads((current) =>
        current.map((t) => (t.id === id ? { ...t, likes: isLiked ? t.likes - 1 : t.likes + 1 } : t))
      );

      return { ...prev, [id]: newStatus };
    });
  };

  const handlePublishThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newThread: ForumThread = {
      id: `thread-${Date.now()}`,
      authorNumber: 'Sister #791',
      phaseLabel: 'Follicular • Day 9 (You)',
      badge: newBadge,
      avatarEmoji: '🌸',
      title: newTitle,
      content: newContent,
      likes: 1,
      replies: 0,
      timeAgo: 'Just now',
      category: activeFilter === 'all' ? 'follicular' : activeFilter
    };

    setThreads([newThread, ...threads]);
    setIsNewThreadModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  const currentTwin = twinsList[twinIndex];

  const filteredThreads = threads.filter((t) => {
    if (activeFilter === 'all') return true;
    return t.category === activeFilter;
  });

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-6 space-y-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#feaab7]/50 text-[#610011]">
              <span className="material-symbols-outlined text-[16px] text-[#610011]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <span className="font-label-md text-label-md uppercase tracking-wider text-[#610011] font-semibold">
                Sanctuary Circle
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-[#610011] tracking-tight font-semibold">
              Sisterhood & Cycle Kinship
            </h1>
            <p className="font-body-lg text-body-lg text-[#594140] max-w-2xl">
              An encrypted, judgment-free space to link pulses with sisters navigating the exact same day, rhythm, and hormonal resonance.
            </p>
          </div>

          {/* Shield Badge */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white shadow-[0_8px_24px_rgba(153,0,36,0.04)] border border-[#eed4d8]/60 self-start md:self-auto">
            <div className="w-8 h-8 rounded-full bg-[#feaab7] flex items-center justify-center text-[#610011]">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-[#26181b] font-bold">100% Identity Shielded</span>
              <span className="font-body-sm text-body-sm text-[#8d4a56]">Zero-PII Biometric Anonymity</span>
            </div>
          </div>
        </div>

        {/* Top Bento: WhatsApp Sister Circle & Cycle Twin Matcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 1. WhatsApp Sister Circle Banner (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 shadow-[0_16px_36px_-6px_rgba(153,0,36,0.06)] relative overflow-hidden flex flex-col justify-between border border-[#eed4d8]/60">
            <div className="absolute -right-16 -top-16 w-72 h-72 bg-[#feaab7] rounded-full blur-3xl opacity-35 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff0f2] text-[#26181b] border border-[#eed4d8]/60">
                  <svg className="w-5 h-5 fill-[#25D366]" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.19 8.19 0 0 1-5.82 2.41c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.02.79.81-2.94-.19-.3a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.6 3.97c-.2 0-.44.07-.67.33-.23.26-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.7 4.29 3.78 2.11.91 2.54.73 3 .68.46-.04 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.17-.49-.3-.26-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.57.13-.17.26-.66.81-.81.98-.15.17-.3.2-.56.07-.26-.13-1.1-.41-2.1-1.3-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.06-.13-.57-1.37-.78-1.88-.21-.49-.41-.43-.57-.44l-.49-.01z"></path>
                  </svg>
                  <span className="font-label-md text-label-md tracking-wide font-semibold text-[#128C7E]">
                    Official WhatsApp Community
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#feaab7]/50 text-[#610011]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8b001d] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8b001d]"></span>
                  </span>
                  <span className="font-label-md text-label-md font-bold tracking-wide">
                    8,420 Active Sisters
                  </span>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <h2 className="font-headline-md text-headline-md text-[#610011] leading-tight font-semibold">
                  Join the Sakhi WhatsApp Sister Circle
                </h2>
                <p className="font-body-md text-body-md text-[#594140] max-w-lg">
                  Curated daily phase meditations, hormone-sync nutritional advice, emergency doctor-vetted queries, and heartfelt warmth delivered discreetly to your favorite app.
                </p>
              </div>

              {/* QR and Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-2 items-center">
                <div className="sm:col-span-4 bg-[#fff0f2] p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-inner border border-[#eed4d8]/50">
                  <div className="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center shadow-sm">
                    <svg className="w-full h-full text-[#610011]" fill="currentColor" viewBox="0 0 100 100">
                      <path d="M0 0h36v36H0V0zm6 6v24h24V6H6zm6 6h12v12H12V12zM64 0h36v36H64V0zm6 6v24h24V6H70zm6 6h12v12H76V12zM0 64h36v36H0V64zm6 6v24h24V70H6zm6 6h12v12H12V76zm52-12h12v12H64V64zm12 12h12v12H76V76zm12-12h12v12H88V64zm-24 24h12v12H64V88zm24 0h12v12H88V88zM44 8h12v12H44V8zm0 20h12v12H44V28zm0 20h12v12H44V48zm0 20h12v12H44V68zm0 20h12v12H44V88zm20-40h12v12H64V48zm-40 0h12v12H24V48zm64 0h12v12H88V48zM8 44h12v12H8V44zm24 0h12v12H32V44z"></path>
                    </svg>
                  </div>
                  <span className="font-label-sm text-label-sm text-[#8d4a56] pt-2 uppercase tracking-widest font-semibold">
                    Scan with Camera
                  </span>
                </div>

                <div className="sm:col-span-8 space-y-2 text-[#594140]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#610011]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      shield_with_heart
                    </span>
                    <span className="font-body-sm text-body-sm">
                      Phone numbers obscured via WhatsApp Private Community Mode.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#610011]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      psychiatry
                    </span>
                    <span className="font-body-sm text-body-sm">
                      24/7 Gynaecologist-curated myth busters & remedies.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#610011]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      favorite_border
                    </span>
                    <span className="font-body-sm text-body-sm">
                      Zero spam: Admin-curated channels + peer breakout rooms.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#8b001d] text-white font-title-md text-title-md shadow-[0_8px_20px_rgba(153,0,36,0.22)] hover:bg-[#610011] transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">group_add</span>
                <span>Join WhatsApp Circle (Strictly Moderated & Safe)</span>
              </a>
            </div>
          </div>

          {/* 2. Anonymous Peer Buddy Matching ('Cycle Twin') (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 md:p-8 shadow-[0_16px_36px_-6px_rgba(153,0,36,0.06)] flex flex-col justify-between relative overflow-hidden border border-[#eed4d8]/60">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#610011] via-[#8b001d] to-[#feaab7]"></div>

            <div>
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#610011] text-[22px]">all_inclusive</span>
                  <h3 className="font-headline-sm text-headline-sm text-[#610011] font-semibold">
                    Find Your Cycle Twin
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#8d4a56] px-2.5 py-0.5 rounded-full bg-[#feaab7]/40 font-bold">
                  Telemetry Sync
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-[#594140]">
                You are at <span className="font-semibold text-[#610011]">Day 9 · Follicular Phase</span>. Connect with a verified peer aligned to your exact biological clock.
              </p>

              {/* Matched Card */}
              <div className="my-4 p-4 rounded-xl bg-[#fff0f2] shadow-inner flex items-center justify-between gap-4 border border-[#eed4d8]/50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#feaab7] text-[#610011] flex items-center justify-center font-headline-sm text-headline-sm">
                      🌸
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#25D366] ring-2 ring-white"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-title-md text-title-md text-[#26181b] font-semibold">
                        {currentTwin.name}
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-[#610011]" title="Identity Shield Active">
                        lock
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-[#8b001d] font-medium">
                      {currentTwin.phase}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRematchTwin}
                  className="p-2 rounded-full hover:bg-[#feaab7]/40 text-[#594140] hover:text-[#610011] transition-all cursor-pointer"
                  title="Pair with another twin"
                >
                  <span className="material-symbols-outlined text-[20px]">sync</span>
                </button>
              </div>

              {/* Anonymous Whisper Chatbox */}
              <div className="space-y-3">
                <label className="block font-label-md text-label-md text-[#594140] uppercase tracking-wider font-semibold">
                  Whisper Safe Warmth
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={whisperText}
                    onChange={(e) => setWhisperText(e.target.value)}
                    placeholder={`Type an encouraging note to ${currentTwin.name}...`}
                    className="w-full p-4 rounded-xl bg-[#fff8f7] text-[#26181b] font-body-md text-body-md placeholder:text-[#8d706f] focus:outline-none shadow-sm focus:ring-1 focus:ring-[#8b001d] border border-[#eed4d8]/70 resize-none"
                  />
                  <button
                    type="button"
                    onClick={handleSendWhisper}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-[#8b001d] text-white hover:bg-[#610011] transition-colors flex items-center justify-center shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>

                {/* Quick Prompts */}
                <div className="space-y-1.5 pt-1">
                  <span className="font-label-sm text-label-sm text-[#8d4a56] font-semibold">Quick Prompts:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      '“How are your energy levels today?”',
                      '“Sending gentle chamomile tea warmth 🍵”',
                      '“Experiencing mild brain fog too?”'
                    ].map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => setWhisperText(prompt.replace(/[“”"]/g, '').trim())}
                        className="font-label-sm text-label-sm px-3 py-1 rounded-full bg-[#feaab7]/40 text-[#610011] hover:bg-[#8b001d] hover:text-white transition-colors text-left cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Alert */}
            {whisperAlert && (
              <div className="mt-3 p-2 px-3 rounded-lg bg-[#feaab7] text-[#610011] text-center font-label-sm text-label-sm font-semibold animate-pulse">
                ✨ Warm whisper sent to {currentTwin.name}!
              </div>
            )}
          </div>
        </div>

        {/* Community Guidelines Covenant Banner */}
        <div className="w-full bg-gradient-to-r from-[#8b001d] to-[#610011] rounded-2xl p-6 text-white shadow-[0_12px_28px_rgba(153,0,36,0.15)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[32px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm tracking-tight text-white font-semibold">
                  The Sakhi Sanctuary Covenant
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-label-sm text-label-sm uppercase tracking-widest font-bold">
                  Active Vigilance
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-white/90 max-w-3xl">
                100% Anti-Bullying, Zero-Judgment, Moderated 24/7 by Women Health Champions & Certified Gynaecologists. Medical telemetry is scrubbed; empathy is sovereign.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={() => setIsCharterModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-white text-[#610011] font-label-lg text-label-lg shadow-sm hover:bg-[#feaab7] transition-all font-semibold"
            >
              Read Sanctuary Charter
            </button>
          </div>
        </div>

        {/* Discussion Forum Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
            <div>
              <h2 className="font-headline-md text-headline-md text-[#610011] font-semibold">
                Sanctuary Dialogues
              </h2>
              <p className="font-body-md text-body-md text-[#594140]">
                Real, open threads moderated by holistic health practitioners.
              </p>
            </div>

            {/* Filter Chips & Share */}
            <div className="flex items-center flex-wrap gap-3">
              <div className="flex items-center bg-white rounded-full p-1 shadow-sm border border-[#eed4d8]/60">
                {[
                  { id: 'all', label: 'All Circles' },
                  { id: 'follicular', label: 'Follicular (Active)' },
                  { id: 'luteal', label: 'Luteal Support' },
                  { id: 'seeds', label: 'Seed Nutrition' }
                ].map((tab) => {
                  const isActive = activeFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                      className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#8b001d] text-white shadow-sm font-semibold'
                          : 'text-[#594140] hover:text-[#610011]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setIsNewThreadModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#8b001d] text-white font-label-lg text-label-lg shadow-sm hover:bg-[#610011] transition-all cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">edit_square</span>
                <span>Share a Thought</span>
              </button>
            </div>
          </div>

          {/* Threads Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredThreads.map((thread) => {
              const isLiked = !!likedThreads[thread.id];
              return (
                <div
                  key={thread.id}
                  className="bg-white rounded-2xl p-6 shadow-[0_12px_32px_-4px_rgba(153,0,36,0.05)] hover:shadow-[0_16px_36px_-2px_rgba(153,0,36,0.12)] transition-all flex flex-col justify-between space-y-4 group border border-[#eed4d8]/60"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-[#feaab7] text-[#610011] flex items-center justify-center font-title-md text-title-md">
                          {thread.avatarEmoji}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-title-sm text-title-md text-[#26181b] font-semibold">
                            {thread.authorNumber}
                          </span>
                          <span className="font-label-sm text-label-sm text-[#8d4a56]">
                            {thread.phaseLabel}
                          </span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#feaab7]/40 text-[#610011] font-label-sm text-label-sm font-semibold">
                        {thread.badge}
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-headline-sm text-[#26181b] group-hover:text-[#610011] transition-colors leading-snug font-semibold">
                      {thread.title}
                    </h3>
                    <p className="font-body-md text-body-md text-[#594140] line-clamp-3">
                      {thread.content}
                    </p>

                    {thread.image && (
                      <div className="w-full h-36 rounded-xl overflow-hidden bg-[#fff0f2]">
                        <img
                          src={thread.image}
                          alt={thread.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-3 flex items-center justify-between text-[#594140] border-t border-[#eed4d8]/40">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleLikeThread(thread.id)}
                        className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isLiked ? 'text-[#8b001d]' : 'text-[#594140] hover:text-[#610011]'
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          favorite
                        </span>
                        <span className="font-label-md text-label-md font-semibold">{thread.likes}</span>
                      </button>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">chat_bubble_outline</span>
                        <span className="font-label-md text-label-md">{thread.replies} replies</span>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm text-[#8d4a56]">{thread.timeAgo}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* New Anonymous Thread Modal */}
      {isNewThreadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative space-y-4 border border-[#eed4d8]/80">
            <div className="flex items-center justify-between pb-1 border-b border-[#eed4d8]/40">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#610011] text-[24px]">forum</span>
                <h3 className="font-headline-sm text-headline-sm text-[#610011] font-semibold">
                  New Anonymous Thread
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNewThreadModalOpen(false)}
                className="p-1 rounded-full text-[#594140] hover:bg-[#fff0f2]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-body-sm text-body-sm text-[#594140]">
              Your handle will show as <span className="font-semibold text-[#610011]">Sister #791 (Day 9 Follicular)</span>.
            </p>

            <form onSubmit={handlePublishThread} className="space-y-3">
              <div className="flex gap-2">
                {['Follicular Wisdom', 'Luteal Remedy', 'Nutrition', 'Curious Question'].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setNewBadge(b)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      newBadge === b ? 'bg-[#8b001d] text-white' : 'bg-[#fff0f2] text-[#594140]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>

              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Title your reflection or question..."
                className="w-full px-4 py-3 rounded-xl bg-[#fff8f7] text-[#26181b] font-title-md text-title-md placeholder:text-[#8d706f] focus:outline-none border border-[#eed4d8]/60 focus:border-[#8b001d]"
              />

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs text-[#8d4a56]">
                  <span className="font-semibold">Reflection Content</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenTranscriber) {
                        onOpenTranscriber('Community Sisterhood', newTitle || 'Sanctuary Dialogue Post', (text) => {
                          setNewContent((prev) => (prev ? `${prev} ${text}` : text));
                        });
                      }
                    }}
                    className="text-xs text-[#8b001d] hover:text-[#610011] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">speech_to_text</span>
                    <span>Dictate with gemini-3.5-transcribe</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Share what you are feeling, experiencing, or inquiring about with gentle vulnerability..."
                  className="w-full p-4 rounded-xl bg-[#fff8f7] text-[#26181b] font-body-md text-body-md placeholder:text-[#8d706f] focus:outline-none border border-[#eed4d8]/60 focus:border-[#8b001d] resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#eed4d8]/40">
                <div className="flex items-center gap-1.5 text-[#594140] font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#610011]">shield</span>
                  <span>Auto-moderated for gentle safety</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#8b001d] text-white font-label-lg text-label-lg shadow-sm hover:bg-[#610011] transition-all font-semibold"
                >
                  Publish Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sanctuary Charter Modal */}
      {isCharterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-[#eed4d8]/80">
            <div className="flex items-center justify-between border-b border-[#eed4d8]/40 pb-2">
              <div className="flex items-center gap-2 text-[#610011]">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
                <h3 className="font-headline-sm text-headline-sm font-semibold">The Sakhi Covenant</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCharterModalOpen(false)}
                className="p-1 rounded-full text-[#594140] hover:bg-[#fff0f2]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-3 text-xs text-[#594140] leading-relaxed">
              <div className="p-3 bg-[#fff0f2] rounded-xl border border-[#eed4d8]/60">
                <h5 className="font-bold text-[#610011] mb-1">1. Anonymity is Sacred</h5>
                <p>Never solicit personally identifiable information, real identities, addresses, or private social handles.</p>
              </div>
              <div className="p-3 bg-[#fff0f2] rounded-xl border border-[#eed4d8]/60">
                <h5 className="font-bold text-[#610011] mb-1">2. Zero Judgment</h5>
                <p>Varied rhythms, pain thresholds, pregnancy intentions, and life stages are accepted with unconditional grace.</p>
              </div>
              <div className="p-3 bg-[#fff0f2] rounded-xl border border-[#eed4d8]/60">
                <h5 className="font-bold text-[#610011] mb-1">3. Verified Clinical Safety</h5>
                <p>All herbal and pharmacological questions are reviewed by on-duty OB-GYNs before pinned answers appear.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsCharterModalOpen(false)}
              className="w-full py-2.5 rounded-full bg-[#8b001d] text-white text-xs font-semibold hover:bg-[#610011]"
            >
              I Affirm the Covenant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
