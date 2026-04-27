import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero">
        <h1>🎯 Your Custom Diet Plan Awaits</h1>
        <p>Calculate your perfect macros, daily calorie target & weight loss timeline</p>
        <button className="cta-button" onClick={() => navigate('/calculator')}>
          Start Calculating
        </button>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>📊 Accurate Calculations</h3>
          <p>Uses Mifflin-St Jeor & Katch-McArdle formulas for all body types</p>
        </div>
        <div className="feature-card">
          <h3>⚡ Fast Results</h3>
          <p>Get your custom diet plan instantly with exact weight loss timeline</p>
        </div>
        <div className="feature-card">
          <h3>📱 Cross-Platform</h3>
          <p>Access on mobile, web, desktop - sync everywhere</p>
        </div>
        <div className="feature-card">
          <h3>🥗 Meal Suggestions</h3>
          <p>Get AI-powered meal recommendations matching your macros</p>
        </div>
      </div>
    </div>
  );
}
