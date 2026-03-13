"use client";

import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('May 17, 2026 00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label, delayClass }: { value: number, label: string, delayClass: string }) => (
    <div className={`countdown-unit-wrapper animate-fade-pop-up ${delayClass}`}>
      <div className="countdown-box">
        <span className="countdown-value">{value}</span>
      </div>
      <span className="countdown-label">{label}</span>
    </div>
  );

  return (
    <section className="countdown-section">
      <div className="container">
        <h2 className="countdown-title animate-fade-pop-up">Countdown</h2>
        <div className="countdown-grid">
          <TimeUnit value={timeLeft.days} label="DAYS" delayClass="fade-delay-1" />
          <TimeUnit value={timeLeft.hours} label="HOURS" delayClass="fade-delay-2" />
          <TimeUnit value={timeLeft.minutes} label="MIN" delayClass="fade-delay-3" />
          <TimeUnit value={timeLeft.seconds} label="SEC" delayClass="fade-delay-4" />
        </div>
        <p className="countdown-footer-text animate-fade-pop-up fade-delay-4">until the big day</p>
      </div>
    </section>
  );
};

export default Countdown;
