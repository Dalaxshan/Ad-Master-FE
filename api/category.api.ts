import api from "@/lib/axios";
import { Category } from "@/type";

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const res = await api.get("/categories");
    return res.data;
  },

  async getOne(id: string): Promise<Category> {
    const res = await api.get(`/categories/${id}`);
    return res.data;
  },

  async create(data: {
    categoryName: string;
    categorySlug: string;
    subcategory: any[];
  }): Promise<Category> {
    const res = await api.post("/categories", data);
    return res.data;
  },

  async update(id: string, data: Partial<Category>): Promise<Category> {
    const res = await api.patch(`/categories/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};
