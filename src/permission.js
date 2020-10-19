import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// import user from '@/api/user'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect','/dashboard'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 进度条启动
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // 确定用户是否已登录
  const hasToken = getToken()

  // 如果已经登录
  if (hasToken) {
    // 在登录状态下，如果还去访问'/login'这个路由
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      //如果有token並且要轉跳到登入頁，則重新定向到首頁
      next({ path: '/' })
      // 进度条完成
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // const { roles } = await store.dispatch('user/getInfo')
      // 基于角色生成可访问路由图
      console.log('hasToken', hasToken)
      const accessRoutes = await store.dispatch('user/getInfo')
      // 动态添加可访问路由
      router.addRoutes(accessRoutes)
      console.log(accessRoutes)
      console.log(accessRoutes)
      console.log(accessRoutes)
      console.log(accessRoutes)
      // determine whether the user has obtained his permission roles through getInfo
      // 判斷是否有角色訊息
      // 如果已经登录的状态下，访问的不是'/login'这个路由，那么就要确定登录用户是否已通过getInfo获得其权限角色
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // // 如果已经获得了权限角色，就正常访问要访问的路由
      // if (hasRoles) {
      //   next()
      // } else {
      //   // 如果没有获取权限角色
      //   try {
      //     // 获取用户权限角色
      //     // 注意：角色必须是对象数组！例如：['admin']或，['developer'，'editor']
      //     const { roles } = await store.dispatch('user/getInfo')

      //     // 基于角色生成可访问路由图
      //     const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

      //     // 动态添加可访问路由
      //     router.addRoutes(accessRoutes)

      //     // 确保addRoutes完整的hack方法
      //     // 设置replace:true，这样导航就不会留下历史记录
      //     next({ ...to, replace: true })
      //   } catch (error) {
      //     // 在获取角色，动态生成可访问路由的过程中，如果出现异常就会访问'/login?redirect=${to.path}'这个路由
      //     // 其实就是会访问登录页面，然后重新登录，登录成功后，直接跳转到'to.path'这个页面
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
      next()

    }
  } else {
    /* has no token*/
    /* 未登录状态下*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果要访问的路由，是在免登录的白名单中，那就可以直接访问
      next()
    } else {
    // 没有访问权限的其他页将重定向到登录页。
      next(`/login?redirect=${to.path}`)
      // next()
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
