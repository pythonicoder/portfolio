import React, { useEffect, useState } from "react";
import { ArrowDown, Eye, Github, Linkedin, Sparkles } from "lucide-react";
import { personalInfo, uiStrings } from "../mock";
import { useLanguage } from "../context/LanguageContext";
import { smoothScrollTo } from "../lib/smoothScroll";

const FLIP_INTERVAL = 2500; // 2.5s per side

const FlipCard = ({ t, lang }) => {
  // flipped=false shows photo, flipped=true shows monogram
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setFlipped((f) => !f), FLIP_INTERVAL);
    return () => clearInterval(id);
  }, []);

  // 0 -> -180: right-to-left flip (right edge goes back) reveals back (monogram)
  // -180 -> 0: left-to-right flip (left edge goes back) reveals front (photo) again
  const rotation = flipped ? -180 : 0;

  return (
    <div className="perspective-1200">
      <div
        className="relative aspect-[3/4] w-full transform-3d"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transition: "transform 1100ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        {/* FRONT - Photo */}
        <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden gold-border-glow">
          <img
            src={personalInfo.photo}
            alt={personalInfo.name}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          {/* vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 55%, rgba(10,10,10,0.85) 100%)",
            }}
          />
          {/* subtle gold duotone overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.9) 0%, rgba(0,0,0,0) 60%)",
            }}
          />

          {/* thin vertical gold lines */}
          <div className="absolute inset-y-0 left-6 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/40 to-transparent" />
          <div className="absolute inset-y-0 right-6 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent" />

          <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
            <div className="text-[10px] tracking-[0.4em] uppercase text-white/80">
              / portrait
            </div>
            <div className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_12px_#d4af37]" />
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between z-10">
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-[#f5d063]/90">
                {lang === "tr" ? "Konum" : "Based In"}
              </div>
              <div className="text-sm text-white mt-1 font-medium">
                {t(personalInfo.location)}
              </div>
            </div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#f5d063]">
              {personalInfo.cardBadge}
            </div>
          </div>
        </div>

        {/* BACK - Monogram */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden gold-border-glow bg-gradient-to-br from-neutral-900 via-[#1a1509] to-neutral-900">
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative">
              <div className="display-serif text-[14rem] leading-none gold-gradient-text select-none">
                {personalInfo.initials}
              </div>
              <div className="absolute inset-0 blur-2xl opacity-40 display-serif text-[14rem] leading-none text-[#d4af37] -z-10">
                {personalInfo.initials}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 left-10 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/40 to-transparent" />
          <div className="absolute inset-y-0 right-10 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent" />

          <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
            <div className="text-[10px] tracking-[0.4em] uppercase text-neutral-400">
              / signature
            </div>
            <div className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_12px_#d4af37]" />
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-neutral-400">
                {lang === "tr" ? "Konum" : "Based In"}
              </div>
              <div className="text-sm text-white mt-1">
                {t(personalInfo.location)}
              </div>
            </div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#f5d063]">
              {personalInfo.cardBadge}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const { t, lang } = useLanguage();

  const scrollTo = (id) => {
    const navOffset = window.innerWidth >= 768 ? -72 : -56;
    smoothScrollTo(id, { duration: 1200, offset: navOffset });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* background gold blobs */}
      <div
        className="blob"
        style={{
          width: 520,
          height: 520,
          top: "-120px",
          right: "-120px",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.5) 0%, rgba(212,175,55,0) 70%)",
        }}
      />
      <div
        className="blob"
        style={{
          width: 440,
          height: 440,
          bottom: "-120px",
          left: "-120px",
          background:
            "radial-gradient(circle, rgba(245,208,99,0.35) 0%, rgba(245,208,99,0) 70%)",
        }}
      />

      {/* subtle particle dots */}
      <div className="particle" style={{ width: 6, height: 6, top: "18%", left: "12%", animationDelay: "0s" }} />
      <div className="particle" style={{ width: 4, height: 4, top: "70%", left: "22%", animationDelay: "2s" }} />
      <div className="particle" style={{ width: 8, height: 8, top: "30%", right: "18%", animationDelay: "1s" }} />
      <div className="particle" style={{ width: 5, height: 5, bottom: "20%", right: "28%", animationDelay: "3s" }} />

      {/* decorative right vertical text */}
      <div
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 text-[10px] tracking-[0.5em] uppercase text-neutral-500"
        style={{ writingMode: "vertical-rl" }}
      >
        <span>{lang === "tr" ? "Aşağı kaydır" : "Scroll down"}</span>
        <span className="h-16 w-[1px] bg-gradient-to-b from-[#d4af37]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left content */}
        <div className="lg:col-span-8">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#d4af37]/25 bg-gradient-to-r from-[#d4af37]/8 via-[#d4af37]/4 to-transparent backdrop-blur-sm mb-5">
            <span className="relative flex w-2.5 h-2.5 shrink-0">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-[#f5d063]"
                style={{ animation: "goldPing 2.4s cubic-bezier(0, 0, 0.2, 1) infinite" }}
              />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f5d063] shadow-[0_0_10px_rgba(245,208,99,0.9)]" />
            </span>
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#f5d063] font-semibold">
              {t(personalInfo.availability.status)}
            </span>
            <span className="hidden sm:inline-block w-[1px] h-3 bg-[#d4af37]/30" />
            <span className="hidden sm:inline-block text-[11px] tracking-[0.12em] text-neutral-300">
              {t(personalInfo.availability.detail)}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 text-[11px] tracking-[0.3em] uppercase text-gold mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t(personalInfo.title)}</span>
          </div>

          <div className="text-neutral-400 text-base md:text-lg mb-3 tracking-wide">
            {t(personalInfo.heroIntro)}
          </div>

          <h1 className="hero-name text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] mb-6">
            <span className="block text-white">{personalInfo.nameParts[0]}</span>
            <span className="block gold-gradient-text">{personalInfo.nameParts[1]}</span>
          </h1>

          <p className="text-neutral-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
            {t(personalInfo.heroDescription)}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={personalInfo.links.cv}
              target="_blank"
              rel="noreferrer"
              className="btn-gold"
            >
              <Eye className="w-4 h-4" />
              {t(uiStrings.cvButton)}
            </a>
            <a
              href={personalInfo.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-gold"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href={personalInfo.links.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-gold"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          <div className="mt-14 flex items-center gap-6">
            <button
              onClick={() => scrollTo("about")}
              className="group flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-neutral-400 hover:text-gold transition-colors"
            >
              <span className="w-10 h-10 grid place-items-center rounded-full border border-[#d4af37]/40 group-hover:bg-[#d4af37]/10 transition-colors">
                <ArrowDown className="w-4 h-4 text-gold" />
              </span>
              {lang === "tr" ? "Keşfet" : "Explore"}
            </button>
          </div>
        </div>

        {/* Right flipping card */}
        <div className="lg:col-span-4 relative hidden lg:block">
          <FlipCard t={t} lang={lang} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
