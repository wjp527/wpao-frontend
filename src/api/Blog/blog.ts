import request from "../../utils/request.ts";




// 定义enum
enum API {
  // 添加博客 addBlog /api/blog/add
  ADD_BLOG = "/blog/add",
  // 获取博客列表 listBlogByPage /api/blog/list/page
  LIST_BLOG_BY_PAGE = "/blog/list/page",
  // 获取博客详情 getBlogById /api/blog/detail
  GET_BLOG_BY_ID = "/blog/detail",
  // 获取消息列表 listMessagePage /api/message/list/page
}

import {
  // 添加博客
  addBlogRequestType,
  // 获取博客列表
  listBlogByPageRequestType,
  // 获取博客详情
  getBlogByIdRequestType
} from './type.ts'

// 添加博客 addBlog /api/blog/add
// ADD_BLOG = "/blog/add",
export const addBlog = (data: addBlogRequestType) => {
  return request({
    url: API.ADD_BLOG,
    method: "POST",
    data
  })
}
// 获取博客列表 listBlogByPage /api/blog/list/page
// LIST_BLOG_BY_PAGE = "/blog/list/page",

export const listBlogByPage = (data: listBlogByPageRequestType) => {
  return request({
    url: API.LIST_BLOG_BY_PAGE,
    method: "POST",
    data
  })
}
// 获取博客详情 getBlogById /api/blog/detail
// GET_BLOG_BY_ID = "/blog/detail",
export const getBlogById = (data: getBlogByIdRequestType) => {
  return request({
    url: API.GET_BLOG_BY_ID,
    method: "POST",
    data
  })
}