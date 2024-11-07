import request from "../../utils/request";

import { BASE_RESPONSE } from "../index.ts";
import {
  // 获取队伍接口类型定义
  TeamListRequest,
  // 加入队伍接口类型定义
  JoinTeamRequest

} from "./type.ts";
// 创建队伍接口 addTeam
// /team/add

// 定义enum
enum API {
  ADD_TEAM = '/team/add',
  // "/team/list"
  LIST_TEAM = '/team/list',
  // 加入队伍接口 joinTeam team/join
  JOIN_TEAM = '/team/join',
  // 查询队伍列表接口 getTeamList /api/team/list
  SELECT_TEAM = '/team/list',
  // /api/team/update 更新队伍信息接口 updateTeam
  UPDATE_TEAM = '/team/update',
  // 搜索用户所创建的队伍列表  搜索用户所创建的队伍列表接口 getCreateTeamList /api/team/list/create
  GET_CREATE_TEAM_LIST = '/team/list/create',
  // 获取我加入的队伍 获取我加入的队伍列表接口 getOthersTeamList /api/team/list/current/join
  GET_CURRENT_JOIN_TEAM_LIST = '/team/list/current/join',
  // 退出队伍接口 quitTeam /api/team/quit
  QUIT_TEAM = '/team/quit',
  // 解散队伍接口 dissolveTeam /api/team/dissolve
  DISSOLVE_TEAM = '/team/dissolve',
}
export const addTeanAsync = (payload: any) => {
  return request({
    url: API.ADD_TEAM,
    method: 'POST',
    data: payload
  });
};

// 查询队伍列表接口 getTeamList
// /team/list
export const getTeamListAsync = (payload?: TeamListRequest) => {
  return request<BASE_RESPONSE>({
    url: API.LIST_TEAM,
    method: 'GET',
    params: payload
  });
}

// 加入队伍接口 joinTeam team/join
// /team/join
export const joinTeamAsync = (payload: JoinTeamRequest) => {
  return request({
    url: API.JOIN_TEAM,
    method: 'POST',
    data: payload
  });
}

// 查询队伍列表接口 getTeamList /api/team/list
// GET
// SELECT_TEAM
export const selectTeamAsync = (payload?: TeamListRequest) => {
  return request<BASE_RESPONSE>({
    url: API.SELECT_TEAM,
    method: 'GET',
    params: payload
  });
}

// /api/team/update 更新队伍信息接口 updateTeam
// UPDATE_TEAM = '/team/update',
// POST
// 更新队伍信息接口
export const updateTeamAsync = (payload: any) => {
  return request({
    url: API.UPDATE_TEAM,
    method: 'POST',
    data: payload
  });
}

// // 搜索用户所创建的队伍列表  搜索用户所创建的队伍列表接口 getCreateTeamList /api/team/list/create 
export const getCreateTeamListAsync = (payload?: TeamListRequest) => {
  return request<BASE_RESPONSE>({
    url: API.GET_CREATE_TEAM_LIST,
    method: 'GET',
    params: payload
  });
}

// // 获取我加入的队伍 获取我加入的队伍列表接口 getOthersTeamList /api/team/list/current/join
// GET_OTHERS_TEAM_LIST = '/team/list/current/join',
export const getCurrentJoinTeamListAsync = (payload?: TeamListRequest) => {
  return request<BASE_RESPONSE>({
    url: API.GET_CURRENT_JOIN_TEAM_LIST,
    method: 'GET',
    params: payload
  });
}

// 退出队伍接口 quitTeam /api/team/quit
// QUIT_TEAM = '/team/quit',
export const quitTeamAsync = (payload: any) => {
  return request({
    url: API.QUIT_TEAM,
    method: 'POST',
    data: payload
  });
}

// 解散队伍接口 dissolveTeam /api/team/dissolve
// DISSOLVE_TEAM = '/team/dissolve',
export const dissolveTeamAsync = (payload: any) => {
  return request({
    url: API.DISSOLVE_TEAM,
    method: 'POST',
    data: payload
  });
}