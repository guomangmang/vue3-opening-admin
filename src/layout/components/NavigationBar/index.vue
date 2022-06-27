<script lang="ts" setup>
import { computed, reactive } from "vue"
import { useRouter } from "vue-router"
import { UserFilled } from "@element-plus/icons-vue"
import { useAppStore } from "../../../store/modules/app"
import BreadCrumb  from "../Breadcrumb/index.vue"
import Hamburger from "../Hamburger/index.vue"

import ThemeSwitch from "../ThemeSwitch/index.vue"
import { useUserStore } from "@/store/modules/user"
// import Screenfull from "@/components/Screenfull/index.vue"


const userStore = useUserStore()
const router = useRouter()
const appStore = useAppStore()
const sidebar = computed(() => {
  return appStore.sidebar
})
// const showThemeSwitch = computed(() => {
//   return settingsStore.showThemeSwitch
// })

const state = reactive({
  toggleSideBar: () => {
    appStore.toggleSidebar(false)
  },
  logout: () => {
    userStore.logout()
    router.push("/login").catch((err) => {
      console.warn(err)
    })
  }
})


</script>

<template>
  <div class="navbar">
    <Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click ='state.toggleSideBar'/>
    <BreadCrumb class="breadcrumb" />
    <div class="right-menu">
      <ThemeSwitch class="right-menu-item" />
      <el-dropdown class="right-menu-item">
        <el-avatar :icon="UserFilled" :size="34" />
        <template #dropdown>
          <el-dropdown-menu>
            <a target="_blank" href="https://juejin.cn/post/7089377403717287972">
              <el-dropdown-item>V3-Opening-Admin 中文文档</el-dropdown-item>
            </a>
            <a target="_blank" href="https://github.com/un-pany/v3-admin-vite">
              <el-dropdown-item>V3-Opening-Admin GitHub</el-dropdown-item>
            </a>
            <a target="_blank" href="https://gitee.com/un-pany/v3-admin-vite">
              <el-dropdown-item>V3-Opening-Admin Gitee</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="state.logout">
              <span style="display: block" >退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  background: #fff;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    float: left;
  }
  .right-menu {
    float: right;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
    }
  }
}
</style>
