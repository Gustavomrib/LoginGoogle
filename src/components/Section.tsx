'use client';

import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
}

export function Section({
  children,
  className = '',
  title,
  subtitle,
  centered = true,
}: SectionProps) {
  return (
    <section className={`section ${className}`}>
      {(title || subtitle) && (
        <div className={centered ? 'text-center mb-12' : 'mb-12'}>
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
