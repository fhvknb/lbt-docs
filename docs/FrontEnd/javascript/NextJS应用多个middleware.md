---
tag:
  - nextjs
  - javascript
---

# NextJS中应用多个middleware实践指南

1. 首先，在项目根目录创建 `middleware.ts` 文件
2. 在该文件中，您需要结合 NextAuth 的 withAuth 中间件和您的自定义 Locale 中间件逻辑

示例代码如下：

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import { i18n } from './i18n-config' // 假设您有这个国际化配置文件

// 自定义 Locale 中间件逻辑
function localeMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 检查当前路径是否已经有语言前缀
  const pathnameHasLocale = i18n.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // 从 cookie 或 accept-language 头获取偏好语言
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 
                 request.headers.get('accept-language')?.split(',')[0].split('-')[0] || 
                 i18n.defaultLocale

  // 重定向到带有语言前缀的路径
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  )
}

// 组合中间件
export default withAuth(
  function middleware(request: NextRequest) {
    // 这里是 NextAuth 验证后执行的逻辑
    return localeMiddleware(request)
  },
  {
    // NextAuth 配置选项
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
)

// 配置中间件应用的路径
export const config = {
  matcher: [
    // 排除不需要应用中间件的路径
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

这种方法的工作原理是：
1. 使用 NextAuth 的 `withAuth` 包装您的主中间件函数
2. 在中间件函数内部，调用您的自定义 Locale 中间件逻辑
3. NextAuth 会先处理身份验证，然后再执行您的 Locale 重定向逻辑
