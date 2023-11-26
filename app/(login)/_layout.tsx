import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import ConnectIpIcon from "@/components/ConnectIpIcon";
import { usePersistStore } from "@/store";

export default function Layout() {
  const machineIp = usePersistStore(state => state.machineIp);

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: Colors.light.activeColor,
        },
        headerRight: () => <ConnectIpIcon hasConnected={machineIp !== null} />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "登录" }} />
      <Stack.Screen name="signup" options={{ title: "注册" }} />
      <Stack.Screen name="connect" options={{ title: "连接仪器", headerRight: undefined }}></Stack.Screen>
    </Stack>
  );
}
