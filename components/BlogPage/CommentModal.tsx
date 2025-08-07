import React, { useEffect, useState } from "react";
import styles from "./CommentModal.module.css";
import { toast } from "react-toastify";

interface Comment {
  _id: string;
  content: string;
  author: { username: string };
  createdAt: string;
}

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  postId: string;
}

const CommentModal: React.FC<CommentModalProps> = ({ open, onClose, postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (open) fetchComments();
    // eslint-disable-next-line
  }, [open]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comment/${postId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (err) {
      setComments([]);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPosting(true);
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) throw new Error("You must be logged in to comment.");
      const user = JSON.parse(userStr);
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: postId, author: user._id, content }),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      setContent("");
      fetchComments();
    } catch (err: any) {
      toast.error(err.message || "Error posting comment");
    } finally {
      setPosting(false);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <h2>Comments</h2>
        <form onSubmit={handleSubmit} className={styles.commentForm}>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write a comment..."
            required
            disabled={posting}
          />
          <button type="submit" className={styles.submitBtn} disabled={posting}>
            {posting ? "Posting..." : "Post Comment"}
          </button>
        </form>
        <div className={styles.commentsSection}>
          {loading ? (
            <div>Loading comments...</div>
          ) : comments.length === 0 ? (
            <div>No comments yet.</div>
          ) : (
            comments.map(comment => (
              <div key={comment._id} className={styles.comment}>
                <div className={styles.commentHeader}>
                  <span className={styles.author}>{comment.author?.username || "Unknown"}</span>
                  <span className={styles.date}>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                <div className={styles.content}>{comment.content}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
