import { NextResponse } from "next/server";
import { getSearchIndex } from "@/data";

export async function GET() {
  const data = getSearchIndex();
  return NextResponse.json(data);
}
