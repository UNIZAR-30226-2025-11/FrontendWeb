// CatMascot.jsx
import React from 'react';

const CatMascot = () => (
  <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
    {/* Cat-like mascot SVG */}
    {/* Head */}
    <ellipse cx="100" cy="70" rx="45" ry="50" fill="url(#gradHead)" />

    {/* Ears */}
    <path d="M60 30 L50 5 L75 25 Z" fill="url(#gradHead)" />
    <path d="M140 30 L150 5 L125 25 Z" fill="url(#gradHead)" />

    {/* Eyes */}
    <circle cx="80" cy="60" r="7" fill="#333" />
    <circle cx="120" cy="60" r="7" fill="#333" />
    <circle cx="80" cy="58" r="2" fill="#fff" />
    <circle cx="120" cy="58" r="2" fill="#fff" />

    {/* Nose */}
    <path d="M98 72 Q100 75 102 72 Q100 70 98 72" fill="#333" />

    {/* Mouth */}
    <path d="M100 75 Q95 82 90 78" stroke="#333" strokeWidth="2" fill="none" />
    <path d="M100 75 Q105 82 110 78" stroke="#333" strokeWidth="2" fill="none" />

    {/* Whiskers */}
    <path d="M50 65 H75" stroke="#333" strokeWidth="2" />
    <path d="M50 75 H75" stroke="#333" strokeWidth="2" />
    <path d="M150 65 H125" stroke="#333" strokeWidth="2" />
    <path d="M150 75 H125" stroke="#333" strokeWidth="2" />

    {/* Body */}
    <ellipse cx="100" cy="140" rx="38" ry="28" fill="url(#gradBody)" />

    {/* Front Paws */}
    <ellipse cx="75" cy="160" rx="8" ry="6" fill="url(#gradAccent)" />
    <ellipse cx="125" cy="160" rx="8" ry="6" fill="url(#gradAccent)" />

    {/* Tail */}
    <path d="M135 145 Q160 130 150 110" stroke="url(#gradAccent)" strokeWidth="8" strokeLinecap="round" fill="none" />

    {/* Gradients */}
    <defs>
      <linearGradient id="gradHead" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff9a44" />
        <stop offset="100%" stopColor="#ff6a88" />
      </linearGradient>
      <linearGradient id="gradBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff6b6b" />
        <stop offset="100%" stopColor="#ff8e53" />
      </linearGradient>
      <linearGradient id="gradAccent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#36d1dc" />
        <stop offset="100%" stopColor="#5b86e5" />
      </linearGradient>
    </defs>
  </svg>
);

export default CatMascot;