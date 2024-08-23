"use client";
import { FC, ReactElement, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type MetadataJSONProps = {
  // Prop types here
};

const MetadataJSON: FC<
  MetadataJSONProps
> = ({}: MetadataJSONProps): ReactElement => {
  const [type, setType] = useState("text");

  return (
    <div className="flex gap-2">
      <Input name="Nome" placeholder="Nome" />
      <Select onValueChange={(v) => setType(v)}>
        <SelectTrigger>
          <SelectValue placeholder="Select o tipo de dados" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipo de dados</SelectLabel>
            <SelectItem value="text">Texto</SelectItem>
            <SelectItem value="boolean">Boleano</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {type === "text" && <Input name="Valor" placeholder="Valor" />}
      {type === "boolean" && (
        <Select onValueChange={(v) => console.log(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Boleano" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Boleano</SelectLabel>
              <SelectItem value="text">Verdadeiro</SelectItem>
              <SelectItem value="boolean">Falso</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      <Button className="w-[120px]" size={"icon"}>
        +
      </Button>
    </div>
  );
};

export default MetadataJSON;
