import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Typed from "typed.js";

import styles from "./index.module.css";
import { ReactElement, useEffect, useRef } from "react";

const TYPE_TEXT = [
  '好记性不如烂笔头',
  '学而不思则罔，思而不学则殆',
  '见路不走，即见因果',
  '温故而知新',
  '千里之行，始于足下',
  '路虽远，行则至，事虽难，做则成',
  '欲穷千里目，更上一层楼',
  '功崇惟志，业广惟勤',
  '知易行难，行胜于言',
  '天行健，君子以自强不息',
  '学贵有恒，业贵有专',
  '博观而约取，厚积而薄发',
  '十年磨一剑，霜刃未曾试',
  '业精于勤，荒于嬉',
  '不积跬步，无以至千里'
];


const shuffleArray = (array: string[]): string[] => {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray.length > 5 ? newArray.slice(0, 5) : newArray;
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const typeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const shuffleText = shuffleArray(TYPE_TEXT);

    const typed = new Typed(typeRef.current, {
      strings: shuffleText,
      typeSpeed: 100,
      loop: true,
      backDelay: 1500,
      backSpeed: 20,
    });

    return () => {
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
              to="/docs/start">
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