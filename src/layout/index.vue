<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="classObj.mobile && !sidebar.opened" class="drawer-bg"  @click="state.handleClickOutside"/>
    <Sidebar class="sidebar-container"/>
    <div class="main-container">
      <NavigationBar />
      <AppMain />
      <!-- <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel> -->
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, reactive, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import { AppMain, Sidebar, NavigationBar } from './components'
import { useAppStore, DeviceType } from "../store/modules/app"
import useResize from './useResize'
const { sidebar, device, watchRouter, addEventListenerOnResize, resizeMounted,removeEventListenerResize} = useResize()


const appStore = useAppStore()
const classObj = computed(() => {
  return {
    hideSidebar: sidebar.value.opened,
    openSidebar: !sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === DeviceType.Mobile
  }
})

const state = reactive({
  handleClickOutside: () => {
    appStore.closeSidebar(false)
  }
})

watchRouter()
onBeforeMount(() => {
  addEventListenerOnResize()
})
onMounted(() => {
  resizeMounted()
})
onBeforeUnmount(() => {
  removeEventListenerResize()
})
</script>
<style lang='scss' scoped>
@import "@/styles/mixins.scss";
$sideBarWidth: 220px;
.app-wrapper {
  @include clearfix;
  width: 100%;
  height: 100%;
  position: relative;
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .sidebar-container {
    transition: width 0.28s;
    width: $sideBarWidth !important;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }

  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: $sideBarWidth;
    position: relative;
  }
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }
  .sidebar-container {
    width: 54px !important;
  }
}


// for mobile response 适配移动端
.mobile {
  .main-container {
    margin-left: 0;
  }
  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }
  &.openSidebar {
    position: fixed;
    top: 0;
  }
  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }
}
</style>