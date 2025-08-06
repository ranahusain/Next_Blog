import React from "react";
import Navbar from "@/components/BlogPage/Navbar";
import LeftSideBar from "@/components/BlogPage/LeftSideBar";
import RightSideBar from "@/components/BlogPage/RightSideBar";
import SingleBlog from "@/components/BlogPage/SingleBlog";
import styles from "../page.module.css";

type PageProps = {
  params: {
    id: string;
  };
};

const page = ({ params }: PageProps) => {
  return (
    <>
      <Navbar />
      <div className={styles.main_div}>
        <div className={styles.main_div}>
          <div className={styles.left}>
            <LeftSideBar />
          </div>
          <div className={styles.center}>
            <SingleBlog postId={params.id} />
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
