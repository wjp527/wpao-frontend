import axios, { AxiosInstance } from "axios";

// 配置axios请求
const request: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});
request.defaults.withCredentials = true;  // 允许携带cookie
// 配置请求拦截器
request.interceptors.request.use(config => {
  // 在发送请求之前做某事
  return config;
}, error => {
  // 请求错误时做些事
  return Promise.reject(error);
});

// 配置响应拦截器
request.interceptors.response.use(response => {
  // 对响应数据做点什么 
  return response.data;
}, error => {
  // 请求错误时做些事
  return Promise.reject(error);
});

export default request;   // 导出axios实例