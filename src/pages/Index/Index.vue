<template>
  <div class="Index"> 
    <ToggleSwitche style="margin-top: 10px;" v-model="toggleStatus" /> 
    <!-- 骨架屏 -->
    <van-skeleton  v-for="(item, index) in pageInfo.pageSize" :key="index" v-show="loading">
      <template #template>
        <div :style="{ display: 'flex', width: '100%' }">
          <van-skeleton-image />
          <div :style="{ flex: 1, marginLeft: '16px' }">
            <van-skeleton-paragraph row-width="60%" />
            <van-skeleton-paragraph />
            <van-skeleton-paragraph />
            <van-skeleton-paragraph />
          </div>
        </div>
      </template>
    </van-skeleton>

    
    <UserCardList v-if="userList.length > 0" :userList="userList" />
    <van-empty v-else-if="loading == false && userList.length === 0" class="empty" description="数据为空" />
  </div>
</template>
<script lang="ts" setup name="Index">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../../store/User'
import { useGlobalStore } from '../../store/Global'

import UserCardList from '../../components/UserCardList/index.vue'

const route: any = useRoute()
const userStore: any = useUserStore()
const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '主页'

// 加载中
const loading = ref(true)
const toggleStatus = ref(false)
watch(toggleStatus, newVal => {
  // 心动模式
  if (newVal == true) {
    cardiacPattern()
    loading.value = true
  } else {
    // 正常模式
    init()
  }
})

// 心动模式
const cardiacPattern = async () => {
  userList.value = []
  let res = await userStore.GetMatchUsersAsync({
    num: 10,
  })
  if (res == 200) {
    userList.value = userStore.recommendUsers
    userList.value.forEach((item: any) => {
      item.tags = JSON.parse(item.tags)
    })
    loading.value = false
  } else {
    loading.value = false
  }
  // matchUsers
  // GetMatchUsersAsync
}

const userList = ref<any>([])
const pageInfo = ref<any>({
  pageNum: 1,
  pageSize: 10,
})
const init = async () => {
  let res = await userStore.GetRecommendUsersAsync(pageInfo.value)
  if (res === 200) {
    userList.value = userStore.recommendUsers?.records
    userList.value.forEach((item: any) => {
      item.tags = JSON.parse(item.tags)
    })
    loading.value = false
  } else {
    loading.value = false
  }
}
onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.Index {
  padding-bottom: 80px; 

  .mode {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
