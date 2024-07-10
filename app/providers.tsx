"use client";

import { ModalProvider } from "@/components/modal/provider";
import { StudioModalProvider } from "@/components/modal/studio-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster className="dark:hidden" />
      <Toaster theme="dark" className="hidden dark:block" />
      <StudioModalProvider>
        <ModalProvider>{children}</ModalProvider>
      </StudioModalProvider>
    </SessionProvider>
  );
}
