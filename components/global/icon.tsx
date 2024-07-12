"use client";
import * as ReactIcons from "lucide-react";

export default function Icon({ icon, size = 16, ...props }: any) {
  const Component = (ReactIcons as any)[icon];

  if (Component) {
    return <Component size={size} {...props} />;
  } else {
    return <div>Icon not found</div>;
  }
}
