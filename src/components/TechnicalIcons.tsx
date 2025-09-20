import React from 'react';

export const CircuitLoader: React.FC<{ size?: number }> = ({ size = 48 }) => {
  return (
    <div className="flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className="animate-spin"
      >
        <defs>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="100%" stopColor="#333333" />
          </linearGradient>
        </defs>
        
        {/* Circuit board traces */}
        <path
          d="M24 4 L24 12 L20 16 L12 16 L8 20 L8 28 L12 32 L20 32 L24 36 L24 44"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M44 24 L36 24 L32 20 L32 12 L28 8 L20 8 L16 12 L16 20 L12 24 L4 24"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        
        {/* Connection nodes */}
        <circle cx="24" cy="8" r="2" fill="#000000" opacity="0.8" />
        <circle cx="16" cy="16" r="2" fill="#000000" opacity="0.6" />
        <circle cx="32" cy="32" r="2" fill="#000000" opacity="0.4" />
        <circle cx="8" cy="24" r="2" fill="#000000" opacity="0.8" />
      </svg>
    </div>
  );
};

export const ComponentIcon: React.FC<{ 
  type: string; 
  size?: number;
  className?: string;
}> = ({ type, size = 24, className = '' }) => {
  const iconProps = {
    width: size,
    height: size,
    className: `text-black ${className}`,
    fill: 'currentColor'
  };

  switch (type.toLowerCase()) {
    case 'resistor':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M2 12h4l2-4 2 8 2-8 2 4h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="6" y="10" width="12" height="4" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      );
    case 'led':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 8v8m-4-4h8" stroke="currentColor" strokeWidth="1"/>
          <path d="M16 6l2-2m0 4l-2-2M8 18l-2 2m0-4l2 2" stroke="currentColor" strokeWidth="1"/>
        </svg>
      );
    case 'capacitor':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M8 3v18M16 3v18M2 12h6m8 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'sensor':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <rect x="4" y="8" width="16" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="8" cy="12" r="2" fill="currentColor"/>
          <circle cx="16" cy="12" r="2" fill="currentColor"/>
          <path d="M2 12h2m16 0h2" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    case 'microcontroller':
    case 'arduino':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="7" cy="10" r="1" fill="currentColor"/>
          <circle cx="11" cy="10" r="1" fill="currentColor"/>
          <circle cx="15" cy="10" r="1" fill="currentColor"/>
          <circle cx="19" cy="10" r="1" fill="currentColor"/>
          <circle cx="7" cy="14" r="1" fill="currentColor"/>
          <circle cx="11" cy="14" r="1" fill="currentColor"/>
          <circle cx="15" cy="14" r="1" fill="currentColor"/>
          <circle cx="19" cy="14" r="1" fill="currentColor"/>
          <path d="M12 3v3m0 12v3" stroke="currentColor" strokeWidth="1"/>
        </svg>
      );
    case 'button':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
          <path d="M12 4v2m0 12v2M4 12h2m12 0h2" stroke="currentColor" strokeWidth="1"/>
        </svg>
      );
    default:
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 8h8m-8 4h8m-8 4h4" stroke="currentColor" strokeWidth="1"/>
        </svg>
      );
  }
};

export const ConfidenceBar: React.FC<{
  confidence: number;
  animated?: boolean;
}> = ({ confidence, animated = true }) => {
  const percentage = Math.round(confidence * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-500">
        <span>Confidence</span>
        <span className="font-mono">{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex text-xs text-gray-500">
        <span>High Accuracy</span>
      </div>
    </div>
  );
};

export const TechnicalBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'black' | 'green' | 'yellow' | 'red';
}> = ({ children, variant = 'black' }) => {
  const variants = {
    black: 'bg-gray-100 text-black border-gray-300',
    green: 'bg-green-50 text-green-700 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    red: 'bg-red-50 text-red-700 border-red-200'
  };

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        border font-mono tracking-wide
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
};
