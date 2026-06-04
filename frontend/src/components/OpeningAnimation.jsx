import React, { useEffect, useState } from "react";
import { personalInfo, uiStrings } from "../mock";
import { useLanguage } from "../context/LanguageContext";

const OpeningAnimation = ({ onFinish }) => {
  const { t, lang } = useLanguage();
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const leave = setTimeout(() => setLeaving(true), 600);
      const done = setTimeout(() => onFinish && onFinish(), 1400);
      return () => {
        clearTimeout(leave);
        clearTimeout(done);
      };
    }
  }, [progress, onFinish]);

  const fullName = personalInfo.name;
  const letters = fullName.split("");

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] transition-all duration-700 ${
        leaving ? "opacity-0 scale-[1.02] pointer-events-none" : "opacity-100"
      }`}
    >
      {/* radial gold accent */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.22) 0%, rgba(10,10,10,0) 55%)",
        }}
      />

      {/* spinning thin gold ring */}
      <div className="absolute spin-ring" aria-hidden="true">
        <div
          className="w-[560px] h-[560px] md:w-[720px] md:h-[720px] rounded-full"
          style={{
            border: "1px dashed rgba(212,175,55,0.35)",
          }}
        />
      </div>
      <div
        className="absolute spin-ring"
        style={{ animationDirection: "reverse", animationDuration: "22s" }}
        aria-hidden="true"
      >
        <div
          className="w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full"
          style={{
            border: "1px solid rgba(212,175,55,0.18)",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6">
        <div className="text-[11px] md:text-xs tracking-[0.5em] text-gold uppercase mb-6 opacity-80">
          Portfolio · {new Date().getFullYear()}
        </div>

        <h1
          className="hero-name text-5xl sm:text-6xl md:text-8xl lg:text-9xl"
          aria-label={fullName}
        >
          {letters.map((ch, i) => (
            <span
              key={i}
              className="reveal-letter gold-gradient-text"
              style={{ animationDelay: `${0.15 + i * 0.05}s` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>

        <div className="mt-8 mx-auto h-[1px] w-60 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent underline-expand" style={{ animationDelay: "0.9s" }} />

        <div className="mt-8 flex items-center justify-center gap-3 text-xs tracking-[0.35em] uppercase text-neutral-400">
          <span>{t(uiStrings.loadingName)}</span>
          <span className="text-gold">{String(progress).padStart(2, "0")}%</span>
        </div>

        <div className="mt-4 mx-auto h-[2px] w-72 max-w-[80vw] bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #b8861f 0%, #d4af37 50%, #f5d063 100%)",
              transition: "width 0.05s linear",
            }}
          />
        </div>

        <div className="mt-6 text-[10px] tracking-[0.4em] uppercase text-neutral-500">
          {lang === "tr" ? "Türkçe" : "English"}
        </div>
      </div>

      {/* Closing sweep */}
      <div
        className={`absolute inset-0 pointer-events-none transition-transform duration-700 ${
          leaving ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0) 0%, #0a0a0a 40%, #0a0a0a 100%)",
        }}
      />
    </div>
  );
};

export default OpeningAnimation;
