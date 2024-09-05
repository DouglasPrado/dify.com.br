import { ReactNode } from "react";

export default function ContentTunningLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex max-w-screen-lg flex-col">{children}</div>;
}
