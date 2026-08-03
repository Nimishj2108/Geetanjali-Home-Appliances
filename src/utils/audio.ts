/**
 * Premium Web Audio API Sound Generator
 * Generates tactile, organic, and ultra-high-quality professional audio feedback
 * completely synthetically to ensure instant response times, zero asset loading lag,
 * and reliable cross-browser execution.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    // Lazy initialization of AudioContext to satisfy browser user-gesture autoplay policies
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  
  // Resume context if suspended (common in browsers after initial load)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  return audioCtx;
}

/**
 * Plays a clean, warm double-note chime (e.g., for adding to cart/enquiry list)
 * Uses high-quality sine waves with customized envelope ramps to prevent popping clicks.
 */
function playCartChime(ctx: AudioContext) {
  const now = ctx.currentTime;
  
  // Note 1: Clean, soft starting chime (E5 - ~659.25 Hz)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(659.25, now);
  
  // Soft attack & exponential decay envelope to avoid clicking
  gain1.gain.setValueAtTime(0.001, now);
  gain1.gain.linearRampToValueAtTime(0.12, now + 0.04);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
  
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  
  osc1.start(now);
  osc1.stop(now + 0.26);
  
  // Note 2: Higher harmonizing chime (A5 - ~880.00 Hz) slightly offset for a musical "pop"
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(880.00, now + 0.08);
  
  gain2.gain.setValueAtTime(0.001, now + 0.08);
  gain2.gain.linearRampToValueAtTime(0.15, now + 0.12);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
  
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  
  osc2.start(now + 0.08);
  osc2.stop(now + 0.46);
}

/**
 * Plays a soaring ascending "whoosh" with a pristine final accent (e.g., for WhatsApp sending)
 * Represents a secure transition/transmission, providing positive tactile reassurance.
 */
function playWhatsAppSendSound(ctx: AudioContext) {
  const now = ctx.currentTime;
  
  // Ascending frequency sweeper (represents soaring message departure)
  const oscSweep = ctx.createOscillator();
  const gainSweep = ctx.createGain();
  
  // Triangle wave provides a rounder, warm flute-like texture
  oscSweep.type = 'triangle';
  oscSweep.frequency.setValueAtTime(320.00, now); // Start at E4
  oscSweep.frequency.exponentialRampToValueAtTime(987.77, now + 0.35); // Soar up to B5
  
  gainSweep.gain.setValueAtTime(0.001, now);
  gainSweep.gain.linearRampToValueAtTime(0.1, now + 0.08);
  gainSweep.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
  
  oscSweep.connect(gainSweep);
  gainSweep.connect(ctx.destination);
  
  oscSweep.start(now);
  oscSweep.stop(now + 0.4);
  
  // Crisp success "bell" accent at the top of the soar
  const oscBell = ctx.createOscillator();
  const gainBell = ctx.createGain();
  
  oscBell.type = 'sine';
  oscBell.frequency.setValueAtTime(1046.50, now + 0.28); // C6 bell accent
  
  gainBell.gain.setValueAtTime(0.001, now + 0.28);
  gainBell.gain.linearRampToValueAtTime(0.12, now + 0.32);
  gainBell.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
  
  oscBell.connect(gainBell);
  gainBell.connect(ctx.destination);
  
  oscBell.start(now + 0.28);
  oscBell.stop(now + 0.72);
}

/**
 * Primary feedback trigger to play professional tactile audio feedback
 * Safely catched so that failure to run audio nodes (due to sandbox / permission issues)
 * does not block the core web interface or action flows.
 */
export function playTactileSound(type: 'cart' | 'whatsapp'): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    if (type === 'cart') {
      playCartChime(ctx);
    } else if (type === 'whatsapp') {
      playWhatsAppSendSound(ctx);
    }
  } catch (err) {
    console.warn('Tactile sound cue ignored due to environment or permission boundaries:', err);
  }
}
