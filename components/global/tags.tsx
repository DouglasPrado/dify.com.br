import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Icon from "./icon";

export default function Tags({ tags }: { tags: any }) {
  return (
    <div className="flex gap-1">
      {tags?.map((tag: any, idxTag: number) => (
        <TooltipProvider key={`key-tag-${idxTag}`}>
          <Tooltip>
            <TooltipTrigger title={tag?.name}>
              <div
                className="rounded bg-black/10 p-1"
                style={{ backgroundColor: tag.color }}
              >
                <Icon
                  size={16}
                  icon={tag.icon}
                  style={{ color: tag.colorText }}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <span>{tag?.name}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
