import React, { useState } from 'react';
import { PRODUCTS_DATA, VIDEO_GUIDES } from '../data/mockData';
import { ProductItem, VideoGuide } from '../types';

interface PeriodProductsScreenProps {
  onAddToCart: (product: ProductItem) => void;
  onOpenCart: () => void;
}

export const PeriodProductsScreen: React.FC<PeriodProductsScreenProps> = ({
  onAddToCart,
  onOpenCart
}) => {
  // Video player modal
  const [selectedVideo, setSelectedVideo] = useState<VideoGuide | null>(null);

  // Diagnostic Quiz State
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [quizResult, setQuizResult] = useState<{ title: string; desc: string } | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleSelectQuizOption = (step: number, key: string, value: string) => {
    const updated = { ...quizAnswers, [key]: value };
    setQuizAnswers(updated);

    if (step < 3) {
      setQuizStep(step + 1);
    } else {
      calculateResult(updated);
    }
  };

  const calculateResult = (answers: { [key: string]: string }) => {
    setQuizStep(4);
    if (answers.step3 === 'pads_only' || answers.step2 === 'sensitive') {
      setQuizResult({
        title: 'Bamboo Biodegradable Pads + Modal Comfort Underwear',
        desc: 'Gentle external flow management with zero synthetic dyes or pesticide residues touching sensitive mucous membranes.'
      });
    } else if (answers.step1 === 'heavy' || answers.step2 === 'active') {
      setQuizResult({
        title: 'Platinum Silicone Cup + Heat Patch Duo',
        desc: 'Maximum 12-hour volumetric protection allowing high motion freedom coupled with targeted somatic mugwort cramp soothing.'
      });
    } else {
      setQuizResult({
        title: 'Reusable High-Flow Underwear + Herbal Heat Wrap',
        desc: 'Supreme breathable comfort for restorative days, keeping pelvic tension minimized with all-day effortless absorption.'
      });
    }
  };

  const handleResetQuiz = () => {
    setQuizStep(1);
    setQuizAnswers({});
    setQuizResult(null);
  };

  const handleAddProduct = (product: ProductItem) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-6 lg:px-10 py-6 flex flex-col gap-10 max-w-[1400px] mx-auto w-full">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-[#feaab7]/25 to-[#fff0f2] p-6 md:p-10 shadow-[0_12px_36px_-4px_rgba(153,0,36,0.07)] border border-[#eed4d8]/60">
          <div className="absolute -right-20 -bottom-24 w-96 h-96 rounded-full bg-[#ffd9de]/40 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-[#610011]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#610011] font-bold">
                  Clinical Grade • Sustainable Rituals
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-[#610011] tracking-tight font-semibold">
                Period Care & Video Sanctuary
              </h2>
              <p className="font-body-lg text-body-lg text-[#594140]">
                Master body-safe menstrual technology through step-by-step masterclasses and zero-waste biological essentials formulated without endocrine disruptors.
              </p>
            </div>

            {/* Impact Badge */}
            <div className="flex items-center gap-3 bg-white/85 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-sm border border-[#eed4d8]/60 self-start lg:self-auto">
              <div className="w-10 h-10 rounded-full bg-[#feaab7] flex items-center justify-center text-[#610011]">
                <span className="material-symbols-outlined text-[22px]">nest_eco_leaf</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase text-[#8d4a56] font-semibold">Verified Impact</span>
                <span className="font-title-md text-title-md text-[#26181b] font-bold">14,200 kg Waste Prevented</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Masterclasses (YouTube Guides) */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[#610011]">
                <span className="material-symbols-outlined text-[20px]">smart_display</span>
                <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
                  Cinematic Masterclasses
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-[#26181b] font-semibold">
                YouTube Educational Guides
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[#8d4a56] font-label-md text-label-md">
              <span>Peer Reviewed by OB-GYNs</span>
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEO_GUIDES.map((guide) => (
              <article
                key={guide.id}
                onClick={() => setSelectedVideo(guide)}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(153,0,36,0.04)] hover:shadow-[0_16px_32px_-4px_rgba(153,0,36,0.12)] transition-all duration-300 border border-[#eed4d8]/60 cursor-pointer"
              >
                <div className="relative w-full aspect-video bg-[#fff0f2] overflow-hidden">
                  <img
                    src={guide.thumbnail}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8b001d]/80 via-transparent to-black/20 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-md text-[#610011] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#610011] group-hover:text-white transition-all duration-300">
                      <span className="material-symbols-outlined text-[28px] translate-x-0.5">play_arrow</span>
                    </div>
                  </div>
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                    <span className="material-symbols-outlined text-[14px] text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                      play_circle
                    </span>
                    <span>YouTube 4K</span>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-md text-white text-xs px-2 py-0.5 rounded-full font-medium">
                    {guide.duration}
                  </span>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm uppercase text-[#8d4a56] font-semibold">
                      {guide.category}
                    </span>
                    <h4 className="font-title-lg text-title-lg text-[#26181b] group-hover:text-[#610011] transition-colors line-clamp-2 font-semibold">
                      {guide.title}
                    </h4>
                    <p className="font-body-md text-body-md text-[#594140] line-clamp-2">
                      {guide.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#eed4d8]/40">
                    <div className="flex items-center gap-1.5 text-[#594140]">
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      <span className="font-body-sm text-body-sm">{guide.views}</span>
                    </div>
                    <span className="text-[#610011] font-label-md text-label-md flex items-center gap-0.5 group-hover:translate-x-1 transition-transform font-semibold">
                      Watch Guide <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive Diagnostics & Impact Bento */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Quiz Container (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-2xl shadow-[0_12px_36px_-4px_rgba(153,0,36,0.06)] flex flex-col gap-4 border border-[#eed4d8]/60">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2 border-b border-[#eed4d8]/40">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[#610011] uppercase tracking-wider font-semibold">
                  Interactive Biological Diagnostics
                </span>
                <h3 className="font-headline-md text-headline-md text-[#26181b] font-semibold">
                  Find Your Perfect Cycle Match
                </h3>
              </div>
              <div className="flex items-center gap-2 text-[#594140] font-label-md text-label-md">
                <span>{quizStep <= 3 ? `Step ${quizStep} of 3` : 'Match Complete'}</span>
                <div className="w-24 h-1.5 bg-[#fff0f2] rounded-full overflow-hidden border border-[#eed4d8]/50">
                  <div
                    className="h-full bg-[#8b001d] transition-all duration-300"
                    style={{ width: `${(Math.min(quizStep, 3) / 3) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Step 1 */}
            {quizStep === 1 && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <h4 className="font-title-lg text-title-lg text-[#26181b] font-semibold">
                    What does your peak menstrual flow look like on Days 1-2?
                  </h4>
                  <p className="font-body-sm text-body-sm text-[#594140]">
                    This identifies required capacity without premature saturation risk.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { val: 'light', title: 'Light / Spotting', sub: 'Changes pad < 2-3 times daily' },
                    { val: 'moderate', title: 'Regular / Balanced', sub: 'Standard tampon/pad every 4 hrs' },
                    { val: 'heavy', title: 'Heavy / Clots', sub: 'Saturates super absorbency in < 2 hrs' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => handleSelectQuizOption(1, 'step1', opt.val)}
                      className="flex flex-col p-4 rounded-xl text-left bg-[#fff0f2] hover:bg-[#feaab7]/40 hover:border-[#8b001d] border border-transparent transition-all cursor-pointer"
                    >
                      <span className="font-title-md text-title-md text-[#26181b] font-semibold">{opt.title}</span>
                      <span className="font-body-sm text-body-sm text-[#594140] mt-1">{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {quizStep === 2 && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <h4 className="font-title-lg text-title-lg text-[#26181b] font-semibold">
                    How would you describe your daily routine & pelvic comfort?
                  </h4>
                  <p className="font-body-sm text-body-sm text-[#594140]">
                    Helps us weigh internal versus external ergonomic solutions.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { val: 'active', title: 'High Movement', sub: 'Athletics, swimming, long work shifts' },
                    { val: 'sensitive', title: 'Sensitive Pelvic Zone', sub: 'Prone to UTI/thrush, intense cramps' },
                    { val: 'cozy', title: 'Rest & WFH Mode', sub: 'Prioritizes zero constriction' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => handleSelectQuizOption(2, 'step2', opt.val)}
                      className="flex flex-col p-4 rounded-xl text-left bg-[#fff0f2] hover:bg-[#feaab7]/40 hover:border-[#8b001d] border border-transparent transition-all cursor-pointer"
                    >
                      <span className="font-title-md text-title-md text-[#26181b] font-semibold">{opt.title}</span>
                      <span className="font-body-sm text-body-sm text-[#594140] mt-1">{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {quizStep === 3 && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <h4 className="font-title-lg text-title-lg text-[#26181b] font-semibold">
                    Have you ever used internal collection devices before?
                  </h4>
                  <p className="font-body-sm text-body-sm text-[#594140]">
                    Determines recommended firmness and stem design.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { val: 'cup_pro', title: 'Experienced User', sub: 'Comfortable with cups & discs' },
                    { val: 'tampon_only', title: 'Tampons Only', sub: 'Curious to upgrade safely' },
                    { val: 'pads_only', title: 'Strictly External', sub: 'Prefers gentle cotton or underwear' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => handleSelectQuizOption(3, 'step3', opt.val)}
                      className="flex flex-col p-4 rounded-xl text-left bg-[#fff0f2] hover:bg-[#feaab7]/40 hover:border-[#8b001d] border border-transparent transition-all cursor-pointer"
                    >
                      <span className="font-title-md text-title-md text-[#26181b] font-semibold">{opt.title}</span>
                      <span className="font-body-sm text-body-sm text-[#594140] mt-1">{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Result */}
            {quizStep === 4 && quizResult && (
              <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-[#feaab7]/30 rounded-2xl border border-[#feaab7]">
                <div className="w-16 h-16 rounded-full bg-[#8b001d] text-white flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-[32px]">auto_awesome</span>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#610011] font-bold">
                    Your Clinical Recommendation
                  </span>
                  <h5 className="font-headline-sm text-headline-sm text-[#26181b] font-semibold">
                    {quizResult.title}
                  </h5>
                  <p className="font-body-md text-body-md text-[#594140]">
                    {quizResult.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="px-4 py-2 bg-white text-[#610011] rounded-full font-label-md text-label-md hover:bg-[#8b001d] hover:text-white transition-all shadow-sm border border-[#eed4d8]/60 cursor-pointer"
                >
                  Retake Quiz
                </button>
              </div>
            )}

            {/* Quiz Footer Navigation */}
            <div className="flex items-center justify-between pt-2">
              {quizStep > 1 && quizStep <= 3 ? (
                <button
                  type="button"
                  onClick={() => setQuizStep(quizStep - 1)}
                  className="px-4 py-1.5 rounded-full text-[#8d4a56] hover:text-[#610011] font-label-md text-label-md flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back
                </button>
              ) : (
                <div></div>
              )}
              <div className="text-[#594140] font-body-sm text-body-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#610011]">security</span>
                <span>Biocompatible recommendations generated instantly</span>
              </div>
            </div>
          </div>

          {/* Collective Sanctuary Impact (4 cols) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#610011] via-[#8b001d] to-[#735c00] text-white p-6 md:p-8 rounded-2xl shadow-[0_16px_36px_rgba(153,0,36,0.22)] flex flex-col justify-between min-h-[380px] relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#cca730]/20 blur-2xl pointer-events-none"></div>

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#ffb3b2]">
                  Collective Sanctuary Impact
                </span>
                <span className="material-symbols-outlined text-[#ffd9de] text-[24px]">public</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display-lg text-display-lg font-headline-lg tracking-tight text-white leading-none">
                  14,200
                </span>
                <span className="font-title-lg text-title-lg text-[#ffb3b2] mt-1 font-semibold">
                  Kilograms plastic eliminated
                </span>
              </div>
              <p className="font-body-md text-body-md text-[#ffd9de]/90 leading-relaxed">
                By transitioning to reusable platinum silicone & organic plant starch, Sakhi members have diverted 1.1 million non-biodegradable synthetic pads from ocean runoff.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2 relative z-10">
              <div className="flex justify-between font-label-sm text-label-sm text-[#ffb3b2]">
                <span>2025 Collective Goal</span>
                <span className="font-bold">71% Reached</span>
              </div>
              <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#ffd9de] to-[#ffe088] w-[71%] rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Curated Apothecary (Catalog) */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-[#610011]">
                <span className="material-symbols-outlined text-[20px]">local_mall</span>
                <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
                  Curated Apothecary
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-[#26181b] font-semibold">
                Sustainably Engineered Period Care
              </h3>
            </div>
            <div className="flex items-center gap-3 text-[#8d4a56] font-label-md text-label-md">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                <span>In Stock</span>
              </span>
              <span>•</span>
              <span>Discreet Compostable Packaging</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS_DATA.map((product) => {
              const isAdded = addedProductId === product.id;
              return (
                <article
                  key={product.id}
                  className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(153,0,36,0.04)] hover:shadow-[0_16px_36px_rgba(153,0,36,0.12)] transition-all duration-300 border border-[#eed4d8]/60"
                >
                  <div className="relative w-full aspect-square bg-[#fff0f2] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md text-[#610011] font-label-sm text-label-sm px-2.5 py-1 rounded-full shadow-sm font-semibold">
                      {product.badge}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1 gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-[#8d4a56]">{product.subBadge}</span>
                        <span className="font-title-md text-title-md text-[#610011] font-bold">${product.price}</span>
                      </div>
                      <h4 className="font-title-md text-title-md text-[#26181b] font-semibold line-clamp-2">
                        {product.title}
                      </h4>
                      <p className="font-body-sm text-body-sm text-[#594140] line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddProduct(product)}
                      className={`w-full py-2.5 px-4 rounded-full font-label-md text-label-md transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#8b001d] text-white hover:bg-[#610011]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isAdded ? 'check_circle' : 'shopping_bag'}
                      </span>
                      <span>{isAdded ? 'Added to Sanctuary Kit' : 'Add to Sanctuary Kit'}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Synchronized Product Subscriptions Banner */}
        <div className="rounded-2xl bg-[#fff0f2] p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 border border-[#eed4d8]/60">
          <div className="flex items-center gap-4 max-w-xl">
            <div className="w-12 h-12 rounded-full bg-[#feaab7] flex items-center justify-center text-[#610011] shrink-0">
              <span className="material-symbols-outlined text-[26px]">cycle</span>
            </div>
            <div className="flex flex-col">
              <h4 className="font-headline-sm text-headline-sm text-[#26181b] font-semibold">
                Synchronized Product Subscriptions
              </h4>
              <p className="font-body-md text-body-md text-[#594140]">
                Automate deliveries 3 days prior to your predicted luteal phase so your sanctuary cabinet is always prepped without stockpiling.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button
              type="button"
              onClick={onOpenCart}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-[#610011] font-title-md text-title-md hover:bg-[#feaab7]/30 transition-all border border-[#eed4d8]/60 shadow-sm"
            >
              Manage Delivery Cadence
            </button>
            <button
              type="button"
              onClick={() => alert('Biometric cadence synchronized! Future shipments aligned to Cycle Day 24.')}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#8b001d] text-white font-title-md text-title-md hover:bg-[#610011] transition-all shadow-md"
            >
              Sync with Cycle
            </button>
          </div>
        </div>
      </div>

      {/* Video Masterclass Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-[#eed4d8]/60">
            <div className="px-5 py-3.5 flex items-center justify-between bg-[#fff0f2] border-b border-[#eed4d8]/40">
              <div className="flex items-center gap-2 text-[#610011]">
                <span className="material-symbols-outlined text-[18px] text-red-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_circle
                </span>
                <span className="font-title-md text-title-md text-[#26181b] truncate max-w-lg font-semibold">
                  {selectedVideo.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#26181b] hover:bg-[#feaab7]/40 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="relative w-full aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-white flex justify-between items-center text-xs text-[#594140]">
              <span>Category: {selectedVideo.category}</span>
              <span>{selectedVideo.views}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
