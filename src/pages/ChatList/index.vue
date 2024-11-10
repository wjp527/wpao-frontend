<template>
  <div class="ChatList">
    <div class="top">
      <FirstTag class="btn" :title="title" @click="nextToFriendApply" />
    </div>
    <br>

       <!-- 骨架屏 -->
       <van-skeleton v-for="(item, index) in pageInfo.pageSize" :key="index" v-show="loading">
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

    <van-card v-if="finalList.length > 0" class="card" v-for="(item) in finalList" tag="xxx"
       :desc="item.profile" :title="item.username" :thumb="item.avatarUrl" @click="nextToChat(item)">
      <template #tags>
        <van-tag class="tag" plain type="primary" v-for="tag in item.tags">{{ tag }}</van-tag>
      </template>
      <template #price>
        <div class="text">用户手机号:{{ maskPhoneNumber(item.phone) }}</div>
        <div class="text">邮箱: {{ item.email }}</div> 
      </template>
      <template #footer>
        <SendMessageButton/>
      </template>
    </van-card>

  </div>
</template>
<script lang="ts" setup name="ChatList">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
 
import { useGlobalStore } from '../../store/Global';
import { useFriendStore } from '../../store/Friend'; 
import { showToast } from 'vant'; 
import { useChatStore } from '../../store/Chat';

const router = useRouter() 
const friendStore = useFriendStore()
const chatStore = useChatStore()

const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '聊天'

const title = ref('好友申请')

// 加载中
const loading = ref(false)
const pageInfo = ref({
  pageNum: 1,
  pageSize: 100
})

const listFriendPageList = ref()
const finalList:any = ref([])
const getData = async () => {
  loading.value = true
  const res: any = await friendStore.listFriendPageAsync(pageInfo.value) 
  if(res === 200) {
    listFriendPageList.value = friendStore.listFriendPageList 
    listFriendPageList.value.forEach((item: any) => {
      finalList.value.push(item.friendVO)
    })

    loading.value = false
  } else {
    showToast(res)
    loading.value = false
  }
}

// 屏蔽手机号
const maskPhoneNumber = (phone: string) => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

// 跳转聊天页面
const nextToChat = (item: any) => { 
  chatStore.chatFriendInfo = item
  router.push('/chat')
}



const nextToFriendApply = () => {
  setTimeout(() => {
    router.push('/apply')
  }, 1000)
}
onMounted(() => { 
  getData()
})
</script>

<style lang="less" scoped>
.ChatList {
  .top {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
     

    .btn { 
    }
  }
}

/deep/ .van-card__price-currency {
  color: transparent;
}

.tag {
  margin: 10px 2px;
}

.text {
  font-size: 12px;
  font-weight: 400;
}
</style>
