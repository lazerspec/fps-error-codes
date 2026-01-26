import { NextResponse } from "next/server";
import { getCodeBySlug } from "@/data";

interface RouteParams {
  params: Promise<{
    scheme: string;
    code: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { scheme, code } = await params;

  const errorCode = getCodeBySlug(scheme, code);

  if (!errorCode) {
    return NextResponse.json(
      {
        error: "Code not found",
        message: `No error code found for scheme "${scheme}" and code "${code}"`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: errorCode,
  });
}
