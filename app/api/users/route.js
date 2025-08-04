import connectMongoDB from "../../../libs/dbConnect";
import { NextResponse } from "next/server";
import User from "../../../models/User";

export async function POST(request) {
  await connectMongoDB();
  const { username, email, password } = await request.json();
  try {
    const newUser = await User.create({ username, email, password });
    return NextResponse.json({ User: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
