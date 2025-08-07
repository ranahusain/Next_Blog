import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/dbConnect";
import Comment from "@/models/Comment";

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    const { post, author, content } = await request.json();
    const newComment = await Comment.create({ post, author, content });
    return NextResponse.json({ comment: newComment }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
