<template>
  <div class="SearchResult">
    <Loading color="#1989fa" v-show="loading" />

    <UserCardList v-if="userList.length > 0" :userList="userList" />
 

    <van-empty v-else-if="loading == false && userList.length === 0" class="empty" image="search" description="没有找到相关用户" />
  </div>
</template>
<script lang="ts" setup name="SearchResult">
import { nextTick, onMounted, ref } from 'vue'
import UserCardList from '../../components/UserCardList/index.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../../store/user'
const userStore = useUserStore()
const route: any = useRoute()

// 加载中
const loading = ref(true)

const userList = ref<any>([])
let { tags }: any = route.query
const activedIds = ref('')

const init = async () => {
  // 只有一个字符串的时候，包上数组
  if (typeof tags === 'string') {
    tags = [tags]
  }

  if (tags != null) {
    if (tags.length > 1) {
      // 数组转为,分割的字符串
      activedIds.value = tags?.join(',')
    } else {
      activedIds.value = tags[0]
    }

    let res = await userStore.GetSearchTags(activedIds.value)
    if (res === 200) {
      userList.value = userStore.searchTagsList
      userList.value.forEach((item: any) => {
        item.tags = JSON.parse(item.tags)
      })
      loading.value = false
    } 
  }
}
onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>

<style lang="less" scoped>

</style>
