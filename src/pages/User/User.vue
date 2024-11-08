<template>
  <div class="User">
    <template v-if="user">
      <div class="top">
        <van-image round width="5rem" height="5rem" :src="user.avatarUrl" @click="preview(user.avatarUrl)" class="avatar" />

        <div class="box">
          <div class="name">{{ user.username }}</div>
          <div class="phone">{{ user.phone }}</div>
        </div>
      </div>

      <!-- <van-image :src="user.avatarUrl" width="50" hight="50" @click="preview(user.avatarUrl)"  ></van-image> -->
    </template>
    <van-cell-group>
      <van-cell title="修改信息" to="/user/update" />
      <van-cell title="我创建的队伍" to="/user/team/create" />
      <van-cell title="我加入的队伍" to="/user/team/join" />
    </van-cell-group>

    <div class="btn-group">
      <van-button type="primary" class="btn" @click="logout">退出登录</van-button>
    </div>
  </div>
</template>
<script lang="ts" setup name="User">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/user'
import { useGlobalStore } from '../../store/global'
import { showToast } from 'vant'
import { showImagePreview } from 'vant'
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
  if (res === 200) {
    showToast('退出登录成功')
    router.replace('/login')
  } else {
    showToast(res.description)
  }
}

// 预览图片

const preview = (url: string) => {
  showImagePreview([url])
  // showImagePreview(['https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg']);
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

.top {
  display: flex;
  align-items: center;
  height: 100px;

  .box {
    margin-top: 30px;
    margin-left: -10px;
    .name {
      font-size: 18px;
      margin-bottom: 10px;
    }
    .phone {
      font-size: 12px;
    }
  }
}

.avatar {
  margin: 20px;
}
</style>
