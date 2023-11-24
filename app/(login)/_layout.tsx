import { Stack } from "expo-router";
import Colors from "@/constants/Colors";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: Colors.light.activeColor,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "登录" }} />
      <Stack.Screen name="two" options={{ title: "注册" }} />
    </Stack>
  );
}
