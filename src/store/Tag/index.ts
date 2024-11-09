import { defineStore } from "pinia";
import { ref } from "vue";
import {
  // 新增标签   addTag
  addTagAsync,
  // 获取标签列表   listPage
  listPageAsync,
  // 更新标签
  updateTagsAsync,
  // 删除标签 deleteTag /api/tags/delete
  deleteTagAsync
} from '../../api/Tag/tag'

import { UpdateTags } from "../../api/Tag/type";

import { PAGEINFO } from "../../api";

// tag标签仓库
export const useTagStore: any = defineStore("tag", () => {

  // 新增标签   addTag
  // addTagAsync
  const addTag = async (payload: any) => {
    const res: any = await addTagAsync(payload)
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }

  // 获取标签列表
  const tagList = ref<any>()
  const listPage = async (payload: PAGEINFO) => {
    const res: any = await listPageAsync(payload)
    if (res.code === 0) {
      tagList.value = res.data
      return 200
    } else {
      return res.description
    }
  }


  // 更新标签
  // updateTagsAsync
  const updateTags = async (payload: UpdateTags) => {
    const res: any = await updateTagsAsync(payload)
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }

  // 删除标签 deleteTag /api/tags/delete
  const deleteTag = async (payload: any) => {
    const res: any = await deleteTagAsync(payload)
    if (res.code === 0) {
      return 200
    } else {
      return res.description
    }
  }

  return {
    // 新增标签   addTag
    addTag,

    // 获取标签列表
    tagList,
    listPage,

    // 更新标签
    updateTags,

    // 删除标签 deleteTag /api/tags/delete
    deleteTag
  }
},
  {
    persist: true,
  })