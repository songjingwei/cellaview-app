import { usePersistStore } from "@/store";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Platform } from "react-native";

const useCheckToken = () => {
  const router = useRouter();
  const token = usePersistStore((state) => state.token);
  useEffect(() => {
    if (!token) {
      if (Platform.OS === "ios") {
        setTimeout(() => {
          router.replace("/(login)");
        }, 1);
      } else {
        setImmediate(() => {
          router.replace("/(login)");
        });
      }
    } else {
      if (Platform.OS === "ios") {
        setTimeout(() => {
          router.replace("/(tabs)");
        }, 1);
      } else {
        setImmediate(() => {
          router.replace("/(tabs)");
        });
      }
    }
  }, [token]);
};

export default useCheckToken;
