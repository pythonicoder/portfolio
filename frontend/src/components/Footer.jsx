import React from "react";
import { personalInfo, uiStrings } from "../mock";
import { useLanguage } from "../context/LanguageContext";
import { Github, Heart, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#070707]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="display-serif text-2xl text-white mb-1">
              {personalInfo.name}
              <span className="text-gold">.</span>
            </div>
            <div className="text-xs tracking-[0.3em] uppercase text-neutral-500">
              {t(personalInfo.title)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="w-10 h-10 rounded-full grid place-items-center border border-white/10 text-neutral-300 hover:border-[#d4af37]/60 hover:text-[#f5d063] transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full grid place-items-center border border-white/10 text-neutral-300 hover:border-[#d4af37]/60 hover:text-[#f5d063] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full grid place-items-center border border-white/10 text-neutral-300 hover:border-[#d4af37]/60 hover:text-[#f5d063] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-neutral-500">
          <div>
            © {year} {personalInfo.name}. {t(uiStrings.footerRights)}
          </div>
          <div className="flex items-center gap-1.5">
            <span>{t(uiStrings.footerBuilt)}</span>
            <Heart className="w-3.5 h-3.5 text-gold fill-[#d4af37]" />
            <span>{lang === "tr" ? "ile" : ""}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
