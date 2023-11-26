import { View, StyleSheet } from "react-native";
import {
  Box,
  AspectRatio,
  Image,
  VStack,
  Input,
  FormControl,
  Button,
  Icon,
  Pressable,
  Text,
} from "native-base";
import Colors from "@/constants/Colors";
import { useState } from "react";
import { invalidObj } from "@/types/login";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LoginManager from "@/apis/login";

const cellaviewLogo = require("@/assets/images/cellaview_login_logo.png");

export default function Login() {
  const router = useRouter();

  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (val: string) => {
    setUsername(val);
  };
  const handleBlurUsername = () => {
    if (username.length > 0) {
      setInvalidUsername(false);
    } else {
      console.log();
      setInvalidUsername(true);
    }
  };

  const handleChangePassword = (val: string) => {
    setPassword(val);
  };
  const handleBlurPassword = () => {
    if (password.length > 0) {
      setInvalidPassword(false);
    } else {
      setInvalidPassword(true);
    }
  };

  const login = async () => {
    // 检查输入
    console.log("username: ", username);
    console.log("password: ", password);

    try {
      const res = await LoginManager.login({ username: "haha", password: 'hehe' });
      console.log("res: ", res);
    } catch (err: any) {
      // TODO 用 toast 通知用户
      console.error(err.message);
    }


    // 如果正确，路由跳转
    // router.replace("/(tabs)");
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.form}>
        <Box
          _text={{
            fontSize: "4xl",
            textAlign: "center",
            color: Colors.light.activeColor,
          }}
        >
          Cellaview 2.0
        </Box>
        <VStack space="6" mt="4">
          <FormControl isInvalid={invalidUsername}>
            <FormControl.Label isRequired>用户名</FormControl.Label>
            <Input
              size="lg"
              placeholder="请输入用户名"
              value={username}
              onChangeText={handleChangeUsername}
              onBlur={handleBlurUsername}
              InputLeftElement={
                <Icon as={<MaterialIcons name="person" />} size={6} ml="2" />
              }
            />
            <FormControl.ErrorMessage>用户名必填</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={invalidPassword}>
            <FormControl.Label isRequired>密码</FormControl.Label>
            <Input
              size="lg"
              placeholder="请输入密码"
              type={showPassword ? "text" : "password"}
              value={password}
              onBlur={handleBlurPassword}
              onChangeText={handleChangePassword}
              InputLeftElement={
                <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={showPassword ? "visibility" : "visibility-off"}
                      />
                    }
                    size={6}
                    ml="2"
                  />
                </Pressable>
              }
            />
            <FormControl.ErrorMessage>密码必填</FormControl.ErrorMessage>
          </FormControl>
          <Box mt="6">
            <Button size="lg" onPress={login}>
              登录
            </Button>
            <Text
              fontSize="sm"
              color="#777777"
              alignSelf="flex-end"
              mr="-3"
              mt="2"
            >
              还没有账号？请管理员帮忙创建一个吧！
            </Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "85%",
    height: "60%",
  },
});
