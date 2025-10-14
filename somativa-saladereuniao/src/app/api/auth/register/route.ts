import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo";
import User from "@/models/User";
import { hashPassword } from "@/lib/hash";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;
  await connectToMongo();

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ error: "Email already exists" }, { status: 400 });

  const hashed = await hashPassword(password);
  const u = await User.create({ name, email, password: hashed });
  const token = signToken({ id: u._id, role: u.role });

  const res = NextResponse.json({ user: { id: u._id, name: u.name, email: u.email, role: u.role } });
  res.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`);
  return res;
}
