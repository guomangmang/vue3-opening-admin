import store from "@/store"
import { defineStore } from "pinia"
import { removeToken, setToken } from "@/utils/cookies"
import { usePermissionStore } from "./permission"
import router, { resetRouter } from "@/router"
import { RouteRecordRaw } from "vue-router"
import { LoginApi } from "@/api"


interface IUserState {
  token: string
  roles: string[]
}

export const useUserStore = defineStore({
  id: "user",
  state: (): IUserState => {
    return {
      token:'',
      roles:[]
    }
  },
  actions: {
     /** 设置角色数组 */
     setRoles(roles: string[]) {
      this.roles = roles
    },
    /**登陆 */
    login(userInfo: { username: string; password: string }) {
      return new Promise((resolve, reject) => {
        LoginApi.accountLogin({
          username: userInfo.username.trim(),
          password: userInfo.password
        })
          .then((res: any) => {
            setToken(res.data.accessToken)
            this.token = res.data.accessToken
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /**退出 */
    logout() {
      removeToken()
      this.token = ""
      this.roles = []
    },
    /** 获取用户详情 */
    getInfo() {
      return new Promise((resolve, reject) => {
        // this.roles = ["admin"]
        LoginApi.userInfoRequest()
          .then((res: any) => {
            this.roles = res.data.user.roles
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
     /** 切换角色 */
     async changeRoles(role: string) {
      const token = role + "-token"
      this.token = token
      setToken(token)
      await this.getInfo()
      const permissionStore = usePermissionStore()
      permissionStore.setRoutes(this.roles)
      resetRouter()
      permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item)
      })
    },
  }
})


/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}