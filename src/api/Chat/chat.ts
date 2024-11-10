import request from "../../utils/request.ts";

import { BASE_RESPONSE, PAGEINFO } from "../index.ts";



// 定义enum
enum API {
  // 获取消息列表 listMessagePage /api/message/list/page
  LIST_MESSAGE_PAGE = "/message/list/page",
  // 发送消息 send /api/message/send
  SEND_MESSAGE = "/message/send",
}


// 获取消息列表 listMessagePage 
// LIST_MESSAGE_PAGE
export const listMessagePage = (data: any) => {
  return request({
    url: API.LIST_MESSAGE_PAGE,
    method: "POST",
    data
  })
}
// 发送消息 send /api/message/send POST
export const sendMessage = (data: any) => {
  return request({
    url: API.SEND_MESSAGE,
    method: "POST",
    data
  })
}