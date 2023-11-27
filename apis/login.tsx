import { post } from "@/axios";

const login = async (payload: Object) => {
  return post("/v1/login/userLogin", payload);
};

const LoginManager = {
  login,
};

export default LoginManager;
