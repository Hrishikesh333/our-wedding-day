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

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="countdown-unit-wrapper">
      <div className="countdown-box">
        <span className="countdown-value">{value}</span>
      </div>
      <span className="countdown-label">{label}</span>
    </div>
  );

  return (
    <section className="countdown-section">
      <div className="container">
        <h2 className="countdown-title animate-fade-in-up">Countdown</h2>
        <div className="countdown-grid animate-fade-in-up fade-delay-1">
          <TimeUnit value={timeLeft.days} label="DAYS" />
          <TimeUnit value={timeLeft.hours} label="HOURS" />
          <TimeUnit value={timeLeft.minutes} label="MIN" />
          <TimeUnit value={timeLeft.seconds} label="SEC" />
        </div>
        <p className="countdown-footer-text animate-fade-in-up fade-delay-2">until the big day</p>
      </div>
    </section>
  );
};

export default Countdown;
