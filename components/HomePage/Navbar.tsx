import React from "react";
import styles from "./HomePage.module.css";
import Link from "next/link";
const Navbar = () => {
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
          <button>
            <Link
              className="bg-black py-2 px-3 text-white text-md rounded-full"
              href="/SignUp"
            >
              Get Started
            </Link>
          </button>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;
