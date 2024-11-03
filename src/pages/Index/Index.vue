<template>
  <div class="Index">
    <Loading color="#1989fa" v-show="loading" />
  
    <UserCardList v-if="userList.length > 0" :userList="userList"/>
    <van-empty v-else-if="loading == false && userList.length === 0" class="empty" description="数据为空" />
  </div>
</template>
<script lang="ts" setup name="Index">
import { nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../../store/user'
import { useGlobalStore } from '../../store/global'

import UserCardList from '../../components/UserCardList/index.vue'

const route: any = useRoute()
const userStore:any = useUserStore()
const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '主页'

// 加载中
const loading = ref(true)

const userList = ref<any>([]) 
const pageInfo = ref<any>({
  pageNum: 1,
  pageSize: 10
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
  nextTick(() => {
    init()
  })
})
</script>

<style lang="less" scoped>
 
.Index {
  padding-bottom: 80px;
}
</style>
