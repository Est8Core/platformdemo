// audio.js — procedural WebAudio soundtrack + SFX for the Est8Core launch video.
// No external audio files: music bed + one-shot SFX are synthesized.
// API (window.E8Audio): ensure(), resume(), setPlaying(bool), setMuted(bool), isMuted(), sfx(name)

window.E8Audio = (function () {
  let ctx, master, musicBus, sfxBus, comp;
  let playing = false, muted = true, started = false;
  let schedTimer = null, nextNoteTime = 0, step = 0;
  const BPM = 120, SP16 = (60 / BPM) / 4; // sixteenth-note seconds
  const LOOKAHEAD = 0.1;

  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  // progression: Am – F – C – G  (one bar each, 4 bars loop)
  const CHORDS = [
    { pad: [57, 60, 64], bass: 45 }, // Am
    { pad: [53, 57, 60], bass: 41 }, // F
    { pad: [60, 64, 67], bass: 48 }, // C
    { pad: [55, 59, 62], bass: 43 }, // G
  ];
  const ARP = [69, 72, 76, 79, 76, 72]; // A C E G pentatonic-ish, octave up

  function ensure() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0;
    comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.ratio.value = 3; comp.attack.value = 0.005; comp.release.value = 0.25;
    musicBus = ctx.createGain(); musicBus.gain.value = 0.42;
    sfxBus = ctx.createGain(); sfxBus.gain.value = 0.9;
    musicBus.connect(comp); sfxBus.connect(comp); comp.connect(master); master.connect(ctx.destination);
  }

  function resume() { ensure(); if (ctx.state === 'suspended') ctx.resume(); }

  // ── voices ────────────────────────────────────────────────────────────────
  function pad(freq, t, dur, g = 0.05) {
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1300; lp.Q.value = 0.6;
    const gain = ctx.createGain(); gain.gain.value = 0;
    [0, -6, +6].forEach((det, i) => {
      const o = ctx.createOscillator(); o.type = i === 0 ? 'sawtooth' : 'triangle';
      o.frequency.value = freq; o.detune.value = det;
      o.connect(gain); o.start(t); o.stop(t + dur + 0.2);
    });
    gain.connect(lp); lp.connect(musicBus);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(g, t + 0.45);
    gain.gain.setValueAtTime(g, t + dur * 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.15);
  }

  function bass(freq, t, dur = 0.42, g = 0.16) {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = freq;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 400;
    const gn = ctx.createGain(); gn.gain.value = 0;
    o.connect(lp); lp.connect(gn); gn.connect(musicBus);
    gn.gain.setValueAtTime(0, t); gn.gain.linearRampToValueAtTime(g, t + 0.02);
    gn.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.05);
  }

  function pluck(freq, t, g = 0.05) {
    const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = freq;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2600;
    const gn = ctx.createGain(); gn.gain.value = 0;
    o.connect(lp); lp.connect(gn); gn.connect(musicBus);
    gn.gain.setValueAtTime(0, t); gn.gain.linearRampToValueAtTime(g, t + 0.01);
    gn.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
    o.start(t); o.stop(t + 0.4);
  }

  function kick(t, g = 0.5) {
    const o = ctx.createOscillator(); o.type = 'sine';
    const gn = ctx.createGain();
    o.frequency.setValueAtTime(135, t); o.frequency.exponentialRampToValueAtTime(48, t + 0.13);
    gn.gain.setValueAtTime(g, t); gn.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    o.connect(gn); gn.connect(musicBus); o.start(t); o.stop(t + 0.2);
  }

  function noiseBuf(dur) {
    const n = Math.floor(ctx.sampleRate * dur);
    const b = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }

  function hat(t, g = 0.05) {
    const s = ctx.createBufferSource(); s.buffer = noiseBuf(0.05);
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7000;
    const gn = ctx.createGain();
    gn.gain.setValueAtTime(g, t); gn.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    s.connect(hp); hp.connect(gn); gn.connect(musicBus); s.start(t); s.stop(t + 0.06);
  }

  // ── scheduler ───────────────────────────────────────────────────────────--
  function scheduleStep(s, t) {
    const bar = Math.floor(s / 16) % 4;
    const ch = CHORDS[bar];
    const inBar = s % 16;
    if (inBar === 0) ch.pad.forEach(n => pad(mtof(n), t, 60 / BPM * 4, 0.045));
    if (inBar % 4 === 0) { bass(mtof(ch.bass), t); kick(t, 0.42); }
    if (inBar % 2 === 1) hat(t, 0.04);
    // arpeggio: every other 16th, skip downbeats to stay light
    if (inBar % 2 === 0 && inBar !== 0) pluck(mtof(ARP[(s / 2) % ARP.length] | 0), t, 0.04);
  }

  function loop() {
    if (!playing || !ctx) return;
    while (nextNoteTime < ctx.currentTime + LOOKAHEAD) {
      scheduleStep(step, nextNoteTime);
      nextNoteTime += SP16; step++;
    }
  }

  function startSched() {
    if (schedTimer) return;
    nextNoteTime = ctx.currentTime + 0.06; step = 0;
    schedTimer = setInterval(loop, 25);
  }
  function stopSched() { if (schedTimer) { clearInterval(schedTimer); schedTimer = null; } }

  function applyMaster() {
    if (!ctx) return;
    const target = (!muted && playing) ? 0.9 : 0.0;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(target, ctx.currentTime + 0.25);
  }

  // ── public ──────────────────────────────────────────────────────────────--
  function setPlaying(p) {
    ensure();
    playing = p;
    if (p) { resume(); startSched(); } else { /* keep sched? stop to save */ }
    if (!p) stopSched();
    applyMaster();
  }
  function setMuted(m) { ensure(); muted = m; if (!m) resume(); applyMaster(); }
  function isMuted() { return muted; }

  // duck music under voice-over
  let ducked = false;
  function duck(on) {
    if (!ctx) return;
    ducked = on;
    const g = on ? 0.12 : 0.42;
    musicBus.gain.cancelScheduledValues(ctx.currentTime);
    musicBus.gain.linearRampToValueAtTime(g, ctx.currentTime + (on ? 0.18 : 0.6));
  }

  // ── SFX ─────────────────────────────────────────────────────────────────--
  function sfx(name) {
    ensure(); if (muted) return; resume();
    const t = ctx.currentTime;
    if (name === 'whoosh') {
      const s = ctx.createBufferSource(); s.buffer = noiseBuf(0.6);
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.8;
      bp.frequency.setValueAtTime(300, t); bp.frequency.exponentialRampToValueAtTime(4000, t + 0.45);
      const gn = ctx.createGain(); gn.gain.setValueAtTime(0.0001, t);
      gn.gain.linearRampToValueAtTime(0.5, t + 0.12); gn.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
      s.connect(bp); bp.connect(gn); gn.connect(sfxBus); s.start(t); s.stop(t + 0.62);
    } else if (name === 'pop') {
      const o = ctx.createOscillator(); o.type = 'sine';
      o.frequency.setValueAtTime(620, t); o.frequency.exponentialRampToValueAtTime(960, t + 0.06);
      const gn = ctx.createGain(); gn.gain.setValueAtTime(0.0001, t);
      gn.gain.linearRampToValueAtTime(0.28, t + 0.01); gn.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(gn); gn.connect(sfxBus); o.start(t); o.stop(t + 0.18);
    } else if (name === 'ding') {
      [880, 1320].forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
        const gn = ctx.createGain(); const t0 = t + i * 0.04;
        gn.gain.setValueAtTime(0.0001, t0); gn.gain.linearRampToValueAtTime(0.2, t0 + 0.01);
        gn.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.5);
        o.connect(gn); gn.connect(sfxBus); o.start(t0); o.stop(t0 + 0.55);
      });
    } else if (name === 'chime') {
      [659, 784, 988, 1319].forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = f;
        const gn = ctx.createGain(); const t0 = t + i * 0.07;
        gn.gain.setValueAtTime(0.0001, t0); gn.gain.linearRampToValueAtTime(0.16, t0 + 0.015);
        gn.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.7);
        o.connect(gn); gn.connect(sfxBus); o.start(t0); o.stop(t0 + 0.75);
      });
    } else if (name === 'riser') {
      const s = ctx.createBufferSource(); s.buffer = noiseBuf(1.4); s.loop = false;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.2;
      bp.frequency.setValueAtTime(200, t); bp.frequency.exponentialRampToValueAtTime(5000, t + 1.3);
      const gn = ctx.createGain(); gn.gain.setValueAtTime(0.0001, t);
      gn.gain.linearRampToValueAtTime(0.32, t + 1.1); gn.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
      s.connect(bp); bp.connect(gn); gn.connect(sfxBus); s.start(t); s.stop(t + 1.45);
      // sub-rise tone
      const o = ctx.createOscillator(); o.type = 'sawtooth';
      o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(440, t + 1.3);
      const og = ctx.createGain(); og.gain.setValueAtTime(0.0001, t);
      og.gain.linearRampToValueAtTime(0.1, t + 1.0); og.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1200;
      o.connect(lp); lp.connect(og); og.connect(sfxBus); o.start(t); o.stop(t + 1.45);
    } else if (name === 'impact') {
      kick(t, 0.7);
      const s = ctx.createBufferSource(); s.buffer = noiseBuf(0.4);
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1800;
      const gn = ctx.createGain(); gn.gain.setValueAtTime(0.4, t); gn.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      s.connect(lp); lp.connect(gn); gn.connect(sfxBus); s.start(t); s.stop(t + 0.4);
    }
  }

  return { ensure, resume, setPlaying, setMuted, isMuted, duck, sfx };
})();
