import React from 'react';
import ScrollReveal from "./ScrollReveal";

const AboutPage: React.FC = () => {
  return (
    <section className="about-section" id="about">
      <div className="section-heading">
        <span className="eyebrow">Why this guide was created</span>
        <h2>Jordan from Jahtaria Travel Services</h2>
        <p>
          After reviewing many visa cases and speaking with applicants who were denied, a clear pattern emerged: refusals often came from application stories that were not structured clearly enough for the officer.
        </p>
      </div>

      <div className="about-grid">
        <ScrollReveal>
          <div className="about-media">
            <img src="/man.jpg" alt="Jordan from Jahtaria Travel Services" />
          </div>
        </ScrollReveal>

        <div className="about-copy">
          <ScrollReveal>
            <article className="about-card">
              <h3>Why I created this guide</h3>
              <p>
                I built this guide to help applicants understand how the visa evaluation process works before they submit their application. That way, they can avoid common mistakes and present a clearer, stronger case.
              </p>
            </article>

            <article className="about-card">
              <h3>What it does</h3>
              <p>
                This guide explains the visa preparation stage, highlights common denial reasons, and shows you how to make your travel purpose, ties, and documents easier to understand.
              </p>
              <p>
                It does not guarantee visa approval, but it gives you a smarter, more strategic way to prepare.
              </p>
            </article>

            <div className="about-contact">
              <h4>Contact Jahtaria Travel</h4>
              <p>
                WhatsApp: <a href="https://wa.me/18762957011">18762957011</a>
              </p>
              <p>
                Email: <a href="mailto:Jahtariatravelservices@gmail.com">Jahtariatravelservices@gmail.com</a>
              </p>
              <p>Instagram: <a href="https://www.instagram.com/jahtaria.travel.services" target="_blank" rel="noopener noreferrer">@jahtaria.travel.services</a></p>
              <p>TikTok: <a href="https://www.tiktok.com/@jahtaria.travel.services" target="_blank" rel="noopener noreferrer">@jahtaria.travel.services</a></p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
