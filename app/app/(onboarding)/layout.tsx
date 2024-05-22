import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login | Platforms Starter Kit",
};

export default function ChatLayout({ children }: { children: ReactNode }) {
  return <div className="flex w-full flex-col justify-center">{children}</div>;
}
