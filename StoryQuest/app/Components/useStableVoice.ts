import { useEffect, useState, useRef } from "react";

const PREFERRED_NAMES = [
  "Samantha", "Ava", "Karen", "Google US English",
  "Microsoft Aria Online (Natural)", "Microsoft Zira Desktop"
];

function pickPreferred(voices: SpeechSynthesisVoice[]) {
  // Try exact name match first
  for (const name of PREFERRED_NAMES) {
    const v = voices.find(vo => vo.name === name);
    if (v) return v;
  }
  // If the first doesn't work try en-US local voice as the backup
  const us = voices.filter(v => v.lang?.toLowerCase().includes("en-us"));
  return us.find(v => v.localService) || us[0] || voices[0] || null;
}

export default function useStableVoice() {
  const [ready, setReady] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    let mounted = true;
    const synth = window.speechSynthesis;

    const load = () => {
      const voices = synth.getVoices();
      if (voices && voices.length) {
        voiceRef.current = pickPreferred(voices);
        if (mounted) setReady(true);
        return true;
      }
      return false;
    };

    if (!load()) {
      const handler = () => load();
      synth.addEventListener?.("voiceschanged", handler);
      let tries = 0;
      const id = setInterval(() => {
        if (load() || ++tries > 20) clearInterval(id);
      }, 150);
      return () => {
        clearInterval(id);
        synth.removeEventListener?.("voiceschanged", handler);
        mounted = false;
      };
    }
    return () => { mounted = false; };
  }, []);

  const speak = (text: string) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    // Prevent voice overlaps from happening
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) {
      u.voice = voiceRef.current;
      u.lang = voiceRef.current.lang || "en-US";
    } else {
      u.lang = "en-US";
    }
    synth.speak(u);
  };

  return { ready, speak, voice: voiceRef.current };
}
