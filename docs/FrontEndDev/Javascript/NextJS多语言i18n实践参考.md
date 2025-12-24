---
tag:
  - nextjs
  - javascript
---

# Next.js 多语言实现最佳实践示例模板

Next.js 提供了多种实现多语言(i18n)的方法。以下是基于最新 Next.js 版本的多语言实现最佳实践示例模板，分为 App Router 和 Pages Router 两种方案。

## App Router 方案 (Next.js 13+)

App Router 提供了更现代的多语言实现方式，通过路由分组和中间件实现。

### 1. 项目结构

```
/app
  /[lang]
    /about
      page.tsx
    /blog
      /[slug]
        page.tsx
      page.tsx
    layout.tsx
    page.tsx
  /api
    /[...route]
      route.ts
/components
  LanguageSwitcher.tsx
/dictionaries
  en.json
  zh.json
  ja.json
/middleware.ts
/i18n-config.ts
```

### 2. 配置文件 (i18n-config.ts)

```typescript
export const i18n = {
  defaultLocale: 'zh',
  locales: ['en', 'zh', 'ja'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
```

### 3. 中间件 (middleware.ts)

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string {
  // 获取 cookie 中的语言设置
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  // 获取 Accept-Language
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  // 使用 intl-localematcher 匹配最佳语言
  try {
    return matchLocale(languages, i18n.locales, i18n.defaultLocale);
  } catch (e) {
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 检查路径是否已包含语言前缀
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 排除不需要国际化的路径
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 重定向到带有语言前缀的路径
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`, request.url)
    );
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### 4. 字典加载函数 (app/[lang]/dictionaries.ts)

```typescript
import 'server-only';
import type { Locale } from '@/i18n-config';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  zh: () => import('@/dictionaries/zh.json').then((module) => module.default),
  ja: () => import('@/dictionaries/ja.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
```

### 5. 根布局 (app/[lang]/layout.tsx)

```typescript
import { Inter } from 'next/font/google';
import { Locale, i18n } from '@/i18n-config';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <header>
          <LanguageSwitcher currentLocale={params.lang} />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

### 6. 主页面 (app/[lang]/page.tsx)

```typescript
import { getDictionary } from './dictionaries';
import { Locale } from '@/i18n-config';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  
  return (
    <div>
      <h1>{dict.home.title}</h1>
      <p>{dict.home.description}</p>
    </div>
  );
}
```

### 7. 语言切换器组件 (components/LanguageSwitcher.tsx)

```typescript
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { i18n, Locale } from '@/i18n-config';
import { useCallback } from 'react';
import Link from 'next/link';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const switchLanguage = useCallback((locale: string) => {
    // 设置 cookie
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // 获取当前路径并替换语言部分
    const currentPath = pathname;
    const newPath = currentPath.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  }, [currentLocale, pathname, router]);

  return (
    <div>
      <select
        onChange={(e) => switchLanguage(e.target.value)}
        value={currentLocale}
      >
        {i18n.locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale === 'en' ? 'English' : locale === 'zh' ? '中文' : '日本語'}
          </option>
        ))}
      </select>
    </div>
  );
}
```

### 8. 字典文件示例 (dictionaries/zh.json)

```json
{
  "home": {
    "title": "欢迎使用 Next.js 多语言示例",
    "description": "这是一个使用 App Router 实现的多语言网站示例"
  },
  "about": {
    "title": "关于我们",
    "description": "了解更多关于我们的信息"
  },
  "common": {
    "back": "返回",
    "loading": "加载中...",
    "error": "出错了"
  }
}
```

## Pages Router 方案 (传统方式)

如果您使用的是 Pages Router，可以使用 Next.js 内置的国际化支持。

### 1. 项目结构

```
/pages
  /[locale]
    index.tsx
    about.tsx
    /blog
      [slug].tsx
      index.tsx
  _app.tsx
/components
  LanguageSwitcher.tsx
/public
  /locales
    /en
      common.json
      home.json
    /zh
      common.json
      home.json
/lib
  i18n.ts
next.config.js
```

### 2. Next.js 配置 (next.config.js)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    // 这里的配置仅用于开发环境，生产环境会被中间件覆盖
    locales: ['en', 'zh', 'ja'],
    defaultLocale: 'zh'
  },
  // 其他配置...
}

module.exports = nextConfig
```

### 3. 使用 next-i18next 库

首先安装：

```bash
npm install next-i18next react-i18next i18next
```

### 4. i18n 配置 (lib/i18n.ts)

```typescript
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

const createI18nInstance = async (locale: string, namespace: string) => {
  const i18nInstance = createInstance();
  
  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: locale,
      ns: namespace,
      fallbackLng: 'zh',
      defaultNS: 'common',
      resources: {
        en: {
          common: await import('../public/locales/en/common.json'),
          home: await import('../public/locales/en/home.json'),
        },
        zh: {
          common: await import('../public/locales/zh/common.json'),
          home: await import('../public/locales/zh/home.json'),
        },
        ja: {
          common: await import('../public/locales/ja/common.json'),
          home: await import('../public/locales/ja/home.json'),
        },
      },
    });
  
  return i18nInstance;
};

export default createI18nInstance;
```

### 5. _app.tsx 文件

```typescript
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { I18nextProvider } from 'react-i18next';
import createI18nInstance from '@/lib/i18n';
import { useEffect, useState } from 'react';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [i18n, setI18n] = useState<any>(null);
  
  useEffect(() => {
    const initI18n = async () => {
      const locale = router.locale || 'zh';
      const i18nInstance = await createI18nInstance(locale, 'common');
      setI18n(i18nInstance);
    };
    
    initI18n();
  }, [router.locale]);
  
  if (!i18n) {
    return <div>Loading...</div>;
  }
  
  return (
    <I18nextProvider i18n={i18n}>
      <Component {...pageProps} />
    </I18nextProvider>
  );
}
```

### 6. 主页面 (pages/[locale]/index.tsx)

```typescript
import { useTranslation } from 'react-i18next';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  const { t } = useTranslation(['home', 'common']);
  
  return (
    <>
      <Head>
        <title>{t('home:title')}</title>
      </Head>
      <main>
        <LanguageSwitcher />
        <h1>{t('home:title')}</h1>
        <p>{t('home:description')}</p>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;
  
  return {
    props: {
      locale,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = ['en', 'zh', 'ja'];
  
  return {
    paths: locales.map((locale) => ({ params: { locale } })),
    fallback: false,
  };
};
```

### 7. 语言切换器组件 (components/LanguageSwitcher.tsx)

```typescript
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCallback } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  
  const locales = ['en', 'zh', 'ja'];
  
  const changeLanguage = useCallback((newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  }, [asPath, pathname, query, router]);
  
  return (
    <div>
      <select 
        onChange={(e) => changeLanguage(e.target.value)}
        value={locale}
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc === 'en' ? 'English' : loc === 'zh' ? '中文' : '日本語'}
          </option>
        ))}
      </select>
    </div>
  );
}
```

## 最佳实践建议

1. **路由策略**：在 URL 中包含语言代码（如 `/zh/about`），这有利于 SEO 和用户体验。

2. **内容管理**：
   - 对于小型项目，使用 JSON 文件存储翻译内容
   - 对于大型项目，考虑使用专业的翻译管理系统(TMS)

3. **性能优化**：
   - 按需加载翻译文件
   - 使用静态生成(SSG)预渲染多语言页面

4. **SEO 优化**：
   - 使用 `<html lang="zh">` 属性
   - 添加 hreflang 标签
   - 为每种语言创建单独的站点地图

5. **用户体验**：
   - 记住用户的语言偏好（使用 cookie 或 localStorage）
   - 提供明显的语言切换器
   - 考虑自动检测用户的首选语言

6. **翻译管理**：
   - 使用命名空间组织翻译内容
   - 为翻译键使用层次结构
   - 考虑使用复数和格式化功能
