import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo";
import User from "@/models/User";
import { comparePassword } from "@/lib/hash";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectToMongo();
  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const ok = await comparePassword(password, user.password);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({ id: user._id, role: user.role });
  const res = NextResponse.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  res.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`);
  return res;
}
