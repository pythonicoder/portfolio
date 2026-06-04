import React, { useEffect, useRef, useState } from "react";
import OpeningAnimation from "../components/OpeningAnimation";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ParticlesBackground from "../components/ParticlesBackground";

const Portfolio = () => {
  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem("sk_intro_done");
    } catch {
      return true;
    }
  });
  const [active, setActive] = useState("home");
  const rafRef = useRef(null);

  const handleFinish = () => {
    try {
      sessionStorage.setItem("sk_intro_done", "1");
    } catch {}
    setLoading(false);
  };

  // Active section tracker
  useEffect(() => {
    if (loading) return;
    const sections = ["home", "about", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [loading]);

  // Scroll-linked smooth fade/translate for each section.
  // As a section leaves the viewport (either direction), it fades out
  // and slides slightly in the direction of scroll, giving a rich
  // "previous section disappears" feel while scrolling.
  useEffect(() => {
    if (loading) return;
    const getTargets = () =>
      Array.from(document.querySelectorAll("[data-scroll-fade]"));

    const update = () => {
      const vh = window.innerHeight;
      const targets = getTargets();
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        let opacity = 1;
        let translateY = 0;
        let scale = 1;

        // Leaving upward (scrolled past). Start fading when section bottom is
        // in the upper 35% of viewport.
        if (rect.bottom < vh * 0.35) {
          const dist = vh * 0.35 - rect.bottom;
          const p = Math.min(dist / (vh * 0.55), 1);
          opacity = 1 - p;
          translateY = -p * 90;
          scale = 1 - p * 0.04;
        }
        // Not yet in view (below). Start fading in as section top enters lower 70%
        else if (rect.top > vh * 0.78) {
          const dist = rect.top - vh * 0.78;
          const p = Math.min(dist / (vh * 0.4), 1);
          opacity = 1 - p * 0.85;
          translateY = p * 70;
          scale = 1 - p * 0.03;
        }

        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translate3d(0, ${translateY.toFixed(
          1
        )}px, 0) scale(${scale.toFixed(3)})`;
      });
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    // Run once to set initial state
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loading]);

  return (
    <>
      {loading && <OpeningAnimation onFinish={handleFinish} />}

      {/* Animated gold dust background */}
      <ParticlesBackground />

      {/* subtle grain overlay on top of particles */}
      <div className="grain-overlay" />

      <Navbar activeSection={active} />

      <main className="relative" style={{ zIndex: 2 }}>
        <div data-scroll-fade className="scroll-fade-target">
          <Hero />
        </div>
        <div data-scroll-fade className="scroll-fade-target">
          <About />
        </div>
        <div data-scroll-fade className="scroll-fade-target">
          <Skills />
        </div>
        <div data-scroll-fade className="scroll-fade-target">
          <Contact />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Portfolio;
