// import clsx from "clsx";
// import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
// import HomepageFeatures from "@site/src/components/HomepageFeatures";

// import Heading from "@theme/Heading";

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
      // cursorChar: "<span>|</span>"
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, [])
  return (
    <Layout
      title={`${siteConfig.title}`}
      description=""

    >
      <main className={styles.container}>
        <div>
          <span ref={typeRef} id="typeword"></span>
        </div>
      </main>
    </Layout>
  );
}
