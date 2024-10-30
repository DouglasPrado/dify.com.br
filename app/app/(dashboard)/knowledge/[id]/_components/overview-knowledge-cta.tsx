import CreateKnowledgeModal from "@/components/modal/create-knowledge";
import { getSession } from "@/lib/auth";
import CreateKnowledgeButton from "./create-knowledge-button";

export default async function OverviewKnowledgeCTA() {
  const session = await getSession();
  if (!session) {
    return 0;
  }

  return (
    <CreateKnowledgeButton>
      <CreateKnowledgeModal />
    </CreateKnowledgeButton>
  );
}
