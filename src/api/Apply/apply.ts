import request from "../../utils/request.ts";

import { BASE_RESPONSE, PAGEINFO } from "../index.ts";


// 定义enum
enum API {
  // 添加好友申请 addApply /api/apply/add
  ADD_APPLY = "/apply/add",
  // 获取好友申请列表 listApply /api/apply/list/page
  LIST_APPLY = "/apply/list/page",
  // 通过好友申请 passApply /api/apply/pass
  APPLY_DEAL = "/apply/pass",
  // 删除好友申请 deleteApply /api/apply/delete
  DELETE_APPLY = "/apply/delete"
}

// 添加好友申请 addApply /api/apply/add
export const addApply = (data: any) => {
  return request({
    url: API.ADD_APPLY,
    method: "POST",
    data
  })
}

// 获取好友申请列表 listApply /api/apply/list/page
export const listApply = (data: PAGEINFO) => {
  return request({
    url: API.LIST_APPLY,
    method: "GET",
    data
  })
}

// 通过好友申请 passApply /api/apply/pass
export const applyDeal = (data: any) => {
  return request({
    url: API.APPLY_DEAL,
    method: "POST",
    data
  })
}

// 删除好友申请 deleteApply /api/apply/delete
export const deleteApply = (data: any) => {
  return request({
    url: API.DELETE_APPLY,
    method: "POST",
    data
  })
}