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
    <div className="card-glass animate-fade-in group">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar Section */}
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.name}
              width={80}
              height={80}
              className="relative w-20 h-20 rounded-full border-2 border-slate-600 object-cover ring-2 ring-blue-500/50"
            />
          ) : (
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-slate-600 ring-2 ring-blue-500/50">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-1 text-center sm:text-left">
          <div className="space-y-1 mb-4">
            <h3 className="text-lg md:text-xl font-bold text-white">
              {user.name}
            </h3>
            <div className="flex items-center gap-2 text-slate-400 text-sm justify-center sm:justify-start">
              <Mail className="w-4 h-4" />
              <p>{user.email}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-green-300">Conectado</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-500 text-red-300 hover:text-red-200 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">{isLoggingOut ? 'Saindo...' : 'Sair'}</span>
        </button>
      </div>
    </div>
  );
}
