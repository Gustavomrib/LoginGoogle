'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-300 hover:to-purple-400 transition-all duration-300">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-sm">
              A
            </div>
            <span className="hidden sm:inline">Auth Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-400/10"
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  href="/apresentacao"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-400/10"
                >
                  Apresentação
                </Link>
                <Link
                  href="/cadastro"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-400/10"
                >
                  Cadastro
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-400/10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && user && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-down">
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-400/10 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/apresentacao"
              className="block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-400/10 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Apresentação
            </Link>
            <Link
              href="/cadastro"
              className="block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-400/10 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Cadastro
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
