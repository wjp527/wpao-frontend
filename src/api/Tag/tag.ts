import request from "../../utils/request.ts";

import { BASE_RESPONSE, PAGEINFO } from "../index.ts";
import {
  // 添加标签接口类型定义
  AddTag,

  // 更新标签接口类型定义
  UpdateTags,
  // 删除标签接口类型定义
  DeleteTag,

} from "./type.ts";


// 定义enum
enum API {
  // 添加标签 addTag  /api/tags/add
  ADD_TAG = '/tags/add',
  // 获取标签列表 listPage  '/list'
  LIST_TEAM = '/tags/list',
  // 更新标签 updateTag /api/tags/update
  UPDATE_TAGS = '/tags/update',
  // 删除标签 deleteTag /api/tags/delete
  DELETE_TAG = '/tags/delete'
}

// 添加标签
export const addTagAsync = (payload: AddTag) => {
  return request({
    url: API.ADD_TAG,
    method: 'POST',
    data: payload
  });
};

// 获取标签列表   listPage
export const listPageAsync = (payload?: PAGEINFO) => {
  return request<BASE_RESPONSE>({
    url: API.LIST_TEAM,
    method: 'POST',
    data: payload
  });
}

// 更新标签 updateTag /api/tags/update 
export const updateTagsAsync = (payload: UpdateTags) => {
  return request({
    url: API.UPDATE_TAGS,
    method: 'POST',
    data: payload
  });
};

// 删除标签 deleteTag /api/tags/delete
export const deleteTagAsync = (payload: DeleteTag) => {
  return request({
    url: API.DELETE_TAG,
    method: 'POST',
    data: payload
  });
};