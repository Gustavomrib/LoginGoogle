'use client';

import { ReactNode } from 'react';
import { Card } from './Card';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  highlight,
}: FeatureCardProps) {
  return (
    <Card variant="glass" className="group h-full">
      <div className="space-y-4">
        <div className="p-3 w-fit rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-colors duration-300">
          <div className="w-6 h-6 text-blue-400">
            {icon}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
        </div>

        {highlight && (
          <div className="pt-3 border-t border-slate-700/30">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              {highlight}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
