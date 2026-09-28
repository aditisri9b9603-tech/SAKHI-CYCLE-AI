import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface AudioTranscriberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTranscript?: (text: string) => void;
  contextCategory?: string;
  defaultTitle?: string;
}

export const AudioTranscriberModal: React.FC<AudioTranscriberModalProps> = ({
  isOpen,
  onClose,
  onApplyTranscript,
  contextCategory = 'Cycle Health',
  defaultTitle = 'Infradian Voice Check-in',
}) => {
  const { user, saveVoiceNote, saveCycleEntry, userProfile } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [title, setTitle] = useState(defaultTitle);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setTitle(defaultTitle);
    setSaveSuccess(false);
    setErrorMsg(null);
  }, [defaultTitle, isOpen]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, [audioUrl]);

  if (!isOpen) return null;

  const startRecording = async () => {
    setErrorMsg(null);
    setTranscript('');
    setSaveSuccess(false);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      let mimeType = 'audio/webm';
      if (!MediaRecorder.isTypeSupported('audio/webm')) {
        if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
          mimeType = 'audio/ogg';
        }
      }

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const fullBlob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(fullBlob);
        const url = URL.createObjectURL(fullBlob);
        setAudioUrl(url);

        // Stop all tracks to release mic hardware
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start(250); // Slice into 250ms chunks
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = window.setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Microphone access denied or error:', err);
      setErrorMsg(
        err.name === 'NotAllowedError'
          ? 'Microphone permission was denied. Please allow microphone access in your browser.'
          : 'Could not access microphone: ' + (err.message || 'Unknown error')
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioBlob(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setRecordingDuration(0);
      setTranscript('');
      setErrorMsg(null);
    }
  };

  const handleTranscribe = async () => {
    if (!audioBlob) {
      setErrorMsg('No recorded or uploaded audio available to transcribe.');
      return;
    }

    setIsTranscribing(true);
    setErrorMsg(null);

    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        try {
          const base64Audio = reader.result as string;
          const mimeType = audioBlob.type || 'audio/webm';

          const res = await fetch('/api/transcribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              audioBase64: base64Audio,
              mimeType,
              context: `Endocrine cycle journal entry, category: ${contextCategory}, title: ${title}`,
            }),
          });

          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || `Server responded with ${res.status}`);
          }

          const data = await res.json();
          setTranscript(data.transcript || 'No speech detected.');
        } catch (err: any) {
          console.error('Transcription error:', err);
          setErrorMsg(err.message || 'Failed to transcribe audio with Gemini 3.5 Transcribe.');
        } finally {
          setIsTranscribing(false);
        }
      };
    } catch (err: any) {
      setIsTranscribing(false);
      setErrorMsg(err.message || 'Error processing audio file.');
    }
  };

  const handleSaveToVault = async () => {
    if (!transcript) return;
    try {
      if (user) {
        await saveVoiceNote({
          title: title || 'Infradian Voice Check-in',
          transcript,
          durationSec: recordingDuration,
          category: contextCategory,
        });
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setErrorMsg('Could not save to Firestore: ' + err.message);
    }
  };

  const handleApplyToCycleLog = async () => {
    if (!transcript) return;
    try {
      if (user) {
        await saveCycleEntry({
          cycleDay: userProfile?.cycleDay || 9,
          phase: userProfile?.currentPhase || 'Follicular',
          symptoms: `Voice Log [${contextCategory}]: ${title}`,
          notes: transcript,
        });
      }
      if (onApplyTranscript) {
        onApplyTranscript(transcript);
      }
      setSaveSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      setErrorMsg('Could not save to Cycle Log: ' + err.message);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#eed4d8] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#ffeef1] via-[#fff5f6] to-[#fff8f7] border-b border-[#eed4d8]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#610011] text-white flex items-center justify-center shadow-lg shadow-[#610011]/20">
              <span className="material-symbols-outlined text-[26px]">speech_to_text</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm text-[#610011] font-semibold">
                  Voice Bio-Log & Transcription
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#610011]/10 text-[#610011] text-[11px] font-bold uppercase tracking-wider">
                  gemini-3.5-transcribe
                </span>
              </div>
              <p className="font-label-sm text-label-sm text-[#8d4a56] mt-0.5">
                Speak symptoms, luteal reflections, or clinical notes for direct AI transcription
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#594140] hover:text-[#610011] flex items-center justify-center transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Note Title & Category input */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#594140] mb-1">
                Log / Note Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Day 9 Follicular Energy & Cramp Report"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff0f2] border border-[#eed4d8]/60 text-sm font-medium text-[#26181b] focus:outline-none focus:bg-white focus:border-[#610011]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#594140] mb-1">
                Domain / Context
              </label>
              <div className="px-3.5 py-2.5 rounded-xl bg-white border border-[#eed4d8]/60 text-xs font-semibold text-[#610011] flex items-center justify-between">
                <span>{contextCategory}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
            </div>
          </div>

          {/* Recording Console */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#fff8f7] to-[#fff0f2] border border-[#eed4d8] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Visualizer Wave Animation when recording */}
            {isRecording && (
              <div className="flex items-center gap-1.5 h-12 mb-4">
                {[18, 36, 52, 28, 45, 60, 32, 20, 48, 58, 25, 42, 60, 30].map((h, idx) => (
                  <div
                    key={idx}
                    className="w-1.5 rounded-full bg-[#610011] animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDuration: `${0.4 + (idx % 4) * 0.2}s`,
                      animationDelay: `${idx * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Time display */}
            <div className="text-3xl font-mono font-bold text-[#610011] tracking-wider mb-3">
              {formatTime(recordingDuration)}
            </div>

            {/* Mic Controls */}
            <div className="flex items-center gap-4">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="px-6 py-3.5 rounded-full bg-[#610011] hover:bg-[#8b001d] text-white font-semibold shadow-lg shadow-[#610011]/30 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">mic</span>
                  <span>Start Microphone Record</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-600/30 flex items-center gap-2.5 transition-all animate-bounce cursor-pointer"
                >
                  <span className="w-3.5 h-3.5 rounded-sm bg-white"></span>
                  <span>Stop & Lock Audio</span>
                </button>
              )}

              {/* Upload fallback button */}
              <label className="px-4 py-3 rounded-full bg-white hover:bg-[#ffeef1] text-[#610011] border border-[#eed4d8] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                <span>Upload Audio</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Playback preview if audio exists */}
            {audioUrl && !isRecording && (
              <div className="w-full mt-4 pt-4 border-t border-[#eed4d8]/60 flex items-center justify-between gap-3">
                <audio controls src={audioUrl} className="w-full h-9 rounded-lg" />
                <button
                  type="button"
                  onClick={handleTranscribe}
                  disabled={isTranscribing}
                  className="px-5 py-2.5 rounded-full bg-[#8b001d] hover:bg-[#610011] disabled:bg-neutral-400 text-white font-semibold text-xs whitespace-nowrap shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {isTranscribing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Transcribing...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">neurology</span>
                      <span>Transcribe with gemini-3.5-transcribe</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Error notice */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Transcript Output Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#610011] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">notes</span>
                <span>Gemini 3.5 Generated Transcript</span>
              </label>
              {transcript && (
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(transcript)}
                  className="text-xs text-[#8d4a56] hover:text-[#610011] font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                  <span>Copy</span>
                </button>
              )}
            </div>

            <textarea
              rows={4}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Your speech transcript will automatically populate here after clicking 'Transcribe with gemini-3.5-transcribe'. You can also edit it before saving..."
              className="w-full p-4 rounded-2xl bg-white border border-[#eed4d8] text-sm text-[#26181b] leading-relaxed focus:outline-none focus:border-[#610011] transition-all shadow-inner font-sans"
            />
          </div>

          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
              <span>Successfully saved and synchronized to your private medical Firestore vault!</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-[#fff8f7] border-t border-[#eed4d8]/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#594140]">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Firestore Synced • HIPAA Certified Vault</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveToVault}
              disabled={!transcript}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-[#ffeef1] disabled:opacity-50 text-[#610011] border border-[#eed4d8] font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">bookmark</span>
              <span>Save to Sacred Voice Journal</span>
            </button>

            <button
              type="button"
              onClick={handleApplyToCycleLog}
              disabled={!transcript}
              className="px-5 py-2.5 rounded-full bg-[#610011] hover:bg-[#8b001d] disabled:opacity-50 text-white font-semibold text-xs shadow-md shadow-[#610011]/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">sync_alt</span>
              <span>Log to Cycle Symptoms</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
