// 添加博客
export interface addBlogRequestType {
  blogPic: string;
  content: string;
  subTitle: string;
  teamId: number;
  title: string;
}

// 获取博客列表
export interface listBlogByPageRequestType {
  pageNum: number;
  pageSize: number;
  teamId: number;
}
// 获取博客详情
export interface getBlogByIdRequestType {
  blogId: number;
}

