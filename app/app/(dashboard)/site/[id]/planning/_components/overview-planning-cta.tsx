import { getSession } from "@/lib/auth";
import CreatePlanningModal from "../../../../../../../components/modal/create-planning";
import CreatePlanningButton from "./create-planning-button";

export default async function OverviewPlanningCTA({
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
    <CreatePlanningButton
      color={color}
      title={title}
      description={description}
      icon={icon}
    >
      <CreatePlanningModal type={type} />
    </CreatePlanningButton>
  );
}
