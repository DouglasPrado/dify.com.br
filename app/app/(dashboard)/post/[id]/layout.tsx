import { ReactNode } from "react";

export default function PostLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}
