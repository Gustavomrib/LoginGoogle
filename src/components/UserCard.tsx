'use client';

import { RegisteredUser } from '@/types/auth';
import { Copy, Download, Trash2, Eye, EyeOff, Check, User, MapPin, Briefcase } from 'lucide-react';
import { useState } from 'react';

interface UserCardProps {
  user: RegisteredUser;
  onCopyJSON: (user: RegisteredUser) => Promise<string>;
  onDownloadJSON: (user: RegisteredUser) => void;
  onDelete: (userId: string) => void;
  toJSON: (user: RegisteredUser) => string;
}

export function UserCard({ user, onCopyJSON, onDownloadJSON, onDelete, toJSON }: UserCardProps) {
  const [showJSON, setShowJSON] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleCopy = async () => {
    await onCopyJSON(user);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(user.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  const createdDate = new Date(user.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="card group relative overflow-hidden">
      {/* Gradient accent top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
            {user.nome.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-white text-base leading-tight">{user.nome}</h3>
            <p className="text-slate-500 text-xs">{user.email}</p>
          </div>
        </div>
        <span className="text-[10px] text-slate-600 font-mono">{createdDate}</span>
      </div>

      {/* Info */}
      <div className="space-y-2 mb-4">
        {user.cidade && user.cidade !== 'Não informado' && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{user.cidade}</span>
          </div>
        )}
        {user.profissao && user.profissao !== 'Não informado' && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
            <span>{user.profissao}</span>
          </div>
        )}
        {user.telefone && user.telefone !== 'Não informado' && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>{user.telefone}</span>
          </div>
        )}
      </div>

      {/* JSON Preview */}
      {showJSON && (
        <div className="mb-4 rounded-lg border border-slate-700 overflow-hidden animate-fade-in">
          <pre className="bg-slate-900 text-green-400 p-3 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-48 overflow-y-auto">
            {toJSON(user)}
          </pre>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1.5 pt-3 border-t border-white/[0.06]">
        <button
          onClick={() => setShowJSON(!showJSON)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
          title={showJSON ? 'Ocultar JSON' : 'Ver JSON'}
        >
          {showJSON ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showJSON ? 'Ocultar' : 'JSON'}</span>
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-200"
          title="Copiar JSON"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copiado!' : 'Copiar'}</span>
        </button>
        <button
          onClick={() => onDownloadJSON(user)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-400 hover:text-violet-300 hover:bg-violet-500/10 transition-all duration-200"
          title="Baixar JSON"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Baixar</span>
        </button>
        <div className="flex-1" />
        <button
          onClick={handleDelete}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
            confirmDelete
              ? 'text-red-300 bg-red-500/20 border border-red-500/30'
              : 'text-slate-500 hover:text-red-300 hover:bg-red-500/10'
          }`}
          title="Excluir usuário"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{confirmDelete ? 'Confirmar?' : 'Excluir'}</span>
        </button>
      </div>
    </div>
  );
}
