import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: (attemptIndex: number): number => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

export default queryClient;
