"use client";
import * as ReactIcons from "lucide-react";

export default function Icon({
  icon,
  size = 16,
}: {
  icon: string;
  size?: number;
}) {
  const Compoenent = (ReactIcons as any)[icon];

  if (Compoenent) {
    return <Compoenent size={size} />;
  } else {
    return <div>Icon not found</div>;
  }
}
