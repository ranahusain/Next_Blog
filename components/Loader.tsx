"use client";
import React, { useEffect, useState } from "react";

const Loader = ({ text = "Medium", speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p
        className="text-[60px] font-bold"
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        {displayedText}
      </p>
    </div>
  );
};

export default Loader;
