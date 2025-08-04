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
              href="/SignUp"
              className="bg-black p-2 text-white text-md rounded-full"
            >
              Start Reading
            </Link>
          </button>
        </div>
        <div>
          <Image className={styles.body_image} src="/medium.png" alt="image" width={500} height={500} />
        </div>
      </main>
    </>
  );
};

export default Body;
