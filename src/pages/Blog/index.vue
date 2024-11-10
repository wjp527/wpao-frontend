<template>
  <div class="Blog">
        <!-- 骨架屏 -->
        <van-skeleton  v-for="(item, index) in listBlogReuqest.pageSize" :key="index" v-show="loading">
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


    <van-card v-for="item in listBlog" :key="item.id"   price="2.00" :desc="item.subTitle" :title="item.title" :thumb="item.blogPic" @click="nextToBlog(item)">
 
      <template #price>
        <span class="creatTime">{{ item.createTime}}</span>
      </template> 
    </van-card>

    <!-- @offset-change="addBlog" --> 
    <van-floating-bubble v-model:offset="offset" magnetic="x" axis="xy" icon="plus" @click="nextToAddBlog" />
  </div>
</template> 
<script lang="ts" setup name="Blog">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// store
import { storeToRefs } from 'pinia'
import { useTeamStore } from '../../store/Team'
import { useBlogStore } from '../../store/Blog'
import { useGlobalStore } from '../../store/Global'
const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '博客列表'

import { showToast } from 'vant'

const blogStore = useBlogStore()
const teamStore = useTeamStore()
const { teamDetail }: any = storeToRefs(teamStore)
const { blogDetailBySlug }: any = storeToRefs(blogStore)

const router = useRouter()


// 加载中
const loading = ref(true)
const offset = ref({ x: 310, y: 500 })

const listBlogReuqest = ref({
  teamId: teamDetail.value.id,
  pageNum: 1,
  pageSize: 100,
})

const listBlog = ref()
const init = async () => {
  //     // 获取博客列表
  // listBlog
  // listBlogByPageAsync
  loading.value = true
  let res = await blogStore.listBlogByPageAsync(listBlogReuqest.value)
  if (res === 200) {
    listBlog.value = blogStore.listBlog
    loading.value = false
  } else {
    showToast(res)
    loading.value = false
  }
}

const nextToAddBlog = () => {
  router.push('/exampleView')
}


const nextToBlog = (payload: any) => {
  blogDetailBySlug.value = payload.id
  router.push('/blogDetail')
}
onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
/deep/ .van-card__title {
  font-size: 16px !important;
}
.creatTime {
  font-family: LOGO;
  font-size: 20px;
}
</style>
