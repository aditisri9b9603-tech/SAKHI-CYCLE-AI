// Web Audio API pure harmonic sine synth for Solfeggio frequencies & relaxation
let audioCtx: AudioContext | null = null;
let currentOsc: OscillatorNode | null = null;
let currentGain: GainNode | null = null;
let binauralOsc: OscillatorNode | null = null;

export function playSolfeggioTone(freq: number, binauralBeatHz: number = 10, volume: number = 0.12): void {
  try {
    stopSolfeggioTone();

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    
    // Master Gain with gentle fade in
    currentGain = audioCtx.createGain();
    currentGain.gain.setValueAtTime(0.0001, now);
    currentGain.gain.exponentialRampToValueAtTime(volume, now + 1.2);
    currentGain.connect(audioCtx.destination);

    // Primary Oscillator (Carrier frequency)
    currentOsc = audioCtx.createOscillator();
    currentOsc.type = 'sine';
    currentOsc.frequency.setValueAtTime(freq, now);
    currentOsc.connect(currentGain);
    currentOsc.start(now);

    // Secondary slight binaural detuned oscillator for ambient depth
    binauralOsc = audioCtx.createOscillator();
    binauralOsc.type = 'sine';
    binauralOsc.frequency.setValueAtTime(freq + binauralBeatHz, now);
    binauralOsc.connect(currentGain);
    binauralOsc.start(now);

  } catch (e) {
    console.warn('Audio tone could not start', e);
  }
}

export function stopSolfeggioTone(): void {
  if (currentGain && audioCtx) {
    try {
      const now = audioCtx.currentTime;
      currentGain.gain.setValueAtTime(currentGain.gain.value, now);
      currentGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        try {
          currentOsc?.stop();
          binauralOsc?.stop();
          currentOsc?.disconnect();
          binauralOsc?.disconnect();
        } catch {
          // ignore
        }
        currentOsc = null;
        binauralOsc = null;
        currentGain = null;
      }, 850);
    } catch {
      currentOsc = null;
      binauralOsc = null;
      currentGain = null;
    }
  }
}
