export interface BASE_RESPONSE {
  code: number;
  data: any[];
  message: string;
  description: string;
}

export interface PAGEINFO {
  pageNum: number;
  pageSize: number;
}