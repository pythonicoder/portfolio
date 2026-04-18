import React from "react";
import { aboutData } from "../mock";
import { useLanguage } from "../context/LanguageContext";
import { Code2, Server, Database, Wrench } from "lucide-react";

const groupIcons = {
  frontend: Code2,
  backend: Server,
  data: Database,
  tools: Wrench,
};

const TechLogo = ({ slug, name }) => (
  <div className="group flex flex-col items-center gap-2.5 w-[76px]">
    <div className="relative w-14 h-14 rounded-2xl grid place-items-center bg-white/[0.04] border border-white/8 group-hover:border-[#d4af37]/50 group-hover:bg-white/[0.06] transition-all overflow-hidden">
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`}
        alt={name}
        loading="lazy"
        className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
        onError={(e) => {
          // fallback chain: plain -> simpleicons
          if (!e.currentTarget.dataset.fallback1) {
            e.currentTarget.dataset.fallback1 = "1";
            e.currentTarget.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-plain.svg`;
          } else if (!e.currentTarget.dataset.fallback2) {
            e.currentTarget.dataset.fallback2 = "1";
            e.currentTarget.src = `https://cdn.simpleicons.org/${slug}`;
          }
        }}
      />
      <div
        className="absolute -inset-4 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity pointer-events-none"
        style={{ background: "rgba(212,175,55,0.4)" }}
      />
    </div>
    <div className="text-xs text-neutral-400 group-hover:text-[#f5d063] transition-colors text-center leading-tight">
      {name}
    </div>
  </div>
);

const Skills = () => {
  const { t, lang } = useLanguage();

  return (
    <section id="skills" className="relative section-padding">
      <div
        className="blob"
        style={{
          width: 520,
          height: 520,
          top: "-80px",
          right: "-160px",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0) 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.5em] uppercase text-gold mb-4">
            02 / {lang === "tr" ? "Yetenekler" : "Skills"}
          </div>
          <h2 className="display-serif text-5xl md:text-7xl leading-[1.05] mb-6">
            <span className="gold-gradient-text">
              {lang === "tr" ? "Yetenekler" : "Skills"}
            </span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto">
            {lang === "tr"
              ? "Kullandığım teknolojiler ve araçlar"
              : "Technologies and tools I work with"}
          </p>
          <div className="mt-6 mx-auto h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {aboutData.skillGroups.map((group) => {
            const Icon = groupIcons[group.id] || Code2;
            return (
              <div
                key={group.id}
                className="group relative p-7 md:p-8 rounded-3xl border border-white/8 bg-gradient-to-br from-neutral-900/70 via-neutral-900/40 to-neutral-900/10 hover:border-[#d4af37]/40 transition-all overflow-hidden"
              >
                {/* corner accent */}
                <div
                  className="absolute -top-24 -right-24 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 70%)",
                  }}
                />

                <div className="relative flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl grid place-items-center border border-[#d4af37]/40 bg-[#d4af37]/5 text-gold">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="display-serif text-2xl md:text-[1.6rem] text-white">
                    {t(group.title)}
                  </h3>
                </div>

                <div className="relative flex flex-wrap gap-5 gap-y-6 justify-start">
                  {group.items.map((item) => (
                    <TechLogo key={item.slug} {...item} />
                  ))}
                </div>

                <div className="absolute inset-x-8 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
