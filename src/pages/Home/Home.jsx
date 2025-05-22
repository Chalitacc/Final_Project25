import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={styles.hero}>
      <header className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Welcome to Shelfie!</h1>
        <p className={styles.subTitle}>
          Welcome to the Shelfie 📚✨ The ultimate book tracking guide for you!
          A cozy place where you can add your book to your Shelfie, search and
          check your reading list. What´s on your Shelfie today?🍓
        </p>
      </header>
    </section>
  );
};

export default Home;
