import styles from "./HomePage.module.css";
import Link from "next/link";
const Footer = () => {
  return (
    <footer>
      <hr />

      <div className={styles.footer}>
        <Link href="/">Help</Link>
        <Link href="/">Status</Link>
        <Link href="/">About</Link>
        <Link href="/SignIn">Careers</Link>
        <Link href="/addTopic">Press</Link>
        <Link href="/addTopic">Blog</Link>
        <Link href="/addTopic">Privacy</Link>
        <Link href="/addTopic">Rules</Link>
        <Link href="/addTopic">Terms</Link>
        <Link href="/addTopic">Text to Speechs</Link>
      </div>
    </footer>
  );
};

export default Footer;
