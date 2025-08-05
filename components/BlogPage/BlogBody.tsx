import styles from './BlogPage.module.css';

const BlogBody = () => {
  return (
    <div className={styles.blogBody}>
      {/* First Blog Entry */}
      <div className={styles.blogEntry}>
        <div className={styles.blogContent}>
          <div className={styles.blogHeader}>
            <span className={styles.blogSource}>DevOps.dev</span>
            <span>by</span>
            <span className={styles.blogAuthor}>Alain Sondrae</span>
          </div>
          
          <h2 className={styles.blogTitle}>
            Raspberry Pi Home Server Setup + Remote Access
          </h2>
          
          <p className={styles.blogDescription}>
            What This Is and Why It's Cool
          </p>
          
          <div className={styles.blogMetadata}>
            <span className={styles.metadataItem}>
              <span>👁</span>
              <span>515</span>
            </span>
            <span className={styles.metadataItem}>
              <span>💬</span>
              <span>13</span>
            </span>
            <span>Apr 19</span>
          </div>
        </div>
        
        <div className={styles.blogActions}>
          <button className={styles.actionButton}>⊖</button>
          <button className={styles.actionButton}>🔖</button>
          <button className={styles.actionButton}>⋯</button>
        </div>
        
        <div className={styles.blogThumbnail}>
          <span>Raspberry Pi</span>
        </div>
      </div>

      {/* Feed Section */}
      <div className={styles.feedSection}>
        <span className={styles.feedIcon}>📄</span>
        <span>Because you follow Technology</span>
      </div>

      <div className={styles.separator}></div>

      {/* Second Blog Entry */}
      <div className={styles.blogEntry}>
        <div className={styles.blogContent}>
          <div className={styles.blogHeader}>
            <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>JS</span>
            <span className={styles.blogSource}>JavaScript in Plain English</span>
            <span>by</span>
            <span className={styles.blogAuthor}>CodeByUmar</span>
          </div>
          
          <h2 className={styles.blogTitle}>
            I Copy These 10 Code Snippets Into Every Project
          </h2>
          
          <p className={styles.blogDescription}>
            After years of building full-stack apps, these are the first 10 utilities I paste into every new repo. They save me time, bugs, and headaches...
          </p>
          
          <div className={styles.blogMetadata}>
            <span className={styles.metadataItem}>
              <span>👁</span>
              <span>1.2K</span>
            </span>
            <span className={styles.metadataItem}>
              <span>💬</span>
              <span>27</span>
            </span>
            <span>Jun 4</span>
          </div>
        </div>
        
        <div className={styles.blogActions}>
          <button className={styles.actionButton}>⊖</button>
          <button className={styles.actionButton}>🔖</button>
          <button className={styles.actionButton}>⋯</button>
        </div>
        
        <div className={styles.blogThumbnail}>
          <span>Code Snippets</span>
        </div>
      </div>
    </div>
  );
};

export default BlogBody;
