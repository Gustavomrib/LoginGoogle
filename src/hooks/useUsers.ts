'use client';

import { useState, useEffect, useCallback } from 'react';
import { RegisteredUser } from '@/types/auth';
import { getUsersByAccount, addUser, deleteUser, userToJSON } from '@/services/storage';

export function useUsers(accountUid: string | undefined) {
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    if (!accountUid) {
      setUsers([]);
      setLoading(false);
      return;
    }
    setUsers(getUsersByAccount(accountUid));
    setLoading(false);
  }, [accountUid]);

  useEffect(() => {
    reload();
  }, [reload]);

  const add = useCallback(
    (userData: Omit<RegisteredUser, 'id' | 'createdAt' | 'ownerUid'>) => {
      if (!accountUid) return null;
      const newUser = addUser(accountUid, userData);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    },
    [accountUid]
  );

  const remove = useCallback(
    (userId: string) => {
      if (!accountUid) return;
      deleteUser(accountUid, userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
    },
    [accountUid]
  );

  const toJSON = useCallback((user: RegisteredUser) => {
    return userToJSON(user);
  }, []);

  const copyJSON = useCallback(async (user: RegisteredUser) => {
    const json = userToJSON(user);
    await navigator.clipboard.writeText(json);
    return json;
  }, []);

  const downloadJSON = useCallback((user: RegisteredUser) => {
    const json = userToJSON(user);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usuario-${user.nome.replace(/\s+/g, '-').toLowerCase()}-${user.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return {
    users,
    loading,
    add,
    remove,
    toJSON,
    copyJSON,
    downloadJSON,
    reload,
    count: users.length,
  };
}
