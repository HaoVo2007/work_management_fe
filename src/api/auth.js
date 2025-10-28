import api from "./index";

export const AuthAPI = {
  login: (payload) => api.post("/users/login", payload),
  register: (payload) => api.post("/users/register", payload),
};
  