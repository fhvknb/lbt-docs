import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Typed from "typed.js";

import styles from "./index.module.css";
import { ReactElement, useEffect, useRef } from "react";

const TYPE_TEXT = [
  '好记性不如烂笔头', 
  '学而不思则罔',
  '见路不走，即见因果',
];

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const typeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(typeRef.current, {
      strings: TYPE_TEXT,
      typeSpeed: 100,
      loop: true,
      backDelay: 1500,
      backSpeed: 20,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, [])
  
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={siteConfig.tagline}
    >
      <main className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          
          <div className={styles.typeContainer}>
            <span ref={typeRef} className={styles.typeText}></span>
          </div>
          
          <p className={styles.heroSubtitle}>
            记录学习的点滴，分享知识的力量
          </p>
          
          <div className={styles.buttonContainer}>
            <Link
              className={styles.button}
              to="/docs/intro">
              开始探索
            </Link>
            <Link
              className={`${styles.button} ${styles.buttonSecondary}`}
              to="/blog">
              阅读博客
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}