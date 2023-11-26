import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NODE_PORT, HARDWARE_PORT } from "@/constants/Ports";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(async config => {
  const persistStoreStr = await AsyncStorage.getItem("cellaview-persist-store");
  if (persistStoreStr === null) {
    throw new Error("您可能未连接机器");
  }
  const persistStore = JSON.parse(persistStoreStr as string);
  const machineIp = persistStore.state.machineIp;
  console.log("machineIp: ", machineIp);
  config.baseURL = machineIp;

  // 添加请求拦截器
  if (config.method === 'post') {
    // 添加 POST 请求的请求头
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
}, error => {
  // 处理请求错误
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  // 添加响应拦截器
  return response;
}, error => {
  // 处理响应错误
  return Promise.reject(error);
});

export const get = (url: string, params: Object) => {
  return axiosInstance.get(`:${NODE_PORT}` + url, { params });
};
export const post = (url: string, payload: Object) => {
  return axiosInstance.post(`:${NODE_PORT}` + url, payload);
};

export const hardwareGet = (url: string, params: Object) => {
  return axiosInstance.get(`:${HARDWARE_PORT}` + url, { params });
}
export const hardwarePost = (url: string, payload: Object) => {
  return axiosInstance.post(`:${HARDWARE_PORT}` + url, payload);
};


