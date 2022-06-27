<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :unique-opened="true"
        :default-active="activeMenu"
        background-color="#152d3d"
        text-color="#C0C4CC"
        active-text-color="#fff"
        mode="vertical"
      >
        <Sidebar-Item
          v-for="routeItem in routes"
          :key="routeItem.path"
          :item="routeItem"
          :base-path="routeItem.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
</script>

<style scoped>

</style>