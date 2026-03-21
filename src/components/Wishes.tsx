"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const Wishes: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Insert into Supabase
    const { error } = await supabase
      .from('wishes')
      .insert([{ guest_name: name.trim(), message: message.trim() }]);

    if (!error) {
      setSubmitted(true);
      setShowThankYou(true);
      setName('');
      setMessage('');

      // Hide thank you popup after 2 seconds
      setTimeout(() => {
        setShowThankYou(false);
      }, 2000);

      // Reset submitted flag
      setTimeout(() => {
        setSubmitted(false);
      }, 2500);
    } else {
      console.error(error);
      alert("Failed to send your wish. Please try again later!");
    }
  };

  return (
    <section className="wishes-section">
      {/* Thank You Popup */}
      {showThankYou && (
        <div className="thankyou-overlay">
          <div className="thankyou-popup">
            <span className="thankyou-heart">💖</span>
            <h3 className="thankyou-title">Thank You!</h3>
            <p className="thankyou-text">Your wish has been sent to the couple! 🎉</p>
          </div>
        </div>
      )}
      
      <div className="wishes-container">
        {/* Header */}
        <div className="wishes-header animate-fade-in-up">
          <span className="wishes-icon">💌</span>
          <h2 className="wishes-title">Send Your Wishes</h2>
          <p className="wishes-subtitle">Leave a private message for the happy couple</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="wishes-form animate-fade-in-up fade-delay-1" suppressHydrationWarning>
          <div className="wishes-input-group">
            <input
              suppressHydrationWarning
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
              suppressHydrationWarning
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
            suppressHydrationWarning
            type="submit"
            className={`wishes-btn${submitted ? ' wishes-btn--sent' : ''}`}
            disabled={submitted}
          >
            {submitted ? '✨ Wish Sent!' : '💌 Send Wish'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Wishes;
