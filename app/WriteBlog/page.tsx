"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { GoBell } from "react-icons/go";
import { PiNotePencilLight } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "800",
});

const Page = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={`${styles.left_side} ${playfair.className}`}>
          <Link className="text-black font-bold" href="/">
            Medium
          </Link>
        </div>
        <div className={styles.right_side}>
          <button className="text-white bg-green-700 p-1 px-3 text-sm rounded-full cursor-pointer hover:bg-green-800">
            Publish
          </button>
          <GoBell className={styles.right_side_icon} />
          <CgProfile className={styles.right_side_icon} />
        </div>
      </nav>
      <hr className="text-gray-300" />

      <div className={styles.blog_post}>
        <form
          action=""
          className="mt-20"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          <input
            type="text"
            placeholder="Title"
            className="text-[60px] w-full outline-none border-none placeholder-gray-300 mb-4"
          />
          <textarea
            placeholder="Write your story..."
            className="w-full text-lg border-none focus:outline-none h-150  placeholder-gray-300 overflow-hidden"
          />
        </form>
      </div>
    </>
  );
};

export default Page;
