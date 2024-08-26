"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { generateTokenChromeExtension } from "@/lib/actions/users";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function GenerateTokenChromeExtension() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [token, setToken] = useState(null);
  return (
    <div className="flex flex-col">
      <button
        onClick={() =>
          startTransition(async () => {
            const chromeExtension: any = await generateTokenChromeExtension();
            setToken(chromeExtension.token);
            va.track("Created Token Chrome Extension");
            router.refresh();
          })
        }
        className={cn(
          "flex w-full max-w-sm items-center  justify-center space-x-2 rounded-lg border px-6 py-3 text-sm transition-all focus:outline-none",
          isPending
            ? "h-12 w-full max-w-sm cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
        disabled={isPending}
      >
        {isPending ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>Gerar token para a extensão do chrome</p>
        )}
      </button>
      {token && (
        <div className="flex flex-col gap-3 py-3 text-stone-700">
          <div className="flex gap-1">
            <strong className="text-stone-900">Token:</strong>
            <span>{token}</span>
          </div>
          <p>
            Entre em configurações na extensão e cole o token para ativar sua
            extensão
          </p>
        </div>
      )}
    </div>
  );
}
