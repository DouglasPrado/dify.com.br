import { ReactNode } from "react";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col space-y-6 sm:p-6">{children}</div>;
}
