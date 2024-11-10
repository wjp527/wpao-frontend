import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  // 获取好友列表 listFriendPage
  getFriendListPage
} from '../../api/Friend/friend'
import { PAGEINFO } from '../../api'

export const useFriendStore = defineStore('friend', () => {
  // 获取好友列表 listFriendPage
  // getFriendListPage
  const listFriendPageList = ref([])
  const listFriendPageAsync = async (payload: PAGEINFO) => {
    const res: any = await getFriendListPage(payload)
    if (res.code == 0) {
      listFriendPageList.value = res.data.records
      return 200;
    } else {
      res.description
    }
  }
  return {
    // 获取好友列表
    listFriendPageList,
    listFriendPageAsync
  }
},
  {
    persist: true,
  }) 