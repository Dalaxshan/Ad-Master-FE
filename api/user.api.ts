import api from "@/lib/axios";
import { User } from "@/type";

export const userApi = {
  async getMe(): Promise<User> {
    const res = await api.get("/users/me");
    return res.data;
  },

  async updateMe(data: Partial<User>): Promise<User> {
    const res = await api.patch("/users/me", data);
    return res.data;
  },

  async getAllUsers(): Promise<User[]> {
    const res = await api.get("/users");
    return res.data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
