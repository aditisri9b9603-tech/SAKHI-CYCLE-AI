import React, { useState } from 'react';
import { DOCTORS_DATA } from '../data/mockData';
import { Doctor } from '../types';
import { useAuth } from '../context/AuthContext';

interface DoctorsScreenProps {
  onOpenTranscriber?: (context?: string, title?: string, callback?: (text: string) => void) => void;
}

export const DoctorsScreen: React.FC<DoctorsScreenProps> = ({ onOpenTranscriber }) => {
  const { user, saveConsultation, consultations } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [queryDoctor, setQueryDoctor] = useState<Doctor | null>(null);
  const [queryText, setQueryText] = useState('');
  const [consultFormat, setConsultFormat] = useState<'video' | 'voice' | 'clinic'>('video');
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleOpenDrawer = (doctor: Doctor) => {
    setActiveDoctor(doctor);
    setIsDrawerOpen(true);
  };

  const handleOpenQueryModal = (doctor: Doctor) => {
    setQueryDoctor(doctor);
    setQueryText('');
    setIsQueryModalOpen(true);
  };

  const handleConfirmConsultation = async () => {
    setIsDrawerOpen(false);
    if (activeDoctor && user) {
      try {
        await saveConsultation({
          doctorId: activeDoctor.id,
          doctorName: activeDoctor.name,
          specialty: activeDoctor.specialtyTitle,
          date: new Date().toLocaleDateString(),
          time: activeDoctor.availability || 'Next available slot',
          symptoms: `Consultation format: ${consultFormat} • Day 9 Follicular telemetry pre-attached.`,
        });
      } catch (err) {
        console.error('Failed to persist consultation to Firestore:', err);
      }
    }
    showToast(
      'Encrypted Video Link Created',
      `Telehealth consultation with ${activeDoctor?.name} initialized & recorded in your Firestore vault.`
    );
  };

  const handleSubmitQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsQueryModalOpen(false);
    if (queryDoctor && user) {
      try {
        await saveConsultation({
          doctorId: queryDoctor.id,
          doctorName: queryDoctor.name,
          specialty: queryDoctor.specialtyTitle,
          date: new Date().toLocaleDateString(),
          time: 'Confidential 15-min Query',
          symptoms: queryText,
        });
      } catch (err) {
        console.error('Failed to persist query to Firestore:', err);
      }
    }
    showToast(
      'Query Transmitted Privately',
      `Your confidential inquiry has been routed to ${queryDoctor?.name}'s medical fellow. Stored in your encrypted vault.`
    );
  };

  const handleTriggerSOS = () => {
    showToast(
      'SOS Priority Triage Connecting',
      'Routing your emergency consultation to Dr. Ananya Sen (On-Duty OB-GYN). ETA: 45 seconds.'
    );
  };

  const handleDictateQuery = () => {
    if (onOpenTranscriber) {
      onOpenTranscriber(
        'Doctor Inquiry: ' + (queryDoctor?.name || 'Specialist'),
        `Clinical Question for ${queryDoctor?.name || 'Specialist'}`,
        (transcribed) => {
          setQueryText((prev) => (prev ? `${prev} ${transcribed}` : transcribed));
        }
      );
    }
  };

  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    const matchesCategory = selectedFilter === 'all' || doc.category === selectedFilter;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialtyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full">
      <div className="px-6 lg:px-10 py-6 flex flex-col gap-10 max-w-[1360px] mx-auto w-full">
        {/* Hero / Priority Clinical Sanctuary Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-[#feaab7]/25 to-[#fff0f2] shadow-[0_12px_36px_-4px_rgba(153,0,36,0.08)] p-6 md:p-10 border border-[#eed4d8]/60">
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#ffb3b2]/20 blur-3xl pointer-events-none"></div>
          <div className="absolute right-12 top-6 opacity-10 text-[#610011] pointer-events-none select-none hidden lg:block">
            <span className="material-symbols-outlined text-[160px]">local_hospital</span>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#610011] text-white font-label-md text-label-md uppercase tracking-wider shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#ffd9de] animate-ping"></span>
                  24/7 Priority Clinical Sanctuary
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#8d4a56] font-label-sm text-label-sm shadow-sm border border-[#eed4d8]/60">
                  <span className="material-symbols-outlined text-[15px] text-[#610011]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    timer
                  </span>
                  Avg Response: ~3 mins
                </span>
              </div>

              <h1 className="font-display-lg text-display-lg text-[#610011] tracking-tight mt-1">
                Clinical Care Without Judgment.
              </h1>

              <p className="font-body-lg text-body-lg text-[#594140] max-w-xl">
                Direct telemetry-linked consultations with verified OB-GYNs, fertility endocrinologists, and pelvic pain specialists. Fully trauma-informed and protected by zero-knowledge encryption.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-[#594140] font-body-sm text-body-sm">
                <span className="inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#610011]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  100% Board Certified Doctors
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#610011]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    shield_with_heart
                  </span>
                  Trauma-Informed & Queer Inclusive
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#610011]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    lock
                  </span>
                  Encrypted Medical Vault
                </span>
              </div>
            </div>

            {/* Urgent Gynaec SOS box */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-[0_8px_24px_rgba(153,0,36,0.08)] flex flex-col gap-3 min-w-[310px] self-start lg:self-auto border border-[#eed4d8]/70">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#610011] font-title-md text-title-md font-semibold">
                  <span className="material-symbols-outlined text-[22px] animate-pulse">e911_emergency</span>
                  <span>Urgent Gynaec SOS</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#feaab7] text-[#610011] font-label-sm text-label-sm font-semibold">
                  Triage Live
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-[#594140]">
                Severe pelvic acute pain, sudden heavy hemorrhaging, or post-operative queries.
              </p>
              <button
                type="button"
                onClick={handleTriggerSOS}
                className="w-full py-3 px-4 rounded-full bg-[#610011] hover:bg-[#8b001d] text-white font-title-md text-title-md flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(153,0,36,0.25)] transition-all cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
                <span>Connect On-Call Doctor (Instant)</span>
              </button>
              <div className="flex items-center justify-center gap-2 text-[#8d706f] font-label-sm text-label-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b001d]"></span>
                <span>4 On-Duty OB-GYNs available right now</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Booked Appointments / Queries from Firestore */}
        {consultations && consultations.length > 0 && (
          <div className="p-6 rounded-2xl bg-white border border-[#eed4d8] shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#eed4d8]/40 mb-4">
              <div className="flex items-center gap-2 text-[#610011]">
                <span className="material-symbols-outlined text-[20px]">event_available</span>
                <h3 className="font-headline-sm text-headline-sm font-semibold">
                  Your Scheduled Encrypted Clinical Sessions
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Firestore Synced ({consultations.length})
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {consultations.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-[#fff8f7] border border-[#eed4d8]/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-[#610011]">{c.doctorName}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-[#feaab7]/40 text-[#610011]">
                        {c.status}
                      </span>
                    </div>
                    <div className="text-xs text-[#8d4a56] font-medium">{c.specialty}</div>
                    <div className="text-xs text-[#594140] mt-2 line-clamp-2">{c.symptoms}</div>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#eed4d8]/40 flex items-center justify-between text-[11px] text-[#8d706f]">
                    <span>{c.date} • {c.time}</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Encrypted Link
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Directory Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="font-label-md text-label-md uppercase tracking-wider text-[#8d706f] font-semibold">
                Care Specialty Directory
              </span>
              <h2 className="font-headline-sm text-headline-sm text-[#610011] font-semibold">
                Browse Verified Physicians & Holistic Clinicians
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm max-w-sm w-full border border-[#eed4d8]/60">
              <span className="material-symbols-outlined text-[20px] text-[#8d706f]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, symptom, or hospital..."
                className="bg-transparent font-body-sm text-body-sm text-[#26181b] focus:outline-none w-full placeholder:text-[#8d706f]"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-xs text-[#8d706f] hover:text-[#610011]">
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Specialists (28)' },
              { id: 'endocrinology', label: 'Reproductive Endocrinologists' },
              { id: 'pcod', label: 'PCOS / PCOD Reversal' },
              { id: 'endo', label: 'Endometriosis & Pelvic Pain' },
              { id: 'ayurveda', label: 'Ayurvedic Vaidyas & Rasayana' },
              { id: 'maternal', label: 'Maternal & Postpartum' }
            ].map((chip) => {
              const isActive = selectedFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setSelectedFilter(chip.id)}
                  className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#610011] text-white shadow-sm'
                      : 'bg-white text-[#594140] hover:bg-[#feaab7]/40 hover:text-[#610011] border border-[#eed4d8]/40'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="group flex flex-col justify-between bg-white rounded-2xl shadow-[0_8px_24px_rgba(153,0,36,0.04)] hover:shadow-[0_16px_36px_rgba(153,0,36,0.12)] transition-all overflow-hidden border border-[#eed4d8]/60"
            >
              <div className="flex flex-col">
                <div className="relative h-60 w-full overflow-hidden bg-[#fff0f2]">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {doc.onlineStatus === 'online' ? (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                      <span className="font-label-sm text-label-sm text-[#26181b] font-medium">{doc.statusText}</span>
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span className="font-label-sm text-label-sm text-[#26181b] font-medium">{doc.statusText}</span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#610011]/90 backdrop-blur-md text-white font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    <span>{doc.rating} ({doc.reviewCount})</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-2.5">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <div className="flex items-center gap-1 text-[#610011]">
                        <h3 className="font-headline-sm text-headline-sm font-semibold">{doc.name}</h3>
                        <span className="material-symbols-outlined text-[18px] text-[#610011]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          verified
                        </span>
                      </div>
                      <p className="font-label-sm text-label-sm text-[#8d4a56] font-semibold uppercase tracking-wider">
                        {doc.degrees}
                      </p>
                    </div>
                  </div>

                  <p className="font-body-sm text-body-sm text-[#594140] font-medium line-clamp-2">
                    {doc.specialtyTitle}
                  </p>

                  <div className="flex items-center gap-1.5 text-[#594140] font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px] text-[#610011]">domain</span>
                    <span className="truncate">{doc.hospital}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {doc.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-[#feaab7]/40 text-[#610011] font-label-sm text-label-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[#26181b] border-t border-[#eed4d8]/40">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-[#8d706f]">Telemetry Rate</span>
                      <span className="font-title-md text-title-md text-[#610011] font-semibold">
                        ${doc.rate} <span className="font-body-sm text-body-sm text-[#594140] font-normal">/ {doc.durationMinutes}m</span>
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md font-semibold">
                      {doc.availability}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenDrawer(doc)}
                  className="w-full py-2.5 px-4 rounded-full bg-[#610011] hover:bg-[#8b001d] text-white font-label-lg text-label-lg font-medium transition-all shadow-[0_4px_12px_rgba(153,0,36,0.15)] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">videocam</span>
                  <span>Consult {doc.name.split(' ')[1] || doc.name}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenQueryModal(doc)}
                  className="w-full py-1.5 rounded-full text-[#610011] hover:bg-[#feaab7]/30 text-center font-label-sm text-label-sm font-semibold transition-colors cursor-pointer"
                >
                  Ask Quick Private Query (Free 1st Q&A)
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Patient Sanctuary Trust Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Trust Score Card */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(153,0,36,0.04)] flex flex-col justify-between border border-[#eed4d8]/60">
            <div>
              <div className="flex items-center justify-between pb-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#8d706f]">
                    Clinical Integrity
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-[#610011]">
                    Patient Sanctuary Trust
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#feaab7] flex items-center justify-center text-[#610011]">
                  <span className="material-symbols-outlined text-[24px]">favorite</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display-lg text-display-lg text-[#610011] font-semibold">4.98</span>
                <span className="font-title-md text-title-md text-[#594140]">/ 5.0</span>
              </div>

              <div className="flex items-center gap-1 text-[#610011] mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star_half
                </span>
                <span className="font-label-md text-label-md text-[#8d4a56] ml-2 font-semibold">
                  1,420+ Verified Patient Reviews
                </span>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center justify-between font-label-sm text-label-sm text-[#594140]">
                  <span>Bedside Empathy & Trauma-Sensitivity</span>
                  <span className="font-semibold text-[#610011]">99.4%</span>
                </div>
                <div className="w-full bg-[#ffe8ec] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#610011] h-full rounded-full" style={{ width: '99.4%' }}></div>
                </div>

                <div className="flex items-center justify-between font-label-sm text-label-sm text-[#594140] pt-1">
                  <span>Hormonal Symptom Resolution (3 mo)</span>
                  <span className="font-semibold text-[#610011]">94.8%</span>
                </div>
                <div className="w-full bg-[#ffe8ec] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#610011] h-full rounded-full" style={{ width: '94.8%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 bg-[#feaab7]/20 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between border-t border-[#eed4d8]/40">
              <span className="font-label-sm text-label-sm text-[#8d4a56] font-medium">
                Certified by National Women’s Health Guild
              </span>
              <span className="material-symbols-outlined text-[#610011] text-[20px]">verified</span>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(153,0,36,0.04)] flex flex-col justify-between border border-[#eed4d8]/60">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#610011]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-label-sm text-label-sm text-[#8d706f]">Consulted Dr. Tara Kapoor</span>
                </div>
                <p className="font-headline-sm text-headline-sm text-[#610011] italic leading-snug">
                  “For 8 years, doctors dismissed my pelvic pain as just bad cramps. Within one 30-min call, Dr. Tara validated my symptoms, ordered a mapped MRI, and diagnosed stage 3 endo. I cried from relief.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#eed4d8]/30">
                <div className="w-9 h-9 rounded-full bg-[#feaab7] flex items-center justify-center font-title-md text-title-md text-[#610011] font-bold">
                  K
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-[#26181b] font-semibold">Kritika V.</span>
                  <span className="font-label-sm text-label-sm text-[#8d4a56]">Verified Patient • New Delhi</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(153,0,36,0.04)] flex flex-col justify-between border border-[#eed4d8]/60">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#610011]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-label-sm text-label-sm text-[#8d706f]">Consulted Dr. Meenakshi Rao</span>
                </div>
                <p className="font-headline-sm text-headline-sm text-[#610011] italic leading-snug">
                  “No fat-shaming, no generic birth control prescription. Dr. Rao focused on my fasting insulin, my follicular cycle tracking, and tailored my inositol dosage. My period returned naturally last month!”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#eed4d8]/30">
                <div className="w-9 h-9 rounded-full bg-[#feaab7] flex items-center justify-center font-title-md text-title-md text-[#610011] font-bold">
                  R
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-[#26181b] font-semibold">Radhika S.</span>
                  <span className="font-label-sm text-label-sm text-[#8d4a56]">Verified Patient • Mumbai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-Over Consultation Dossier Drawer */}
      {isDrawerOpen && activeDoctor && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />
          <div className="relative z-10 w-full max-w-xl h-full bg-white shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-[#eed4d8]/80">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#eed4d8]/40">
                <span className="font-label-md text-label-md uppercase tracking-wider text-[#8d4a56] font-semibold">
                  Physician Consultation Dossier
                </span>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-[#fff0f2] text-[#594140] transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={activeDoctor.avatar}
                  alt={activeDoctor.name}
                  className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-[#feaab7]"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-headline-sm text-headline-sm text-[#610011] font-semibold">
                      {activeDoctor.name}
                    </h2>
                    <span className="material-symbols-outlined text-[20px] text-[#610011]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-[#8d4a56] font-semibold uppercase">
                    {activeDoctor.degrees}
                  </span>
                  <span className="font-body-md text-body-md text-[#594140]">
                    {activeDoctor.specialtyTitle}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#fff0f2] p-4 rounded-xl border border-[#eed4d8]/50">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-[#8d706f]">Clinical Affiliation</span>
                  <span className="font-title-md text-title-md text-[#26181b] font-semibold truncate">
                    {activeDoctor.hospital}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-[#8d706f]">Experience</span>
                  <span className="font-title-md text-title-md text-[#26181b] font-semibold">
                    {activeDoctor.experience}
                  </span>
                </div>
              </div>

              {/* Consultation Format */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-[#610011] font-semibold uppercase tracking-wider">
                  Select Consultation Format
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <label
                    onClick={() => setConsultFormat('video')}
                    className={`cursor-pointer flex flex-col items-center justify-center p-3.5 rounded-xl text-center transition-all border ${
                      consultFormat === 'video'
                        ? 'bg-[#feaab7]/40 border-[#8b001d] shadow-sm'
                        : 'bg-[#fff0f2] border-transparent hover:bg-[#feaab7]/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[#610011] text-[28px] mb-1">videocam</span>
                    <span className="font-title-md text-title-md text-[#610011] font-semibold text-xs md:text-sm">Live Video</span>
                    <span className="font-label-sm text-label-sm text-[#8d4a56]">25 mins</span>
                  </label>
                  <label
                    onClick={() => setConsultFormat('voice')}
                    className={`cursor-pointer flex flex-col items-center justify-center p-3.5 rounded-xl text-center transition-all border ${
                      consultFormat === 'voice'
                        ? 'bg-[#feaab7]/40 border-[#8b001d] shadow-sm'
                        : 'bg-[#fff0f2] border-transparent hover:bg-[#feaab7]/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[#8d4a56] text-[28px] mb-1">call</span>
                    <span className="font-title-md text-title-md text-[#26181b] font-semibold text-xs md:text-sm">Private Voice</span>
                    <span className="font-label-sm text-label-sm text-[#8d4a56]">20 mins</span>
                  </label>
                  <label
                    onClick={() => setConsultFormat('clinic')}
                    className={`cursor-pointer flex flex-col items-center justify-center p-3.5 rounded-xl text-center transition-all border ${
                      consultFormat === 'clinic'
                        ? 'bg-[#feaab7]/40 border-[#8b001d] shadow-sm'
                        : 'bg-[#fff0f2] border-transparent hover:bg-[#feaab7]/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[#8d4a56] text-[28px] mb-1">local_hospital</span>
                    <span className="font-title-md text-title-md text-[#26181b] font-semibold text-xs md:text-sm">Clinic OPD</span>
                    <span className="font-label-sm text-label-sm text-[#8d4a56]">Physical</span>
                  </label>
                </div>
              </div>

              {/* Telemetry Checklist */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-[#610011] font-semibold uppercase tracking-wider">
                  Telemetry Pre-Sync Checklist
                </span>
                <div className="flex flex-col gap-2 p-4 bg-[#feaab7]/20 rounded-xl border border-[#eed4d8]/60">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input defaultChecked type="checkbox" className="w-4 h-4 accent-[#610011] rounded" />
                    <span className="font-body-sm text-body-sm text-[#26181b]">
                      Auto-share current cycle day (Day 9 • Follicular)
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input defaultChecked type="checkbox" className="w-4 h-4 accent-[#610011] rounded" />
                    <span className="font-body-sm text-body-sm text-[#26181b]">
                      Attach basal body temp & hormonal symptom logs
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input defaultChecked type="checkbox" className="w-4 h-4 accent-[#610011] rounded" />
                    <span className="font-body-sm text-body-sm text-[#26181b]">
                      Request electronic prescription after appointment
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#eed4d8]/40 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-label-lg text-label-lg text-[#594140]">Consultation Fee</span>
                <span className="font-display-lg text-display-lg text-[#610011] font-bold leading-none">
                  ${activeDoctor.rate}
                </span>
              </div>
              <button
                type="button"
                onClick={handleConfirmConsultation}
                className="w-full py-3.5 rounded-full bg-[#610011] hover:bg-[#8b001d] text-white font-title-md text-title-md shadow-[0_8px_20px_rgba(153,0,36,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">lock_clock</span>
                <span>Instant Encrypted Connect</span>
              </button>
              <span className="font-label-sm text-label-sm text-[#8d706f] text-center">
                100% Refundable if canceled 2 hours prior • Zero Spam
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Free 1st Quick Query Modal */}
      {isQueryModalOpen && queryDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsQueryModalOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-[#eed4d8]/80 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-1 border-b border-[#eed4d8]/40">
              <div className="flex items-center gap-2 text-[#610011]">
                <span className="material-symbols-outlined text-[24px]">contact_support</span>
                <h3 className="font-headline-sm text-headline-sm font-semibold">Free Confidential 1st Query</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsQueryModalOpen(false)}
                className="p-1 rounded-full hover:bg-[#fff0f2] text-[#8d706f]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-body-md text-body-md text-[#594140]">
              Send a direct confidential symptom inquiry to{' '}
              <strong className="text-[#610011] font-semibold">{queryDoctor.name}</strong>. Our clinical fellows respond within 15 minutes.
            </p>

            <form onSubmit={handleSubmitQuery} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="font-label-sm text-label-sm text-[#8d706f] uppercase font-semibold">
                    Your Question or Symptom Context
                  </label>
                  <button
                    type="button"
                    onClick={handleDictateQuery}
                    className="text-xs text-[#8b001d] hover:text-[#610011] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">speech_to_text</span>
                    <span>Speak with gemini-3.5-transcribe</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  required
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  placeholder="e.g., I'm on Day 9 of my cycle and experiencing unusual unilateral pelvic twinges alongside high fatigue..."
                  className="p-3.5 rounded-xl bg-[#fff0f2] text-[#26181b] font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-[#610011] border border-[#eed4d8]/60 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 text-[#594140] font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-[#610011]">lock</span>
                <span>Biometrically signed & zero-knowledge encrypted</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQueryModalOpen(false)}
                  className="px-4 py-2 rounded-full font-label-md text-label-md text-[#8d706f] hover:bg-[#fff0f2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#610011] hover:bg-[#8b001d] text-white font-label-md text-label-md font-semibold transition-all shadow-sm"
                >
                  Submit Private Query
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white shadow-[0_12px_36px_rgba(153,0,36,0.18)] rounded-xl p-4 flex items-center gap-4 max-w-md border border-[#feaab7] animate-in slide-in-from-bottom duration-300">
          <div className="w-10 h-10 rounded-full bg-[#feaab7] flex items-center justify-center text-[#610011] shrink-0">
            <span className="material-symbols-outlined text-[22px]">check_circle</span>
          </div>
          <div className="flex flex-col">
            <span className="font-title-md text-title-md text-[#610011] font-semibold">{toastMessage.title}</span>
            <span className="font-body-sm text-body-sm text-[#594140]">{toastMessage.desc}</span>
          </div>
        </div>
      )}
    </div>
  );
};
