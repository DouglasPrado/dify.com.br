import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className={"mx-auto max-w-screen-xl px-5"}>{children}</div>;
}
