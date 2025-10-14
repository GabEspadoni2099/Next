import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo";
import Reservation from "@/models/Reservation";
import Room from "@/models/Room";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  await connectToMongo();
  const url = new URL(req.url);
  const date = url.searchParams.get("date"); // opcional: YYYY-MM-DD para filtrar
  const query: any = {};
  if (date) {
    const start = new Date(date + "T00:00:00.000Z");
    const end = new Date(date + "T23:59:59.999Z");
    query.start = { $gte: start, $lte: end };
  }
  const resv = await Reservation.find(query).populate("room").populate("user").lean();
  return NextResponse.json(resv);
}

export async function POST(req: Request) {
  await connectToMongo();
  const token = req.headers.get("authorization")?.split(" ")[1];
  const user = token ? verifyToken(token) : null;
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { roomId, start, end, title } = await req.json();

  // validate
  const s = new Date(start), e = new Date(end);
  if (s >= e) return NextResponse.json({ error: "Invalid time range" }, { status: 400 });

  // Check room exists
  const room = await Room.findById(roomId);
  if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });

  // Conflict check: any reservation on same room where intervals overlap?
  const conflict = await Reservation.findOne({
    room: roomId,
    $or: [
      { start: { $lt: e }, end: { $gt: s } }, // overlap detection
    ],
  });

  if (conflict) return NextResponse.json({ error: "Room already booked in this interval" }, { status: 409 });

  const r = await Reservation.create({ room: roomId, user: (user as any).id, start: s, end: e, title });
  return NextResponse.json(r, { status: 201 });
}
