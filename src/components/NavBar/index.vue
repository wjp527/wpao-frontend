<template>
  <div class="NavBar">
    <van-nav-bar :title="title" left-text="" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>
<script lang="ts" setup name="NavBar">
import { ref } from 'vue' 
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../../store/Global';
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
