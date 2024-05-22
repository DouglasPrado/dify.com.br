"use client";

import { useModal } from "@/components/modal/provider";
import { QrCode } from "lucide-react";
import { ReactNode } from "react";

export default function OpenQRCodeButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();

  return (
    <button
      onClick={() => modal?.show(children)}
      className="flex w-full items-center justify-start text-sm"
    >
      <QrCode className="mr-2 h-4 w-4" />
      <span>QR Code</span>
    </button>
  );
}
