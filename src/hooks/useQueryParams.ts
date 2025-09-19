"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const addParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const removeParams = (keys: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    keys.forEach((key) => {
      params.delete(key);
    });

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const removeAllParams = () => {
    router.replace("?", { scroll: false });
  };

  return { addParams, removeParams, removeAllParams };
};
