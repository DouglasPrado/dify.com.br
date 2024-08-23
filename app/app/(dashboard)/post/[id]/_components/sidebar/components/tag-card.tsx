"use client";
import Icon from "@/components/global/icon";
import LoadingDots from "@/components/icons/loading-dots";
import EditTagModal from "@/components/modal/edit-tag";
import {
  addPostToFromTagId,
  deleteTag,
  removePostToFromTagId,
} from "@/lib/actions/tags";
import { useStudioStore } from "@/lib/stores/StudioStore";
import { cn } from "@/lib/utils";
import { CheckCheckIcon, PlusIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import EditTagButton from "./edit-tag-button";

export default function TagCard({ data }: any) {
  const post = useStudioStore((state) => state.post);
  const [check, setCheck] = useState(
    post?.tags?.filter((tag: any) => tag.id === data.id)?.id === data.id ||
      false,
  );
  const [loading, setLoading] = useState(false);
  const getTags = useStudioStore((state) => state.getTags);
  const router = useRouter();
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-1 rounded px-3 py-2",
      )}
      style={{ backgroundColor: data.color }}
    >
      <Icon icon={data.icon} style={{ color: data.colorText }} />
      <div className="flex w-full flex-col">
        <h4
          className="font-title text-xs text-stone-800"
          style={{ color: data.colorText }}
        >
          {data.name}
        </h4>
      </div>
      {loading && <LoadingDots />}
      <button
        className="rounded bg-black/10 p-1"
        onClick={() => {
          setLoading(true);
          !check &&
            addPostToFromTagId(data.id, post.id).then((res: any) => {
              setCheck(true);
              if (res.error) {
                toast.error(res.error);
              } else {
                getTags(data.siteId);
                setLoading(false);
                router.refresh();
                toast.success(`Successfully add tag!`);
              }
            });
          check &&
            removePostToFromTagId(data.id, post.id).then((res: any) => {
              setCheck(false);
              if (res.error) {
                toast.error(res.error);
              } else {
                getTags(data.siteId);
                setLoading(false);
                router.refresh();
                toast.success(`Successfully removed tag!`);
              }
            });
        }}
      >
        {check && !loading ? (
          <CheckCheckIcon
            style={{
              color: data.colorText,
            }}
            size={12}
          />
        ) : (
          <PlusIcon
            style={{
              color: data.colorText,
            }}
            size={12}
          />
        )}
      </button>

      <EditTagButton data={data}>
        <EditTagModal tag={data} />
      </EditTagButton>

      <button
        onClick={() => {
          deleteTag(data.id).then((res: any) => {
            if (res.error) {
              toast.error(res.error);
            } else {
              getTags(data.siteId);
              router.refresh();
              toast.success(`Successfully removed tag!`);
            }
          });
        }}
        className="rounded bg-black/10 p-1"
      >
        <Trash
          style={{
            color: data.colorText,
          }}
          size={12}
        />
      </button>
    </div>
  );
}
