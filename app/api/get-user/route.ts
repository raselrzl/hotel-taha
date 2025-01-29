import { NextResponse } from "next/server";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";

export async function GET() {
  const response = await GetCurrentUserFromMongoDB();
  return NextResponse.json(response);
}
