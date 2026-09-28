import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CycleClinicalChart } from '../components/CycleClinicalChart';

interface CycleTrackerScreenProps {
  onOpenTranscriber?: (context?: string, title?: string, callback?: (text: string) => void) => void;
}

export const CycleTrackerScreen: React.FC<CycleTrackerScreenProps> = ({ onOpenTranscriber }) => {
  const { user, userProfile, cycleEntries, saveCycleEntry, voiceNotes } = useAuth();

  // Active Tab: 'overview' (Chart & Wheel) vs 'journal' (Quick-Select Daily Journaling) vs 'history'
  const [activeTab, setActiveTab] = useState<'overview' | 'journal' | 'history'>('journal');

  // Selected cycle day (defaults to user's current day or Day 9)
  const [selectedDay, setSelectedDay] = useState(userProfile?.cycleDay || 9);

  // Quick-Select Symptom States
  const [selectedMood, setSelectedMood] = useState<string>('Radiant & Confident');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'High Physical Energy',
    'Clear Glowing Skin',
  ]);
  const [selectedFlow, setSelectedFlow] = useState<string>('Creamy / Moist');
  const [energyLevel, setEnergyLevel] = useState<number>(85);
  const [crampLevel, setCrampLevel] = useState<number>(10);
  const [reflectionNote, setReflectionNote] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Available Quick-Select Moods
  const quickMoods = [
    { label: 'Calm & Peaceful', icon: '🌸' },
    { label: 'Radiant & Confident', icon: '✨' },
    { label: 'Happy & Content', icon: '😌' },
    { label: 'Sensitive & Tender', icon: '🌧️' },
    { label: 'Restless or Anxious', icon: '⚡' },
    { label: 'Low Energy & Tired', icon: '😴' },
    { label: 'Loving & Connected', icon: '💖' },
    { label: 'Grounded & Focused', icon: '🧘' },
  ];

  // Available Quick-Select Body Symptoms
  const quickSymptoms = [
    'Mild Pelvic Cramps',
    'Bloating & Fullness',
    'Tender Breasts',
    'Gentle Headache',
    'Lower Back Ache',
    'Clear Glowing Skin',
    'Ovulation Twinge',
    'Need Extra Sleep',
    'High Physical Energy',
    'Sweet Food Craving',
    'Salty Food Craving',
    'Restless Leg / Muscle Tightness',
  ];

  // Available Cervical Fluid / Flow Options
  const flowOptions = [
    'No Flow (Dry)',
    'Creamy / Moist',
    'Stretchy Egg-White (Fertile)',
    'Light Spotting',
    'Medium Flow',
    'Heavy Flow',
  ];

  // Toggle symptom chip
  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  // Determine simple phase for selected day
  const getPhaseForDay = (day: number) => {
    if (day <= 5) return 'Period Phase';
    if (day <= 13) return 'Rising Energy Phase';
    if (day <= 16) return 'Ovulation Window';
    return 'Calm & Nurture Phase';
  };

  const handleSaveJournal = async () => {
    setIsSaving(true);
    try {
      const phase =
        selectedDay <= 5
          ? 'Menstrual'
          : selectedDay <= 13
          ? 'Follicular'
          : selectedDay <= 16
          ? 'Ovulatory'
          : 'Luteal';

      const compiledSymptoms = [selectedMood, ...selectedSymptoms, selectedFlow].join(', ');
      const detailedNote = reflectionNote
        ? `${reflectionNote} (Energy: ${energyLevel}%, Pelvic Sensation: ${crampLevel}%)`
        : `Feeling ${selectedMood} with ${selectedSymptoms.join(', ') || 'no major symptoms'}. Fluid: ${selectedFlow}.`;

      await saveCycleEntry({
        cycleDay: selectedDay,
        phase,
        mood: selectedMood,
        tags: selectedSymptoms,
        cervicalFluid: selectedFlow,
        energyLevel,
        crampLevel,
        symptoms: compiledSymptoms,
        notes: detailedNote,
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.warn('Journal log notice:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleVoiceInput = () => {
    if (onOpenTranscriber) {
      onOpenTranscriber(
        `Cycle Day ${selectedDay} Journal`,
        `Day ${selectedDay} Reflection & Symptoms`,
        (text) => {
          setReflectionNote((prev) => (prev ? `${prev}\n${text}` : text));
        }
      );
    }
  };

  // Days with logs map for quick badge indicators
  const loggedDays = new Set(cycleEntries.map((e) => e.cycleDay));

  return (
    <div className="flex flex-col w-full text-[#26181b]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-6 space-y-6">
        {/* Soft Pink Welcome Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#fff5f7] to-[#ffe5eb] p-6 sm:p-8 shadow-[0_12px_36px_rgba(244,114,182,0.12)] border border-[#ffd5df]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff0f3] text-[#db2777] text-xs font-semibold border border-[#ffd5df]">
                <span className="w-2 h-2 rounded-full bg-[#db2777] animate-ping"></span>
                <span>Simple Cycle Care & Daily Feelings</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-[#831843] font-semibold">
                Cycle Tracker & Daily Journal
              </h1>
              <p className="font-body-md text-body-md text-[#594140] max-w-xl">
                Easily log how your body feels each day with a single tap. Watch your symptoms, feelings, and natural hormones flow together on your personalized health chart.
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleVoiceInput}
                className="px-4 py-2.5 rounded-full bg-white hover:bg-[#fff0f3] text-[#9d174d] border border-[#ffd5df] text-xs font-semibold shadow-sm flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#db2777]">speech_to_text</span>
                <span>Voice Record Notes</span>
              </button>

              <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#ffd5df] flex items-center gap-3.5 shadow-sm">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#db2777] block">
                    Current Day
                  </span>
                  <span className="font-title-lg text-[#831843] font-bold">
                    {userProfile?.currentPhase || 'Rising Energy'}
                  </span>
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#db2777] to-[#be185d] text-white flex items-center justify-center font-bold text-base shadow-md">
                  D{userProfile?.cycleDay || 9}
                </div>
              </div>
            </div>
          </div>

          {/* MAIN TABS SELECTOR (Journaling vs Cycle Chart vs History) */}
          <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-[#ffd5df]/70">
            <button
              type="button"
              onClick={() => setActiveTab('journal')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'journal'
                  ? 'bg-[#db2777] text-white shadow-md shadow-[#db2777]/25'
                  : 'bg-white text-[#831843] hover:bg-[#fff0f3] border border-[#ffd5df]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">edit_calendar</span>
              <span>Daily Journaling</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-[#db2777] to-[#be185d] text-white shadow-md shadow-[#db2777]/25'
                  : 'bg-white text-[#831843] hover:bg-[#fff0f3] border border-[#ffd5df]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">insights</span>
              <span>Chart & Predictive Forecast</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-[#db2777] text-white shadow-md shadow-[#db2777]/25'
                  : 'bg-white text-[#831843] hover:bg-[#fff0f3] border border-[#ffd5df]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">history_edu</span>
              <span>Past Journal Logs ({cycleEntries.length})</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: DAILY JOURNALING (QUICK SELECT UI) */}
        {/* ============================================================== */}
        {activeTab === 'journal' && (
          <div className="space-y-6">
            {/* 28-Day Quick Selector Strip */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#ffd5df] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#831843] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#db2777]">calendar_month</span>
                  <span>Select Cycle Day to Log or Review</span>
                </span>
                <span className="text-xs text-[#594140] font-medium">
                  Selected: <strong className="text-[#db2777]">Day {selectedDay}</strong> ({getPhaseForDay(selectedDay)})
                </span>
              </div>

              {/* Scrollable Horizontal Day Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1">
                {[...Array(28)].map((_, idx) => {
                  const day = idx + 1;
                  const isSelected = selectedDay === day;
                  const isToday = day === (userProfile?.cycleDay || 9);
                  const isLogged = loggedDays.has(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`shrink-0 w-11 h-14 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#db2777] text-white shadow-md scale-105 font-bold'
                          : isToday
                          ? 'bg-[#ffe4eb] text-[#831843] font-bold border border-[#db2777]'
                          : 'bg-[#fff5f7] text-[#594140] hover:bg-[#ffe5ec] border border-[#ffd5df]'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-semibold">D</span>
                      <span className="text-sm font-bold leading-none">{day}</span>
                      {isLogged && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-1 ${
                            isSelected ? 'bg-white' : 'bg-[#db2777]'
                          }`}
                          title="Logged"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Select Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Quick Moods & Body Symptoms (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#ffd5df] space-y-6">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-[#831843] font-semibold">
                    How are you feeling on Day {selectedDay}?
                  </h3>
                  <p className="text-xs text-[#594140] mt-0.5">
                    Tap any feelings or body signs below. They automatically update your health chart.
                  </p>
                </div>

                {/* Section 1: Mood & Emotions */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-[#831843] uppercase tracking-wider block">
                    1. Emotional Mood
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickMoods.map((m) => {
                      const isChosen = selectedMood === m.label;
                      return (
                        <button
                          key={m.label}
                          type="button"
                          onClick={() => setSelectedMood(m.label)}
                          className={`px-3.5 py-2 rounded-2xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                            isChosen
                              ? 'bg-[#db2777] text-white shadow-sm font-semibold scale-105'
                              : 'bg-[#fff5f7] text-[#831843] border border-[#ffd5df] hover:bg-[#ffe5ec]'
                          }`}
                        >
                          <span>{m.icon}</span>
                          <span>{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Body Symptoms & Sensations */}
                <div className="space-y-2.5 pt-2 border-t border-[#ffe4eb]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#831843] uppercase tracking-wider">
                      2. Physical Symptoms & Signals
                    </label>
                    <span className="text-[11px] text-[#db2777] font-medium">
                      {selectedSymptoms.length} selected
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickSymptoms.map((symp) => {
                      const isSelected = selectedSymptoms.includes(symp);
                      return (
                        <button
                          key={symp}
                          type="button"
                          onClick={() => toggleSymptom(symp)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#be185d] text-white shadow-sm font-semibold'
                              : 'bg-[#fff0f3] text-[#594140] border border-[#ffd5df] hover:bg-[#ffe4eb] hover:text-[#831843]'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {symp}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3: Period Flow & Cervical Fluid */}
                <div className="space-y-2.5 pt-2 border-t border-[#ffe4eb]">
                  <label className="text-xs font-bold text-[#831843] uppercase tracking-wider block">
                    3. Period Flow or Fluid
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {flowOptions.map((opt) => {
                      const isChosen = selectedFlow === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedFlow(opt)}
                          className={`p-2.5 rounded-2xl text-xs font-semibold text-center transition-all cursor-pointer ${
                            isChosen
                              ? 'bg-[#db2777] text-white shadow-sm'
                              : 'bg-[#fff5f7] text-[#831843] border border-[#ffd5df] hover:bg-[#ffe5ec]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Sliders, Notes & Save (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#ffd5df] space-y-6">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-[#831843] font-semibold">
                    Energy & Notes
                  </h3>
                  <p className="text-xs text-[#594140] mt-0.5">
                    Adjust your energy level and add any personal thoughts.
                  </p>
                </div>

                {/* Energy Slider */}
                <div className="space-y-2 p-4 rounded-2xl bg-[#fff5f7] border border-[#ffd5df]">
                  <div className="flex justify-between items-center text-xs font-semibold text-[#831843]">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#db2777]">bolt</span>
                      <span>Daily Energy Level</span>
                    </span>
                    <span className="font-bold text-[#db2777] text-sm">{energyLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(Number(e.target.value))}
                    className="w-full h-2 bg-[#ffd5df] rounded-lg accent-[#db2777] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#594140]">
                    <span>Gentle Rest (0%)</span>
                    <span>Balanced (50%)</span>
                    <span>Full Vitality (100%)</span>
                  </div>
                </div>

                {/* Cramp / Discomfort Slider */}
                <div className="space-y-2 p-4 rounded-2xl bg-[#fff5f7] border border-[#ffd5df]">
                  <div className="flex justify-between items-center text-xs font-semibold text-[#831843]">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#e11d48]">favorite_border</span>
                      <span>Pelvic Cramp / Tension</span>
                    </span>
                    <span className="font-bold text-[#db2777] text-sm">
                      {crampLevel <= 15 ? 'Comfortable (None)' : `${crampLevel}% (Mild)`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={crampLevel}
                    onChange={(e) => setCrampLevel(Number(e.target.value))}
                    className="w-full h-2 bg-[#ffd5df] rounded-lg accent-[#e11d48] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#594140]">
                    <span>Calm (0%)</span>
                    <span>Noticeable (50%)</span>
                    <span>Strong (100%)</span>
                  </div>
                </div>

                {/* Free Reflection Textbox & Voice Recording */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#831843] uppercase tracking-wider">
                      Personal Thoughts or Diary
                    </label>
                    <button
                      type="button"
                      onClick={handleVoiceInput}
                      className="text-xs text-[#db2777] hover:text-[#9d174d] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">mic</span>
                      <span>Speak Note</span>
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={reflectionNote}
                    onChange={(e) => setReflectionNote(e.target.value)}
                    placeholder="Write a quick thought, what tea helped, or how your body feels today..."
                    className="w-full p-3.5 rounded-2xl bg-[#fff5f7] border border-[#ffd5df] text-xs text-[#26181b] focus:outline-none focus:bg-white focus:border-[#db2777] transition-all"
                  />
                </div>

                {/* Save Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSaveJournal}
                    disabled={isSaving}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#db2777] to-[#be185d] hover:from-[#be185d] hover:to-[#9d174d] text-white font-title-md text-sm font-semibold shadow-lg shadow-[#db2777]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">
                          {saveSuccess ? 'check_circle' : 'cloud_upload'}
                        </span>
                        <span>
                          {saveSuccess
                            ? 'Saved to Your Vault & Chart Updated ✓'
                            : `Save Day ${selectedDay} Journal Entry`}
                        </span>
                      </>
                    )}
                  </button>

                  <div className="text-center mt-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('overview')}
                      className="text-xs text-[#db2777] hover:text-[#831843] font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View updated Recharts graph</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: CYCLE OVERVIEW & RECHARTS CHART */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* The Integrated Recharts Visualization */}
            <CycleClinicalChart
              cycleEntries={cycleEntries}
              currentCycleDay={userProfile?.cycleDay || 9}
              selectedDay={selectedDay}
              onSelectDay={(day) => setSelectedDay(day)}
              onSwitchToJournal={(day) => {
                setSelectedDay(day);
                setActiveTab('journal');
              }}
            />

            {/* Interactive 28-Day Circle Dial */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#ffd5df] flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#db2777] mb-2">
                  Interactive 28-Day Wheel
                </span>
                <p className="text-xs text-[#594140] mb-4">
                  Click any day to see its natural phase and open the journal.
                </p>

                {/* Circular Wheel */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-8 border-[#ffe5eb] flex items-center justify-center shadow-inner my-2">
                  <div className="absolute inset-2 rounded-full border border-dashed border-[#f472b6]/40 pointer-events-none"></div>

                  {[...Array(28)].map((_, i) => {
                    const dayNum = i + 1;
                    const angle = (dayNum / 28) * 360 - 90;
                    const rad = (angle * Math.PI) / 180;
                    const r = 125;
                    const x = Math.cos(rad) * r;
                    const y = Math.sin(rad) * r;
                    const isSelected = selectedDay === dayNum;
                    const isCurrent = dayNum === (userProfile?.cycleDay || 9);
                    const isLogged = loggedDays.has(dayNum);

                    return (
                      <button
                        key={dayNum}
                        onClick={() => setSelectedDay(dayNum)}
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                        className={`absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#db2777] text-white scale-125 shadow-md ring-2 ring-[#ffd5df]'
                            : isCurrent
                            ? 'bg-[#ffe4eb] text-[#831843] font-black ring-1 ring-[#db2777]'
                            : isLogged
                            ? 'bg-[#fce7f3] text-[#db2777] font-bold'
                            : 'bg-[#fff5f7] text-[#831843] hover:bg-[#ffe5ec]'
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}

                  {/* Wheel Center Node */}
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <span className="text-[10px] text-[#db2777] uppercase font-bold tracking-widest">
                      Day {selectedDay} of 28
                    </span>
                    <span className="font-headline-md text-headline-md text-[#831843] font-semibold mt-0.5">
                      {getPhaseForDay(selectedDay)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('journal')}
                      className="mt-2 px-3 py-1 rounded-full bg-[#fff0f3] text-[#db2777] hover:bg-[#ffe4eb] text-xs font-semibold border border-[#ffd5df] cursor-pointer"
                    >
                      Log Day {selectedDay}
                    </button>
                  </div>
                </div>

                {/* Phase Color Legend */}
                <div className="flex items-center justify-center gap-3 text-xs text-[#594140] flex-wrap pt-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f472b6]"></span> Period (1-5)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fb7185]"></span> Rising (6-13)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e11d48]"></span> Ovulation (14-16)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9d174d]"></span> Luteal (17-28)
                  </span>
                </div>
              </div>

              {/* Overview Details (6 cols) */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#ffd5df] space-y-5">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-[#831843] font-semibold">
                    Day {selectedDay} Wellness Guide
                  </h3>
                  <p className="text-xs text-[#594140] mt-0.5">
                    What happens in your body during this phase and simple ways to feel your best.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#fff5f7] border border-[#ffd5df] space-y-1">
                    <div className="text-xs font-bold text-[#831843] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#db2777]">spa</span>
                      <span>Hormone Balance</span>
                    </div>
                    <p className="text-xs text-[#594140] leading-relaxed">
                      {selectedDay <= 5 && 'Estrogen and progesterone are at their baseline. Your body naturally wants warmth, deep hydration, and peaceful rest.'}
                      {selectedDay > 5 && selectedDay <= 13 && 'Estrogen is steadily rising, boosting your mood, cognitive focus, and physical endurance.'}
                      {selectedDay >= 14 && selectedDay <= 16 && 'Peak estrogen and LH surge! You are at your most confident and socially energetic window.'}
                      {selectedDay > 16 && 'Progesterone takes center stage to relax your mind. Eat nourishing foods and wind down early.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#fff5f7] border border-[#ffd5df] space-y-1">
                    <div className="text-xs font-bold text-[#831843] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#db2777]">nutrition</span>
                      <span>Best Foods for Day {selectedDay}</span>
                    </div>
                    <p className="text-xs text-[#594140] leading-relaxed">
                      {selectedDay <= 13
                        ? 'Pumpkin seeds, flax seeds, leafy greens, avocados, berries, and antioxidant-rich foods.'
                        : 'Sunflower seeds, sesame seeds, dark chocolate, sweet potatoes, and magnesium-rich walnuts.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#fff5f7] border border-[#ffd5df] space-y-1">
                    <div className="text-xs font-bold text-[#831843] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#db2777]">self_improvement</span>
                      <span>Gentle Movement Suggestion</span>
                    </div>
                    <p className="text-xs text-[#594140] leading-relaxed">
                      {selectedDay <= 5
                        ? 'Slow restorative yoga, gentle stretching, and mindful strolls.'
                        : selectedDay <= 16
                        ? 'Higher intensity workouts, dance, cardio, and strength training.'
                        : 'Pilates, steady walking, nature walks, and evening breathing exercises.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('journal')}
                  className="w-full py-3.5 rounded-full bg-[#db2777] hover:bg-[#be185d] text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                  <span>Record Today's Symptoms & Feelings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: PAST JOURNAL LOGS (FIRESTORE SYNCED) */}
        {/* ============================================================== */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#ffd5df] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ffe4eb]">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-[#831843] font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px] text-[#db2777]">history_edu</span>
                  <span>Your Saved Journal Logs</span>
                </h3>
                <p className="text-xs text-[#594140] mt-0.5">
                  All your past daily feelings and symptom checks stored securely in your private vault.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('journal')}
                className="px-4 py-2 rounded-full bg-[#db2777] text-white text-xs font-semibold hover:bg-[#be185d] shadow-sm flex items-center gap-1 cursor-pointer self-start sm:self-auto"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>New Journal Entry</span>
              </button>
            </div>

            {cycleEntries.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#fff0f3] text-[#db2777] flex items-center justify-center mx-auto text-2xl">
                  🌸
                </div>
                <h4 className="font-title-lg text-[#831843] font-semibold">No journal entries yet</h4>
                <p className="text-xs text-[#594140] max-w-sm mx-auto">
                  Start by logging your symptoms for Day {userProfile?.cycleDay || 9}. It only takes a single tap!
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('journal')}
                  className="px-5 py-2.5 rounded-full bg-[#db2777] text-white text-xs font-semibold shadow-md cursor-pointer"
                >
                  Record Your First Entry
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cycleEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-5 rounded-2xl bg-[#fff5f7] border border-[#ffd5df] space-y-3 flex flex-col justify-between hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-[#ffe4eb]">
                        <span className="px-3 py-1 rounded-full bg-[#db2777] text-white text-xs font-bold">
                          Day {entry.cycleDay} • {entry.phase}
                        </span>
                        <span className="text-[11px] text-[#594140] font-mono">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {entry.mood && (
                        <div className="mt-2.5 text-xs text-[#831843] font-semibold flex items-center gap-1.5">
                          <span>Mood:</span>
                          <span className="px-2 py-0.5 rounded-md bg-white border border-[#fce7f3] text-[#db2777]">
                            {entry.mood}
                          </span>
                        </div>
                      )}

                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {entry.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-full bg-white border border-[#ffd5df] text-[#831843] text-[11px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {entry.notes && (
                        <p className="text-xs text-[#594140] italic mt-2.5 bg-white/70 p-2.5 rounded-xl border border-[#ffe4eb]">
                          "{entry.notes}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#ffe4eb] text-[11px] text-[#831843]">
                      <span>Energy: {entry.energyLevel || 80}%</span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDay(entry.cycleDay);
                          setActiveTab('journal');
                        }}
                        className="text-[#db2777] hover:underline font-semibold"
                      >
                        Edit Entry →
                      </button>
                    </div>
                  </div>
                ))}

                {voiceNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-5 rounded-2xl bg-gradient-to-br from-white to-[#fff0f3] border border-[#ffd5df] space-y-2.5 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-[#ffe4eb]">
                        <span className="text-xs font-bold text-[#831843] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-[#db2777]">speech_to_text</span>
                          <span>{note.title}</span>
                        </span>
                        <span className="text-[10px] text-[#db2777] bg-white px-2 py-0.5 rounded-full border border-[#ffd5df] font-bold">
                          Voice Transcript
                        </span>
                      </div>
                      <p className="text-xs text-[#594140] italic mt-2 line-clamp-3">
                        "{note.transcript}"
                      </p>
                    </div>
                    <span className="text-[10px] text-[#594140] font-mono">
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
