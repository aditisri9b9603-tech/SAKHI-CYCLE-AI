import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AiCompanionScreenProps {
  onOpenTranscriber?: (context?: string, title?: string, callback?: (text: string) => void) => void;
}

export const AiCompanionScreen: React.FC<AiCompanionScreenProps> = ({ onOpenTranscriber }) => {
  const { userProfile, cycleEntries } = useAuth();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; time?: string }>>([
    {
      role: 'assistant',
      text: `Hello, ${userProfile?.displayName?.split(' ')[0] || 'friend'}! 🌸 I am Sakhi, your cycle wellness friend.

You are on Day ${userProfile?.cycleDay || 9} of your cycle (${userProfile?.currentPhase || 'Rising Energy'}). How is your body feeling right now? 

You can ask me literally anything—cramps, energy dips, bloating, foods to eat, sleep, mood swings, fertility, or late periods. I explain everything in simple, comforting words! 💖`,
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleSend = async (questionToSend?: string) => {
    const text = (questionToSend || inputText).trim();
    if (!text) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { role: 'user', text, time: timestamp }]);
    setInputText('');
    setIsTyping(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const res = await fetch('/api/companion/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          question: text,
          userPhase: userProfile?.currentPhase || 'Follicular',
          cycleDay: userProfile?.cycleDay || 9,
          recentSymptoms: cycleEntries.slice(0, 3).map((e) => e.symptoms).join('; '),
        }),
      });

      clearTimeout(timeoutId);

      const data = await res.json().catch(() => ({}));
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const answerText =
        data.answer ||
        `On Day ${userProfile?.cycleDay || 9} (${userProfile?.currentPhase || 'Rising Energy'}), your body is gently building energy. Sip warm herbal teas, stay hydrated, and honor your natural rhythm! 🌸`;

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: answerText,
          time: replyTime,
        },
      ]);
    } catch (err: any) {
      console.warn('Companion connection notice:', err?.message || err);
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `On Day ${userProfile?.cycleDay || 9} (${userProfile?.currentPhase || 'Rising Energy'}), your body is naturally renewing. Try sipping warm peppermint or ginger tea, staying well-hydrated, and resting your pelvic muscles. Let me know what else you are feeling! 🌸`,
          time: replyTime,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    if (onOpenTranscriber) {
      onOpenTranscriber('Sakhi AI Question', 'Voice Question for Sakhi AI', (text) => {
        setInputText((prev) => (prev ? `${prev} ${text}` : text));
      });
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const quickQuestions = [
    'Why do I feel cramps today?',
    'What foods boost energy now?',
    'How can I ease tummy bloating?',
    'Why am I having mood swings?',
    'Best gentle exercise for this phase?',
    'How does sleep affect my hormones?',
    'Signs of ovulation to look for?',
  ];

  return (
    <div className="flex flex-col w-full text-[#26181b]">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ffd5df]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#db2777] to-[#be185d] text-white flex items-center justify-center shadow-md shadow-[#db2777]/25">
              <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-[#831843] font-semibold flex items-center gap-2">
                <span>Sakhi AI Friend</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#fce7f3] text-[#db2777] text-[10px] font-bold uppercase tracking-wider">
                  Always Online
                </span>
              </h2>
              <span className="text-xs text-[#594140]">
                Ask any question about your body, feelings, or food in plain, gentle English
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#fff0f3] text-[#db2777] text-xs font-bold border border-[#ffd5df] flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>100% Private & Encrypted</span>
          </span>
        </div>

        {/* Chat Window in Soft Crimson White & Pastel Pink */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-[#ffd5df] min-h-[520px] flex flex-col justify-between space-y-4">
          {/* Messages Area */}
          <div className="space-y-4 overflow-y-auto max-h-[460px] pr-2">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#db2777] to-[#be185d] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    🌸
                  </div>
                )}
                <div className="flex flex-col max-w-xl group relative">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-[#db2777] to-[#be185d] text-white rounded-tr-xs shadow-xs'
                        : 'bg-[#fff5f7] text-[#26181b] border border-[#ffd5df] rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {m.text}
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-1">
                    {m.time && (
                      <span className="text-[10px] text-[#8d706f] font-mono">
                        {m.time}
                      </span>
                    )}
                    {m.role === 'assistant' && (
                      <button
                        type="button"
                        onClick={() => handleCopy(m.text, idx)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-[#db2777] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[12px]">
                          {copiedIdx === idx ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-[#db2777] p-3 rounded-2xl bg-[#fff0f3] w-fit border border-[#ffd5df]">
                <span className="w-2 h-2 rounded-full bg-[#db2777] animate-ping"></span>
                <span>Sakhi is answering your question with love...</span>
              </div>
            )}
          </div>

          {/* Quick Question Chips */}
          <div className="space-y-2 pt-2 border-t border-[#ffe4eb]">
            <div className="text-[11px] font-bold text-[#831843] uppercase tracking-wider">
              Tap any question to ask instantly:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 rounded-full bg-[#fff5f7] hover:bg-[#ffe5ec] text-[#831843] hover:text-[#db2777] border border-[#ffd5df] text-xs font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 pt-2"
          >
            <button
              type="button"
              onClick={handleVoiceInput}
              className="p-3.5 rounded-2xl bg-[#fff0f3] hover:bg-[#ffe5ec] text-[#db2777] border border-[#ffd5df] transition-all cursor-pointer shadow-xs"
              title="Speak Question"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about your cycle, moods, foods, or body feelings..."
              className="flex-1 p-3.5 rounded-2xl bg-[#fff5f7] border border-[#ffd5df] text-xs sm:text-sm text-[#26181b] focus:outline-none focus:bg-white focus:border-[#db2777] transition-all"
            />

            <button
              type="submit"
              disabled={isTyping || !inputText.trim()}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-[#db2777] to-[#be185d] text-white hover:from-[#be185d] hover:to-[#9d174d] transition-all shadow-md shadow-[#db2777]/25 cursor-pointer disabled:opacity-50 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
