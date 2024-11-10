import { defineStore } from "pinia";
import { ref } from 'vue'
import {
  // 添加博客 addBlog 
  addBlog,
  // 获取博客列表
  listBlogByPage,
  // 获取博客详情
  getBlogById
} from '../../api/Blog/blog.ts'


import {
  // 添加博客
  addBlogRequestType,
  // 获取博客列表
  listBlogByPageRequestType,
  // 获取博客详情
  getBlogByIdRequestType
} from '../../api/Blog/type.ts'

import { BaseResponse } from "../Type/index.ts";
export const useBlogStore = defineStore('blog', () => {

  // 添加博客 addBlog 
  // addBlog,
  const addBlogAsync = async (blog: addBlogRequestType) => {
    const res: BaseResponse = await addBlog(blog)
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }

  // 获取博客列表
  // listBlogByPage,
  const listBlog: any = ref([])
  const listBlogByPageAsync = async (payload: listBlogByPageRequestType) => {
    const res: any = await listBlogByPage(payload)
    if (res.code === 0) {
      listBlog.value = res.data.records
      return 200
    } else {
      return res.description
    }
  }

  // 获取博客详情
  // getBlogById
  const blogDetail = ref()
  const getBlogByIdAsync = async (payload: getBlogByIdRequestType) => {
    const res: any = await getBlogById(payload)
    if (res.code === 0) {
      blogDetail.value = res.data
      return 200
    } else {
      return res.description
    }
  }

  // 某个博客详情
  const blogDetailBySlug = ref()


  return {
    // 添加博客
    addBlogAsync,

    // 获取博客列表
    listBlog,
    listBlogByPageAsync,

    // 获取博客详情
    blogDetail,
    getBlogByIdAsync,

    // 某个博客详情
    blogDetailBySlug
  }
},
  {
    persist: true,
  })