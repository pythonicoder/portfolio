import React from "react";
import { aboutData } from "../mock";
import { useLanguage } from "../context/LanguageContext";

const About = () => {
  const { t, lang } = useLanguage();

  return (
    <section id="about" className="relative section-padding">
      <div
        className="blob"
        style={{
          width: 480,
          height: 480,
          top: "10%",
          left: "-160px",
          background:
            "radial-gradient(circle, rgba(184,134,31,0.3) 0%, rgba(184,134,31,0) 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.5em] uppercase text-gold mb-4">
            01 / {lang === "tr" ? "Hakkımda" : "About"}
          </div>
          <h2 className="display-serif text-5xl md:text-7xl leading-[1.05] mb-6">
            <span className="gold-gradient-text">
              {t(aboutData.subheading)}
            </span>
          </h2>
          <div className="mx-auto h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </div>

        <div className="space-y-6 text-neutral-300 leading-[1.9] text-[15px] md:text-lg max-w-3xl mx-auto">
          {aboutData.paragraphs[lang].map((p, i) => (
            <p key={i}>
              {i === 0 ? (
                <>
                  <span className="text-white font-medium">
                    {lang === "tr" ? "Merhaba ben Sinan Kasikci." : "Hi, I'm Sinan Kasikci."}
                  </span>
                  {p.replace(
                    lang === "tr" ? "Merhaba ben Sinan Kasikci." : "Hi, I'm Sinan Kasikci.",
                    ""
                  )}
                </>
              ) : (
                p
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
