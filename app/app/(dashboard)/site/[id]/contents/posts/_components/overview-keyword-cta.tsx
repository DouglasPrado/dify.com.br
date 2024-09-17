import CreatePlanningModal from "@/components/modal/create-planning";
import { getSession } from "@/lib/auth";
import CreatePostKeywordButton from "./create-keyword-button";

export default async function OverviewKeywordCTA({
  title,
  type,
}: {
  title: string;
  type: string;
}) {
  const session = await getSession();
  if (!session) {
    return 0;
  }

  return (
    <CreatePostKeywordButton title={title}>
      <CreatePlanningModal type={type} />
    </CreatePostKeywordButton>
  );
}
