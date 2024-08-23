"use client";
import { Reorder } from "framer-motion";
import { useState } from "react";
import LinkItem from "../../app/app/(dashboard)/site/[id]/links/_components/link-item";

export default function ReorderLink({ data }: { data: any }) {
  const [items, setItems] = useState(data);

  return (
    <Reorder.Group axis="y" values={items} onReorder={setItems}>
      {items.map((item: any, key: number) => (
        <LinkItem key={item.id} value={item} />
      ))}
    </Reorder.Group>
  );
}
