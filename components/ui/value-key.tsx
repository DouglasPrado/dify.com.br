"use client";
import * as React from "react";

import { Minus, Plus } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

export interface KeywordsProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ValueKey = React.forwardRef<HTMLTextAreaElement, KeywordsProps>(
  ({ className, ...props }, ref) => {
    const refAdd = React.useRef(null);
    const [values, setValues] = React.useState<string[]>([]);
    const [input, setInput] = React.useState<string>("");
    const handleAdd = React.useCallback(
      (data: string) => {
        if (data !== "") {
          setValues([...values, data]);
          setInput("");
        }
      },
      [values],
    );
    const handleRemove = React.useCallback(
      (data: string) => {
        const index = values.indexOf(data);
        if (index !== -1) {
          setValues(values.filter((item) => item !== data));
        }
      },
      [values],
    );

    return (
      <div className="flex w-full flex-col items-center gap-3 ">
        {values.map((value, key) => (
          <div key={key} className="flex w-full items-center gap-3">
            <Input type="text" disabled placeholder="Chave" value={value} />
            <Button
              onClick={() => handleRemove(value)}
              type="button"
              className="bg-rose-500"
            >
              <Minus />
            </Button>
          </div>
        ))}
        <div className="flex w-full items-center gap-3">
          <Input
            type="text"
            ref={refAdd}
            autoFocus={true}
            placeholder="Digite o termo que você deseja utilizar"
            value={input}
            onChange={(e: any) => setInput(e.target.value)}
          />
          <Button onClick={() => handleAdd(input)} type="button">
            <Plus />
          </Button>
        </div>
      </div>
    );
  },
);
ValueKey.displayName = "ValueKey";

export { ValueKey };
