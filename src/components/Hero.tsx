'use client';

import { ReactNode } from 'react';
import { Container } from './Container';

interface HeroProps {
  badge?: string;
  title: ReactNode;
  subtitle: ReactNode;
  cta?: ReactNode;
  animated?: boolean;
  className?: string;
}

export function Hero({
  badge,
  title,
  subtitle,
  cta,
  animated = true,
  className = '',
}: HeroProps) {
  return (
    <section className={`py-20 md:py-32 lg:py-40 ${className}`}>
      <Container>
        <div className={`text-center space-y-6 ${animated ? 'animate-fade-in' : ''}`}>
          {badge && (
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 hover:border-blue-500/80 transition-colors duration-300">
              <p className="text-sm font-semibold text-blue-300">{badge}</p>
            </div>
          )}

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white">
            {title}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {cta && (
            <div className="pt-4">
              {cta}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
