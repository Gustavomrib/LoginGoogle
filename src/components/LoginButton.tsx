'use client';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useState } from 'react';
import { LogIn, Loader } from 'lucide-react';

export function LoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
      console.error('Erro de login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="btn-primary group relative px-8 py-3 text-base font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {loading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Conectando...</span>
          </>
        ) : (
          <>
            <LogIn className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Entrar com Google</span>
          </>
        )}
      </button>
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 border border-red-500/50">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
