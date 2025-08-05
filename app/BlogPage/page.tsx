import React from "react";
import Navbar from "@/components/BlogPage/Navbar";
import LeftSideBar from "@/components/BlogPage/LeftSideBar";
import RightSideBar from "@/components/BlogPage/RightSideBar";
import BlogBody from "@/components/BlogPage/BlogBody";
import styles from "./page.module.css";
const page = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_div}>
        <div className={styles.main_div}>
          <div className={styles.left}>
            <LeftSideBar />
          </div>
          <div className={styles.center}>
            <BlogBody />
          </div>
          <div className={styles.right}>
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
