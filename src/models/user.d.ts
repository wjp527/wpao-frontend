/**
 * 用户类别
 */
// 获取用户信息
type CurrentUser = {
  id?: number;
  username?: string; // 用户名
  userAccount?: string; // 用户账号
  avatarUrl?: string; // 头像地址
  gender?: number; // 性别
  userPassword?: null;// 用户密码
  phone?: string | number; // 手机号
  email?: string | number; // 邮箱
  userStatus?: number; // 用户状态
  createTime?: Date;// 创建时间
  updateTime?: Date; // 更新时间
  isDelete?: null; // 是否删除
  userRole?: number; // 用户角色
  planetCode?: string; // 星球编码
  tags?: string; // 标签
  profile?: string; // 个人简介
  current?: number;
  pageSize?: number;
  created_at?: string;
};

export type { CurrentUser };