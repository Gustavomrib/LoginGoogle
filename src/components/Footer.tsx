'use client';

import Link from 'next/link';
import { Heart, Code2, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-white/[0.06] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-500/20">
                A
              </div>
              <span className="font-bold text-base text-white">Auth Pro</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Autenticação moderna com Google OAuth. Pronto para produção.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-500 hover:text-blue-400 transition-all duration-200 border border-white/[0.06]"
              >
                <Code2 size={16} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-500 hover:text-blue-400 transition-all duration-200 border border-white/[0.06]"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-widest">Navegação</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Apresentação', href: '/apresentacao' },
                { name: 'Cadastro', href: '/cadastro' },
                { name: 'Usuários', href: '/usuarios' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-slate-200 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-widest">Tecnologia</h4>
            <ul className="space-y-2">
              {['Next.js 16+', 'Firebase Auth', 'Tailwind CSS', 'TypeScript'].map((tech) => (
                <li key={tech} className="text-slate-500 hover:text-slate-200 text-sm transition-colors duration-200 cursor-default">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-widest">Recursos</h4>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">Autenticação</p>
                <p className="text-sm font-semibold text-blue-400">OAuth 2.0</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">Segurança</p>
                <p className="text-sm font-semibold text-green-400">SSL/TLS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <p>&copy; {currentYear} Auth Pro. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-slate-300 transition-colors duration-200">
              Privacidade
            </Link>
            <div className="w-px h-3 bg-slate-700" />
            <Link href="#" className="hover:text-slate-300 transition-colors duration-200">
              Termos
            </Link>
            <div className="w-px h-3 bg-slate-700" />
            <div className="flex items-center gap-1">
              <span>Feito com</span>
              <Heart size={13} className="text-red-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
