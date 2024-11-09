<template>
  <div class="Register">
    <Loading color="#1989fa" v-show="loading" />
    <h1 class="logo">WPao</h1>
    <div class="subForm">
      <van-form @submit="onSubmit"  @validate="validateForm">
        <van-cell-group inset>
          <van-field v-model="userInfo.userAccount" name="账号" label="用户名" placeholder="用户名"
            :rules="[{ required: true, message: '请输入账号' }]" />
          <van-field v-model="userInfo.userPassword" type="password" name="密码" label="密码" placeholder="密码"
            :rules="[{ required: true, message: '请输入密码' }]" />
            <van-field v-model="userInfo.checkPassword" type="password" name="密码" label="校验密码" placeholder="请再次输入密码"
            :rules="[{ required: true, message: '请再次输入密码' }]" />
            <van-field v-model="userInfo.planetCode"   name="星球编号" label="星球编号" placeholder="请输入星球编号"
            :rules="[{ required: true, message: '请输入星球编号' }]" />
        </van-cell-group>
        <div class="register" @click="$router.push('/login')">登录</div>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit" class="Register-btn"> 注册 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script lang="ts" setup name="Register">
import { ref , reactive} from 'vue'
import { showToast } from 'vant'

import { useRoute , useRouter } from 'vue-router'
import { useUserStore } from '../../store/User'
import { useGlobalStore } from '../../store/Global'
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '登录'

 

const userInfo = reactive({
  checkPassword: "",
  planetCode: "",
  userAccount: "",
  userPassword: ""
}) 
 
// 加载中
const loading = ref(false)

const validateForm = () => {
  if (userInfo.userPassword !== userInfo.checkPassword) {
    showToast('两次输入的密码不一致');
    return false;
  }
  return true;
};

const onSubmit = async () => {
  loading.value = true
  let res = await userStore.GetUserRegisterAsync(userInfo)

  if (res === 200) {
    router.push('/login')
    showToast('注册成功')
  } else {
    loading.value = false
    showToast(res)
  }
}
</script>

<style lang="less" scoped>
.Register {
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
    .Register-btn {
      font-family: SUBTITLE;
      font-size: 24px;
    }
  }
}
</style>
