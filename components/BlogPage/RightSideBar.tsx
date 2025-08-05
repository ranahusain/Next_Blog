import styles from "./BlogPage.module.css";

const RightSideBar = () => {
  return (
    <aside className={styles.rightSidebar}>
      {/* Staff Picks */}
      <section className={styles.staffPicksSection}>
        <h3 className={styles.sectionTitle}>Staff Picks</h3>
        <div className={styles.staffPick}>
          <div>
            <div className={styles.staffPickAuthor}>Mike Hoffman</div>
            <div className={styles.staffPickTitle}>
              Why Men Need to Start Talking About IVF
            </div>
            <div className={styles.staffPickMeta}>5d ago</div>
          </div>
        </div>
        <div className={styles.staffPick}>
          <div>
            <div className={styles.staffPickMeta}>
              In The Memoirist by Krista Schumacher
            </div>
            <div className={styles.staffPickTitle}>Goodnight Children</div>
            <div className={styles.staffPickMeta}>⭐ Jul 25</div>
          </div>
        </div>
        <div className={styles.staffPick}>
          <div>
            <div className={styles.staffPickAuthor}>Tom Froese</div>
            <div className={styles.staffPickTitle}>
              Re-wilding My Digital Art Process
            </div>
            <div className={styles.staffPickMeta}>⭐ Apr 11</div>
          </div>
        </div>
        <div className={styles.seeAll}>See the full list</div>
      </section>

      {/* Recommended Topics */}
      <section className={styles.recommendedTopicsSection}>
        <h3 className={styles.sectionTitle}>Recommended topics</h3>
        <div className={styles.topicsList}>
          <span className={styles.topicChip}>Data Science</span>
          <span className={styles.topicChip}>Self Improvement</span>
          <span className={styles.topicChip}>Politics</span>
          <span className={styles.topicChip}>Writing</span>
          <span className={styles.topicChip}>Relationships</span>
          <span className={styles.topicChip}>Cryptocurrency</span>
          <span className={styles.topicChip}>Business</span>
        </div>
        <div className={styles.seeAll}>See more topics</div>
      </section>
    </aside>
  );
};

export default RightSideBar;
