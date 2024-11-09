import request from "../../utils/request";

enum API {
  // 根据标签搜索用户  /user/search/tags
  SEARCH_TAGS = "/user/search/tags";
  // 用户登录 /user/login
  USER_LOGIN = "/user/login";
  // 用户注册接口 register /api/user/register
  USER_REGISTER = "/user/register";
  // 获取当前用户信息 "/user/current"
  CURRENT_USER = "/user/current";
  // 更新用户信息接口 "/user/userList/update"
  USER_LIST_UPDATE = "/user/userList/update";
  // 文件上传接口  "/user/upload"
  UPLOAD_FILE = "/user/upload";
  // 用户注销(退出登录)  logout/user/logout
  USER_LOGOUT = "/user/logout";
  // 推荐用户数据接口 recommendUsers  /user/recommend
  RECOMMEND_USERS = "/user/recommend";
  // 匹配用户接口 matchUsers  /api/user/match
  MATCH_USERS = "/user/match";
  // 更新用户信息接口(欢迎页面) userUpdateTag /api/user/userList/welcome/updateTag
  USER_UPDATE_TAG = "/user/userList/welcome/updateTag";
}

// 根据标签搜索用户
export const SearchTagsAsync = (tagNameList: any) => {
  return request({
    url: API.SEARCH_TAGS,
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
    url: API.USER_LOGIN,
    method: 'POST',
    data: payload
  });
};

// 用户注册接口 register /api/user/register
export const userRegisterAsync = (payload: any) => {
  return request({
    url: API.USER_REGISTER,
    method: 'POST',
    data: payload
  });
};



// 获取当前用户信息
export const getCurrentUserAsync = () => {
  return request({
    url: API.CURRENT_USER,
    method: 'GET'
  });
};

// 更新用户信息接口 userUserListUpdate
// /user/userList/update
export const userUserListUpdateAsync = (payload: any) => {
  return request({
    url: API.USER_LIST_UPDATE,
    method: 'POST',
    data: payload
  });
};

// 文件上传接口 uploadFile
// user/upload
export const userUploadFileAsync = (payload: any) => {
  return request({
    url: API.UPLOAD_FILE,
    method: 'POST',
    data: payload
  });
};


// 用户注销(退出登录)  logout
// /user/logout
export const userLogoutAsync = () => {
  return request({
    url: API.USER_LOGOUT,
    method: 'POST'
  });
};


// 推荐用户数据接口 recommendUsers
// /user/recommend
// POST
export const recommendUsersAsync = (payload: any) => {
  return request({
    url: API.RECOMMEND_USERS,
    method: 'POST',
    data: payload
  });
};

// 匹配用户接口 matchUsers  /api/user/match
export const matchUsersAsync = (payload: any) => {
  return request({
    url: API.MATCH_USERS,
    method: 'POST',
    data: payload
  });
};

// 更新用户信息接口(欢迎页面) userUpdateTag /api/user/userList/welcome/updateTag
export const userUpdateTagAsync = (payload: any) => {
  return request({
    url: API.USER_UPDATE_TAG,
    method: 'POST',
    data: payload
  })
}