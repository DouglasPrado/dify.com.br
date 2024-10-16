import { DomainVerificationStatusProps } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export function useDomainStatus({ domain }: { domain: string }) {
  const { data, isValidating } = useSWR<{
    status: DomainVerificationStatusProps;
  }>(`/api/domain/${domain}/verify`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 5000,
    keepPreviousData: true,
  });

  return {
    status: data?.status,
    loading: isValidating,
  };
}
