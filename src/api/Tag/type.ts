// 添加标签接口类型定义
export interface AddTag {
  isParent: number;
  parentId: number;
  remark: string;
  tagName: string;
}

// 更新标签接口类型定义
export interface UpdateTags {
  children?: [];
  id: number;
  isParent: number;
  parentId: number;
  remark: string;
  tagName: string;
  userId: number;
}


// 删除标签接口类型定义
export interface DeleteTag {
  id: number;
}