import { UserConfigExport } from 'vite'
import { resolve } from "path"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import DefineOptions from 'unplugin-vue-define-options/vite'
import vue from '@vitejs/plugin-vue'


 // 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, "./", dir);
};

 // 设置别名
const alias: Record<string, string> = {
  "@": pathResolve("src"),
};
// https://vitejs.dev/config/
export default (): UserConfigExport => {
  return {
    /** build 打包时根据实际情况修改 base */
    // base: "./",
    resolve: {
      alias
    },
    // 代理
    server: {
      /** 是否开启 https */
      https: false,
      /** host 设置为 true 才可以使用 network 的形式，以 ip 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 3030,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false
      /** 接口代理 */
      // proxy: {
      //   "/mock-api": {
      //     target: "https://vue-typescript-admin-mock-server-armour.vercel.app/mock-api",
      //     ws: true,
      //     /** 是否允许跨域 */
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace("/mock-api", "")
      //   }
      // }
    },
    plugins: [
      vue(), DefineOptions()
    ]
  }
}
