import { defineStore } from "pinia";
import { ref } from "vue";

import {
  addTeanAsync,
  getTeamListAsync,
  // 加入队伍接口
  joinTeamAsync,
  // 查询队伍列表接口
  selectTeamAsync,
  // 更新队伍接口
  updateTeamAsync,
  // 搜索用户所创建的队伍列表
  getCreateTeamListAsync,
  // 获取我加入的队伍 
  getCurrentJoinTeamListAsync,
  // 退出队伍接口
  quitTeamAsync,
  // 解散队伍接口
  dissolveTeamAsync

} from "../../api/Team/team.ts";

// 请求体返回类型参数
import type { BaseResponse } from "../Type/index.ts";
import { TeamListRequest, JoinTeamRequest } from "../../api/Team/type.ts";

// 引入枚举
import { TeamStatusEnum } from "../../enum/team/index.ts";

export const useTeamStore: any = defineStore("team", () => {
  // 创建队伍
  const addTeamInfo = ref<BaseResponse>()
  const GetAddTeanAsync = async (payload: any) => {
    let res: BaseResponse = await addTeanAsync(payload)
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }

  // 获取队伍列表
  // getTeamListAsync
  const teamList = ref<TeamListRequest>()
  const GetTeamListAsync = async (payload?: TeamListRequest) => {
    let res: any = await getTeamListAsync(payload)
    if (res.code === 0) {
      teamList.value = res.data.map((item: any) => {
        if (item.teamStatus == TeamStatusEnum.PRIVATE) {
          item.TeamStatusCN = "私有"
        } else if (item.teamStatus == TeamStatusEnum.PUBLIC) {
          item.TeamStatusCN = "公开"
        } else if (item.teamStatus == TeamStatusEnum.SECRET) {
          item.TeamStatusCN = "加密"
        }
        return item
      })
      res.data
      return 200
    } else {
      return res.description
    }
  }


  // 加入队伍接口
  // joinTeamAsync 
  const GetJoinTeamAsync = async (payload: JoinTeamRequest) => {
    let res: BaseResponse = await joinTeamAsync(payload)

    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }

  // 查询队伍列表接口
  // selectTeamAsync
  const selectTeamList = ref<any>()
  const GetSelectTeamAsync = async (payload: any) => {
    let res: any = await selectTeamAsync(payload)
    if (res.code === 0) {
      selectTeamList.value = res.data
      return 200
    } else {
      return res.description
    }
  }

  // 更新队伍接口
  // updateTeamAsync 
  const updateTeam = ref<any>({})
  const GetUpdateTeamAsync = async (payload: any) => {
    let res: BaseResponse = await updateTeamAsync(payload)
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }

  // 搜索用户所创建的队伍列表
  // getCreateTeamListAsync
  const createTeamList = ref<any>()
  const GetCreateTeamListAsync = async (payload: any) => {
    let res: any = await getCreateTeamListAsync(payload)
    if (res.code === 0) {
      createTeamList.value = res.data
      return 200
    } else {
      return res.description
    }
  }

  // 获取我加入的队伍 
  // getCurrentJoinTeamListAsync
  const joinTeamList = ref<any>()
  const GetCurrentJoinTeamListAsync = async (payload: any) => {
    let res: any = await getCurrentJoinTeamListAsync(payload)
    if (res.code === 0) {
      joinTeamList.value = res.data
      return 200
    } else {
      return res.description
    }

  }

  // 退出队伍接口
  // quitTeamAsync,
  const GetQuitTeamAsync = async (payload: any) => {
    let res: BaseResponse = await quitTeamAsync(payload)
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }
  // 解散队伍接口
  // dissolveTeamAsync
  const dissolveTeamList = ref<any>()
  const GetDissolveTeamAsync = async (payload: any) => {
    let res: any = await dissolveTeamAsync(payload)
    if (res.code === 0) {
      dissolveTeamList.value = res.data
      return 200
    } else {
      return res.description
    }
  }

  // 获取某一只队伍的信息
  const teamDetail: any = ref()

  return {
    // 创建队伍
    addTeamInfo,
    GetAddTeanAsync,

    // 获取队伍列表
    GetTeamListAsync,
    teamList,

    // 加入队伍接口
    GetJoinTeamAsync,

    // 查询队伍列表接口
    GetSelectTeamAsync,
    selectTeamList,


    // 更新队伍接口
    GetUpdateTeamAsync,
    updateTeam,


    // 搜索用户所创建的队伍列表
    GetCreateTeamListAsync,
    createTeamList,


    // 获取我加入的队伍
    joinTeamList,
    GetCurrentJoinTeamListAsync,

    // 退出队伍接口
    GetQuitTeamAsync,

    // 解散队伍接口
    GetDissolveTeamAsync,

    // 进入队伍
    teamDetail
  }
},
  {
    persist: true,
  })