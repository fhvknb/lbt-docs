import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "LBT DOCS",
  tagline: "The palest ink is better than the best memory.",
  favicon: "favicon.ico",

  // Set the production url of your site here
  url: "https://docs.zazds.top",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "fhvknb", // Usually your GitHub org/user name.
  projectName: "lbt-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid'
  ],
  themeConfig: {
    // Replace with your project's social card
    metadata: [
      { name: 'algolia-site-verification', content: '45999D009F620D2F' },
    ],
    // image: "img/docusaurus-social-card.jpg",
    algolia: {
      appId: "2VW5QVY9D5",
      apiKey: "ef1c8428c9260643a6b1511d154e0515",
      indexName: "lbtdocs",
      contextualSearch: false,
      searchParameters: {
        facetFilters: [
          'language:zh-Hans',
          [
            "docusaurus_tag:default",
            "docusaurus_tag:docs-default-current"
          ]
        ],
      },
    },
    navbar: {
      title: "LBT-DOCS",
      logo: {
        alt: "LBT Docs Logo",
        src: "images/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documents",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/fhvknb",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        // {
        //   title: "Docs",
        //   items: [
        //     {
        //       label: "Tutorial",
        //       to: "/docs/intro",
        //     },
        //   ],
        // },
        // {
        //   title: "More",
        //   items: [
        //     {
        //       label: "Blog",
        //       to: "/blog",
        //     },
        //     {
        //       label: "GitHub",
        //       href: "https://github.com/facebook/docusaurus",
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} LBT-DOCS, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['powershell', 'bash', 'go', 'sql', 'nginx', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
