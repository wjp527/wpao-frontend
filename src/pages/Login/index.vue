<template>
  <div class="Login">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="userAccount" name="账号" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请输入账号' }]" />
        <van-field v-model="userPassword" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请输入密码' }]" />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts" setup name="Login">
import { ref } from 'vue'
import { showToast } from 'vant'

import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/user'
import { useGlobalStore } from '../../store/global'
const router = useRouter()
const userStore = useUserStore()

const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '登录'

const userAccount = ref('')
const userPassword = ref('')
const onSubmit = async (values: any) => {
  let res = await userStore.GetUserLoginAysnc({
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })

  if(res === 200) {
    showToast('登录成功')
    router.replace('/')
  } else {
    showToast('用户名或密码错误')
  }

}
 
</script>

<style lang="less" scoped></style>
