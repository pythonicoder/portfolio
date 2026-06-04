import React from "react";
import { contactData, personalInfo } from "../mock";
import { useLanguage } from "../context/LanguageContext";
import { Mail, MapPin, Phone, Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

const Flag = ({ code, className = "" }) => {
  // Minimal inline SVG flags for TR and PL
  if (code === "TR") {
    return (
      <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
        <rect width="30" height="20" fill="#E30A17" />
        <circle cx="11" cy="10" r="4.5" fill="#fff" />
        <circle cx="12.2" cy="10" r="3.6" fill="#E30A17" />
        <polygon
          points="15.8,10 13.4,10.8 14.9,8.8 14.9,11.2 13.4,9.2"
          fill="#fff"
        />
      </svg>
    );
  }
  if (code === "PL") {
    return (
      <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
        <rect width="30" height="10" fill="#fff" />
        <rect y="10" width="30" height="10" fill="#DC143C" />
      </svg>
    );
  }
  return null;
};

const InfoCard = ({ icon: Icon, tileGradient, label, value, href, flag }) => {
  const content = (
    <>
      <div
        className="shrink-0 w-14 h-14 rounded-2xl grid place-items-center shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]"
        style={{ background: tileGradient }}
      >
        <Icon className="w-6 h-6 text-white" strokeWidth={2.2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-neutral-400">
          {flag && <Flag code={flag} className="w-4 h-auto rounded-[2px] overflow-hidden" />}
          <span>{label}</span>
        </div>
        <div className="text-white text-base md:text-lg font-medium mt-1 truncate group-hover:text-[#f5d063] transition-colors">
          {value}
        </div>
      </div>
      {href && (
        <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      )}
    </>
  );

  const baseClasses =
    "group flex items-center gap-5 p-5 md:p-6 rounded-2xl border border-white/8 bg-gradient-to-br from-neutral-900/70 to-neutral-900/20 hover:border-[#d4af37]/45 hover:bg-neutral-900/60 transition-all";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={baseClasses}>
        {content}
      </a>
    );
  }
  return <div className={baseClasses}>{content}</div>;
};

const Contact = () => {
  const { t, lang } = useLanguage();

  const cards = [
    {
      key: "email",
      icon: Mail,
      tileGradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      label: lang === "tr" ? "E-posta" : "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      fullWidth: true,
    },
    {
      key: "phone-tr",
      icon: Phone,
      tileGradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      label: lang === "tr" ? "Telefon" : "Phone",
      value: personalInfo.phonePrimary,
      href: `tel:${personalInfo.phonePrimary.replace(/\s/g, "")}`,
      flag: "TR",
    },
    {
      key: "phone-pl",
      icon: Phone,
      tileGradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      label: lang === "tr" ? "Telefon" : "Phone",
      value: personalInfo.phoneSecondary,
      href: `tel:${personalInfo.phoneSecondary.replace(/\s/g, "")}`,
      flag: "PL",
    },
    {
      key: "loc-tr",
      icon: MapPin,
      tileGradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
      label: lang === "tr" ? "Konum" : "Location",
      value: t(personalInfo.location),
      flag: "TR",
    },
    {
      key: "loc-pl",
      icon: MapPin,
      tileGradient: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
      label: lang === "tr" ? "Konum" : "Location",
      value: t(personalInfo.locationSecondary),
      flag: "PL",
    },
    {
      key: "linkedin",
      icon: Linkedin,
      tileGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      label: "LinkedIn",
      value: personalInfo.linkedinHandle,
      href: personalInfo.links.linkedin,
      fullWidth: true,
    },
    {
      key: "github",
      icon: Github,
      tileGradient: "linear-gradient(135deg, #4b5563 0%, #1f2937 100%)",
      label: "GitHub",
      value: personalInfo.githubHandle,
      href: personalInfo.links.github,
      fullWidth: true,
    },
    {
      key: "instagram",
      icon: Instagram,
      tileGradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
      label: "Instagram",
      value: `@${personalInfo.instagram}`,
      href: personalInfo.links.instagram,
      fullWidth: true,
    },
  ];

  return (
    <section id="contact" className="relative section-padding">
      <div
        className="blob"
        style={{
          width: 520,
          height: 520,
          bottom: "-120px",
          right: "-140px",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0) 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.5em] uppercase text-gold mb-4">
            03 / {lang === "tr" ? "İletişim" : "Contact"}
          </div>
          <h2 className="display-serif text-5xl md:text-7xl leading-[1.05] mb-6">
            <span className="gold-gradient-text">
              {t(contactData.heading)}
            </span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto">
            {lang === "tr"
              ? "Benimle iletişime geçin"
              : "Get in touch with me"}
          </p>
          <div className="mt-6 mx-auto h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {cards.map((card) => (
            <div
              key={card.key}
              className={card.fullWidth ? "md:col-span-2" : "md:col-span-1"}
            >
              <InfoCard {...card} />
            </div>
          ))}
        </div>

        {/* Sub CTA */}
        <div className="mt-14 text-center">
          <p className="text-sm text-neutral-500">
            {lang === "tr"
              ? "Genellikle 24 saat içinde yanıtlıyorum."
              : "I usually respond within 24 hours."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
