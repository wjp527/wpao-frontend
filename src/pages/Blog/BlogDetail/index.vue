<template>
  <div class="BlogDetail">
    <h1 class="title">{{ blogDetails?.title }}</h1>
    <div class="subtitle">{{ blogDetails?.subTitle }}</div>

    <div v-html="blogDetails?.content"></div>

    <div class="info">
      <van-image :src="blogDetails?.userVO.avatarUrl" radius="10" width="40" height="40" />
      <div class="username">作者: {{ blogDetails?.userVO?.username }}</div>
    </div>
    <div class="other">联系方式: {{ blogDetails?.userVO?.email }}</div>
    <div class="other">发布时间: {{ blogDetails?.createTime }}</div>
    <div class="xg">相关标签:</div>
    <van-tag v-for="tag in blogDetails?.userVO?.tags" :key="tag" size="medium" type="primary" class="tag">
      {{ tag }}
    </van-tag>

    <div class="code">
      <FirstTag :title="title" class="btn" @click="send" />
      <MdEditor :value="mdValue" :handle-change="handleMdChange" />
    </div>

    <div class="comment"></div>
    <div class="comment-list">
      <div v-for="item in listCommentPageData" :key="item.id" class="comment-item">
        <div class="left">
          <van-image :src="item.userAvatar" radius="10" width="40" height="40" />
        </div>
        <div class="right">
          <div class="comment-title">{{ item.username }}</div>
          <div class="comment-content">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="BlogDetail">
import { onMounted, ref } from 'vue'

import { storeToRefs } from 'pinia'

import { useBlogStore } from '../../../store/Blog'
import { useTeamStore } from '../../../store/Team'
import { useCommentStore } from '../../../store/Comment'
import { showToast } from 'vant'
import { useGlobalStore } from '../../../store/Global'
const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '博客详情'

const title = ref('发送')
const blogStore = useBlogStore()
const teamStore = useTeamStore()
const comentStore = useCommentStore()
const { blogDetailBySlug }: any = storeToRefs(blogStore)
const { teamDetail }: any = storeToRefs(teamStore)
// 获取博客详情
// getBlogByIdAsync
let getBlogDetailObj = ref({
  blogId: blogDetailBySlug.value,
})
const blogDetails: any = ref()
const init = async () => {
  const res = await blogStore.getBlogByIdAsync(getBlogDetailObj.value)
  if (res === 200) {
    blogDetails.value = blogStore.blogDetail
  } else {
    showToast(res)
  }
}

const mdValue = ref('')
const handleMdChange = (v: string) => {
  mdValue.value = v
}

// addBlogCommentAsync
// 发送评论
console.log(teamDetail.value.id, '24')
console.log(blogDetailBySlug.value)
const sendComment: any = ref({
  blogId: blogDetailBySlug.value,
  teamId: teamDetail.value.id,
  content: mdValue.value,
  remark: '',
})
const send = async () => {
  sendComment.value.content = mdValue.value
  let res: any = await comentStore.addBlogCommentAsync(sendComment.value)
  if (res === 200) {
    showToast('评论成功')
    mdValue.value = ''
    initComment()
  } else {
    showToast(res)
  }
}
// listCommentPageData
// listBlogByPageAsync
const listCommentPageData = ref()
const initComment = async () => {
  const res = await comentStore.listBlogByPageAsync({
    blogId: blogDetailBySlug.value,
    pageNum: 1,
    pageSize: 100,
  })
  if (res === 200) {
    listCommentPageData.value = comentStore.listCommentPageData
    // showToast('评论成功')
  } else {
    showToast(res)
  }
}
onMounted(() => {
  init()
  initComment()
})
</script>

<style lang="less" scoped>
.BlogDetail {
  margin: 20px;
}

.title {
  text-align: center;
  margin: 10px 0;
}
.subtitle {
  text-align: right;
  color: #999;
  font-size: 14px;
  margin-bottom: 10px;
}

.info {
  display: flex;
  align-items: center;
  margin: 20px 0;
  .username {
    margin-left: 4px;
  }
}

.other {
  margin: 4px 0;
  font-size: 12px;
  color: #999;
}

.xg {
  margin: 10px 0;
  font-size: 12px;
  color: #999;
}
.tag {
  margin: 4px;
}

.code {
  margin-top: 20px;
  margin-bottom: 10px;

  .btn {
    margin: 10px 0 20px 0;
  }
}

.comment-list {
  display: flex;
  flex-direction: column;

  .comment-item {
    margin: 10px 0;
    display: flex;
    .left {
      margin-right: 6px;
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      .comment-title {
        font-size: 16px;
      }
      .comment-content {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>
