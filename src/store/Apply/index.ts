import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  // 添加好友申请 addApply /api/apply/add
  addApply,
  // 获取好友申请列表 listApply /api/apply/list/page
  listApply,
  // 通过好友申请 passApply /api/apply/pass
  applyDeal,
  // 删除好友申请 deleteApply /api/apply/delete
  deleteApply
} from '../../api/Apply/apply.ts'
import { PAGEINFO } from '../../api/index.ts'

export const useApplyStore = defineStore('apply', () => {
  // 添加好友申请 addApply /api/apply/add
  // addApply,
  const addApplyAsync = async (payload: any) => {
    const res: any = await addApply(payload)
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }

  // 获取好友申请列表 listApply /api/apply/list/page
  // listApply,
  const applyList = ref([])
  const listApplyAsync = async (payload: PAGEINFO) => {
    const res: any = await listApply(payload)
    if (res.code === 0) {
      applyList.value = res.data.records
      return 200
    } else {
      return res.description
    }
  }

  // 通过好友申请 passApply /api/apply/pass
  // applyDeal,
  const applyDealAsync = async (payload: any) => {
    const res: any = await applyDeal(payload)
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }


  // 删除好友申请 deleteApply /api/apply/delete
  // deleteApply,
  const deleteApplyAsync = async (payload: any) => {
    const res: any = await deleteApply(payload)
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }
  return {
    // 添加好友申请
    addApplyAsync,

    // 获取好友申请列表
    applyList,
    listApplyAsync,


    // 通过好友申请
    applyDealAsync,

    // 删除好友申请
    deleteApplyAsync
  }
},
  {
    persist: true,
  }) 