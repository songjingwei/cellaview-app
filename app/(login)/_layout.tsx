import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import ConnectIp from "@/components/ConnectIp";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: Colors.light.activeColor,
        },
        headerRight: () => <ConnectIp />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "登录" }} />
      <Stack.Screen name="two" options={{ title: "注册" }} />
      <Stack.Screen name="three" options={{title: "连接仪器",  headerRight: undefined}}></Stack.Screen>
    </Stack>
  );
}
