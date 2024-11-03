import { defineStore } from "pinia";
import { ref } from "vue";

import { userLogin, SearchTagsAsync, getCurrentUserAsync, userUserListUpdateAsync, userUploadFileAsync, userLogoutAsync, recommendUsersAsync } from "../../api/user.ts";

// 请求体返回类型参数
import type { BaserResponse } from "../type/index.ts";

export const useUserStore = defineStore("user", () => {
  // 用户登录
  const loginInfo = ref<BaserResponse>()
  const GetUserLoginAysnc = async (payload: any) => {
    let res: BaserResponse = await userLogin(payload)
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }

  // 获取搜索后的标签列表
  // state
  // start
  const searchTagsList = ref<BaserResponse>()
  // 获取搜索后的标签列表
  const GetSearchTags = async (keywords: string) => {
    let res: any = await SearchTagsAsync(keywords)
    if (res.code === 0) {
      searchTagsList.value = res.data
      return 200
    }
  }

  // end


  // 获取当前用户信息
  const userInfo = ref<BaserResponse>()
  const GetCurrentUserAsync = async () => {
    let res: BaserResponse = await getCurrentUserAsync()
    if (res.code === 0) {
      userInfo.value = res.data
      return 200
    } else {
      return res.description
    }
  }


  // 更新用户信息  userUserListUpdate
  const GetUserUserListUpdateAsync = async (payload: any) => {
    let res: BaserResponse = await userUserListUpdateAsync(payload)
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }

  // 文件上传
  const userAvatarUrl = ref<string>()
  const GetUserUploadFileAsync = async (payload: any) => {
    let res: BaserResponse = await userUploadFileAsync(payload)
    if (res.code === 0) {
      userAvatarUrl.value = res.data
      console.log(userAvatarUrl.value, '===');
      return 200
    } else {
      return res.description
    }
  }

  // 用户退出 
  const GetUserLogoutAsync = async () => {
    let res: BaserResponse = await userLogoutAsync()
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }

  // 推荐用户数据接口
  const recommendUsers = ref<BaserResponse>()
  const GetRecommendUsersAsync = async (payload: any) => {
    let res: BaserResponse = await recommendUsersAsync(payload)
    if (res.code === 0) {
      recommendUsers.value = res.data
      return 200
    } else {
      return res.description
    }
  }
  return {
    // 用户登录
    loginInfo,
    GetUserLoginAysnc,

    // 获取搜索后的标签列表
    searchTagsList,
    GetSearchTags,

    // 获取当前用户信息
    userInfo,
    GetCurrentUserAsync,

    // 修改用户信息接口
    GetUserUserListUpdateAsync,

    // 文件上传
    GetUserUploadFileAsync,
    userAvatarUrl,

    // 用户退出
    GetUserLogoutAsync,

    // 推荐用户数据接口
    recommendUsers,
    GetRecommendUsersAsync,



  }
})