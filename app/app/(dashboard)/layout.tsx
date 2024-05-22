import Nav from "@/components/nav";
import Profile from "@/components/profile";
import { ReactNode, Suspense } from "react";
import LayoutWrapper from "../../../components/layout-wrapper";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </Nav>
      <LayoutWrapper>{children}</LayoutWrapper>
    </div>
  );
}
