import request from "../../utils/request.ts";




// 定义enum
enum API {
  // 添加博客评论 addComment /api/comment/add
  ADD_COMMENT = "/comment/add",
  // 分页查询博客评论 listCommentPage /api/comment/list/page
  LIST_COMMENT_PAGE = "/comment/list/page",
}

import {
  // 添加博客评论
  addBlogCommentRequestType,
  // 获取博客评论数据
  listBlogCommentsByPageRequestType,
} from './type.ts'



// 添加博客评论 
export const addComment = (data: addBlogCommentRequestType) => {
  return request({
    url: API.ADD_COMMENT,
    method: "POST",
    data
  })
}

// 分页查询博客评论  
export const listCommentPage = (data: listBlogCommentsByPageRequestType) => {
  return request({
    url: API.LIST_COMMENT_PAGE,
    method: "POST",
    data
  })
}