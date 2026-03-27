'use client';

import Link from 'next/link';
import { Heart, Code2, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-slate-700/30 mt-16 md:mt-24 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-sm">
                A
              </div>
              <span className="font-bold text-lg text-white">Auth Pro</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Autenticação moderna com Google OAuth. Pronto para produção.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-slate-400/10 hover:bg-slate-400/20 text-slate-400 hover:text-blue-400 transition-all duration-300">
                <Code2 size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-400/10 hover:bg-slate-400/20 text-slate-400 hover:text-blue-400 transition-all duration-300">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Apresentação', href: '/apresentacao' },
                { name: 'Cadastro', href: '/cadastro' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Tecnologia</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Next.js 16+</li>
              <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Firebase Auth</li>
              <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Tailwind CSS</li>
              <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">TypeScript</li>
            </ul>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Recursos</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-400/5">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Autenticação</p>
                <p className="text-lg font-bold text-blue-400">OAuth 2.0</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-400/5">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Segurança</p>
                <p className="text-lg font-bold text-green-400">SSL/TLS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-500/50 to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <p className="text-center md:text-left flex items-center justify-center md:justify-start gap-2">
            <span>&copy; {currentYear} Auth Pro. Todos os direitos reservados.</span>
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">
              Privacidade
            </Link>
            <div className="w-px h-4 bg-slate-700" />
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">
              Termos
            </Link>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-1">
              <span>Feito com</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
