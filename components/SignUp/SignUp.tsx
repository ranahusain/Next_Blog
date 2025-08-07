"use client";
import React from "react";
import styles from "./SignUp.module.css";
import { IoMailOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type SignUpProps = {
  onClose: () => void;
};

const SignUp: React.FC<SignUpProps> = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", {
        username,
        email,
        password,
      });
      const { user } = response.data;
      const token = response.data.user.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Sign Up Succesfull!");
      router.push("/BlogPage");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      toast.error("Sign up failed");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <div className={styles.iconContainer}>
          <IoMailOutline />
          <h2>Sign Up with email</h2>
        </div>

        <br />

        <form className={styles.form_signup} onSubmit={handleSubmit}>
          <label className={styles.form_label}>Your name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className={styles.form_label}>Your email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className={styles.form_label}>Your password</label>
          <input
            type="password"
            placeholder="Enter your password "
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className={styles.continueBtn}>SignUp</button>

          <p>
            Click <span className={styles.backLink}>“Sign in”</span> to agree to
            Medium’s Terms of Service
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
