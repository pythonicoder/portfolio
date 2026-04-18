import React, { useEffect, useState } from "react";
import { Menu, X, Languages } from "lucide-react";
import { navItems, personalInfo } from "../mock";
import { useLanguage } from "../context/LanguageContext";
import { smoothScrollTo } from "../lib/smoothScroll";

const Navbar = ({ activeSection }) => {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    // Offset by navbar height so sections don't hide under it
    const navOffset = window.innerWidth >= 768 ? -72 : -56;
    smoothScrollTo(id, { duration: 1200, offset: navOffset });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0a0a0a]/75 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="group flex items-center gap-3"
          aria-label="Go to top"
        >
          <div className="relative w-10 h-10 grid place-items-center rounded-full border border-[#d4af37]/40 transition-transform group-hover:rotate-[20deg]">
            <span className="display-serif text-[#f5d063] text-sm font-bold tracking-tight">
              {personalInfo.initials}
            </span>
            <span className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 18px -6px rgba(212,175,55,0.55)" }} />
          </div>
          <div className="hidden sm:block leading-tight text-left">
            <div className="text-xs tracking-[0.35em] uppercase text-neutral-500">Portfolio</div>
            <div className="display-serif text-base text-white">{personalInfo.name}</div>
          </div>
        </button>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link text-sm tracking-wider uppercase ${
                activeSection === item.id ? "active" : ""
              }`}
            >
              {t(item.label)}
            </button>
          ))}

          <button
            onClick={toggleLang}
            className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-[#d4af37]/40 text-[#f5d063] hover:bg-[#d4af37]/10 transition-colors"
            aria-label="Toggle language"
          >
            <Languages className="w-3.5 h-3.5" />
            {lang === "tr" ? "TR → EN" : "EN → TR"}
          </button>
        </nav>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold tracking-widest uppercase rounded-full border border-[#d4af37]/40 text-[#f5d063]"
          >
            <Languages className="w-3 h-3" />
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="w-10 h-10 grid place-items-center rounded-full border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 border-b border-white/5 ${
          open ? "max-h-80 bg-[#0a0a0a]/95 backdrop-blur-xl" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link text-left text-sm tracking-widest uppercase ${
                activeSection === item.id ? "active" : ""
              }`}
            >
              {t(item.label)}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
