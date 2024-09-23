import Footer from "@/components/sections/home/footer";
import Navbar from "@/components/sections/home/navbar";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}
export default function Layout({ children }: ContainerProps) {
  return (
    <div className={"mx-auto max-w-screen-xl px-5"}>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
