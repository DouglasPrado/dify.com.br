import { sitesChromeExtension } from "@/lib/actions/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  const body = await _req.json();

  if (!body.token) {
    throw new Error("Necessário enviar o token");
  }
  const response = await sitesChromeExtension(body.token);
  return NextResponse.json({
    success: true,
    sites: response?.user.sites || [],
  });
}
