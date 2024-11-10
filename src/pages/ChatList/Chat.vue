<template>
  <div class="Chat">
    <van-sticky>
      <van-row class="row" justify="space-between" align="center">
        <van-col span="10">
          <van-image class="avatar" radius="20px" width="60" height="60" :src="chatFriendInfo.avatarUrl" />
        </van-col>
        <van-col span="14" class="col2">
          <div>
            <div class="username">{{ chatFriendInfo.username }}</div>
            <div class="remark">{{ chatFriendInfo.remark }}</div>
          </div>
        </van-col>
      </van-row>


    </van-sticky>

    <!-- 
      userInfo.value.id
      chatFriendInfo.value.id
    -->
    <div ref="chatContainer" class="chats">
      <div class="chatMsg" v-for="item in listMessage" :key="item.id">
        <div :class="userInfo.id === item.from_id ? 'send' : 'receive'">
          {{ item.content }}
        </div>
      </div>
    </div>

    <van-cell-group inset class="footer">
      <van-field v-model="message" left-icon="comment-o" rows="1" autosize label="" type="textarea" placeholder="请输入消息">

        <template #button>
          <van-button size="small" type="primary" @click="sendMsg">发送</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <!-- <pre>{{ listMessage }}</pre> -->

  </div>
</template>
<script lang="ts" setup name="Chat">
import { ref, onMounted, nextTick, watch } from 'vue'
import { useChatStore } from '../../store/Chat';
import { useUserStore } from '../../store/User';
import { storeToRefs } from 'pinia';


import socket from '../../utils/Websocket';
import { useWebsocketStore } from "../../store/Websocket";

import { showToast } from 'vant';

const chatStore = useChatStore()
const userStore = useUserStore()
const { chatFriendInfo }: any = storeToRefs(chatStore)
const { userInfo }: any = storeToRefs(userStore)




const listByObj: any = ref({
  fromId: userInfo.value.id,
  toId: chatFriendInfo.value.id,
  pageNum: 1,
  pageSize: 100
})

// 展示聊天数据
const listMessage: any = ref([])
// 获取聊天数据
const getData = async () => {
  let res = await chatStore.listMessagePageAsync(listByObj.value)
  if (res === 200) {
    listMessage.value = chatStore.listMessage
    // 自动滚动到最底部
    scrollToBottom()
  } else {
    showToast(res)
  }
}


// 发送消息
const message = ref('')
const sendMsg = async () => {
  let res = await chatStore.sendMessageAsync({
    content: message.value,
    remark: '',
    to_id: chatFriendInfo.value.id,
    type: 1
  })

  if (res === 200) {
    socket.send({
      from_id: userStore.userInfo.id,
      to_id: chatFriendInfo.value.id,
      type: 2
    })

    getData()
    message.value = ''
  } else {
    showToast(res)
  }

}

const WebScoketStore = useWebsocketStore()
WebScoketStore.$subscribe((mutations: any, state: any) => {
  let msg = JSON.parse(state.msg)
  if (msg.type == 2) {
    getData()
  }
})


const init = () => {
  // 进入聊天室
  Promise.resolve().then(() => {
    socket.init()
  }).then(() => {
    socket.send({
      uid: userStore.userInfo.id,
      type: 1
    })
    getData()
  })
}

// 实现自动滚动到底部
const chatContainer = ref()
// 实现自动滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

// 监听消息列表的变化并自动滚动
watch(listMessage, scrollToBottom);

onMounted(() => {
  init()

  // 自动滚动到底部
  scrollToBottom()
})
</script>

<style lang="less" scoped>
.Chat {
  box-sizing: border-box;
}

.row {
  margin: 0 20px;
  background-color: #fff;
  margin-bottom: .375rem;

  .col2 {
    text-align: right;


    .username {
      font-family: LOGO;

      font-size: 24px;
    }

    .remark {
      font-family: LOGO;
      font-size: 20px;
      // width: 120px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      /* 限制显示两行 */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    }
  }
}

.chats {
  height: 400px;
  overflow-y: auto;
  scroll-behavior: smooth;
  /* 添加平滑滚动 */
}

.chatMsg {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* 默认左对齐 */
  gap: 10px;
  /* 间距 */
  // max-width: 300px;
  width: 100vw;
  padding: 0 20px;
  box-sizing: border-box;

}

.receive {
  background-color: #3a86ff;
  /* 气泡的蓝色背景 */
  color: white;
  /* 文字颜色 */
  padding: 12px 16px;
  /* 内边距 */
  border-radius: 30px 20px 20px 4px;
  /* 单独设置每个角的圆角 */
  font-size: 16px;
  /* 字体大小 */
  line-height: 1.5;
  /* 行高 */
  max-width: 250px;
  // max-width: 100%; /* 最大宽度 */
  /* 最大宽度 */
  word-wrap: break-word;
  /* 自动换行 */
  margin-bottom: 10px;
  margin-top: 10px;
}

.send {
  background-color: #f6f6f6;
  /* 右侧气泡的灰色背景 */
  color: #333333;
  /* 右侧气泡的文字颜色 */
  padding: 12px 16px;
  /* 内边距 */
  border-radius: 20px 30px 4px 20px;
  /* 右侧气泡的不同圆角 */
  font-size: 16px;
  /* 字体大小 */
  line-height: 1.5;
  /* 行高 */
  max-width: 250px;
  /* 最大宽度 */
  // max-width: 100%; /* 最大宽度 */
  word-wrap: break-word;
  /* 自动换行 */
  margin-bottom: 10px;
  align-self: flex-end;
  /* 右对齐 */

}

.avatar {
  margin: 10px 0;
}

/deep/ .van-field__left-icon {
  // line-height: 40px;
  line-height: 35px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 100px;

}
</style>