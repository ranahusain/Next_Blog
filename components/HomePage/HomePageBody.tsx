import React from "react";
import styles from "./HomePage.module.css";
import Link from "next/link";
import Image from "next/image";

const Body = () => {
  return (
    <>
      <main className={styles.home_body}>
        <div className={styles.body_description}>
          <h1>
            Human
            <span>
              <br />
            </span>
            stories & ideas
          </h1>
          <p>A place to read, write, and deepen your understanding</p>
          <button>
            <Link
              href="/BlogPage"
              className="bg-black p-2 px-8 text-white text-xl rounded-full"
            >
              Start Reading
            </Link>
          </button>
        </div>
        <div className={styles.body_image}>
          <Image src="/medium.png" alt="image" width={450} height={450} />
        </div>
      </main>
    </>
  );
};

export default Body;
