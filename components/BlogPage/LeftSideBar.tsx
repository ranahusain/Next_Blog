import styles from "./BlogPage.module.css";
import Link from "next/link";
import { LuLibrary } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
const LeftSideBar = () => {
  return (
    <>
      <div>
        <div className={styles.left_nav}>
          <Link href="#" className="flex gap-4 ">
            <IoHome className={styles.leftbar_icon} />
            Home
          </Link>
          <Link href="#" className="flex gap-4">
            <LuLibrary className={styles.leftbar_icon} />
            Library
          </Link>
          <Link href="#" className="flex gap-4">
            <BsPerson className={styles.leftbar_icon} />
            Profile
          </Link>
          <hr className="text-gray-300" />

          <Link href="/" className="flex gap-4 mt-10">
            <b>Follwing &nbsp; &gt; </b>
          </Link>

          <Link href="#" className="flex gap-4 mt-10 text-gray-600">
            <BsPerson className="text-2xl " />
            <p className="text-sm">
              Discover more writers <br />
              and publications to <br />
              follow.
              <br />
              <br />
              <span className="text-underline">
                <u>See Suggestions</u>
              </span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
