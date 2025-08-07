"use client";
import styles from "./BlogPage.module.css";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { GoBell } from "react-icons/go";
import { PiNotePencilLight } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "800",
});

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const token = localStorage.getItem("token");

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
            className="flex cursor-pointer"
            onClick={(e) => {
              if (!token) {
                e.preventDefault();
                toast.info("Please sign in first!");
              } else {
                router.push("/WriteBlog");
              }
            }}
          >
            <PiNotePencilLight className={styles.right_side_icon} />
            <p className="mt-0.5 text-lg hover:text-black">&nbsp; Write</p>
          </button>

          <GoBell className={styles.right_side_icon} />
          <CgProfile
            className={styles.right_side_icon}
            onClick={(e) => {
              if (!token) {
                e.preventDefault();
                toast.info("LogIn or create account!");
                router.push("/");
              } else {
              }
            }}
          />

          {token && (
            <button onClick={handleLogout}>
              <CiLogout className={styles.right_side_icon} />
            </button>
          )}
        </div>
      </nav>
      <hr className="text-gray-300" />
    </>
  );
};

export default Navbar;
