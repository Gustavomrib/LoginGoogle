'use client';

import { useAuth } from '@/context/AuthContext';
import { UserPlus, RefreshCw, X, Check } from 'lucide-react';
import Image from 'next/image';

export function AccountSwitcher() {
  const { user, accounts, activeAccountUid, switchAccount, addAccount, removeAccount, canAddAccount } = useAuth();

  if (!user) return null;

  return (
    <div className="card-glass space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contas</h3>
        <span className="text-[10px] text-slate-500 font-mono">{accounts.length}/2</span>
      </div>

      <div className="space-y-2">
        {accounts.map(account => {
          const isActive = account.uid === activeAccountUid;
          return (
            <div
              key={account.uid}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                isActive
                  ? 'bg-blue-500/10 border-blue-500/30'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] cursor-pointer'
              }`}
              onClick={() => !isActive && switchAccount(account.uid)}
              onKeyDown={e => { if (e.key === 'Enter' && !isActive) switchAccount(account.uid); }}
              role="button"
              tabIndex={0}
            >
              {account.photoURL ? (
                <Image
                  src={account.photoURL}
                  alt={account.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                  {account.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{account.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{account.email}</p>
              </div>

              {isActive ? (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30">
                  <Check className="w-3 h-3 text-green-400" />
                  <span className="text-[10px] font-medium text-green-300">Ativa</span>
                </span>
              ) : (
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); switchAccount(account.uid); }}
                    className="p-1.5 rounded-md text-slate-500 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-200"
                    title="Trocar para esta conta"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeAccount(account.uid); }}
                    className="p-1.5 rounded-md text-slate-500 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                    title="Remover conta"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {canAddAccount && (
        <button
          onClick={addAccount}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-white/[0.12] text-slate-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-200 text-sm font-medium"
        >
          <UserPlus className="w-4 h-4" />
          <span>Adicionar Conta Google</span>
        </button>
      )}
    </div>
  );
}
