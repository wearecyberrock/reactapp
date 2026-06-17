import React, { useState } from 'react';
import { motion, Variants } from "framer-motion";
import SumfestPopup from './SumfestPopup'; // Explicit
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const pulseVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.05, 1], // Scale up slightly and back
    opacity: [1, 0.8, 1], // Fade slightly and back
    transition: {
      duration: 1.5, // Animation duration
      repeat: Infinity, // Repeat indefinitely
      ease: "easeInOut" // Smooth easing
    }
  }
};


const ParallaxTest: React.FC = () => {
  const [showSumfestPopup, setShowSumfestPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const particles = Array.from({ length: 8 });

  return (
    <>
      <section className="hero-section" id="home">
        <motion.div 
          className="hero-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <motion.div className="hero-copy" variants={sectionVariants}>
            <span className="eyebrow">Premium U.S. Visa Preparation</span>
            <h1>Stop guessing and prepare your U.S. visa application with confidence.</h1>
            <p>
              Jahtaria Travel helps Jamaican applicants build a stronger case, avoid the most common embassy mistakes, and submit with clarity.
            </p>

            <div className="hero-actions">
              <a className="btn-primary" href="#pricing">Get the Guide</a>
              <a className="btn-secondary" href="#contact">Book a Review</a>
              <div className="jahtaria-btn-wrapper" style={{ position: 'relative' }}>
                {isHovered && 
                  particles.map((_, i) => {
                    const angle = (i * 45 * Math.PI) / 180;
                    const distance = 40 + Math.random() * 40; 
                    const destinationX = Math.cos(angle) * distance;
                    const destinationY = Math.sin(angle) * distance;

                    return (
                      <motion.span
                        key={i}
                        className="particle"
                        initial={{ x: "-50%", y: "-50%", left: "50%", top: "50%", scale: 1, opacity: 1 }}
                        animate={{
                          x: `calc(-50% + ${destinationX}px)`,
                          y: `calc(-50% + ${destinationY}px)`,
                          scale: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.05,
                          ease: "easeOut",
                        }}
                      />
                    );
                  })}

                <motion.button
                  className="jahtaria-trigger-btn"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setShowSumfestPopup(true)}
                  whileHover={{ scale: 1.06, boxShadow: "0px 0px 20px rgba(255, 215, 0, 0.4)" }}
                  whileTap={{ scale: 0.96 }}
                >
                  <motion.span
                    className="shine-layer"
                    animate={{ left: ["-100%", "200%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="jahtaria-btn-content">Sumfest 2026 Travel Support</span>
                </motion.button>
              </div>

             
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
          </motion.div>

            <div className="hero-visual">
              <div className="passport-stage">
                <motion.div 
                  className="hero-card hero-card-top"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <p className="card-label">Ready for embassy review</p>
                  <h3>Document-ready applications</h3>
                  <p>We help you prepare DS-160, supporting documents, and interview answers in one streamlined process.</p>
                </motion.div>

                <div className="passport-container">
                  <motion.div 
                    className="author-portrait"
                    initial={{ opacity: 0, scale: 0.88, x: "-50%", y: "-50%" }}
                    whileInView={{ opacity: 1, scale: 1.06, x: "-50%", y: "-50%" }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <img src="/man.jpg" alt="Jordan from Jahtaria Travel Services" />
                  </motion.div>

                  <motion.div 
                    className="passport-card"
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <img src="/passport2.png" alt="Passport Front" className="passport-face passport-face-front" />
                    <img src="/passport2.png" alt="Passport Back" className="passport-face passport-face-back" />
                  </motion.div>
                </div>

                <motion.div 
                  className="hero-card hero-card-bottom"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <p className="card-label">Personalized support</p>
                  <h3>Case review session</h3>
                  <p>Get one-on-one feedback on your application before you submit for a smoother experience.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
      </section>

      <motion.section 
        className="info-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
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
      </motion.section>

      <motion.section 
        className="process-section" 
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
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
      </motion.section>

      <motion.section 
        className="testimonial-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
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
      </motion.section>

      <motion.section 
        className="pricing-section" 
        id="pricing"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
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
      </motion.section>

      <motion.section 
        className="contact-section" 
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
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
      </motion.section>

      <SumfestPopup isOpen={showSumfestPopup} setIsOpen={setShowSumfestPopup} />
    </>
  );
};

export default ParallaxTest;