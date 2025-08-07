import connectMongoDB from "../../../../libs/dbConnect";
import Post from "../../../../models/Post";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await connectMongoDB();
  const { title, content, author } = await request.json();

  try {
    const newPost = await Post.create({ title, content, author });

    return NextResponse.json({ user: newPost }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
