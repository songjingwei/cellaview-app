import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { useCheckToken } from "@/hooks";
import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "自由模式",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="telescope" color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "预设程序扫描",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="line-scan" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "数据总览",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="database-eye" color={color} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="four"
        options={{
          title: "系统设置",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="application-settings" color={color} />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
