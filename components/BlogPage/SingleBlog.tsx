"use client";

import React, { useEffect, useState } from "react";
import styles from "./BlogPage.module.css";
import { CiHeart } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { MdOutlineModeComment } from "react-icons/md";

interface Author {
  username: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  author: Author;
  likes: string[];
  createdAt: string;
}

interface BlogBodyProps {
  postId: string;
}

const BlogBody: React.FC<BlogBodyProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);

  const getUserId = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr);
      return user._id;
    } catch {
      return null;
    }
  };
  const userId = getUserId();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        const data = await res.json();
        setPost(data.post || null);
      } catch (err) {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleLike = async () => {
    if (!userId || !post) return;
    setLikeLoading(true);
    const hasLiked = post.likes.includes(userId);

    // Optimistic update
    setPost((prev) =>
      prev
        ? {
            ...prev,
            likes: hasLiked
              ? prev.likes.filter((id) => id !== userId)
              : [...prev.likes, userId],
          }
        : prev
    );

    try {
      const res = await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post._id, userId }),
      });
      const data = await res.json();

      setPost((prev) =>
        prev ? { ...prev, likes: data.likes || prev.likes } : prev
      );
    } catch (err) {
      // Optionally revert optimistic update
    } finally {
      setLikeLoading(false);
    }
  };

  if (loading) return <div className={styles.blogBody}>Loading...</div>;
  if (!post) return <div className={styles.blogBody}>Post not found.</div>;

  const hasLiked = userId && post.likes.includes(userId);

  return (
    <div className={styles.blogBody}>
      <div className={styles.blogEntry}>
        <div className={styles.blogContent}>
          <div className={styles.blogHeader}>
            <span className={styles.blogAuthor}>
              {post.author?.username || "Unknown Author"}
            </span>
          </div>
          <h2 className={styles.blogTitle}>{post.title}</h2>
          <div
            className={styles.blogDescription}
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
          <div className={styles.blogMetadata}>
            <span className={styles.metadataItem}>
              <SlCalender />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <button
                className={styles.actionButton}
                onClick={handleLike}
                disabled={!userId || likeLoading}
                style={{ color: hasLiked ? "#e0245e" : undefined }}
                title={
                  userId ? (hasLiked ? "Unlike" : "Like") : "Log in to like"
                }
              >
                <CiHeart className="ml-5 text-2xl" /> {post.likes.length}
              </button>
              <button className={styles.commentButton}>
                <MdOutlineModeComment />
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogBody;
