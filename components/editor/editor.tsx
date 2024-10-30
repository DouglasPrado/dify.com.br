"use client";
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  useEditor,
  type JSONContent,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { useEffect, useState } from "react";
import { defaultExtensions } from "./extensions";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";

import { Separator } from "@/components/ui/separator";
import { useStudioStore } from "@/lib/stores/StudioStore";
import { cn } from "@/lib/utils";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "./image-upload";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
const extensions = [...defaultExtensions, slashCommand];

interface EditorProp {
  initialValue?: JSONContent;
  onChange: (value: JSONContent | string | any) => void;
}

const ReferenceComponent = () => {
  const { editor } = useEditor();
  const [editorStudio, setEditor, post] = useStudioStore((state: any) => [
    state.editor,
    state.setEditor,
    state.post,
  ]);
  useEffect(() => {
    if (!editorStudio) {
      setEditor(editor);
    }
  });
  const limit = post?.limitWords;
  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.words())
    : 0;

  return (
    <>
      {editor && (
        <div
          className={`absolute -top-24 my-6 flex max-w-[180px] items-center gap-2 rounded-lg bg-stone-50 px-3 py-2 text-xs font-light text-stone-500 shadow`}
        >
          <div
            className={cn(
              percentage > 120
                ? "text-rose-500"
                : percentage > 80
                ? "text-emerald-500"
                : percentage > 50
                ? "text-indigo-500"
                : percentage > 30
                ? "text-orange-500"
                : "text-rose-500",
            )}
          >
            <svg height="26" width="26" viewBox="0 0 20 20">
              <circle r="10" cx="10" cy="10" fill="#e9ece0" />
              <circle
                r="5"
                cx="10"
                cy="10"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                transform="rotate(-90) translate(-20)"
              />
              <circle r="6" cx="10" cy="10" fill="white" />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <span>{editor.storage.characterCount.characters()} caracteres</span>
            <strong className="font-semibold">
              {editor.storage.characterCount.words()} / {limit || 0} palavras
            </strong>
          </div>
        </div>
      )}
    </>
  );
};

const Editor = ({ initialValue, onChange }: EditorProp) => {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  return (
    <EditorRoot>
      <EditorContent
        className="relative block"
        {...(initialValue && { initialContent: initialValue })}
        //@ts-ignore
        extensions={extensions}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view: any, event: any) => handleCommandNavigation(event),
          },
          handlePaste: (view: any, event: any) =>
            handleImagePaste(view, event, uploadFn),
          handleDrop: (view: any, event: any, _slice: any, moved: any) =>
            handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title mt-24 font-default focus:outline-none max-w-full`,
          },
        }}
        onUpdate={({ editor }: any) => {
          onChange(editor);
        }}
        slotAfter={<ImageResizer />}
      >
        <ReferenceComponent />
        <EditorCommand className="border-muted bg-background z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border bg-white px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="text-muted-foreground px-2">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`hover:bg-accent aria-selected:bg-accent flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm `}
                key={item.title}
              >
                <div className="border-muted bg-background flex h-10 w-10 items-center justify-center rounded-md border">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>

        <EditorBubble
          tippyOptions={{
            placement: "top",
          }}
          className="border-muted bg-background flex w-fit max-w-[90vw] overflow-hidden rounded-md border bg-white shadow-xl"
        >
          <Separator orientation="vertical" />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation="vertical" />

          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation="vertical" />
          <TextButtons />
          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
};

export default Editor;
