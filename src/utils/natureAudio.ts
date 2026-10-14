/**
 * Mountain Breeze & Gentle River Stream Web Audio API Synthesizer
 * Synthesizes serene natural flowing water and mountain wind without any external audio files.
 */

class MountainRiverAudio {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private riverGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private noiseNodes: AudioNode[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.initContext();
    if (!this.ctx || this.isPlaying) return;

    this.isPlaying = true;
    const ctx = this.ctx;

    // Master Gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
    this.masterGain.connect(ctx.destination);

    // 1. River Stream (Pink/White noise with bandpass filtering and slight modulation)
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    // Generate pink noise for organic water sound
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter 1: Low-mid river gurgle
    const riverFilter = ctx.createBiquadFilter();
    riverFilter.type = 'lowpass';
    riverFilter.frequency.setValueAtTime(550, ctx.currentTime);

    // LFO to create flowing water dynamics
    const riverLFO = ctx.createOscillator();
    riverLFO.frequency.setValueAtTime(0.25, ctx.currentTime); // gentle wave frequency
    const riverLFOGain = ctx.createGain();
    riverLFOGain.gain.setValueAtTime(180, ctx.currentTime);
    riverLFO.connect(riverLFOGain);
    riverLFOGain.connect(riverFilter.frequency);

    this.riverGain = ctx.createGain();
    this.riverGain.gain.setValueAtTime(0.35, ctx.currentTime);

    whiteNoise.connect(riverFilter);
    riverFilter.connect(this.riverGain);
    this.riverGain.connect(this.masterGain);

    whiteNoise.start();
    riverLFO.start();

    // 2. High stream sparkle
    const highFilter = ctx.createBiquadFilter();
    highFilter.type = 'bandpass';
    highFilter.frequency.setValueAtTime(1400, ctx.currentTime);
    highFilter.Q.setValueAtTime(2.0, ctx.currentTime);

    const highGain = ctx.createGain();
    highGain.gain.setValueAtTime(0.08, ctx.currentTime);

    whiteNoise.connect(highFilter);
    highFilter.connect(highGain);
    highGain.connect(this.masterGain);

    // 3. Mountain Breeze
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(320, ctx.currentTime);
    windFilter.Q.setValueAtTime(1.5, ctx.currentTime);

    const windLFO = ctx.createOscillator();
    windLFO.frequency.setValueAtTime(0.08, ctx.currentTime); // very slow wind gusts
    const windLFOGain = ctx.createGain();
    windLFOGain.gain.setValueAtTime(120, ctx.currentTime);
    windLFO.connect(windLFOGain);
    windLFOGain.connect(windFilter.frequency);

    this.windGain = ctx.createGain();
    this.windGain.gain.setValueAtTime(0.12, ctx.currentTime);

    whiteNoise.connect(windFilter);
    windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);

    windLFO.start();

    this.noiseNodes = [whiteNoise, riverLFO, windLFO];
  }

  public stop() {
    if (!this.isPlaying) return;
    this.noiseNodes.forEach(node => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch (e) {
        console.warn('Audio cleanup note:', e);
      }
    });
    this.noiseNodes = [];
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  public playWaterChime() {
    this.initContext();
    if (!this.ctx) return;
    const ctx = this.ctx;
    
    // Play harmonious water droplet sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    
    // Frequency ramp down to mimic water drop
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const natureAudio = new MountainRiverAudio();
