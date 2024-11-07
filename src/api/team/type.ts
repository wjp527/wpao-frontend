// 获取队伍接口类型定义
export interface TeamListRequest {
  description?: string;
  id?: string;
  maxNum?: number;
  name?: string;
  searchText?: string;
  teamStatus?: string | number;
  userId?: string;
  pageNum?: number;
  pageSize?: number;
}

// 加入队伍接口类型定义
export interface JoinTeamRequest {
  password?: string;
  remark?: string;
  teamId: number;
}