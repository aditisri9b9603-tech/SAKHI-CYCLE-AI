import React from 'react';

export const NutritionScreen: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-6 space-y-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-[#feaab7]/25 to-[#fff0f2] p-6 md:p-8 shadow-[0_12px_36px_-4px_rgba(153,0,36,0.07)] border border-[#eed4d8]/60">
          <div className="flex flex-col max-w-2xl gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#610011] font-bold">
              Cellular Bio-Nutrition • Phase Synchronized
            </span>
            <h1 className="font-headline-lg text-headline-lg text-[#610011] font-semibold">
              Follicular Phase Micronutrient Protocols
            </h1>
            <p className="font-body-md text-body-md text-[#594140]">
              Fuel rising estrogen with liver-detoxifying brassicas, fermented sourdough, and seed cycling protocols designed to optimize follicle maturation.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Seed Cycling */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eed4d8]/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#feaab7] text-[#610011] flex items-center justify-center font-bold">
              🌱
            </div>
            <h3 className="font-headline-sm text-headline-sm text-[#26181b] font-semibold">Seed Cycling (Days 1–14)</h3>
            <p className="text-xs text-[#594140] leading-relaxed">
              1 tbsp raw ground flax seeds + 1 tbsp raw pumpkin seeds daily. Provides lignans that bind excess estrogen and rich zinc supporting progesterone receptors.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#8b001d] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check</span>
              <span>Logged with Morning Oat Bowl</span>
            </div>
          </div>

          {/* Card 2: Micronutrient Focus */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eed4d8]/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#feaab7] text-[#610011] flex items-center justify-center font-bold">
              🧪
            </div>
            <h3 className="font-headline-sm text-headline-sm text-[#26181b] font-semibold">420mg Magnesium Glycinate</h3>
            <p className="text-xs text-[#594140] leading-relaxed">
              Chelated bio-identical magnesium relaxes uterine myometrial tissue, supports mitochondrial ATP synthesis, and modulates nervous excitability.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Prescription Active in Cabinet</span>
            </div>
          </div>

          {/* Card 3: Phyto-Estrogen Support */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eed4d8]/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#feaab7] text-[#610011] flex items-center justify-center font-bold">
              🥗
            </div>
            <h3 className="font-headline-sm text-headline-sm text-[#26181b] font-semibold">Fermented & Sprouted Greens</h3>
            <p className="text-xs text-[#594140] leading-relaxed">
              Kimchi, wild fermented sourdough, broccoli sprouts, and avocados replenish your estrobolome gut bacteria to smoothly process rising estradiol.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#8b001d] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">restaurant</span>
              <span>View 12 Phase Recipes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
