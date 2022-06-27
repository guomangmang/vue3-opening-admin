<script setup lang="ts">
import { useUserStore } from "@/store/modules/user"

const userStore = useUserStore()
import { useRouter } from "vue-router"
import { ref, unref, computed, watch } from "vue";
const router = useRouter()


const roles = computed(() => userStore.roles)
const currentRole = ref(roles.value[0])
watch(currentRole, async (value) => {
  await userStore.changeRoles(value)
})
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>
          当前角色：
          <span style="font-size: 26px">{{ roles }}</span>
          <p style="color: #ff6000">
            查看左侧菜单变化(系统管理)，模拟后台根据不同角色返回对应路由
          </p>
        </span>
        <el-radio-group v-model="currentRole">
        <el-radio-button label="editor" />
        <el-radio-button label="admin" />
      </el-radio-group>
      </div>
    </template>
  </el-card>
</template>