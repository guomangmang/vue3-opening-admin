import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
const Layout = () => import("@/layout/index.vue")

/** 常驻路由 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          icon: "home-filled",
          singleRoute: true, // 单个路由
        }
      },
    ]
  },
  {
    path: "/screen",
    component: Layout,
    children: [
      {
        path: "/screen",
        component: () => import("@/views/bigscreen/index.vue"),
        name: "Screen",
        meta: {
          title: "工业大屏",
          icon: "TrendCharts",
          singleRoute:true
        }
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    name:'Chart',
    meta: {
      title: "Echarts",
      icon: "TrendCharts",
      roles: ["admin", "editor"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "/line",
        component: () => import("@/views/echarts/index.vue"),
        name: "Line",
        meta: {
          title: "折线图",
          icon: "TrendCharts",
          roles: ["admin"] // 或者在子导航中设置角色
        }
      }
    ]
  }
]


/**
 * 动态路由
 * 用来放置有权限（roles 属性）的路由
 * 必须带有 name 属性
 */
 export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    name: "Permission",
    meta: {
      title: "权限管理",
      icon: "lock",
      roles: ["admin", "editor"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page.vue"),
        name: "PagePermission",
        meta: {
          title: "页面权限",
          name:'page',
          roles: ["admin",'editor'] // 或者在子导航中设置角色
        }
      },
      {
        path: "button",
        component: () => import("@/views/permission/button.vue"),
        name: "ButtonPermission",
        meta: {
          title: "按钮权限",
          name:'button',
          roles: ["admin"] // 或者在子导航中设置角色
        }
      },
    ]
  },

  {
    path: "/",
    component: Layout,
    name: "System",
    meta: {
      title: "系统管理",
      icon: "setting",
      roles: ["admin"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "user",
        component: () => import("@/views/user/index.vue"),
        name: "SystemUser",
        meta: {
          title: "用户管理",
          name:'user',
          roles: ["admin",] // 或者在子导航中设置角色
        }
      },
    ]
  },


  
  {
    path: "/:pathMatch(.*)*", // 必须将 'ErrorPage' 路由放在最后, Must put the 'ErrorPage' route at the end
    component: Layout,
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      title: "错误页面",
      icon: "404",
      hidden: true
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        name: "401",
        meta: {
          title: "401",
          hidden: true
        }
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        name: "404",
        meta: {
          title: "404",
          hidden: true
        }
      }
    ]
  }
]

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器，不过体验不是很好
    window.location.reload()
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
