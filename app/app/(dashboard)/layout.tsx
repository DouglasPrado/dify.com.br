import Nav from "@/components/global/nav";
import Profile from "@/components/global/profile";
import { ReactNode, Suspense } from "react";
import LayoutWrapper from "../../../components/global/layout-wrapper";

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
