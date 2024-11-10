import { defineStore } from "pinia";
import { ref } from 'vue'
import {
  // 添加博客评论 
  addComment,
  // 分页查询博客评论  
  listCommentPage
} from '../../api/Comment/comment.ts'


import {
  // 添加博客评论
  addBlogCommentRequestType,
  // 获取博客评论数据
  listBlogCommentsByPageRequestType,
} from '../../api/Comment/type.ts'

import { BaseResponse } from "../Type/index.ts";
export const useCommentStore = defineStore('comment', () => {

  // 添加博客评论 
  // addComment,
  const addBlogCommentAsync = async (data: addBlogCommentRequestType) => {
    const res: BaseResponse = await addComment(data)
    if (res.code === 0) {
      return 200
    }
    return res
  }

  // 分页查询博客评论  
  // listCommentPage
  const listCommentPageData = ref([])
  const listBlogByPageAsync = async (data: listBlogCommentsByPageRequestType) => {
    const res: any = await listCommentPage(data)
    if (res.code === 0) {
      listCommentPageData.value = res.data.records
      return 200
    }
    return res
  }


  return {
    // 添加博客
    addBlogCommentAsync,

    // 分页查询博客评论
    listCommentPageData,
    listBlogByPageAsync
  }
},
  {
    persist: true,
  })