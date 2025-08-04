"use client";
import { useState } from "react";
import styles from "./HomePage.module.css";
import Link from "next/link";
import SignUp from "../SignUp/SignUp";
import LogIn from "../LogIn/LogIn";

const Navbar = () => {
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.left_side}>
          <Link className="text-black font-bold" href="/">
            Medium
          </Link>
        </div>

        <div className={styles.right_side}>
          <Link href="/">Our Story</Link>
          <Link href="/">Membership</Link>
          <Link href="/">Write</Link>

          <button onClick={() => setModalType("login")}>
            <Link href="">Sign in</Link>
          </button>

          <button onClick={() => setModalType("signup")}>
            <Link
              className="bg-black py-2 px-3 text-white text-md rounded-full"
              href=""
            >
              Get Started
            </Link>
          </button>
        </div>
      </nav>
      <hr />

      {/* Conditionally render modals */}
      {modalType === "login" && <LogIn onClose={() => setModalType(null)} />}
      {modalType === "signup" && <SignUp onClose={() => setModalType(null)} />}
    </>
  );
};

export default Navbar;
