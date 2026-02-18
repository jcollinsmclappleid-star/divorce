import { useQuery } from '@tanstack/react-query';
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

export function useAccess() {
  const sessionToken = getSessionToken();

  const query = useQuery<AccessStatus>({
    queryKey: ['/api/access', sessionToken],
    queryFn: async () => {
      const res = await fetch(`/api/access/${sessionToken}`);
      if (!res.ok) throw new Error('Failed to check access');
      return res.json();
    },
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });

  const refresh = useCallback(() => {
    query.refetch();
  }, [query]);

  return {
    hasAccess: query.data?.hasAccess ?? false,
    reason: query.data?.reason,
    expiresAt: query.data?.expiresAt,
    purchasedAt: query.data?.purchasedAt,
    isLoading: query.isLoading,
    refresh,
  };
}
