import connectMongoDB from "../../../../libs/dbConnect";
import Post from "../../../../models/Post";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectMongoDB();
  const { postId, userId } = await request.json();

  if (!postId || !userId) {
    return NextResponse.json({ error: "Missing postId or userId" }, { status: 400 });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    const hasLiked = post.likes.includes(userId);
    let updatedPost;
    if (hasLiked) {
      // Unlike: remove userId from likes
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true }
      );
    } else {
      // Like: add userId to likes
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } },
        { new: true }
      );
    }
    return NextResponse.json({
      likes: updatedPost.likes,
      liked: !hasLiked,
      postId: updatedPost._id,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}