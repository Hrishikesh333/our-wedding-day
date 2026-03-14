"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Wish {
  id: number;
  name: string;
  message: string;
  timestamp: number;
}

const HEARTS = ['❤️', '💖', '💕', '💗', '💝', '🌹', '💐', '✨'];

const Wishes: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [newId, setNewId] = useState<number | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('wedding_wishes');
      if (stored) setWishes(JSON.parse(stored));
    } catch {}
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
    } catch {}
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const wish: Wish = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now(),
    };

    setWishes(prev => [wish, ...prev]);
    setNewId(wish.id);
    setSubmitted(true);
    setShowThankYou(true);
    setName('');
    setMessage('');

    // Hide thank you popup after 2 seconds
    setTimeout(() => {
      setShowThankYou(false);
    }, 2000);

    // Scroll to wishes list after popup hides
    setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 2200);

    // Reset submitted flag
    setTimeout(() => {
      setSubmitted(false);
      setNewId(null);
    }, 2500);
  };

  const randomHeart = (id: number) => HEARTS[id % HEARTS.length];

  return (
    <section className="wishes-section">

      {/* Thank You Popup */}
      {showThankYou && (
        <div className="thankyou-overlay">
          <div className="thankyou-popup">
            <span className="thankyou-heart">💖</span>
            <h3 className="thankyou-title">Thank You!</h3>
            <p className="thankyou-text">Your wish has been sent 🎉</p>
          </div>
        </div>
      )}
      <div className="wishes-container">
        {/* Header */}
        <div className="wishes-header animate-fade-in-up">
          <span className="wishes-icon">💌</span>
          <h2 className="wishes-title">Send Your Wishes</h2>
          <p className="wishes-subtitle">Leave a message for the happy couple</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="wishes-form animate-fade-in-up fade-delay-1">
          <div className="wishes-input-group">
            <input
              className="wishes-input"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={40}
              required
            />
          </div>
          <div className="wishes-input-group">
            <textarea
              className="wishes-textarea"
              placeholder="Your Message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              maxLength={200}
              rows={3}
              required
            />
          </div>
          <button
            type="submit"
            className={`wishes-btn${submitted ? ' wishes-btn--sent' : ''}`}
            disabled={submitted}
          >
            {submitted ? '✨ Wish Sent!' : '💌 Send Wish'}
          </button>
        </form>

        {/* Wishes list */}
        {wishes.length > 0 && (
          <div ref={listRef} className="wishes-list animate-fade-in-up fade-delay-2">
            <div className="wishes-divider">
              <span>— {wishes.length} {wishes.length === 1 ? 'Wish' : 'Wishes'} —</span>
            </div>
            {wishes.map(wish => (
              <div
                key={wish.id}
                className={`wish-card${wish.id === newId ? ' wish-card--new' : ''}`}
              >
                <div className="wish-card-header">
                  <span className="wish-heart">{randomHeart(wish.id)}</span>
                  <span className="wish-name">{wish.name}</span>
                </div>
                <p className="wish-message">"{wish.message}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishes;
