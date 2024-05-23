import { getSession } from "@/lib/auth";
import CreateClusterModal from "../../../../../../../components/modal/create-cluster";
import CreateClusterButton from "./create-cluster-button";

export default async function OverviewClustersCTA() {
  const session = await getSession();
  if (!session) {
    return 0;
  }

  return (
    <CreateClusterButton>
      <CreateClusterModal />
    </CreateClusterButton>
  );
}
