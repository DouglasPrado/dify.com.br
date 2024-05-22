import { getSession } from "@/lib/auth";
import CreateClusterButton from "./create-cluster-button";
import CreateClusterModal from "./modal/create-cluster";

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
