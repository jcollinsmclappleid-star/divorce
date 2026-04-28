import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

function getSessionToken(): string {
  let token = localStorage.getItem('dfm-session-token');
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem('dfm-session-token', token);
  }
  return token;
}

export function useSessionToken(): string {
  return getSessionToken();
}

interface AccessStatus {
  hasAccess: boolean;
  reason?: string;
  expiresAt?: string;
  purchasedAt?: string;
}

interface ServerSession {
  authenticated: boolean;
  email?: string;
  hasAccess: boolean;
  expiresAt?: string;
  purchasedAt?: string;
}

export function useAccess() {
  const queryClient = useQueryClient();
  const sessionToken = getSessionToken();

  const serverSessionQuery = useQuery<ServerSession>({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (!res.ok) return { authenticated: false, hasAccess: false };
      return res.json();
    },
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });

  const localQuery = useQuery<AccessStatus>({
    queryKey: ['/api/access', sessionToken],
    queryFn: async () => {
      const res = await fetch(`/api/access/${sessionToken}`);
      if (!res.ok) throw new Error('Failed to check access');
      return res.json();
    },
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    enabled: !serverSessionQuery.data?.hasAccess,
  });

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    queryClient.invalidateQueries({ queryKey: ['/api/access'] });
  }, [queryClient]);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore
    }
    localStorage.removeItem('dfm-session-token');
    queryClient.clear();
  }, [queryClient]);

  const serverAccess = serverSessionQuery.data;
  const localAccess = localQuery.data;

  const hasAccess = serverAccess?.hasAccess ?? localAccess?.hasAccess ?? false;
  const isAuthenticated = serverAccess?.authenticated ?? false;
  const email = serverAccess?.email;

  const expiresAt = serverAccess?.expiresAt ?? localAccess?.expiresAt;
  const purchasedAt = serverAccess?.purchasedAt ?? localAccess?.purchasedAt;
  const reason = !hasAccess ? (localAccess?.reason ?? 'no_purchase') : undefined;

  return {
    hasAccess,
    isAuthenticated,
    email,
    reason,
    expiresAt,
    purchasedAt,
    isLoading: serverSessionQuery.isLoading,
    refresh,
    logout,
  };
}
