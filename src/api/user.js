import api from "./index";

export const UserAPI = {
  uploadAvatar: (payload) => api.post("/users/upload/avatar", payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  getProfile: () => api.get("/users/me"),
};
