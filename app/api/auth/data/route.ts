import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(function GET(request) {
  if (request.auth) return NextResponse.json(request.auth);
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
})