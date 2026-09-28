import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
  ReferenceLine,
  ReferenceDot,
} from 'recharts';
import { CycleEntry } from '../types';

interface CycleClinicalChartProps {
  cycleEntries: CycleEntry[];
  currentCycleDay: number;
  onSelectDay: (day: number) => void;
  selectedDay: number;
  onSwitchToJournal?: (day: number) => void;
}

export const CycleClinicalChart: React.FC<CycleClinicalChartProps> = ({
  cycleEntries,
  currentCycleDay = 9,
  onSelectDay,
  selectedDay,
  onSwitchToJournal,
}) => {
  const [activeMetric, setActiveMetric] = useState<'all' | 'forecast' | 'hormones' | 'symptoms' | 'journal'>('all');
  const [showForecastCorridor, setShowForecastCorridor] = useState(true);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);

  // Compute upcoming phase based on currentCycleDay
  const upcomingPhaseInfo = useMemo(() => {
    if (currentCycleDay <= 5) {
      return {
        nextPhase: 'Rising Energy (Follicular)',
        nextRange: 'Days 6 - 13',
        description: 'Your energy and mood will begin naturally climbing as estrogen starts building.',
        focus: 'Great time for fresh ideas, organizing your week, and light workouts.',
      };
    } else if (currentCycleDay <= 13) {
      return {
        nextPhase: 'Ovulation Window (Peak Confidence)',
        nextRange: 'Days 14 - 16',
        description: 'Estrogen and LH will reach their peak. You can expect higher confidence and natural skin glow.',
        focus: 'Best time for social activities, important meetings, and creative work.',
      };
    } else if (currentCycleDay <= 22) {
      return {
        nextPhase: 'Gentle Nurture (Late Luteal)',
        nextRange: 'Days 23 - 28',
        description: 'Progesterone begins to taper. You may feel a desire for quiet, cozy time and restful sleep.',
        focus: 'Stock up on dark chocolate, chamomile tea, and warm blankets.',
      };
    } else {
      return {
        nextPhase: 'Period Renewal (Menstrual)',
        nextRange: 'Days 1 - 5',
        description: 'Your hormones will reset to baseline. Your body will welcome deep rest and warm comfort.',
        focus: 'Plan slow mornings, gentle walks, and warming soups.',
      };
    }
  }, [currentCycleDay]);

  // Build 28-day continuous timeline enriched with real user Firestore logs & AI predictive trend line
  const chartData = useMemo(() => {
    // Map existing entries by cycleDay
    const logMap = new Map<number, CycleEntry>();
    let totalLogs = 0;
    let avgHistoricalCramp = 20;
    let avgHistoricalEnergy = 65;

    cycleEntries.forEach((entry) => {
      if (entry.cycleDay) {
        logMap.set(entry.cycleDay, entry);
        totalLogs++;
        if (typeof entry.crampLevel === 'number') {
          avgHistoricalCramp = (avgHistoricalCramp + entry.crampLevel) / 2;
        }
        if (typeof entry.energyLevel === 'number') {
          avgHistoricalEnergy = (avgHistoricalEnergy + entry.energyLevel) / 2;
        }
      }
    });

    return Array.from({ length: 28 }, (_, i) => {
      const day = i + 1;
      let phase = 'Follicular';
      let simplePhase = 'Rising Energy';
      if (day <= 5) {
        phase = 'Menstrual';
        simplePhase = 'Period (Rest & Care)';
      } else if (day <= 13) {
        phase = 'Follicular';
        simplePhase = 'Rising Energy';
      } else if (day <= 16) {
        phase = 'Ovulatory';
        simplePhase = 'Ovulation (Peak Confidence)';
      } else {
        phase = 'Luteal';
        simplePhase = 'Gentle Nurture';
      }

      // Estrogen curve (E2)
      let estrogen = 30;
      if (day <= 5) estrogen = 25 + day * 5;
      else if (day <= 13) estrogen = 50 + Math.pow(day - 5, 2.3) * 4.3;
      else if (day <= 15) estrogen = 360 - (day - 13) * 85;
      else if (day <= 22) estrogen = 140 + Math.sin(((day - 16) / 6) * Math.PI) * 60;
      else estrogen = Math.max(30, 180 - (day - 22) * 24);

      // Progesterone curve (P4)
      let progesterone = 0.5;
      if (day <= 14) progesterone = 0.6 + (day % 3) * 0.1;
      else if (day <= 22) progesterone = 1.0 + Math.sin(((day - 14) / 8) * Math.PI) * 16.5;
      else progesterone = Math.max(0.7, 16 - (day - 22) * 2.7);

      // Real user log from Firestore if available
      const userLog = logMap.get(day);

      // Energy score
      let userEnergy = userLog?.energyLevel ?? null;
      if (userEnergy === null) {
        if (day <= 5) userEnergy = 45 + day * 4;
        else if (day <= 13) userEnergy = 65 + (day - 5) * 2.5;
        else if (day <= 16) userEnergy = 92;
        else if (day <= 22) userEnergy = 75 - (day - 16) * 1.5;
        else userEnergy = 58 - (day - 22) * 2;
      }

      // Cramp / Body sensation score
      let userCramp = userLog?.crampLevel ?? null;
      if (userCramp === null) {
        if (day <= 3) userCramp = 60 - day * 12;
        else if (day <= 12) userCramp = 10;
        else if (day === 14) userCramp = 22;
        else if (day <= 24) userCramp = 14;
        else userCramp = 20 + (day - 24) * 8;
      }

      // AI PREDICTIVE TREND LINE FOR UPCOMING PHASE PATTERNS
      // Weighted forecast based on user's past journal entries and cyclical biology
      let basePattern = 20;
      if (day <= 5) {
        basePattern = 40 + (5 - day) * 6; // Menstrual cramps
      } else if (day <= 13) {
        basePattern = 15; // Calm follicular
      } else if (day >= 14 && day <= 16) {
        basePattern = 28; // Ovulation twinge / breast fullness
      } else if (day <= 23) {
        basePattern = 22; // Early luteal
      } else {
        basePattern = 35 + (day - 23) * 7; // Late luteal sensitivity
      }

      // Adjust with user's historical journal averages
      const userFactor = (avgHistoricalCramp / 30);
      const predictedSymptomScore = Math.min(95, Math.max(8, Math.round(basePattern * (0.8 + userFactor * 0.3))));

      // Forecast corridor (confidence interval)
      const corridorWidth = day > currentCycleDay ? 12 + (day - currentCycleDay) * 0.8 : 6;
      const predictedUpper = Math.min(100, Math.round(predictedSymptomScore + corridorWidth));
      const predictedLower = Math.max(0, Math.round(predictedSymptomScore - corridorWidth));

      // Extract symptoms & tags
      const hasLog = Boolean(userLog);
      const tags = userLog?.tags || [];
      const mood = userLog?.mood || null;
      const note = userLog?.notes || userLog?.symptoms || null;
      const isUpcoming = day >= currentCycleDay;

      return {
        day,
        phase,
        simplePhase,
        estrogen: Math.round(estrogen),
        progesterone: Number(progesterone.toFixed(1)),
        userEnergy: Math.min(100, Math.round(userEnergy)),
        userCramp: Math.min(100, Math.round(userCramp)),
        // AI Predictive Forecast values
        predictedSymptomTrend: predictedSymptomScore,
        predictedUpper,
        predictedLower,
        isUpcoming,
        hasLog,
        tags,
        mood,
        note,
        journalMarker: hasLog ? Math.min(100, Math.round(userEnergy)) : null,
      };
    });
  }, [cycleEntries, currentCycleDay]);

  const selectedDayInfo = chartData.find((d) => d.day === selectedDay) || chartData[8];

  return (
    <div className="w-full bg-[#ffffff] rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(244,114,182,0.08)] border border-[#ffd5df] space-y-6">
      {/* Header and Friendly View Switches */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#ffe4eb]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fff0f3] text-[#db2777] text-xs font-bold border border-[#fce7f3]">
            <span className="w-2 h-2 rounded-full bg-[#db2777] animate-pulse"></span>
            <span>Easy 28-Day Cycle Chart & AI Forecast</span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-[#831843] font-semibold">
            Your Natural Rhythm & Predicted Patterns
          </h2>
          <p className="font-body-sm text-body-sm text-[#594140]">
            Click any day to see how your hormones, energy, and symptoms change. The purple dotted line forecasts your upcoming days!
          </p>
        </div>

        {/* View Switcher in Soft Pastel Pink */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#fff5f7] border border-[#ffd5df] self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setActiveMetric('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeMetric === 'all'
                ? 'bg-gradient-to-r from-[#db2777] to-[#be185d] text-white shadow-sm font-semibold'
                : 'text-[#831843] hover:text-[#db2777] hover:bg-white'
            }`}
          >
            All Signals
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('forecast')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMetric === 'forecast'
                ? 'bg-[#9333ea] text-white shadow-sm font-semibold'
                : 'text-[#9333ea] hover:bg-white'
            }`}
          >
            <span>🔮 AI Forecast</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('hormones')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeMetric === 'hormones'
                ? 'bg-[#db2777] text-white shadow-sm font-semibold'
                : 'text-[#831843] hover:text-[#db2777] hover:bg-white'
            }`}
          >
            Hormone Waves
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('symptoms')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeMetric === 'symptoms'
                ? 'bg-[#db2777] text-white shadow-sm font-semibold'
                : 'text-[#831843] hover:text-[#db2777] hover:bg-white'
            }`}
          >
            Energy & Comfort
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('journal')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMetric === 'journal'
                ? 'bg-[#db2777] text-white shadow-sm font-semibold'
                : 'text-[#831843] hover:text-[#db2777] hover:bg-white'
            }`}
          >
            <span>Journaled Days</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white text-[#db2777] font-bold">
              {cycleEntries.length}
            </span>
          </button>
        </div>
      </div>

      {/* Predictive Corridor Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#594140] bg-[#fff9fa] px-4 py-2.5 rounded-2xl border border-[#ffd5df]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#9333ea]"></span>
          <span className="font-semibold text-[#831843]">
            🔮 Predictive Forecast Mode:
          </span>
          <span>Showing forecasted body symptoms for Days {currentCycleDay} to 28 based on your past logs</span>
        </div>
        <button
          type="button"
          onClick={() => setShowForecastCorridor(!showForecastCorridor)}
          className="text-xs font-bold text-[#9333ea] hover:text-[#7e22ce] underline cursor-pointer"
        >
          {showForecastCorridor ? 'Hide Forecast Corridor' : 'Show Forecast Corridor'}
        </button>
      </div>

      {/* Main Graph Area */}
      <div className="w-full h-80 sm:h-96 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            onClick={(e: any) => {
              if (e && e.activePayload && e.activePayload.length > 0) {
                const day = e.activePayload[0].payload?.day;
                if (day) onSelectDay(day);
              }
            }}
            margin={{ top: 15, right: 15, left: -15, bottom: 0 }}
          >
            <defs>
              {/* Estrogen Soft Pink Gradient */}
              <linearGradient id="estrogenPinkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f472b6" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#f472b6" stopOpacity={0.0} />
              </linearGradient>

              {/* Progesterone Crimson Gradient */}
              <linearGradient id="progesteroneRoseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#db2777" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#db2777" stopOpacity={0.0} />
              </linearGradient>

              {/* AI Predictive Forecast Lavender Corridor */}
              <linearGradient id="forecastCorridorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c084fc" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#c084fc" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#ffd9e2" opacity={0.6} />

            <XAxis
              dataKey="day"
              tickFormatter={(d) => `Day ${d}`}
              stroke="#831843"
              fontSize={11}
              tickLine={false}
            />

            <YAxis stroke="#831843" fontSize={11} tickLine={false} />

            {/* 4 Soft Phase Background Bands */}
            <ReferenceArea x1={1} x2={5} fill="#ffe4e6" fillOpacity={0.45} />
            <ReferenceArea x1={5} x2={13} fill="#fff1f2" fillOpacity={0.4} />
            <ReferenceArea x1={13} x2={16} fill="#fce7f3" fillOpacity={0.5} />
            <ReferenceArea x1={16} x2={28} fill="#fdf2f4" fillOpacity={0.4} />

            {/* Selected Day Indicator */}
            <ReferenceLine
              x={selectedDay}
              stroke="#be185d"
              strokeWidth={2}
              strokeDasharray="4 4"
              label={{
                value: `Selected Day ${selectedDay}`,
                position: 'top',
                fill: '#be185d',
                fontSize: 11,
                fontWeight: 'bold',
              }}
            />

            {/* Today Marker */}
            {currentCycleDay !== selectedDay && (
              <ReferenceLine
                x={currentCycleDay}
                stroke="#db2777"
                strokeWidth={1.5}
                strokeDasharray="2 2"
                label={{
                  value: `Today (D${currentCycleDay})`,
                  position: 'insideTopLeft',
                  fill: '#db2777',
                  fontSize: 10,
                  fontWeight: 'bold',
                }}
              />
            )}

            {/* Ovulation Marker */}
            <ReferenceLine
              x={14}
              stroke="#e11d48"
              strokeWidth={1}
              strokeDasharray="3 3"
              label={{
                value: 'Ovulation Peak',
                position: 'bottom',
                fill: '#e11d48',
                fontSize: 10,
              }}
            />

            {/* Point on selected day */}
            <ReferenceDot
              x={selectedDay}
              y={selectedDayInfo.userEnergy}
              r={6}
              fill="#db2777"
              stroke="#ffffff"
              strokeWidth={2.5}
            />

            {/* Rich Tooltip */}
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#ffd5df] text-xs space-y-2 min-w-[250px]">
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#ffe4eb]">
                        <span className="font-bold text-[#831843] text-sm">Day {d.day} of 28</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#fce7f3] text-[#be185d] text-[10px] font-bold">
                          {d.simplePhase}
                        </span>
                      </div>

                      {/* AI Predictive Forecast Badge in Tooltip */}
                      <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#9333ea]">
                          <span>🔮 AI Predicted Symptom Score:</span>
                          <span>{d.predictedSymptomTrend}%</span>
                        </div>
                        <p className="text-[10px] text-purple-900 leading-tight">
                          {d.day <= 5 && 'Expected menstrual resting needs & lower back comfort.'}
                          {d.day > 5 && d.day <= 13 && 'High energy window with natural stamina.'}
                          {d.day >= 14 && d.day <= 16 && 'Peak confidence; possible mild ovulation twinges.'}
                          {d.day > 16 && 'Progesterone building; gentle teas & magnesium recommended.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] pt-1 border-t border-[#fce7f3]">
                        <span className="text-[#db2777]">Estrogen:</span>
                        <span className="font-bold text-right text-[#831843]">{d.estrogen}</span>
                        <span className="text-[#9d174d]">Progesterone:</span>
                        <span className="font-bold text-right text-[#831843]">{d.progesterone}</span>
                        <span className="text-[#e11d48]">Energy Level:</span>
                        <span className="font-bold text-right text-[#831843]">{d.userEnergy}%</span>
                        <span className="text-[#be185d]">Pelvic Comfort:</span>
                        <span className="font-bold text-right text-[#831843]">{100 - d.userCramp}%</span>
                      </div>

                      {/* Logged details if user recorded */}
                      {d.hasLog ? (
                        <div className="mt-2 pt-2 border-t border-[#fce7f3] space-y-1 bg-[#fff0f3] p-2 rounded-xl">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#be185d]">
                            <span className="w-2 h-2 rounded-full bg-[#db2777]"></span>
                            <span>Journal Entry Logged</span>
                          </div>
                          {d.mood && (
                            <div className="text-[11px] text-[#831843]">
                              <span className="font-semibold">Mood:</span> {d.mood}
                            </div>
                          )}
                          {d.tags && d.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-0.5">
                              {d.tags.map((tag: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-1.5 py-0.5 rounded-md bg-white border border-[#fbcfe8] text-[#9d174d] text-[10px] font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="pt-1 text-[10px] text-[#9d174d]">
                          ✨ Tap to open journal for Day {d.day}
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '11px', fontWeight: 600, color: '#831843' }}
            />

            {/* AI PREDICTIVE FORECAST CORRIDOR & TREND LINE */}
            {showForecastCorridor && (activeMetric === 'all' || activeMetric === 'forecast') && (
              <Area
                type="monotone"
                dataKey="predictedUpper"
                name="Forecast Confidence Corridor"
                stroke="#c084fc"
                strokeWidth={1}
                strokeDasharray="2 2"
                fill="url(#forecastCorridorGradient)"
              />
            )}

            {/* PREDICTIVE TREND LINE (DASHED GLOWING PURPLE LINE) */}
            {(activeMetric === 'all' || activeMetric === 'forecast') && (
              <Line
                type="monotone"
                dataKey="predictedSymptomTrend"
                name="🔮 AI Predicted Symptom Trend"
                stroke="#9333ea"
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ r: 3.5, fill: '#9333ea' }}
                activeDot={{ r: 7, fill: '#7e22ce' }}
              />
            )}

            {/* HORMONE CURVES */}
            {(activeMetric === 'all' || activeMetric === 'hormones') && (
              <>
                <Area
                  type="monotone"
                  dataKey="estrogen"
                  name="Estrogen (Energy Builder)"
                  stroke="#f472b6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#estrogenPinkGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="progesterone"
                  name="Progesterone (Calming Hormone)"
                  stroke="#db2777"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#progesteroneRoseGradient)"
                />
              </>
            )}

            {/* SYMPTOMS & ENERGY */}
            {(activeMetric === 'all' || activeMetric === 'symptoms') && (
              <>
                <Line
                  type="monotone"
                  dataKey="userEnergy"
                  name="Energy & Vitality (%)"
                  stroke="#fb7185"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#fb7185' }}
                />
                <Line
                  type="monotone"
                  dataKey="userCramp"
                  name="Body Sensation & Cramps (%)"
                  stroke="#e11d48"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 2.5, fill: '#e11d48' }}
                />
              </>
            )}

            {/* JOURNAL MARKERS */}
            {activeMetric === 'journal' && (
              <Line
                type="monotone"
                dataKey="journalMarker"
                name="Logged Journal Days"
                stroke="#db2777"
                strokeWidth={3}
                dot={{ r: 5, fill: '#db2777', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
                connectNulls
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* UPCOMING PHASE FORECAST & PROACTIVE PREPARATION (Plain Layman English) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#fbf4ff] via-[#fff5f8] to-[#ffffff] border border-[#e9d5ff] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#9333ea] to-[#db2777] text-white flex items-center justify-center shadow-md shadow-purple-500/20">
              <span className="material-symbols-outlined text-[22px]">insights</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#9333ea] uppercase tracking-wider">
                Upcoming Phase Forecast
              </span>
              <h3 className="font-title-lg text-title-lg text-[#831843] font-semibold">
                {upcomingPhaseInfo.nextPhase} ({upcomingPhaseInfo.nextRange})
              </h3>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-white text-[#9333ea] border border-purple-200 text-xs font-bold w-fit shadow-xs">
            Based on {cycleEntries.length} Saved Journal Entries
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#594140] leading-relaxed">
          {upcomingPhaseInfo.description} {upcomingPhaseInfo.focus}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-white border border-[#f3e8ff] shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-[#9333ea] flex items-center gap-1">
              <span>⚡</span>
              <span>Expected Energy</span>
            </span>
            <p className="text-xs text-[#594140]">
              {currentCycleDay <= 13 ? 'Climbing steadily to 85–92%. Great for creative workouts!' : 'Comfortable and reflective (65–75%). Prioritize cozy evenings.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#f3e8ff] shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-[#db2777] flex items-center gap-1">
              <span>🌸</span>
              <span>Predicted Body Comfort</span>
            </span>
            <p className="text-xs text-[#594140]">
              {currentCycleDay <= 13 ? 'Minimal cramps forecasted. Possible mild ovulation twinge on Day 14.' : 'Mild bloating forecasted. Sip warm peppermint tea.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#f3e8ff] shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-[#e11d48] flex items-center gap-1">
              <span>🥑</span>
              <span>Proactive Food Tip</span>
            </span>
            <p className="text-xs text-[#594140]">
              {currentCycleDay <= 13 ? 'Sprouted pumpkin seeds & fresh leafy greens to support healthy estrogen.' : 'Dark chocolate, sunflower seeds, and sweet potatoes for progesterone.'}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Soft Phase Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
        <div className="p-3 rounded-2xl bg-[#fff0f3] border border-[#fce7f3] flex flex-col justify-between">
          <span className="font-semibold text-[#be185d]">Period Days</span>
          <span className="text-[11px] text-[#831843] font-mono mt-0.5">Days 1 - 5</span>
          <span className="text-[10px] text-[#594140] mt-1">Rest, warmth, iron-rich comfort</span>
        </div>
        <div className="p-3 rounded-2xl bg-[#fff5f7] border border-[#fce7f3] flex flex-col justify-between">
          <span className="font-semibold text-[#db2777]">Rising Energy</span>
          <span className="text-[11px] text-[#831843] font-mono mt-0.5">Days 6 - 13</span>
          <span className="text-[10px] text-[#594140] mt-1">Fresh creativity, stamina</span>
        </div>
        <div className="p-3 rounded-2xl bg-[#fdf2f4] border border-[#ffd5df] flex flex-col justify-between">
          <span className="font-semibold text-[#e11d48]">Ovulation Window</span>
          <span className="text-[11px] text-[#831843] font-mono mt-0.5">Days 14 - 16</span>
          <span className="text-[10px] text-[#594140] mt-1">Peak confidence, natural glow</span>
        </div>
        <div className="p-3 rounded-2xl bg-[#fff0f5] border border-[#fce7f3] flex flex-col justify-between">
          <span className="font-semibold text-[#9d174d]">Nurture & Focus</span>
          <span className="text-[11px] text-[#831843] font-mono mt-0.5">Days 17 - 28</span>
          <span className="text-[10px] text-[#594140] mt-1">Magnesium, soothing calm</span>
        </div>
      </div>

      {/* Actionable Clinical & Doctor Review Note with Non-Blocking Modal */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#fff0f3] via-[#fff5f7] to-[#ffffff] border border-[#ffd5df] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#db2777]">favorite</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9d174d]">
              Selected Day {selectedDay} Health Insight
            </span>
          </div>
          <p className="text-xs text-[#594140] leading-relaxed">
            {selectedDay <= 5 &&
              'Period phase: Hormones are at baseline and your body is gently renewing. Warm teas and restful evenings give you the deepest recharge.'}
            {selectedDay > 5 &&
              selectedDay <= 13 &&
              'Follicular phase: Estrogen is smoothly climbing! This naturally boosts your energy, social confidence, and workout motivation.'}
            {selectedDay >= 14 &&
              selectedDay <= 16 &&
              'Ovulation peak: Estrogen and LH peak together. You may notice higher energy, clear fertile fluid, and an energized mood.'}
            {selectedDay > 16 &&
              'Luteal phase: Progesterone takes the lead to keep you calm and balanced. Support your body with dark chocolate, seeds, and early rest.'}
          </p>
          {selectedDayInfo.hasLog && (
            <div className="flex items-center gap-2 text-xs text-[#db2777] font-semibold pt-1">
              <span className="material-symbols-outlined text-[15px]">check_circle</span>
              <span>
                You recorded symptoms for Day {selectedDay}
                {selectedDayInfo.mood ? ` • Feeling: ${selectedDayInfo.mood}` : ''}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {onSwitchToJournal && (
            <button
              type="button"
              onClick={() => onSwitchToJournal(selectedDay)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#db2777] to-[#be185d] hover:from-[#be185d] hover:to-[#9d174d] text-white text-xs font-semibold shadow-md shadow-[#db2777]/25 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
              <span>{selectedDayInfo.hasLog ? 'Edit Day ' + selectedDay + ' Journal' : 'Journal for Day ' + selectedDay}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsDoctorModalOpen(true)}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#fff0f3] text-[#9d174d] border border-[#ffd5df] text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">medical_services</span>
            <span>Doctor Summary</span>
          </button>
        </div>
      </div>

      {/* Non-Blocking Doctor Summary Modal (Clean Layman English) */}
      {isDoctorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#ffd5df] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#ffe4eb]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#fff0f3] text-[#db2777] flex items-center justify-center border border-[#ffd5df]">
                  <span className="material-symbols-outlined text-[22px]">medical_services</span>
                </div>
                <div>
                  <h3 className="font-title-lg text-title-lg text-[#831843] font-semibold">
                    Doctor Health Summary
                  </h3>
                  <span className="text-xs text-[#594140]">
                    Day {selectedDay} • {selectedDayInfo.simplePhase}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDoctorModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#fff5f7] hover:bg-[#ffe5ec] text-[#831843] flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#26181b]">
              <div className="p-3.5 rounded-2xl bg-[#fff5f7] border border-[#ffd5df] grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] text-[#594140]">Phase:</span>
                  <div className="font-semibold text-[#831843]">{selectedDayInfo.phase}</div>
                </div>
                <div>
                  <span className="text-[11px] text-[#594140]">Energy Level:</span>
                  <div className="font-semibold text-[#db2777]">{selectedDayInfo.userEnergy}%</div>
                </div>
                <div>
                  <span className="text-[11px] text-[#594140]">Estrogen Wave:</span>
                  <div className="font-semibold text-[#831843]">{selectedDayInfo.estrogen} pg/mL</div>
                </div>
                <div>
                  <span className="text-[11px] text-[#594140]">Progesterone Wave:</span>
                  <div className="font-semibold text-[#831843]">{selectedDayInfo.progesterone} ng/mL</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#ffd5df] space-y-1">
                <span className="text-[11px] font-bold text-[#831843] uppercase tracking-wider">
                  Logged Symptoms:
                </span>
                <p className="text-xs text-[#594140]">
                  {selectedDayInfo.tags.length > 0 ? selectedDayInfo.tags.join(', ') : 'No severe symptoms logged on this day.'}
                </p>
                {selectedDayInfo.note && (
                  <p className="text-xs text-[#831843] italic pt-1 border-t border-[#fce7f3]">
                    "{selectedDayInfo.note}"
                  </p>
                )}
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                <span className="text-[11px] font-bold text-[#9333ea] uppercase tracking-wider">
                  🔮 AI Predictive Trend Context:
                </span>
                <p className="text-xs text-purple-950">
                  Forecasted symptom sensitivity score is {selectedDayInfo.predictedSymptomTrend}%. Ready to share with your gynecologist during your consultation!
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsDoctorModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-[#db2777] hover:bg-[#be185d] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
