
import React from 'react';

export default function RespiraLogo({ size = 44 }) {
  return (
    <div className="respira-brand">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="RespiraAI lungs logo"
      >
        <circle cx="50" cy="50" r="49" fill="#34135f" />

        {/* Main trachea */}
        <g
          fill="none"
          stroke="#687d9e"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M50 18 V43" />
          <path d="M50 43 L39 59 L35 66" />
          <path d="M50 43 L61 59 L65 66" />
          <path d="M50 43 L39 29" />
          <path d="M50 43 L61 29" />
          <path d="M39 29 Q34 33 30 43" />
          <path d="M61 29 Q66 33 70 43" />
          <path d="M39 59 L29 56 L32 48" />
          <path d="M61 59 L71 56 L68 48" />
        </g>

        {/* Left lung */}
        <path
          d="M40 29
             C34 32 29 42 27 52
             C23 63 25 73 32 77
             C39 81 46 76 46 67
             L46 49
             C46 40 44 33 40 29 Z"
          fill="none"
          stroke="#16A8DF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right lung */}
        <path
          d="M60 29
             C66 32 71 42 73 52
             C77 63 75 73 68 77
             C61 81 54 76 54 67
             L54 49
             C54 40 56 33 60 29 Z"
          fill="none"
          stroke="#16A8DF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bronchial branches */}
        <g
          fill="none"
          stroke="#a1a8b3"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M39 59 L31 56 L29 49" />
          <path d="M35 66 L31 69" />
          <path d="M61 59 L69 56 L71 49" />
          <path d="M65 66 L69 69" />
        </g>

        {/* Blue branch nodes */}
        <g fill="#16A8DF">
          <circle cx="29" cy="49" r="1.8" />
          <circle cx="31" cy="69" r="1.8" />
          <circle cx="71" cy="49" r="1.8" />
          <circle cx="69" cy="69" r="1.8" />
          <circle cx="34" cy="60" r="1.5" />
          <circle cx="66" cy="60" r="1.5" />
        </g>

        {/* Pink medical cross */}
        <g
          stroke="#d1425a"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M50 65 V77" />
          <path d="M44 71 H56" />
        </g>
      </svg>

      <span className="respira-brand-name">RespiraAI</span>

      <style>{`
        .respira-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .respira-brand-name {
          color: #183B70;
          font-family: Arial, sans-serif;
          font-size: 18px;
          font-weight: 750;
          letter-spacing: -0.5px;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
