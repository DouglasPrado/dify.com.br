"use client";
import { EditorContent, EditorRoot, type JSONContent } from "novel";
import { defaultExtensions } from "./extensions";

import { slashCommand } from "./slash-command";
const extensions = [...defaultExtensions, slashCommand];

interface EditorProp {
  initialValue?: JSONContent;
}

const EditorView = ({ initialValue }: EditorProp) => {
  return (
    <EditorRoot>
      <EditorContent
        className="relative block bg-white"
        {...(initialValue && { initialContent: initialValue })}
        editable={false} //@ts-ignore
        extensions={extensions}
        immediatelyRender={false}
        editorProps={{
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
      ></EditorContent>
    </EditorRoot>
  );
};

export default EditorView;
