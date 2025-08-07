import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/dbConnect";
import Comment from "@/models/Comment";

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    await connectMongoDB();
    const { postId } = params;
    const comments = await Comment.find({ post: postId }).populate("author", "username").sort({ createdAt: -1 });
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
