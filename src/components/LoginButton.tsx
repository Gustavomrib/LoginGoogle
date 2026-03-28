'use client';

import { signInWithPopup, GoogleAuthProvider, Auth } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useState } from 'react';
import { Loader } from 'lucide-react';

export function LoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    if (!auth) {
      setError('Firebase não está configurado');
      return;
    }

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
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="btn-primary group px-8 py-3.5 text-base font-semibold rounded-xl disabled:opacity-60 disabled:cursor-not-allowed min-w-[220px]"
      >
        {loading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Conectando...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" role="img" aria-label="Logo do Google">
              <title>Logo do Google</title>
              <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              />
            </svg>
            <span>Entrar com Google</span>
          </>
        )}
      </button>
      {error && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 max-w-xs">
          <p className="text-sm text-red-400 text-center">{error}</p>
        </div>
      )}
    </div>
  );
}
