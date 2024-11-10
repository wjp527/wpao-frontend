// 添加博客评论
export interface addBlogCommentRequestType {
  blogId: number;
  content: string;
  remark: string;
  teamId: number;
}

// 获取博客评论数据
export interface listBlogCommentsByPageRequestType {
  blogId: number;
  pageNum: number;
  pageSize: number;
}

