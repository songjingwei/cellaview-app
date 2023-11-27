import { View, StyleSheet } from "react-native";
import {
  Box,
  VStack,
  Input,
  FormControl,
  Button,
  Icon,
  Pressable,
  Text,
  Alert,
  HStack,
  NativeBaseProvider,
} from "native-base";
import Colors from "@/constants/Colors";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LoginManager from "@/apis/login";
import { usePersistStore, useUserStore } from "@/store";
import * as Crypto from "expo-crypto";
import Toast from "react-native-root-toast";

export default function Login() {
  const router = useRouter();

  const machineIp = usePersistStore((state) => state.machineIp);
  const setToken = usePersistStore((state) => state.setToken);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

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
    const digestPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA1,
      username + password
    );

    try {
      const res = await LoginManager.login({
        userName: username,
        password: digestPassword,
      });
      if (res.errCode !== 0) {
        Toast.show(res.errMsg, {
          position: 58,
          shadow: true,
          backgroundColor: "red",
        });
      } else {
        // 写入用户信息至全局状态
        setUserInfo(res.body);
        // token 持久化
        setToken(res.body.token);
      }
    } catch (err) {
      console.log("err----: ", err);
    }
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.form}>
        <Box
          _text={{
            fontSize: "5xl",
            fontWeight: "extrabold",
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
            <Button
              size="lg"
              onPress={login}
              isDisabled={
                machineIp === null || invalidUsername || invalidPassword
              }
            >
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
      {!machineIp && (
        <Alert w="85%" status="error" position="absolute" top="10">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack space={2}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                您尚未连接机器，请点击右上角连接！
              </Text>
            </HStack>
          </VStack>
        </Alert>
      )}
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
