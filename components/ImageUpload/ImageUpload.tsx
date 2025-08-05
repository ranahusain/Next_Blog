"use client";

import { useState, useRef } from "react";
import { supabase } from "@/libs/supabaseClient";
import { toast } from "react-toastify";
import styles from "./ImageUpload.module.css";

type SongUploadProps = {
  OnUpload: (url: string) => void;
};

const SongUpload: React.FC<SongUploadProps> = ({ OnUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    await handleUpload(selectedFile);
  };

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = fileName;
      const { error } = await supabase.storage
        .from("blog")
        .upload(filePath, file);
      if (error) throw error;
      const { data } = supabase.storage.from("blog").getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
      OnUpload(data.publicUrl);
      toast.success("File uploaded successfully");
      setIsUploaded(true);
    } catch (error) {
      console.error(error);
      toast.error("File upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <button
        type="button"
        className={styles.uploadButton}
        onClick={handleButtonClick}
        disabled={uploading || isUploaded}
        style={{ marginBottom: "16px" }}
      >
        {uploading ? "Uploading..." : isUploaded ? "Uploaded" : "Upload Image"}
      </button>
      <input
        type="file"
        onChange={handleFileChange}
        className={styles.uploadInput}
        accept=".png, .jpeg, .jpg"
        disabled={uploading || isUploaded}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default SongUpload;
