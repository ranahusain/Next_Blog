import connectMongoDB from "../../../../libs/dbConnect";
import Post from "../../../../models/Post";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();

  try {
    const posts = await Post.find().populate("author").sort({ createdAt: -1 });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}

// const posts = await Post.find().populate("author").populate("comments");
