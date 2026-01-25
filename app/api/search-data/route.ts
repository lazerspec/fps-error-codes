import { NextResponse } from "next/server";
import { getSearchableData } from "@/data";

export async function GET() {
  const data = getSearchableData();
  return NextResponse.json(data);
}
