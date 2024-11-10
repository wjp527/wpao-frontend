<template>
  <div class="Login">
    <Loading color="#1989fa" v-show="loading" />
    <h1 class="logo">WPao</h1>
    <div class="subForm">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="userAccount" name="账号" label="用户名" placeholder="用户名"
            :rules="[{ required: true, message: '请输入账号' }]" />
          <van-field v-model="userPassword" type="password" name="密码" label="密码" placeholder="密码"
            :rules="[{ required: true, message: '请输入密码' }]" />
        </van-cell-group>
        <div class="register" @click="nextRegister">注册</div>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit" class="login-btn"> 登录 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script lang="ts" setup name="Login">
import { ref } from 'vue'
import { showToast } from 'vant'

import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../../store/User'
import { useGlobalStore } from '../../store/Global'
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '登录'

const userAccount = ref('')
const userPassword = ref('') 
// 加载中
const loading = ref(false)
const onSubmit = async () => {
  loading.value = true
  let res = await userStore.GetUserLoginAysnc({
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })

  if (res === 200) {
    // 定义类型为 string | null | undefined，因为它们可能是未定义的
    const targetDateStr: string | null | undefined = userStore.userInfo?.updateTime;
    const targetCreateTimeStr: string | null | undefined = userStore.userInfo?.createTime;

    // 验证日期字符串是否有效，并转换为日期对象
    const targetDate = targetDateStr ? new Date(targetDateStr.replace(/-/g, '/')) : new Date(0); // 使用 Unix 时间戳 0 作为默认值
    const targetCreate = targetCreateTimeStr ? new Date(targetCreateTimeStr.replace(/-/g, '/')) : new Date(0);

    // 确保 targetDate 和 targetCreate 不是 Invalid Date
    if (isNaN(targetDate.getTime()) || isNaN(targetCreate.getTime())) {
      throw new Error('Invalid date strings provided');
    }

    // 获取当前日期
    const currentDate: Date = new Date();

    // 计算两个日期之间的时间差（以毫秒为单位）
    const timeDifference: number = currentDate.getTime() - targetDate.getTime();
    // 第一次进入登录页面的时间差
    const firstDifference: number = currentDate.getTime() - targetCreate.getTime();

    // // 将时间差转换为天数
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24)
    const dayDifferenceCreate = firstDifference / (1000 * 60)
  
    // 检查时间差是否大于1天 或者 第一次进入这个页面，相当于新用户只要在注册的时候小于5分钟，就可以进入welcome页面，进行选择标签
    if (dayDifference > 1 || dayDifferenceCreate < 5) {
      // 如果大于1天，执行操作 
      // 跳转到用户没登陆之前的页面
      const redirectUrl = route.query?.redirect as string ?? '/welcome'
      loading.value = false
      window.location.href = redirectUrl
    } else {
      // 如果不大于1天，不执行操作 自动跳转到首页
      // 跳转到用户没登陆之前的页面
      const redirectUrl = route.query?.redirect as string ?? '/'
      loading.value = false
      window.location.href = redirectUrl
    }
  } else {
    loading.value = false
    showToast('用户名或密码错误')
  }
}

const nextRegister = () => {
  router.push('/register')
}
</script>

<style lang="less" scoped>
.Login {
  height: 100vh;
  font-family: fusanghu;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  .logo {
    /*使用你自己的字体*/
    font-family: LOGO;
    text-align: center;
    font-size: 100px;
  }

  .subForm {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40px;

    .register {
      font-family: SUBTITLE;
      margin-left: 26px;
    }
    .login-btn {
      font-family: SUBTITLE;
      font-size: 24px;
    }
  }
}
</style>
