import { ReactNode } from "react";

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col space-y-6 ">{children}</div>;
}
