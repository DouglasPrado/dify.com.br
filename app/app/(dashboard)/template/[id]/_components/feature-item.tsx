import { ChevronsRight } from "lucide-react";
import RemoveItemFeatureButton from "./remove-item-feature-button";

export default function FeatureItem({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <div className="flex items-center justify-between  px-4 py-2">
      <div className="flex gap-2 font-cal text-sm text-stone-700">
        <ChevronsRight size={16} /> {name}
      </div>
      <div>
        <RemoveItemFeatureButton id={id} />
      </div>
    </div>
  );
}
