'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'bordered';
  hover?: boolean;
}

export function Card({
  children,
  className = '',
  variant = 'default',
  hover = true,
}: CardProps) {
  const variantClasses = {
    default: 'card',
    glass: 'card-glass',
    gradient: 'card-border-gradient',
    bordered: 'rounded-xl border border-slate-700/50 p-6 bg-slate-900/20',
  };

  const hoverClass = hover ? '' : 'hover:shadow-none hover:transform-none';

  return (
    <div
      className={`${variantClasses[variant]} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}
