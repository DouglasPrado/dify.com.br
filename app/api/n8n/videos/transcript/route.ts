import { generateReferenceYoutube } from "@/lib/actions/reference";
import { NextResponse } from "next/server";

export async function POST(_req: Request) {
  const body = await _req.json();
  const formData = new FormData();
  const code = body.link.split("=v")[1];
  formData.append("code", code);
  const reference = await generateReferenceYoutube(formData, body.postId);
  return NextResponse.json({ reference });
}
