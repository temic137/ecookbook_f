import React from 'react';



export const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}> = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={`
        bg-white border border-gray-200
        rounded-lg shadow-sm
        ${hover ? 'hover:shadow-md' : ''}
        transition-shadow duration-200
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const TechnicalButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success';
  className?: string;
  loading?: boolean;
}> = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary', 
  className = '',
  loading = false
}) => {
  const baseStyles = `
    relative px-6 py-3 rounded-lg font-medium transition-all duration-300 
    border-2 font-sans text-sm tracking-wide
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
  `;
  
  const variants = {
    primary: `
      bg-black text-white border-black
      hover:bg-gray-800 hover:border-gray-800 hover:shadow-lg hover:shadow-black/25
      disabled:hover:bg-black disabled:hover:border-black
    `,
    secondary: `
      bg-transparent text-black border-black
      hover:bg-black hover:text-white hover:shadow-lg hover:shadow-black/25
    `,
    success: `
      bg-green-500 text-white border-green-500
      hover:bg-green-600 hover:border-green-600 hover:shadow-lg hover:shadow-green-500/25
    `
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading && (
        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
      )}
      {children}
    </button>
  );
};
