// import clsx from "clsx";
// import Link from "@docusaurus/Link";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
// import HomepageFeatures from "@site/src/components/HomepageFeatures";

// import Heading from "@theme/Heading";

import styles from "./index.module.css";

export default function Home(): JSX.Element {
//   const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`about me`}
      description="This message is about me."
    >
      <main>
        <p  className={styles.content} >哈哈哈，欢迎宝贝❤❤❤！</p>
      </main>
    </Layout>
  );
}
