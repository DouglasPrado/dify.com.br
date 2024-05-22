import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export function useGoogleSuggestions({ search }: { search?: string | null }) {
  const { data, isValidating } = useSWR<any>(
    search && search?.length > 3 ? `/api/google/suggestions/${search}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      refreshInterval: 5000,
      keepPreviousData: true,
    },
  );

  return {
    suggestions: data && data.suggestions,
    loading: isValidating,
  };
}
