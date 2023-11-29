// 此文件是应用需要持久储存的信息

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface UserInfoType {
  id: number;
  userName: string;
  alias: string | null;
  avatar: string | null;
  role: number;
  status: number;
  permissions: string | null;
  userFrom: number;
  phoneNumber: string;
  email: string | null;
  department: string;
  createTime: string;
  expiredTime: string | null;
  lastLoginTime: string | null;
  lastUpdate: string;
  token: string | number;
}
interface State {
  token: string | null;
  machineIp: string | null;
  userInfo: UserInfoType | null;
}

interface Actions {
  setToken: (newToken: string) => void;
  removeToken: () => void;
  setMachineIp: (newIp: string) => void;
  removeMachineIp: () => void;
  setUserInfo: (newUserInfo: UserInfoType) => void;
  removeUserInfo: () => void;
}

const initialState: State = {
  token: null,
  machineIp: null,
  userInfo: null,
};

const usePersistStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setToken: (newToken: string) => {
        set({ token: newToken });
      },
      removeToken: () => {
        set({ token: null });
      },
      setMachineIp: (newIp: string) => {
        set({ machineIp: newIp });
      },
      removeMachineIp: () => {
        set({ machineIp: null });
      },
      setUserInfo: (newUserInfo: UserInfoType) => {
        set({ userInfo: newUserInfo });
      },
      removeUserInfo: () => {
        set({ userInfo: null });
      },
    }),
    {
      name: "cellaview-persist-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default usePersistStore;
