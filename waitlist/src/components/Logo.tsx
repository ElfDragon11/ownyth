import React from 'react';
import { Circle } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <Circle 
          className="w-10 h-10 text-transparent stroke-[3] absolute inset-0"
          style={{ 
            stroke: 'url(#gradient-1)',
            transform: 'scale(1)'
          }} 
        />
        <Circle 
          className="w-10 h-10 text-transparent stroke-[3]"
          style={{ 
            stroke: 'url(#gradient-2)',
            transform: 'scale(0.7)'
          }} 
        />
        <svg width="0" height="0">
          <defs>
            <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A0F0FF" />
              <stop offset="100%" stopColor="#3F8CFF" />
            </linearGradient>
            <linearGradient id="gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9055FF" />
              <stop offset="100%" stopColor="#4F3CFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-2xl font-bold">Ownyth</span>
    </div>
  );
}