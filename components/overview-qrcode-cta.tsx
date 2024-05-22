import { getSession } from "@/lib/auth";
import GetQRCodeModal from "./modal/get-qrcode";
import OpenQRCodeButton from "./open-qrcode-button";

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
