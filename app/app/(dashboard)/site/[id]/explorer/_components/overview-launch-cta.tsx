import CreateBulkPostModal from "@/components/modal/create-bulk-post";
import { getSession } from "@/lib/auth";
import CreateLaunchModalButton from "./create-launch-modal-button";

export default async function OverviewLaunchCTA({
  icon,
  title,
  description,
  color,
  type,
}: {
  icon: any;
  title: string;
  description: string;
  color: string;
  type: string;
}) {
  const session = await getSession();
  if (!session) {
    return 0;
  }

  return (
    <CreateLaunchModalButton
      color={color}
      title={title}
      description={description}
      icon={icon}
    >
      <CreateBulkPostModal type={type} />
    </CreateLaunchModalButton>
  );
}
