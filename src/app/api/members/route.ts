import { NextResponse } from "next/server";

export async function GET(): NextResponse {
  return NextResponse.json(
    {
      members_online: 1,
    },
    {
      status: 200,
    },
  );
}
