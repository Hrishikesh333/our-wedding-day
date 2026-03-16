"use client";

import React from 'react';

const Location = () => {
  const googleMapsUrl = "https://www.google.com/maps/search/Hi-Land+Convention+Centre+SH29,+Parappanpoyil,+Kerala+673574";

  return (
    <section className="location-section" id="location">
      <div className="container">
        <div className="location-card animate-fade-in-up">
          <a 
            href={googleMapsUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="location-sketch-link"
          >
            <div className="location-sketch-wrapper">
              <img 
                src="/assets/convention-center-sketch.png" 
                alt="Convention Center Sketch" 
                className="location-sketch"
              />
              <div className="location-icon-overlay">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="location-tap-text">Tap to view map</span>
              </div>
            </div>
          </a>
          
          <h2 className="location-title">Wedding Venue</h2>
          <div className="location-info">
            <h3 className="venue-name">Hi-Land Convention Centre</h3>
            <p className="venue-address">
              Near Petrol Pump, Parappanpoyil,<br />
              Thamarassery, Kozhikode, Kerala 673574
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
