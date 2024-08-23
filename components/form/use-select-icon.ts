import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export function useSelectIcon() {
  const { data, isValidating } = useSWR<any>(`/api/icons`, fetcher);

  return {
    data,
    loading: isValidating,
  };
}
