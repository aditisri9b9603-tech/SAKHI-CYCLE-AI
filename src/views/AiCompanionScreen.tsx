import React, { useState } from 'react';

export const AiCompanionScreen: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Greetings, Devi Priya. You are on Cycle Day 9 in your Follicular Phase. Your LH/E2 ratio sits at an optimal 1:1.08. How can I support your somatic energy or hormonal inquiry today?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = 'In your Follicular Phase, rising estradiol promotes enhanced neural plasticity, social expansion, and higher pain tolerance. Focus on creative milestones and consider pairing aerobic motion with 420mg magnesium glycinate before bed.';
      if (userMsg.toLowerCase().includes('cramp') || userMsg.toLowerCase().includes('pain')) {
        reply = 'For pelvic twinges on Day 9, this commonly coincides with mid-follicular recruitment of the dominant graafian follicle. Acupressure on SP6 (4 fingers above your medial ankle bone) paired with warm chamomile or 432 Hz acoustic resonance will gently ease myometrial tension.';
      } else if (userMsg.toLowerCase().includes('food') || userMsg.toLowerCase().includes('diet')) {
        reply = 'During Day 9, prioritize raw pumpkin and ground flax seeds to support liver metabolization of rising estrogens, alongside vibrant prebiotic leafy greens.';
      }
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-4xl mx-auto w-full px-6 lg:px-10 py-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#eed4d8]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#8b001d] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-[#610011] font-semibold">
                Sakhi AI Endocrine Companion
              </h2>
              <span className="text-xs text-[#8d4a56]">Phase-Calibrated Biometric Intelligence</span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#feaab7]/40 text-[#610011] text-xs font-bold">
            Zero-Knowledge Protected
          </span>
        </div>

        {/* Chat Area */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eed4d8]/60 min-h-[440px] flex flex-col justify-between space-y-4">
          <div className="space-y-4 overflow-y-auto max-h-[460px] pr-2">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#feaab7] text-[#610011] flex items-center justify-center shrink-0 text-sm font-bold">
                    S
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl max-w-lg text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#8b001d] text-white'
                      : 'bg-[#fff0f2] text-[#26181b] border border-[#eed4d8]/60'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-[#8d706f]">
                <span className="w-2 h-2 rounded-full bg-[#8b001d] animate-ping"></span>
                <span>Sakhi is analyzing your endocrine biomarkers...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="relative mt-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything regarding your cycle day 9 biomarkers, nutrition, or somatic feelings..."
              className="w-full pl-4 pr-12 py-3.5 rounded-full bg-[#fff8f7] text-[#26181b] text-sm border border-[#eed4d8]/70 focus:outline-none focus:border-[#8b001d]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#8b001d] text-white flex items-center justify-center hover:bg-[#610011] shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
