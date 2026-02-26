import React, { useEffect, useState } from 'react';
import { RainbowButton } from '../components/ui/rainbow-button';
import '../styles/contact.css';

export default function Contact() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className={`contact-header ${animated ? 'fade-in' : ''}`}>
          <h1 className="contact-title">
            <span className="gradient-text">Let's Connect</span>
          </h1>
          <p className="contact-subtitle">
            Got an idea? Let's build something incredible together.
          </p>
        </div>

        <div className={`contact-content ${animated ? 'fade-in-delay' : ''}`}>
          {/* Mail Button */}
          <div className="contact-button-group" style={{
            '--color-1': '#ffffff',
            '--color-2': '#ffffff',
            '--color-3': '#ffffff',
            '--color-4': '#ffffff',
            '--color-5': '#ffffff',
          }}>
            <RainbowButton 
                variant="outline"
             
              onClick={() => window.location.href = 'mailto:adarshmilan92@gmail.com'}
            >
              Mail Me
            </RainbowButton>
          </div>

          {/* Social Links */}
          <div className="social-section">
            <p className="social-label">Follow</p>
            <div className="social-links-minimal">
              <a href="https://github.com/Adarshmilan" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
              <a href="www.linkedin.com/in/adarsh-milan-383527304" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/adlan2423/" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16.5 7.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" fill="#0f0f1e"></path>
                  <circle cx="12" cy="12" r="4.5" fill="none" stroke="#0f0f1e" strokeWidth="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
