import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface State {
  token: string | null;
  machineIp: string | null;
}

interface Actions {
  setToken: (newToken: string) => void;
  removeToken: () => void;
  setMachineIp: (newIp: string) => void;
  removeMachineIp: () => void;
}

const initialState: State = {
  token: null,
  machineIp: null,
}

const usePersistStore = create<State & Actions>()(persist(
  (set, get) => ({
    ...initialState,
    setToken: (newToken: string) => {
      set({ token: newToken});
    },
    removeToken: () => {
      set({token: null});
    },
    setMachineIp: (newIp: string) => {
      set({machineIp: newIp});
    },
    removeMachineIp: () => {
      set({machineIp: null});
    }
  }),
  {
    name: 'cellaview-persist-store',
    storage: createJSONStorage(() => AsyncStorage),
  }
));

export default usePersistStore;


