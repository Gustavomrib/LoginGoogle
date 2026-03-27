'use client';

import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User as UserIcon, Mail } from 'lucide-react';
import { useState } from 'react';

export function UserProfile() {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user) return null;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-violet-600 rounded-full opacity-50 blur-sm" />
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.name}
              width={72}
              height={72}
              className="relative w-[72px] h-[72px] rounded-full object-cover ring-2 ring-blue-500/40"
            />
          ) : (
            <div className="relative flex items-center justify-center w-[72px] h-[72px] rounded-full bg-gradient-to-br from-blue-500 to-violet-600 ring-2 ring-blue-500/40">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left space-y-1.5">
          <h3 className="text-lg font-bold text-white">{user.name}</h3>
          <div className="flex items-center gap-1.5 text-slate-400 text-sm justify-center sm:justify-start">
            <Mail className="w-3.5 h-3.5" />
            <span>{user.email}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-green-300">Conectado</span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] hover:bg-red-500/10 border border-white/[0.08] hover:border-red-500/30 text-slate-400 hover:text-red-300 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut className="w-4 h-4" />
          <span>{isLoggingOut ? 'Saindo...' : 'Sair'}</span>
        </button>
      </div>
    </div>
  );
}
