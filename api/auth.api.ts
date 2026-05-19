import api from "@/lib/axios";
import { User } from "@/type";

export const authApi = {
  async register(data:User) {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  async login(data: { email: string; password: string }) {
    const res = await api.post("/auth/login", data);
    return res.data;
  },

  async adminLogin(data: { email: string; password: string }) {
    const res = await api.post("/admin/login", data);
    return res.data;
  },

  async logout() {
    await api.post("/auth/logout");
    window.location.href = "/login";
  },
};
