"use client";
import { useState } from "react";
import styles from "./HomePage.module.css";
import Link from "next/link";
import SignUp from "../SignUp/SignUp";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
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
          <Link href="/">MemberShip</Link>
          <Link href="/">Write</Link>
          <Link href="/LogIn">Sign in</Link>
          <button onClick={() => setShowModal(true)}>
            <Link
              className="bg-black py-2 px-3 text-white text-md rounded-full"
              href=""
            >
              Get Started
            </Link>
          </button>
          {showModal && <SignUp onClose={() => setShowModal(false)} />}
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;
