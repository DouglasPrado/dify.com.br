import { ReactNode } from "react";

export default function ContentTunningLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex flex-col">{children}</div>;
}
