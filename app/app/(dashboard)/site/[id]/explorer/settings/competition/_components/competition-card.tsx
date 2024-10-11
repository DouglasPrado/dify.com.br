import { Competition } from "@prisma/client";
import Image from "next/image";
import AlertDeleteCompetition from "./alert-delete-competition";

export default function CompetitionCard({
  competition,
}: {
  competition: Competition;
}) {
  return (
    <div
      key={`key-competition-${competition.id}`}
      className="flex cursor-pointer items-center justify-between gap-3 rounded-md bg-stone-100 px-8 py-6 text-xs font-light text-stone-700 hover:bg-stone-200/80"
    >
      <div className="flex items-center gap-2">
        <Image
          alt="[competition.url]"
          height="16"
          width="16"
          src={`http://www.google.com/s2/favicons?domain=${competition.url}`}
          className="rounded"
        />
        {competition.url}
      </div>
      <AlertDeleteCompetition id={competition.id} />
    </div>
  );
}
