import { getSession } from "@/lib/auth";
import OpenQRCodeButton from "./open-qrcode-button";
import GetQRCodeModal from "../modal/get-qrcode";

export default async function OverviewQRCodeCTA({ data }: any) {
  const session = await getSession();
  if (!session) {
    return 0;
  }

  return (
    <OpenQRCodeButton>
      <GetQRCodeModal />
    </OpenQRCodeButton>
  );
}
