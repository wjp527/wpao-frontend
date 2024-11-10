import { defineStore } from 'pinia'
import { ref } from 'vue'
import {

  // 获取消息列表 listMessagePage 
  listMessagePage,

  // 发送消息 send
  sendMessage
} from '../../api/Chat/chat.ts'

export const useChatStore = defineStore('chat', () => {

  // 聊天好友信息
  const chatFriendInfo = ref({})


  // 获取消息列表 listMessagePage 
  // listMessagePage
  const listMessage = ref([])
  const listMessagePageAsync = async (payload: any) => {
    const res: any = await listMessagePage(payload)
    if (res.code === 0) {
      listMessage.value = res.data.records
      return 200
    } else {
      return res.description
    }
  }



  // 发送消息 send
  // sendMessage
  const sendMessageAsync = async (payload: any) => {
    const res: any = await sendMessage(payload)
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }

  return {
    // 聊天好友信息
    chatFriendInfo,

    // 获取消息列表
    listMessage,
    listMessagePageAsync,


    // 发送消息 send
    sendMessageAsync
  }
},
  {
    persist: true,
  }) 