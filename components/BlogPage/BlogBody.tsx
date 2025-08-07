"use client";

import React, { useEffect, useState } from "react";
import styles from "./BlogPage.module.css";
import { CiHeart } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

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

const BlogBody = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  // Get userId from localStorage
  const getUserId = () => {
    if (typeof window === "undefined") return null;
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

  // Set username once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const userStr = localStorage.getItem("user");
    if (!userStr) return;
    try {
      const user = JSON.parse(userStr);
      setUsername(user.username);
    } catch {}
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts/getpost");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    if (!userId) return;
    setLikeLoading(postId);
    // Optimistically update UI
    setPosts((prev) =>
      prev.map((post) => {
        if (post._id !== postId) return post;
        const hasLiked = post.likes.includes(userId);
        return {
          ...post,
          likes: hasLiked
            ? post.likes.filter((id) => id !== userId)
            : [...post.likes, userId],
        };
      })
    );
    try {
      const res = await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, userId }),
      });
      const data = await res.json();
      // Use the server's updated likes array
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, likes: data.likes } : post
        )
      );
    } catch {
      // Optionally: revert optimistic update or show error
    } finally {
      setLikeLoading(null);
    }
  };
  const handleDelete = async (postId: string) => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`);
      if (response.status === 200) {
        setPosts((prev) => prev.filter((post) => post._id !== postId));
      } else {
        toast.error(response.data.error || "Failed to delete post.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error ||
            "An error occurred while deleting the post."
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred while deleting the post.");
      }
    }
  };

  if (loading) return <div className={styles.blogBody}>Loading...</div>;

  return (
    <div className={styles.blogBody}>
      {posts.length === 0 && <div>No posts found.</div>}
      {posts.map((post) => {
        const hasLiked = userId && post.likes.includes(userId);
        return (
          <div className={styles.blogEntry} key={post._id}>
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
                  // __html: post.content,
                  __html:
                    post.content.length > 150
                      ? post.content.slice(0, 150) + "..."
                      : post.content,
                }}
              />
              <Link href={`/BlogPage/${post._id}`}>
                <button className="hover:bg-black hover:text-white hover:px-1 hover:rounded-full px-1 cursor-pointer">
                  Read More
                </button>
              </Link>
              <div className={styles.blogMetadata}>
                <span className={styles.metadataItem}>
                  <span>
                    <SlCalender />
                  </span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <div className={styles.blogActions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleLike(post._id)}
                      disabled={!userId || likeLoading === post._id}
                      style={{ color: hasLiked ? "#e0245e" : undefined }}
                      title={
                        userId
                          ? hasLiked
                            ? "Unlike"
                            : "Like"
                          : "Log in to like"
                      }
                    >
                      <CiHeart className="ml-2 text-xl" /> {post.likes.length}
                    </button>
                    {username === "admin" && (
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="ml-120 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-6 py-2 text-sm shadow-md transition duration-200 cursor-pointer"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogBody;
