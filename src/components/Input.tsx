'use client';

import { ReactNode } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  hint,
  icon,
  fullWidth = true,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className={`form-group ${fullWidth ? 'w-full' : ''}`}>
      {label && <label className="form-label">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            {icon}
          </div>
        )}
        <input
          className={`input ${icon ? 'pl-12' : ''} ${error ? 'border-red-500/50 focus:border-red-500/80' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      {hint && !error && <p className="form-hint">{hint}</p>}
    </div>
  );
}
