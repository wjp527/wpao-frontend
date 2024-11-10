import request from "../../utils/request.ts";

import { BASE_RESPONSE, PAGEINFO } from "../index.ts";



// 定义enum
enum API {
  // 获取好友列表 listFriendPage /api/friend/list/page
  GET_FRIEND_LIST_PAGE = "/friend/list/page",

}

// 获取好友列表 listFriendPage /api/friend/list/page
export const getFriendListPage = (payload: PAGEINFO) => {
  return request({
    url: API.GET_FRIEND_LIST_PAGE,
    method: "POST",
    data: payload
  })
}