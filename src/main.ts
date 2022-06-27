import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import "@/router/permission"
import ElementPlus from "element-plus"
import store from "./store"
import loadSvg from "./icons"
import { MotionPlugin } from "@vueuse/motion";
// 全局样式
import "@/styles/index.scss"
// element icons
import * as Icons from "@element-plus/icons-vue";

import "element-plus/dist/index.css"

import "element-plus/theme-chalk/dark/css-vars.css"
const app  = createApp(App)
/** 加载全局 svg */
loadSvg(app)

// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(store).use(ElementPlus).use(MotionPlugin).use(router).mount("#app")
