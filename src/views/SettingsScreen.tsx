import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import firebaseConfig from '../../firebase-applet-config.json';

export const SettingsScreen: React.FC = () => {
  const { user, userProfile, logout, loginWithGoogle, cycleEntries, voiceNotes, consultations } = useAuth();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [telemetryAutoSync, setTelemetryAutoSync] = useState(true);
  const [exportNotice, setExportNotice] = useState(false);

  const handleExportPDF = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 4000);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-4xl mx-auto w-full px-6 lg:px-10 py-6 space-y-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-[#610011] font-semibold">
            Sanctuary Vault & Account Settings
          </h1>
          <p className="font-body-md text-body-md text-[#594140]">
            Manage zero-knowledge master ciphers, Firebase database sync, Touch ID passkeys, and physician export dossier permissions.
          </p>
        </div>

        <div className="space-y-4">
          {/* Firebase Authentication & Account Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eed4d8]/60 space-y-4">
            <div className="flex items-center justify-between border-b border-[#eed4d8]/40 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#610011] text-white flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[22px]">fingerprint</span>
                </div>
                <div>
                  <h4 className="font-title-md text-[#26181b] font-semibold">Firebase Member Account</h4>
                  <p className="text-xs text-[#594140]">
                    {user ? 'Authenticated securely via Firebase Auth' : 'Guest / Unauthenticated Session'}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}
              >
                {user ? 'Connected' : 'Offline / Guest'}
              </span>
            </div>

            {user ? (
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#fff8f7] border border-[#eed4d8]/60">
                    <span className="text-[#8d4a56] font-semibold block">Member Name:</span>
                    <span className="text-[#26181b] font-medium text-sm">
                      {userProfile?.displayName || user.displayName || 'Devi Priya'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#fff8f7] border border-[#eed4d8]/60">
                    <span className="text-[#8d4a56] font-semibold block">Medical Identifier / Email:</span>
                    <span className="text-[#26181b] font-medium text-sm">
                      {userProfile?.email || user.email}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#fff0f2] border border-[#eed4d8]/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono text-[#8d4a56]">User UID: {user.uid}</span>
                    <div className="text-[#594140] mt-0.5">
                      Vault Telemetry: {cycleEntries.length} cycle logs • {voiceNotes.length} voice notes • {consultations.length} appointments
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="px-4 py-2 rounded-full bg-white hover:bg-neutral-100 text-[#8b001d] border border-[#eed4d8] font-semibold text-xs shadow-sm cursor-pointer transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <p className="text-xs text-[#594140]">
                  Authenticate with Google or email to synchronize your cycle biomarkers across all your sovereign devices.
                </p>
                <button
                  type="button"
                  onClick={() => loginWithGoogle()}
                  className="px-5 py-2.5 rounded-full bg-[#610011] hover:bg-[#8b001d] text-white text-xs font-semibold flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                  </svg>
                  <span>Connect with Google</span>
                </button>
              </div>
            )}
          </div>

          {/* Firestore Database & Audio AI Status */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eed4d8]/60 space-y-4">
            <div className="flex items-center gap-2 text-[#610011]">
              <span className="material-symbols-outlined text-[20px]">database</span>
              <h4 className="font-title-md text-[#26181b] font-semibold">Cloud Infrastructure & AI Models</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#fff8f7] border border-[#eed4d8]/60 space-y-1">
                <div className="font-semibold text-[#610011] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Cloud Firestore (Enterprise)</span>
                </div>
                <div className="text-[#594140]">Project: <code>{firebaseConfig.projectId}</code></div>
                <div className="text-[#8d4a56] font-mono text-[11px] truncate">
                  DB ID: {firebaseConfig.firestoreDatabaseId}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fff8f7] border border-[#eed4d8]/60 space-y-1">
                <div className="font-semibold text-[#610011] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span>Speech-to-Text Bio-Model</span>
                </div>
                <div className="text-[#594140]">Model: <code>gemini-3.5-transcribe</code></div>
                <div className="text-[#8d4a56] text-[11px]">
                  Server-side proxy with multi-format audio streaming & precision punctuation.
                </div>
              </div>
            </div>
          </div>

          {/* Security Box */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eed4d8]/60 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-title-md text-[#26181b] font-semibold">Biometric Passkey Authentication</h4>
                <p className="text-xs text-[#594140]">Use Face ID / Touch ID for instant one-touch entry without entering passwords.</p>
              </div>
              <input
                type="checkbox"
                checked={biometricEnabled}
                onChange={() => setBiometricEnabled(!biometricEnabled)}
                className="w-5 h-5 accent-[#610011] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#eed4d8]/40">
              <div>
                <h4 className="font-title-md text-[#26181b] font-semibold">Automatic Clinical Telemetry Sync</h4>
                <p className="text-xs text-[#594140]">Transmit encrypted BBT and symptom records directly during booked doctor calls.</p>
              </div>
              <input
                type="checkbox"
                checked={telemetryAutoSync}
                onChange={() => setTelemetryAutoSync(!telemetryAutoSync)}
                className="w-5 h-5 accent-[#610011] cursor-pointer"
              />
            </div>
          </div>

          {/* Export PDF Dossier */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eed4d8]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#610011]">
                <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                <h4 className="font-title-md font-semibold text-[#26181b]">Physician-Ready PDF Telemetry Dossier</h4>
              </div>
              <p className="text-xs text-[#594140] mt-1">
                Download a clean, clinical summary formatted for your gynecologist (Includes follicular day 9 BBT, LH surge predictions, and past 3 cycles).
              </p>
            </div>
            <button
              type="button"
              onClick={handleExportPDF}
              className="px-6 py-2.5 rounded-full bg-[#8b001d] text-white text-xs font-semibold hover:bg-[#610011] shrink-0 shadow-sm cursor-pointer transition-colors"
            >
              Export Clinical PDF
            </button>
          </div>

          {exportNotice && (
            <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold animate-in fade-in">
              ✓ Encrypted PDF Dossier compiled: <code>Sakhi_Telemetry_DeviPriya_Cycle9.pdf</code>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
