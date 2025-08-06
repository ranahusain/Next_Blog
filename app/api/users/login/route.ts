import connectMongoDB from "../../../../libs/dbConnect";
import User from "../../../../models/User";
import { NextResponse, NextRequest } from "next/server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await connectMongoDB();

  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET as string, {
      expiresIn: "2h",
    });

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    };

    return NextResponse.json({ user: userResponse }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
