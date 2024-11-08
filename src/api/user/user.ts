import request from "../../utils/request";

// 根据标签搜索用户
export const SearchTagsAsync = (tagNameList: any) => {
  return request({
    url: "/user/search/tags",
    method: 'GET',
    params: {
      tagNameList: tagNameList
    }
  });
};

// 用户登录
// /user/login
export const userLogin = (payload: any) => {
  return request({
    url: "/user/login",
    method: 'POST',
    data: payload
  });
};



// 获取当前用户信息
export const getCurrentUserAsync = () => {
  return request({
    url: "/user/current",
    method: 'GET'
  });
};

// 更新用户信息接口 userUserListUpdate
// /user/userList/update
export const userUserListUpdateAsync = (payload: any) => {
  return request({
    url: "/user/userList/update",
    method: 'POST',
    data: payload
  });
};

// 文件上传接口 uploadFile
// user/upload
export const userUploadFileAsync = (payload: any) => {
  return request({
    url: "/user/upload",
    method: 'POST',
    data: payload
  });
};


// 用户注销(退出登录)  logout
// /user/logout
export const userLogoutAsync = () => {
  return request({
    url: "/user/logout",
    method: 'POST'
  });
};


// 推荐用户数据接口 recommendUsers
// /user/recommend
// POST
export const recommendUsersAsync = (payload: any) => {
  return request({
    url: "/user/recommend",
    method: 'POST',
    data: payload
  });
};

// 匹配用户接口 matchUsers  /api/user/match
export const matchUsersAsync = (payload: any) => {
  return request({
    url: "/user/match",
    method: 'POST',
    data: payload
  });
};