<template>
  <div class="side">
    <!-- <transition name="sidebarLogoFade"> -->
      <router-link key="collapse" class="sidebar-logo-link" to="/">
        <img src="@/assets/layout/logo.png" class="sidebar-logo" v-if="collapse"/>
        <img src="@/assets/layout/logo-text-1.png" class="sidebar-logo-text" v-else/>
      </router-link>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu class="sidebar-el-menu" 
        :default-active="activeMenu" 
        :collapse="collapse" 
        background-color="#152d3d"
        text-color="#C0C4CC"
        active-text-color="#fff"
        router>
        <template v-for="item in menuList">
          <template v-if="item.subs">
            <el-sub-menu :key="item.name" :index="item.name">
              <template #title>
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.title}}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-sub-menu v-if="subItem.subs" :index="subItem.name" :key="subItem.name">
                  <template #title>{{ subItem.title }}</template>
                  <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.name" >
                      {{ threeItem.title }}
                  </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="subItem.name" :key="subItem.name">{{ subItem.title }}
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="item.name" :key="item.name">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
              <template #title>{{ item.title }}</template>
            </el-menu-item>
          </template> 
        </template>

      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {computed,reactive} from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from "@/store/modules/app"
import { usePermissionStore } from "@/store/modules/permission"

const menuList = reactive([])
const routes = computed(() => {
  return usePermissionStore().routes
})

 routes.value.forEach(item => {  
  const obj = {}
  if(item.meta && item.meta.hidden) {
    return 
  }else if(item.meta && item.meta.alwaysShow) {
    obj['icon'] = item.meta.icon
    obj['title'] = item.meta.title
    obj['name'] = item.name
    const subsList = []
    if(item.children) {
      item.children.forEach(subsItem => {
        const subObj = {}
        subObj['title'] = subsItem.meta.title
        subObj['name'] = subsItem.meta.name
        subsList.push(subObj)
      })
    }
    obj['subs'] = subsList
    menuList.push(obj)
  } else if(!item.meta && item.children[0].meta.singleRoute) {
    obj['icon'] = item.children[0].meta.icon
    obj['name'] = item.children[0].name
    obj['title'] = item.children[0].meta.title
    menuList.push(obj)
  }
})


 const items = [
    {
        icon: "home-filled",
        name: "dashboard",
        title: "首页",
    },
    {
        icon: "histogram",
        name: "screen",
        title: "工业大屏",
    },
    {
        icon: "TrendCharts",
        name: "echarts",
        title: "Echarts",
        subs: [
            {
                name: "role",
                title: "折线图",
            },
            {
                name: "permission",
                title: "柱状图",
            },
            {
                name: "user",
                title: "饼图",
            },
            {
                name: "user",
                title: "散点图",
            },
            {
                name: "user",
                title: "桑基图",
            },
            {
                name: "user",
                title: "水球图",
            },
        ],
    },
    {
        icon: "List",
        name: "table",
        title: "超级表格",
    },
    {
        icon: "TrendCharts",
        name: "screen",
        title: "无缝滚动",
    },

    {
        icon: "histogram",
        name: "system",
        title: "权限管理",
        subs: [
            {
                name: "page",
                title: "页面权限",
            },
            {
                name: "button",
                title: "按钮权限",
            },
        ],
    },
];


const route = useRoute();
const appStore = useAppStore()
const onRoutes = computed(() => {
    return route.path;
});
const getImageUrl = (name:string) => {
    return new URL(`../../../assets/layout/${name}.png`, import.meta.url).href
}
const collapse = computed(() => appStore.sidebar.opened);

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta !== null || meta !== undefined) {
    if (meta.activeMenu) {
      return meta.activeMenu
    }
  }
  return path
})
</script>

<style lang ='scss' scoped>
.sidebar-container {
  // 重置当前页面的 element-plus css, ，注意，虽然没有加 scoped 标识，但是被该页面的 sidebar-container 类名包裹，所以不会影响其他页面
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .el-scrollbar__view {
    height: 100%;
  }
  .el-scrollbar__bar {
    &.is-vertical {
      right: 0;
    }
    &.is-horizontal {
      display: none;
    }
  }
}
:deep(.el-scrollbar__view) {
  height: 100%;
}
:deep(.el-menu--collapse) {
  width: 100%;
}
:deep(ul) {
  height: 100%;
}
:deep(.el-menu) {
  border-right: none;
}
  .icon-img {
    width: 25px;
    height: 25px;
  }
  .sidebar-logo {
    width: 100%;
    height: 54px;
    background-color: #0c202b;
  }
  .sidebar-logo-text {
    width: 100%;
    height: 84px;
    background-color: #0c202b;
  }
</style>