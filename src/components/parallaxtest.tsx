import { Fragment, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReavel";

function Parallaxtest() {
  const passportRef = useRef<HTMLDivElement | null>(null);
  const heroCardTopRef = useRef<HTMLDivElement | null>(null);
  const heroCardBottomRef = useRef<HTMLDivElement | null>(null);
  const authorRef = useRef<HTMLDivElement | null>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    // Automatic sequence: reveal author, then slide passport. Pause while hovered.
    const heroStart = 420; // unused for auto flow but kept for reference
    const authorEnd = heroStart + 220;
    const heroEnd = 980;
    const slideRange = heroEnd - authorEnd;

    let rafId: number | null = null;
    let slideStart = 0;
    let slideDuration = 900; // ms for slide phase
    let pausedSince: number | null = null;
    let pausedDuration = 0;

    const runSlide = () => {
      slideStart = performance.now();

      const step = (now: number) => {
        const elapsed = now - slideStart - pausedDuration;
        const t = Math.min(Math.max(elapsed / slideDuration, 0), 1);
        const eased = 1 - Math.pow(1 - t, 3);

        const rotation = eased * 45;
        const push = eased * 140;

        if (passportRef.current) passportRef.current.style.transform = `translateX(${push}px) rotateY(${rotation}deg)`;

        rafId = t < 1 ? requestAnimationFrame(step) : null;
      };

      rafId = requestAnimationFrame(step);
    };

    const animateAuthorReveal = (duration = 600) => {
      const start = performance.now();

      return new Promise<void>((resolve) => {
        const step = (now: number) => {
          const elapsed = now - start - pausedDuration;
          const t = Math.min(Math.max(elapsed / duration, 0), 1);
          const eased = 1 - Math.pow(1 - t, 3);

          const imageScale = 0.88 + eased * 0.18;
          const imageOpacity = Math.min(eased * 1.25, 1);

          if (authorRef.current) {
            authorRef.current.style.opacity = `${imageOpacity}`;
            authorRef.current.style.transform = `translate(-50%, -50%) scale(${imageScale})`;
          }
          if (heroCardTopRef.current) {
            heroCardTopRef.current.style.opacity = `${eased}`;
            heroCardTopRef.current.style.transform = `translateY(${(1 - eased) * 16}px)`;
          }
          if (heroCardBottomRef.current) {
            heroCardBottomRef.current.style.opacity = `${eased}`;
            heroCardBottomRef.current.style.transform = `translateY(${(1 - eased) * 18}px)`;
          }

          rafId = t < 1 ? requestAnimationFrame(step) : null;
          if (t >= 1) resolve();
        };
        rafId = requestAnimationFrame(step);
      });
    };

    // Attach hover handlers on the passport container to pause/resume
    const container = document.querySelector(".passport-container") as HTMLDivElement | null;
    const onEnter = () => {
      if (!pausedSince) pausedSince = performance.now();
    };
    const onLeave = () => {
      if (pausedSince) {
        pausedDuration += performance.now() - pausedSince;
        pausedSince = null;
      }
    };
    if (container) {
      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);
    }

    // Run the automatic sequence: reveal author, then start CSS-based 3s rotation loop
    (async () => {
      await animateAuthorReveal();
      // start CSS animation on passport (defined in App.css)
      if (passportRef.current) passportRef.current.classList.add("auto-rotate");
    })();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (container) {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  return (
    <Fragment>
      <section className="hero-section" id="home">
        <ScrollReveal>
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">Premium U.S. Visa Preparation</span>
              <h1>Stop guessing and prepare your U.S. visa application with confidence.</h1>
              <p>
                Jahtaria Travel helps Jamaican applicants build a stronger case, avoid the most common embassy mistakes, and submit with clarity.
              </p>

              <div className="hero-actions">
                <a className="btn-primary" href="#pricing">Get the Guide</a>
                <a className="btn-secondary" href="#contact">Book a Review</a>
              </div>

              <div className="hero-metrics">
                <div className="hero-metric">
                  <strong>120+</strong>
                  <span>Approved cases</span>
                </div>
                <div className="hero-metric">
                  <strong>98%</strong>
                  <span>Preparation success rate</span>
                </div>
                <div className="hero-metric">
                  <strong>24/7</strong>
                  <span>WhatsApp support</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="passport-stage">
                <div className="hero-card hero-card-top" ref={heroCardTopRef}>
                  <p className="card-label">Ready for embassy review</p>
                  <h3>Document-ready applications</h3>
                  <p>We help you prepare DS-160, supporting documents, and interview answers in one streamlined process.</p>
                </div>

                <div className="passport-container">
                  <div className="author-portrait" ref={authorRef}>
                    <img src="/man.jpg" alt="Jordan from Jahtaria Travel Services" />
                  </div>

                  <div ref={passportRef} className="passport-card">
                    <img src="/passport2.png" alt="Passport Front" className="passport-face passport-face-front" />
                    <img src="/passport2.png" alt="Passport Back" className="passport-face passport-face-back" />
                  </div>
                </div>

                <div className="hero-card hero-card-bottom" ref={heroCardBottomRef}>
                  <p className="card-label">Personalized support</p>
                  <h3>Case review session</h3>
                  <p>Get one-on-one feedback on your application before you submit for a smoother experience.</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="info-section" id="about">
        <ScrollReveal>
          <div className="section-heading">
            <span className="eyebrow">How we help you</span>
            <h2>Everything your visa application needs in one premium path</h2>
            <p>
              Our service is designed to make the U.S. visa preparation process more transparent, more accurate, and less stressful.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <h3>Review your DS-160</h3>
              <p>We inspect your answers and highlight any inconsistencies before submission.</p>
            </article>
            <article className="feature-card">
              <h3>Prepare your interview story</h3>
              <p>We help you package your travel purpose, employment, and ties into a clear, convincing narrative.</p>
            </article>
            <article className="feature-card">
              <h3>Prevent common denials</h3>
              <p>We identify the top reasons applicants are denied and show you how to avoid them.</p>
            </article>
          </div>
        </ScrollReveal>
      </section>

      <section className="process-section" id="services">
        <ScrollReveal>
          <div className="section-heading reverse">
            <span className="eyebrow">Step-by-step support</span>
            <h2>From application review to interview readiness</h2>
          </div>

          <div className="process-grid">
            <article className="process-step">
              <span className="step-number">1</span>
              <h4>Complete form review</h4>
              <p>We audit your DS-160 and supporting statements for clarity and consistency.</p>
            </article>
            <article className="process-step">
              <span className="step-number">2</span>
              <h4>Strengthen your documents</h4>
              <p>We check your travel plan, employment records, and evidence so your file looks complete.</p>
            </article>
            <article className="process-step">
              <span className="step-number">3</span>
              <h4>Prepare interview answers</h4>
              <p>We coach you on the right way to explain purpose, ties, and plans to embassy officers.</p>
            </article>
          </div>
        </ScrollReveal>
      </section>

      <section className="testimonial-section">
        <ScrollReveal>
          <div className="section-heading">
            <span className="eyebrow">What clients say</span>
            <h2>Applicants leave feeling informed and ready</h2>
          </div>

          <div className="testimonial-grid">
            <article className="testimonial-card">
              <p>
                “The guide was clear and the review session helped me avoid mistakes I did not even know I was making. I felt confident at the embassy.”
              </p>
              <strong>— Marcia, Kingston</strong>
            </article>
            <article className="testimonial-card">
              <p>
                “Jordan’s service changed how I prepared. The application story was easy to follow, and I left the interview feeling calm.”
              </p>
              <strong>— Darren, Montego Bay</strong>
            </article>
          </div>
        </ScrollReveal>
      </section>

      <section className="pricing-section" id="pricing">
        <ScrollReveal>
          <div className="section-heading">
            <span className="eyebrow">Packages</span>
            <h2>Choose the best package for your application</h2>
          </div>

          <div className="pricing-grid">
            <article className="pricing-card">
              <p className="pricing-label">Preparation Guide</p>
              <p className="price">JMD 4,000</p>
              <p className="pricing-subtitle">Digital guide only</p>
              <ul className="pricing-list">
                <li>Comprehensive visa preparation guide</li>
                <li>Checklist for DS-160 and supporting documents</li>
                <li>Interview readiness tips</li>
              </ul>
              <a className="btn-secondary" href="#contact">Get the Guide</a>
            </article>

            <article className="pricing-card featured">
              <p className="pricing-label">Guide + Review Session</p>
              <p className="price">JMD 13,000</p>
              <p className="pricing-subtitle">Most popular</p>
              <ul className="pricing-list">
                <li>Everything in the guide package</li>
                <li>One-on-one document review</li>
                <li>Personalized interview prep</li>
              </ul>
              <a className="btn-primary" href="#contact">Book a Review</a>
            </article>

            <article className="pricing-card">
              <p className="pricing-label">Premium Support</p>
              <p className="price">JMD 19,000</p>
              <p className="pricing-subtitle">Guide + priority review</p>
              <ul className="pricing-list">
                <li>Fast turnaround review</li>
                <li>Dedicated WhatsApp support</li>
                <li>Follow-up guidance before your appointment</li>
              </ul>
              <a className="btn-secondary" href="#contact">Start Now</a>
            </article>
          </div>
        </ScrollReveal>
      </section>

      <section className="contact-section" id="contact">
        <ScrollReveal>
          <div className="section-heading">
            <span className="eyebrow">Get in touch</span>
            <h2>Ready to prepare your application the right way?</h2>
            <p>Contact Jahtaria Travel for a guided visa preparation plan and expert review before you submit.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <h4>Reach us directly</h4>
              <p>WhatsApp: <a href="https://wa.me/18762957011">18762957011</a></p>
              <p>Email: <a href="mailto:Jahtariatravelservices@gmail.com">Jahtariatravelservices@gmail.com</a></p>
            </div>
            <div className="contact-card">
              <h4>Follow us</h4>
              <p>Instagram: @jahtaria.travel.services</p>
              <p>TikTok: @jahtaria.travel.services</p>
            </div>
          </div>

          <p className="footer-note">© 2026 Jahtaria Travel. All rights reserved.</p>
        </ScrollReveal>
      </section>
    </Fragment>
  );
}

export default Parallaxtest;
