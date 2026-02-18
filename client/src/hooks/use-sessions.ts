import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { AppState } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useSessions() {
  return useQuery({
    queryKey: ['sessions'], // Only if we had a list endpoint, which we don't yet in routes
    queryFn: async () => {
      // Placeholder if we implemented list
      return [];
    },
    enabled: false // Disable for now
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: { name?: string, data: AppState }) => {
      const res = await fetch(api.sessions.create.path, {
        method: api.sessions.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to save session');
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Session Saved",
        description: "Your financial model has been securely saved.",
      });
    },
    onError: () => {
      toast({
        title: "Save Failed",
        description: "Could not save your session. Please try again.",
        variant: "destructive",
      });
    }
  });
}
