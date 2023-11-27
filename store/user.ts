import { create } from "zustand";

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
  userInfo: UserInfoType | null;
}

interface Actions {
  setUserInfo: (newUserInfo: UserInfoType) => void;
  clearUserInfo: () => void;
}

const initialState: State = {
  userInfo: null,
};

const useUserStore = create<State & Actions>((set) => ({
  ...initialState,
  setUserInfo: (newUserInfo: UserInfoType) => {
    set({ userInfo: newUserInfo });
  },
  clearUserInfo: () => {
    set({ userInfo: null });
  },
}));

export default useUserStore;
