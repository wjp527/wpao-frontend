<template>
  <div class="UserUpdate">
    <template v-if="user">
      <van-cell title="头像" is-link>
        <template #right-icon>
          <van-image :src="user.avatarUrl" width="50" hight="50" @click="editUser('avatarUrl', '用户头像', user.avatarUrl)"></van-image>
        </template>
      </van-cell>
      <van-cell title="昵称" is-link :value="user.username" @click="editUser('username', '昵称', user.username)" />
      <van-cell title="账号" is-link :value="user.userAccount" @click="editUser('userAccount', '账号', user.userAccount)" />
      <van-cell title="性别" is-link :value="user.gender" @click="editUser('gender', '性别', user.gender)" />
      <van-cell title="电话" is-link :value="user.phone" @click="editUser('phone', '电话', user.phone)" />
      <van-cell title="邮箱" is-link :value="user.email" @click="editUser('email', '邮箱', user.email)" />
      <van-cell title="星球编号" :value="user.planetCode" />
      <van-cell title="注册时间" :value="user.createTime.toLocaleString()" />
    </template>

    <div class="btn-group">
      <van-button type="primary" class="btn" @click="logout">退出登录</van-button>
    </div>
  </div>
</template>
<script lang="ts" setup name="UserUpdate">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/user'
import { useGlobalStore } from '../../store/global'
import { showToast } from 'vant'
const router = useRouter()
const userStore: any = useUserStore()
const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '个人中心'

const user: any = ref()
// 修改用户信息
function editUser(editKey: string, editName: string, currentValue: string | number) {
  router.push({
    path: '/edit',
    query: {
      id: userStore.userInfo.id,
      editKey,
      editName,
      currentValue,
    },
  })
}

// 获取当前用户信息
const init = async () => {
  let res: any = await userStore.GetCurrentUserAsync()
  if (res === 200) {
    user.value = userStore.userInfo
  } else {
    showToast(res.description)
  }
}


// 退出登录
const logout = async () => {
  let res: any = await userStore.GetUserLogoutAsync()
  if(res === 200) {
    showToast('退出登录成功')
    router.replace('/login')
  } else {
    showToast(res.description)
  }
}
onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.btn-group {
  padding: 20px;
  .btn {
    width: 100%;
    margin-top: 50px;
  }
}
</style>
