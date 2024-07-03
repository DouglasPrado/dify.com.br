import { getIcons } from "@/lib/actions/icons";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  const icons = await getIcons();

  return NextResponse.json({
    icons,
  });
}
