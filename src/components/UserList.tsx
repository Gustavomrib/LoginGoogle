'use client';

import { RegisteredUser } from '@/types/auth';
import { UserCard } from './UserCard';
import { Users, Search } from 'lucide-react';
import { useState } from 'react';

interface UserListProps {
  users: RegisteredUser[];
  onCopyJSON: (user: RegisteredUser) => Promise<string>;
  onDownloadJSON: (user: RegisteredUser) => void;
  onDelete: (userId: string) => void;
  toJSON: (user: RegisteredUser) => string;
}

export function UserList({ users, onCopyJSON, onDownloadJSON, onDelete, toJSON }: UserListProps) {
  const [search, setSearch] = useState('');

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (
      u.nome.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.cidade.toLowerCase().includes(q) ||
      u.profissao.toLowerCase().includes(q)
    );
  });

  if (users.length === 0) {
    return (
      <div className="card-glass text-center py-16 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800 flex items-center justify-center">
          <Users className="w-8 h-8 text-slate-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">Nenhum usuário cadastrado</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Comece criando um cadastro na página de cadastro para ver os usuários aqui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search & Stats */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nome, email, cidade..."
            className="input-field pl-10"
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <Users className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-blue-300">{users.length} usuário{users.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onCopyJSON={onCopyJSON}
              onDownloadJSON={onDownloadJSON}
              onDelete={onDelete}
              toJSON={toJSON}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-500 text-sm">
          Nenhum resultado encontrado para &quot;{search}&quot;
        </div>
      )}
    </div>
  );
}
