import { API } from "./baseUrl";

const register = async (data) => {
  const response = await API.post("/auth/register", data);
  return response;
};

const login = async (data) => {
  const response = await API.post("/auth/login", data);
  return response;
};

const authService = {
  register,
  login,
};

export default authService;
