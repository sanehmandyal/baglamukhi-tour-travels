import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({
  variant = 'dark', // 'dark' (for light backgrounds) | 'light' (for dark footers/headers)
  size = 'md', // 'sm' | 'md' | 'lg'
  withText = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: {
      imgWrapper: 'w-9 h-9',
      title: 'text-base',
      subtitle: 'text-[9.5px]',
    },
    md: {
      imgWrapper: 'w-11 h-11 sm:w-12 sm:h-12',
      title: 'text-base sm:text-lg',
      subtitle: 'text-[10px] sm:text-[11px]',
    },
    lg: {
      imgWrapper: 'w-14 h-14 sm:w-16 sm:h-16',
      title: 'text-xl sm:text-2xl',
      subtitle: 'text-xs sm:text-sm',
    },
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex items-center space-x-3 group ${className}`}>
      {/* Temple Logo Icon with Sacred Glow Effects */}
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Outer Radiant Glow Halo */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-60 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300 animate-pulse"></div>

        {/* Circular Temple Emblem */}
        <div
          className={`relative ${selectedSize.imgWrapper} rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-amber-600 via-yellow-300 to-amber-500 shadow-lg shadow-amber-500/30 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300`}
        >
          <img
            src="/baglamukhi-temple-logo.jpg"
            alt="Maa Baglamukhi Temple Logo"
            className="w-full h-full object-cover rounded-full filter brightness-105 group-hover:brightness-110 transition-all duration-300"
            loading="eager"
          />

          {/* Golden Shimmer Glass Layer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-yellow-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"></div>
        </div>
      </div>

      {/* Brand Typography */}
      {withText && (
        <div className="flex flex-col leading-tight">
          <span
            className={`${selectedSize.title} font-black tracking-tight font-display transition-colors duration-200 ${
              variant === 'light' ? 'text-white' : 'text-slate-900'
            }`}
          >
            BAGLAMUKHI{' '}
            <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent font-extrabold drop-shadow-sm">
              TOUR & TRAVELS
            </span>
          </span>
          <span
            className={`${selectedSize.subtitle} font-bold tracking-wider uppercase transition-colors duration-200 ${
              variant === 'light' ? 'text-amber-400/90' : 'text-slate-500'
            }`}
          >
            Maa Baglamukhi Temple • Himachal Tours
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
