// voiceover.js — Arabic voice-over via the Web Speech API, synced to the timeline.
// Gracefully no-ops if no Arabic voice is installed. Ducks the music while speaking.
// API (window.E8VO): setEnabled(bool), isEnabled(), speak(text), refresh()

window.E8VO = (function () {
  let enabled = false;
  let voice = null;
  let warmed = false;

  function pick() {
    let vs = [];
    try {
      vs = window.speechSynthesis.getVoices() || [];
    } catch (e) {
      console.log("speechSynthesis.getVoices error : " , e);
      return;
    }
    // prefer Egyptian, then any Arabic, then any voice whose name mentions Arabic
    voice =
      vs.find((v) => /ar-EG/i.test(v.lang)) ||
      vs.find((v) => /^ar(-|_|$)/i.test(v.lang)) ||
      vs.find((v) => /arab/i.test(v.name)) ||
      vs[0];
  }

  if ("speechSynthesis" in window) {
    pick();
    try {
      window.speechSynthesis.onvoiceschanged = pick;
    } catch (e) {
      console.log("speechSynthesis.onvoiceschanged error : " , e);
    }
  }

  function setEnabled(b) {
    enabled = b;
    if (!("speechSynthesis" in window)) return;
    if (!b) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.log("speechSynthesis.cancel error : " , e);
      }
      return;
    }
    pick();
    // warm-up: a silent/space utterance unlocks the queue on first gesture
    if (!warmed) {
      warmed = true;
      try {
        const u = new SpeechSynthesisUtterance(" ");
        if (voice) u.voice = voice;
        u.volume = 0;
        window.speechSynthesis.speak(u);
      } catch (e) {
        console.log("speechSynthesis.speak error : " , e);
      }
    }
  }

  function isEnabled() {
    return enabled && "speechSynthesis" in window;
  }

  function speak(text) {
    // console.log({
    //   text,
    //   voice,
    //   isEnabled: isEnabled(),
    //   voices: window.speechSynthesis.getVoices(),
    // });
    if (!isEnabled()) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      if (voice) u.voice = voice;
      u.lang = (voice && voice.lang) || "ar-EG";
      u.rate = 0.98;
      u.pitch = 1.0;
      u.volume = 1.0;
      // console.log({
      //   u
      // })
      u.onstart = () => {
        try {
          window.E8Audio && E8Audio.duck(true);
        } catch (e) {
          console.log("speechSynthesis.onstart error : " , e);
        }
      };
      u.onend = () => {
        try {
          window.E8Audio && E8Audio.duck(false);
        } catch (e) {
          console.log("speechSynthesis.onend error : " , e);
        }
      };
      u.onerror = () => {
        try {
          window.E8Audio && E8Audio.duck(false);
        } catch (e) {
          console.log("speechSynthesis.onerror error : " , e);
        }
      };
      window.speechSynthesis.speak(u);
    } catch (e) {
      console.log("speechSynthesis.speak error : " , e);
    }
  }

  return { setEnabled, isEnabled, speak, refresh: pick };
})();
