'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  icon?: ReactNode;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  icon,
  className = '',
}: BadgeProps) {
  const variantClasses = {
    default: 'badge',
    success: 'badge badge-success',
    error: 'badge badge-error',
    warning: 'badge badge-warning',
    info: 'badge',
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </div>
  );
}
