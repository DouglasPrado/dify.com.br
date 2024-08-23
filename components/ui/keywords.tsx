import * as React from "react";

import { TagsInput } from "react-tag-input-component";

export interface KeywordsProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Keywords = React.forwardRef<HTMLTextAreaElement, KeywordsProps>(
  ({ className, ...props }, ref) => {
    const [selected, setSelected] = React.useState<string[]>([]);
    return (
      <TagsInput
        // @ts-ignore
        value={selected}
        removers={["backspace"]}
        separators={["Enter"]}
        // @ts-ignore
        onChange={setSelected}
        className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
        {...props}
      />
    );
  },
);
Keywords.displayName = "Keywords";

export { Keywords };
