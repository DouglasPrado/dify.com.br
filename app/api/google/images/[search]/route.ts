import { searchGoogleImage } from "@/lib/google";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { search: string } },
) {
  const images = await searchGoogleImage(params.search);
  return NextResponse.json({
    images: images?.data.items,
  });
}
