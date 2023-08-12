import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import exceptionRoutes from '@/router/route.exception'
import asyncRoutes from '@/router/route.async'
import commonRoutes from '@/router/route.common'

const routes: Array<RouteRecordRaw> = [
  // 无鉴权的业务路由 ex:登录
  ...commonRoutes,
  // 带鉴权的业务路由
  ...asyncRoutes,
  // 异常页必须放在路由匹配规则的最后
  ...exceptionRoutes
]

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes
})

// 未登录白名单
// const whiteList = ['/login'];
router.beforeEach((to, _, next) => {
  document.title = (to.meta.title as string) || import.meta.env.VITE_APP_TITLE
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
