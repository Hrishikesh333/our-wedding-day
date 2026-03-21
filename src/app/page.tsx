"use client";

import { useEffect, useState, useRef } from 'react';
import './globals.css';
import ScratchCard from '@/components/ScratchCard';
import PartyPopper from '@/components/PartyPopper';
import Countdown from '@/components/Countdown';
import Wishes from '@/components/Wishes';
import Location from '@/components/Location';

export default function Home() {
  const [videoFinished, setVideoFinished] = useState(false);
  const [cardSize, setCardSize] = useState(180);
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());
  const [showPopper, setShowPopper] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleCardComplete = (id: number) => {
    setCompletedCards(prev => new Set(prev).add(id));
  };

  useEffect(() => {
    if (completedCards.size === 3) {
      setShowPopper(true);
      const timer = setTimeout(() => {
        setShowPopper(false);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [completedCards.size]);

  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked, waiting for interaction:", e));
        window.removeEventListener('click', startAudio);
        window.removeEventListener('touchstart', startAudio);
        window.removeEventListener('mousedown', startAudio);
        window.removeEventListener('pointerdown', startAudio);
      }
    };

    // Attempt play as soon as possible
    const timeout = setTimeout(startAudio, 100);

    // Fallback for interaction (any touch or click)
    window.addEventListener('click', startAudio);
    window.addEventListener('touchstart', startAudio);
    window.addEventListener('mousedown', startAudio);
    window.addEventListener('pointerdown', startAudio);

    const handleResize = () => {
      if (window.innerWidth < 480) {
        setCardSize(100);
      } else if (window.innerWidth < 768) {
        setCardSize(140);
      } else {
        setCardSize(180);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const handleScroll = () => {
      // Reveal animations
      const reveals = document.querySelectorAll('.animate-fade-in-up, .animate-slow-fade');
      reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 80;

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} autoPlay loop src="/assets/background-music.mp3" />
      {showPopper && <PartyPopper />}
      <main>
        <section className="hero">
          <video
            autoPlay
            muted
            playsInline
            onEnded={() => setVideoFinished(true)}
            className="hero-video-bg"
          >
            <source src="/assets/curtain-video-BAKLj3Y5.mp4" type="video/mp4" />
          </video>
          <div className="hero-content">
            <p className={`hero-subtitle hero-fade-in ${videoFinished ? 'visible' : ''}`} style={{ letterSpacing: '0.2em', textTransform: 'none', marginBottom: '1.5rem' }}>
              Save the Date
            </p>
            <h1 className={`hero-title hero-fade-in fade-delay-1 ${videoFinished ? 'visible' : ''}`} style={{ 
              textTransform: 'none', 
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              lineHeight: '0.9'
            }}>
              <span style={{ fontSize: '1.2em' }}>Amina</span>
              <span style={{ fontSize: '0.55em', paddingLeft: '5rem' }}>Nahla</span>
            </h1>
            <p className={`hero-subtitle hero-fade-in fade-delay-1 ${videoFinished ? 'visible' : ''}`} style={{ fontStyle: 'italic', margin: '0.5rem 0' }}>
              &
            </p>
            <h1 className={`hero-title hero-fade-in fade-delay-1 ${videoFinished ? 'visible' : ''}`} style={{ 
              textTransform: 'none', 
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              lineHeight: '0.9'
            }}>
              <span style={{ fontSize: '1.2em' }}>Adv. Yasar</span>
              <span style={{ fontSize: '0.55em', paddingLeft: '5rem' }}>Rahman</span>
            </h1>
            <p className={`hero-text hero-fade-in fade-delay-2 ${videoFinished ? 'visible' : ''}`}>
              Together with our families, we joyfully invite you to celebrate our wedding.
              Join us for a day filled with love, laughter, and new beginnings.
            </p>
            <div className={`hero-fade-in fade-delay-3 ${videoFinished ? 'visible' : ''}`} style={{ marginTop: '3rem' }}>
              <a href="#about" style={{ textDecoration: 'underline', textUnderlineOffset: '8px', fontSize: '1.2rem', opacity: 0.7 }}>
                View More
              </a>
            </div>
          </div>
        </section>



        <section id="about" className="section-padding invitation-bg">
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
              <div className="animate-slow-fade" style={{ width: 'min(100%, 600px)' }}>
                <img
                  src="/assets/WhatsApp%20Image%202026-03-16%20at%2023.34.13.png"
                  alt="Couple Illustration"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="animate-fade-in-up fade-delay-1">
                <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.5rem' }}>Our Journey Begins</h2>
                <p className="hero-text" style={{ fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
                  Two hearts join together, two lives become one. We are blessed to have found each other
                  and even more blessed to share this special moment with all of you.
                  Our story is just beginning, and we can't wait to see what the future holds.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="reveal-wrapper">
          <p className="reveal-instruction animate-fade-in-up">Scratch all three circles to continue</p>
          <h2 className="reveal-title animate-fade-in-up fade-delay-1">Reveal</h2>
          <p className="reveal-subtitle animate-fade-in-up fade-delay-2">SCRATCH TO DISCOVER THE DATE</p>
          <div className="reveal-grid animate-fade-in-up fade-delay-3">
            <ScratchCard content="17" width={cardSize} height={cardSize} onComplete={() => handleCardComplete(1)} />
            <ScratchCard content="May" width={cardSize} height={cardSize} onComplete={() => handleCardComplete(2)} />
            <ScratchCard content="2026" width={cardSize} height={cardSize} onComplete={() => handleCardComplete(3)} />
          </div>
        </section>

        <Countdown />

        <Location />

        <Wishes />

        <footer className="footer" id="contact">
          <div className="container">
            <a href="#" className="footer-logo">Theatre</a>
            <div className="footer-nav">
              <a href="#" className="nav-link">Twitter</a>
              <a href="#" className="nav-link">Instagram</a>
              <a href="#" className="nav-link">Facebook</a>
            </div>
            <p className="footer-copy">&copy; {new Date().getFullYear()} The Digital Yes. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
