import { addSiteForGoogle } from "@/lib/google";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { site: string } },
) {
  const response = await addSiteForGoogle(params.site);
  return NextResponse.json({ response });
}
