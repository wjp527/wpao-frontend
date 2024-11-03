<template>
  <van-nav-bar :title="title" left-text="" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

 <div id="content">
  <router-view/> 
 </div>

  <div class="Tabbar">
    <van-tabbar  route>
      <van-tabbar-item  to="/" icon="home-o" name="index">主页</van-tabbar-item>
      <van-tabbar-item  to="/team" icon="search" name="team">队伍</van-tabbar-item>
      <van-tabbar-item  to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts" setup name="Tabbar">
import { ref, watch } from 'vue' 
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../store/global';
const router = useRouter()
const globalStore = useGlobalStore()

const title = ref()
title.value = globalStore.GlobalNavBarTitle
 

setInterval(() => {
  title.value = globalStore.GlobalNavBarTitle
},10)

// 返回上一页
const onClickLeft = () => history.back()

// 跳转搜索页面
const onClickRight = () => {
  router.push('/search')
}
</script>

<style lang="less" scoped></style>
