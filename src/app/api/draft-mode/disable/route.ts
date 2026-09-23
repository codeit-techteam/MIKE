import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { SITE } from "@/lib/constants";

export async function GET(request: Request) {
  (await draftMode()).disable();
  const url = new URL(request.url);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;
  return NextResponse.redirect(new URL("/blog", origin || url.origin));
}
