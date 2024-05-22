import { searchPexelsImage } from "@/lib/pexels";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { search: string } },
) {
  const images: any = await searchPexelsImage(params.search);
  return NextResponse.json({
    images,
  });
}
