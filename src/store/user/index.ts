import { defineStore } from "pinia";
import { ref } from "vue";

import {
  userLogin,
  userRegisterAsync,
  SearchTagsAsync,
  getCurrentUserAsync,
  userUserListUpdateAsync,
  userUploadFileAsync,
  userLogoutAsync,
  recommendUsersAsync,
  // 匹配用户接口 
  matchUsersAsync,
  // 更新用户信息接口(欢迎页面)
  userUpdateTagAsync
} from "../../api/User/user.ts";

// 请求体返回类型参数
import type { BaseResponse } from "../Type/index.ts";

export const useUserStore = defineStore("user",
  () => {
    // 用户登录
    const loginInfo = ref<BaseResponse>()
    const GetUserLoginAysnc = async (payload: any) => {
      let res: BaseResponse = await userLogin(payload)
      if (res.code === 0) {
        userInfo.value = res.data
        return 200
      } else {
        return res.description
      }
    }

    // 用户注册 userRegisterAsync 
    const GetUserRegisterAsync = async (payload: any) => {
      let res: BaseResponse = await userRegisterAsync(payload)
      if (res.code === 0) {
        return 200
      } else {
        return res.description
      }
    }

    // 获取搜索后的标签列表
    // state
    // start
    const searchTagsList = ref<BaseResponse>()
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
    const userInfo: any = ref<BaseResponse>()
    const GetCurrentUserAsync = async () => {
      let res: BaseResponse = await getCurrentUserAsync()
      if (res.code === 0) {
        userInfo.value = res.data
        return 200
      } else {
        return res.description
      }
    }


    // 更新用户信息  userUserListUpdate
    const GetUserUserListUpdateAsync = async (payload: any) => {
      let res: BaseResponse = await userUserListUpdateAsync(payload)
      if (res.code === 0) {
        return 200
      } else {
        return res.description
      }
    }

    // 文件上传
    const userAvatarUrl = ref<any>()
    const filePic = ref<any>()
    const GetUserUploadFileAsync = async (payload: any) => {
      let res: BaseResponse = await userUploadFileAsync(payload)
      if (res.code === 0) {
        userAvatarUrl.value = res.data
        filePic.value = res.data
        return 200
      } else {
        return res.description
      }
    }

    // 用户退出 
    const GetUserLogoutAsync = async () => {
      let res: BaseResponse = await userLogoutAsync()
      if (res.code === 0) {
        return 200
      } else {
        return res.description
      }
    }

    // 推荐用户数据接口
    const recommendUsers = ref<any>()
    const GetRecommendUsersAsync = async (payload: any) => {
      let res: BaseResponse = await recommendUsersAsync(payload)
      if (res.code === 0) {
        recommendUsers.value = res.data
        return 200
      } else {
        return res.description
      }
    }


    // 匹配用户接口 
    // matchUsersAsync 
    const GetMatchUsersAsync = async (payload: any) => {
      let res: BaseResponse = await matchUsersAsync(payload)
      if (res.code === 0) {
        recommendUsers.value = res.data
        return 200
      } else {
        return res.description
      }
    }

    // 更新用户信息接口(欢迎页面)
    // userUpdateTagAsync
    const GetUserUpdateTagAsync = async (payload: any) => {
      let res: BaseResponse = await userUpdateTagAsync(payload)
      if (res.code === 0) {
        return 200
      } else {
        return res.description
      }
    }


    return {
      // 用户登录
      loginInfo,
      GetUserLoginAysnc,

      // 用户注册
      GetUserRegisterAsync,

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
      filePic,

      // 用户退出
      GetUserLogoutAsync,

      // 推荐用户数据接口
      recommendUsers,
      GetRecommendUsersAsync,

      // 匹配用户接口 
      GetMatchUsersAsync,

      // 更新用户信息接口(欢迎页面)
      GetUserUpdateTagAsync



    }
  },
  {
    persist: true,
  }
)