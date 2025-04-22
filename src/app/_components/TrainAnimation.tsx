import React from "react";

const TrainAnimation: React.FC = () => (
  <div className="train-rolling pointer-events-none select-none">
    {/* Simple SVG train illustration */}
    <svg viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="120" height="30" rx="8" fill="#22223b" />
      <rect x="130" y="28" width="30" height="22" rx="6" fill="#4a4e69" />
      <rect x="20" y="28" width="20" height="12" rx="3" fill="#f2e9e4" />
      <rect x="50" y="28" width="20" height="12" rx="3" fill="#f2e9e4" />
      <rect x="80" y="28" width="20" height="12" rx="3" fill="#f2e9e4" />
      <rect x="110" y="28" width="20" height="12" rx="3" fill="#f2e9e4" />
      <circle cx="35" cy="55" r="7" fill="#22223b" stroke="#c9ada7" strokeWidth="3" />
      <circle cx="145" cy="55" r="7" fill="#22223b" stroke="#c9ada7" strokeWidth="3" />
      <circle cx="75" cy="55" r="7" fill="#22223b" stroke="#c9ada7" strokeWidth="3" />
      <circle cx="115" cy="55" r="7" fill="#22223b" stroke="#c9ada7" strokeWidth="3" />
      <rect x="155" y="35" width="10" height="8" rx="2" fill="#9a8c98" />
      <rect x="0" y="40" width="10" height="8" rx="2" fill="#9a8c98" />
      <rect x="160" y="20" width="8" height="15" rx="2" fill="#f2e9e4" />
      <rect x="2" y="20" width="8" height="15" rx="2" fill="#f2e9e4" />
      <rect x="60" y="10" width="40" height="10" rx="3" fill="#c9ada7" />
      <rect x="70" y="5" width="20" height="8" rx="2" fill="#f2e9e4" />
    </svg>
  </div>
);

export default TrainAnimation; 