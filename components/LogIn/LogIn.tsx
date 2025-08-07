"use client";
import React from "react";
import { IoMailOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import styles from "../SignUp/SignUp.module.css";
import { useRouter } from "next/navigation";

type LogInProps = {
  onClose: () => void;
};

const LogIn: React.FC<LogInProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });

      const { user } = response.data;

      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Successful!");
      router.push("/BlogPage");
    } catch (error: any) {
      console.error(error);
      toast.error("Login failed");
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
          <h2>Log In with email</h2>
        </div>

        <br />

        <form className={styles.form_LogIn} onSubmit={handleSubmit}>
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

          <button className={styles.continueBtn}>LogIn</button>

          <p>
            Click <span className={styles.backLink}>“Log in”</span> to agree to
            Medium’s Terms of Service
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
