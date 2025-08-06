import connectMongoDB from "../../../../libs/dbConnect";
import Post from "../../../../models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  await connectMongoDB();
  const post = await Post.findOne({ _id: id }).populate("author", "username");

  if (!post) {
    return NextResponse.json({ error: "post not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "post", post: post }, { status: 200 });
}
