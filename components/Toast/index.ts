import Toast from "react-native-root-toast";

const myToast = {
  success: (message: string) => {
    Toast.show(`成功：${message}`, {
      position: 58,
      shadow: true,
      backgroundColor: "green",
    });
  },
  error: (message: string) => {
    Toast.show(`错误：${message}`, {
      position: 58,
      shadow: true,
      backgroundColor: "red",
    });
  },
  warn: (message: string) => {
    Toast.show(`警告：${message}`, {
      position: 58,
      shadow: true,
      backgroundColor: "yellow",
    });
  },
};

export default myToast;
