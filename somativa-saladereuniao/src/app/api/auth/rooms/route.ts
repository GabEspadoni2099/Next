import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo";
import Room from "@/models/Room";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  await connectToMongo();
  const rooms = await Room.find().lean();
  return NextResponse.json(rooms);
}

export async function POST(req: Request) {
  // Only admin should create rooms - do token check
  await connectToMongo();
  const token = req.headers.get("authorization")?.split(" ")[1];
  const user = token ? verifyToken(token) : null;
  if (!user || (user as any).role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await req.json();
  const r = await Room.create(body);
  return NextResponse.json(r, { status: 201 });
}
