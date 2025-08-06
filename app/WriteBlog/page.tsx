"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { GoBell } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import TextEditor from "@/components/TextEditor/TextEditor";
import { toast } from "react-toastify";
import axios from "axios";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "800",
});

const Page = () => {
  const [author, setauthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setauthor(user._id);
      } catch {
        setauthor("");
      }
    }
  }, []);

  const handlePublish = async () => {
    if (!title || !content) {
      toast.error("Title and content cannot be empty!");
      return;
    }

    try {
      const response = await axios.post("api/posts/createpost", {
        title,
        content,
        author,
      });
      toast.success("Post published successfully!");
      setTitle("");
      setContent("<p>Write your blog here...</p>");
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish post!");
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={`${styles.left_side} ${playfair.className}`}>
          <Link className="text-black font-bold" href="/">
            Medium
          </Link>
        </div>
        <div className={styles.right_side}>
          <button
            onClick={handlePublish}
            className="text-white bg-green-700 p-1 px-3 text-sm rounded-full cursor-pointer hover:bg-green-800"
          >
            Publish
          </button>
          <GoBell className={styles.right_side_icon} />
          <CgProfile className={styles.right_side_icon} />
        </div>
      </nav>
      <hr className="text-gray-300" />

      <div className={styles.blog_post}>
        <form
          className="mt-20"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-[60px] w-full outline-none border-none placeholder-gray-300 mb-4 h-[80px] resize-none overflow-hidden"
            style={{
              minHeight: "80px",
              maxHeight: "80px",
              lineHeight: "1.2",
            }}
          />
          <TextEditor content={content} onContentChange={(html) => setContent(html)} />
        </form>
      </div>
    </>
  );
};

export default Page;
