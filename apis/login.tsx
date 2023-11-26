import { post } from "@/axios";

const login = async (payload: Object) => {
  return post("/test", payload);
}

const LoginManager = {
  login,
}

export default LoginManager;