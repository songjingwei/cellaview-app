import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Text } from "native-base";

/**
 * MyText 组件用来解决某些安卓机型 Text 显示不全的问题
 */
const MyText = (props: React.ComponentProps<typeof Text>) => {
  if (Platform.OS === "android") {
    return (
      <Text fontFamily="" {...props}>
        {props.children}
      </Text>
    );
  }
  return <Text {...props}>{props.children}</Text>;
};

export default MyText;
