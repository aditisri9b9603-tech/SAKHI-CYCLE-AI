import React from 'react';

export const FooterBanner: React.FC = () => {
  return (
    <footer className="w-full bg-white/90 backdrop-blur-md shadow-[0_-4px_16px_rgba(153,0,36,0.03)] border-t border-[#eed4d8]/40">
      <div className="w-full px-6 lg:px-10 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-[#610011]">
          <span className="material-symbols-outlined text-[18px]">temp_preferences_custom</span>
          <p className="font-headline-sm text-headline-sm text-[#610011] italic text-sm md:text-base">
            “Nourish your rising vitality with complex carbs and active movement today.”
          </p>
        </div>
        <div className="flex items-center gap-4 text-[#594140] font-body-sm text-body-sm">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#610011]">lock</span>
            <span>E2E Encrypted Health Vault</span>
          </span>
          <span className="hidden lg:inline text-[#e1bebd]">•</span>
          <span className="hidden lg:inline">© 2025 Sakhi Cycle Technologies Inc.</span>
        </div>
      </div>
    </footer>
  );
};
