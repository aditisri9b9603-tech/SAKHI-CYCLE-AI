import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface CycleTrackerScreenProps {
  onOpenTranscriber?: (context?: string, title?: string, callback?: (text: string) => void) => void;
}

export const CycleTrackerScreen: React.FC<CycleTrackerScreenProps> = ({ onOpenTranscriber }) => {
  const { user, userProfile, cycleEntries, saveCycleEntry, voiceNotes } = useAuth();
  const [selectedDay, setSelectedDay] = useState(userProfile?.cycleDay || 9);
  const [energyLevel, setEnergyLevel] = useState(82);
  const [crampLevel, setCrampLevel] = useState(10);
  const [cervicalFluid, setCervicalFluid] = useState('Creamy / Watery');
  const [symptomNotes, setSymptomNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [loggedToday, setLoggedToday] = useState(false);

  const handleSaveLog = async () => {
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

      const details = `Energy: ${energyLevel}%, Pelvic Cramps: ${crampLevel}%, Cervical Fluid: ${cervicalFluid}. ${symptomNotes}`;

      if (user) {
        await saveCycleEntry({
          cycleDay: selectedDay,
          phase,
          symptoms: `Energy: ${energyLevel}% | Tone: ${crampLevel}% | Fluid: ${cervicalFluid}`,
          notes: details,
        });
      }
      setLoggedToday(true);
      setTimeout(() => setLoggedToday(false), 3500);
    } catch (err) {
      console.error('Error saving cycle entry to Firestore:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTranscribeSpeech = () => {
    if (onOpenTranscriber) {
      onOpenTranscriber(
        'Cycle Tracker Day ' + selectedDay,
        `Day ${selectedDay} Somatic Symptoms & Notes`,
        (transcribedText) => {
          setSymptomNotes((prev) => (prev ? `${prev}\n${transcribedText}` : transcribedText));
        }
      );
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-6 space-y-8">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-[#feaab7]/20 to-[#fff0f2] p-6 md:p-8 shadow-[0_12px_36px_-4px_rgba(153,0,36,0.07)] border border-[#eed4d8]/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#feaab7]/50 text-[#610011] text-xs font-semibold mb-2">
                <span className="material-symbols-outlined text-[16px]">cycle</span>
                <span>The Dial of Vitality</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-[#610011] font-semibold">
                Infradian Rhythm Tracker
              </h1>
              <p className="font-body-md text-body-md text-[#594140] max-w-xl">
                Continuous biological synchronization tracking your follicular estrogen rise, luteal
                progesterone shifts, and ovulation surge forecasting with encrypted Firestore persistence.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Voice input shortcut */}
              <button
                type="button"
                onClick={handleTranscribeSpeech}
                className="px-4 py-2.5 rounded-full bg-white hover:bg-[#fff0f2] text-[#610011] border border-[#eed4d8] text-xs font-semibold shadow-sm flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#8b001d]">speech_to_text</span>
                <span>Voice Biomarker Check-In</span>
              </button>

              <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl border border-[#eed4d8]/60 flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#8d4a56] block">
                    Ovulatory Window
                  </span>
                  <span className="font-title-lg text-[#610011] font-bold">In 4 Days</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#8b001d] text-white flex items-center justify-center font-bold text-lg shadow-md">
                  D{userProfile?.cycleDay || 9}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Cycle Wheel & Daily Biomarkers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Dial (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 md:p-8 shadow-[0_12px_36px_rgba(153,0,36,0.05)] border border-[#eed4d8]/60 flex flex-col items-center justify-center text-center">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#8d4a56] font-semibold mb-3">
              Interactive 28-Day Biological Wheel
            </span>

            {/* Simulated Wheel Dial */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-8 border-[#ffd9de] flex items-center justify-center shadow-inner my-4">
              {/* Concentric rings for phases */}
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#feaab7]/60 pointer-events-none"></div>

              {/* Day markers along circumference */}
              {[...Array(28)].map((_, i) => {
                const dayNum = i + 1;
                const angle = (dayNum / 28) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 125;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                const isSelected = selectedDay === dayNum;
                const isCurrent = dayNum === (userProfile?.cycleDay || 9);

                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDay(dayNum)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className={`absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#610011] text-white scale-125 shadow-md ring-2 ring-[#feaab7]'
                        : isCurrent
                        ? 'bg-[#feaab7] text-[#610011] font-black ring-1 ring-[#8b001d]'
                        : 'bg-[#fff0f2] text-[#8d706f] hover:bg-[#ffd9de]'
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}

              {/* Central Info Node */}
              <div className="flex flex-col items-center justify-center text-center p-4">
                <span className="text-[10px] text-[#8d4a56] uppercase font-bold tracking-widest">
                  Day {selectedDay} of 28
                </span>
                <span className="font-headline-md text-headline-md text-[#610011] font-semibold">
                  {selectedDay <= 5
                    ? 'Menstruation'
                    : selectedDay <= 13
                    ? 'Follicular Phase'
                    : selectedDay <= 16
                    ? 'Ovulatory Peak'
                    : 'Luteal Phase'}
                </span>
                <span className="text-xs text-[#594140] mt-1 max-w-[150px]">
                  {selectedDay === 9
                    ? 'Peak estrogen & heightened verbal fluency'
                    : 'Endocrine harmony active'}
                </span>
              </div>
            </div>

            {/* Phase legend */}
            <div className="flex items-center justify-center gap-3 text-xs text-[#594140] flex-wrap pt-2">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8b001d]"></span> Menstrual (1-5)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#feaab7]"></span> Follicular (6-13)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#cca730]"></span> Ovulatory (14-16)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8d4a56]"></span> Luteal (17-28)
              </span>
            </div>
          </div>

          {/* Daily Biomarker Log (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 md:p-8 shadow-[0_12px_36px_rgba(153,0,36,0.05)] border border-[#eed4d8]/60 space-y-6">
            <div className="flex items-center justify-between border-b border-[#eed4d8]/40 pb-3">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-[#610011] font-semibold">
                  Day {selectedDay} Biomarker Calibration
                </h3>
                <span className="text-xs text-[#8d4a56]">
                  Calibrated with Basal Body Temp & Somatic Signs
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#feaab7]/40 text-[#610011] text-xs font-bold">
                98.2°F BBT
              </span>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#26181b] mb-1">
                  <span>Somatic Vitality & Energy</span>
                  <span className="text-[#610011]">{energyLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(Number(e.target.value))}
                  className="w-full h-2 bg-[#ffd9de] rounded-lg accent-[#610011] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#26181b] mb-1">
                  <span>Pelvic Uterine Tone (Cramp Intensity)</span>
                  <span className="text-[#610011]">{crampLevel}% (Mild)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={crampLevel}
                  onChange={(e) => setCrampLevel(Number(e.target.value))}
                  className="w-full h-2 bg-[#ffd9de] rounded-lg accent-[#610011] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#26181b] mb-1.5">
                  Cervical Mucus Texture
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Dry / Sticky', 'Creamy / Watery', 'Egg White (Fertile)'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setCervicalFluid(opt)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        cervicalFluid === opt
                          ? 'bg-[#8b001d] text-white border-[#8b001d]'
                          : 'bg-[#fff0f2] text-[#594140] border-[#eed4d8]/60 hover:bg-[#ffd9de]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptom Notes with Voice Transcribe button */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#26181b]">
                    Personal Symptom Reflections
                  </label>
                  <button
                    type="button"
                    onClick={handleTranscribeSpeech}
                    className="text-xs text-[#8b001d] hover:text-[#610011] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">mic</span>
                    <span>Speak with gemini-3.5-transcribe</span>
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={symptomNotes}
                  onChange={(e) => setSymptomNotes(e.target.value)}
                  placeholder="Tap microphone above or write how you feel today (e.g., heightened focus, mild pelvic sensation)..."
                  className="w-full p-3 rounded-xl bg-[#fff0f2] border border-[#eed4d8]/60 text-xs text-[#26181b] focus:outline-none focus:bg-white focus:border-[#610011]"
                />
              </div>
            </div>

            {/* Save Log Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSaveLog}
                disabled={isSaving}
                className="w-full py-3 rounded-full bg-[#8b001d] text-white font-title-md text-sm font-semibold hover:bg-[#610011] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">
                      {loggedToday ? 'check_circle' : 'cloud_upload'}
                    </span>
                    <span>
                      {loggedToday ? 'Synchronized to Firestore ✓' : `Save Day ${selectedDay} Biomarkers`}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Saved Logs Timeline (Firestore synced) */}
        {(cycleEntries.length > 0 || voiceNotes.length > 0) && (
          <div className="p-6 rounded-2xl bg-white border border-[#eed4d8]/70 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eed4d8]/40">
              <div className="flex items-center gap-2 text-[#610011]">
                <span className="material-symbols-outlined text-[20px]">database</span>
                <h3 className="font-headline-sm text-headline-sm font-semibold">
                  Encrypted Firestore Vitality Records
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {cycleEntries.length} Biomarker Logs • {voiceNotes.length} Voice Transcripts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-1">
              {cycleEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-xl bg-[#fff8f7] border border-[#eed4d8]/50 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-[#610011] px-2 py-0.5 rounded-full bg-[#feaab7]/40">
                      Day {entry.cycleDay} • {entry.phase}
                    </span>
                    <span className="text-[#8d706f] font-mono text-[11px]">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-[#26181b] font-medium mb-1">{entry.symptoms}</p>
                  {entry.notes && (
                    <p className="text-xs text-[#594140] italic line-clamp-2">{entry.notes}</p>
                  )}
                </div>
              ))}

              {voiceNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl bg-gradient-to-br from-[#fff0f2] to-white border border-[#feaab7]/60 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-[#610011] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">speech_to_text</span>
                      {note.title}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#8d4a56] bg-white px-2 py-0.5 rounded-full border border-[#eed4d8]">
                      gemini-3.5-transcribe
                    </span>
                  </div>
                  <p className="text-xs text-[#26181b] italic line-clamp-3">"{note.transcript}"</p>
                  <span className="text-[10px] text-[#8d706f] mt-2 font-mono">
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
