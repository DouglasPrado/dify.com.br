import { getIcons } from "@/lib/actions/icons";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  const filter: any = _req.nextUrl.searchParams.get("filter");
  const result = await getIcons(filter);
  return NextResponse.json(result);
}
