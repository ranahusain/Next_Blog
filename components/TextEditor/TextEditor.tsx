"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { supabase } from "@/libs/supabaseClient";
import styles from "./TextEditor.module.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type TextEditorProps = {
  onContentChange: (content: string) => void;
  content: string;
};

const TextEditor = ({ onContentChange, content }: TextEditorProps) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: content || "<p>Write your blog here...</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML(); //get the content from editor
      onContentChange(html); // call parent function with content
    },
  });

  // Show placeholder when blurred and empty, remove on focus
  useEffect(() => {
    if (!editor) return;
    const handleFocus = () => {
      if (editor.getHTML() === "<p>Write your blog here...</p>") {
        editor.commands.setContent("");
      }
    };
    const handleBlur = () => {
      if (editor.getHTML() === "" || editor.getHTML() === "<p></p>") {
        editor.commands.setContent("<p>Write your blog here...</p>");
      }
    };
    editor.view.dom.addEventListener("focus", handleFocus);
    editor.view.dom.addEventListener("blur", handleBlur);
    return () => {
      editor.view.dom.removeEventListener("focus", handleFocus);
      editor.view.dom.removeEventListener("blur", handleBlur);
    };
  }, [editor]);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "<p>Write your blog here...</p>");
    }
  }, [content, editor]);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const filePath = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("blog")
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("blog")
      .getPublicUrl(filePath);

    if (urlData && urlData.publicUrl) {
      editor.chain().focus().setImage({ src: urlData.publicUrl }).run();
    }
  };

  const addImage = (e: React.MouseEvent) => {
    e.preventDefault();
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) =>
      handleImageUpload(e as unknown as React.ChangeEvent<HTMLInputElement>);
    input.click();
  };

  if (!editorLoaded || !editor) return null;

  return (
    <div className={`${styles.editorContainer} ${poppins.className}`}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`${styles.toolbarButton} ${
            editor.isActive("bold") ? styles.active : ""
          }`}
          title="Bold"
        >
          <strong>B</strong>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`${styles.toolbarButton} ${
            editor.isActive("italic") ? styles.active : ""
          }`}
          title="Italic"
        >
          <em>I</em>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={`${styles.toolbarButton} ${
            editor.isActive("underline") ? styles.active : ""
          }`}
          title="Underline"
        >
          <u>U</u>
        </button>

        {/* <div className={styles.separator}></div> */}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={`${styles.toolbarButton} ${
            editor.isActive("heading", { level: 1 }) ? styles.active : ""
          }`}
          title="Heading 1"
        >
          H1
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={`${styles.toolbarButton} ${
            editor.isActive("heading", { level: 2 }) ? styles.active : ""
          }`}
          title="Heading 2"
        >
          H2
        </button>

        {/* <div className={styles.separator}></div> */}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`${styles.toolbarButton} ${
            editor.isActive("bulletList") ? styles.active : ""
          }`}
          title="Bullet List"
        >
          •
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`${styles.toolbarButton} ${
            editor.isActive("orderedList") ? styles.active : ""
          }`}
          title="Numbered List"
        >
          1.
        </button>

        {/* <div className={styles.separator}></div> */}

        <button
          type="button"
          onClick={addImage}
          className={styles.toolbarButton}
          title="Insert Image"
        >
          🖼️
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className={styles.editorWrapper} />
    </div>
  );
};

export default TextEditor;
