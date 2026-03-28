'use client';

export const dynamic = 'force-dynamic';

import { useAuth } from '@/context/AuthContext';
import { useUsers } from '@/hooks/useUsers';
import { UserList } from '@/components/UserList';
import { AccountSwitcher } from '@/components/AccountSwitcher';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader, Users, Plus, Download } from 'lucide-react';
import Link from 'next/link';

export default function Usuarios() {
  const { user, loading, activeAccountUid } = useAuth();
  const { users, loading: usersLoading, copyJSON, downloadJSON, remove, toJSON, count } = useUsers(activeAccountUid ?? undefined);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleDownloadAll = () => {
    if (users.length === 0) return;
    const allData = users.map(u => JSON.parse(toJSON(u)));
    const json = JSON.stringify(allData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `todos-usuarios-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading || usersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-2">
            <Users className="w-3.5 h-3.5" />
            Gerenciamento de Usuários
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Usuários
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              Cadastrados
            </span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Visualize, copie, baixe e gerencie todos os usuários cadastrados na conta ativa.
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 animate-slide-up">
          <div className="flex items-center gap-3">
            <Link
              href="/cadastro"
              className="btn-primary px-5 py-2.5 text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Cadastro</span>
            </Link>
            {count > 0 && (
              <button
                onClick={handleDownloadAll}
                className="btn-secondary px-5 py-2.5 text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Todos ({count})</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Users Grid */}
          <div className="lg:col-span-3">
            <UserList
              users={users}
              onCopyJSON={copyJSON}
              onDownloadJSON={downloadJSON}
              onDelete={remove}
              toJSON={toJSON}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-slide-down">
            <AccountSwitcher />

            {/* Stats Card */}
            <div className="card space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Estatísticas</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Total de registros</span>
                  <span className="text-lg font-bold text-white">{count}</span>
                </div>
                <div className="h-px bg-white/[0.06]" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Conta ativa</span>
                  <span className="text-sm font-medium text-blue-400 truncate ml-2 max-w-[120px]">{user.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
