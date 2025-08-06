import connectMongoDB from "../../../../libs/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await connectMongoDB();
  const { username, email, password } = await request.json();
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists with this email",
        },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWTSECRET as string,
      {
        expiresIn: "2h",
      }
    );

    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token,
    };

    return NextResponse.json({ user: userResponse }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
