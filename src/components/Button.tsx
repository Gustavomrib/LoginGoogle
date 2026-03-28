'use client';

import { ReactNode } from 'react';
import { Loader } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    tertiary: 'btn-tertiary',
    ghost: 'hover:bg-slate-400/10 text-slate-300 hover:text-white',
  };

  const sizeClasses = {
    sm: 'btn-sm',
    md: 'px-6 py-3',
    lg: 'btn-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      disabled={isLoading || disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          <span>Processando...</span>
        </>
      ) : (
        <>
          {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
