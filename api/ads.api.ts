import api from "@/lib/axios";
import { Ad } from "@/type";

export interface CreateAdData {
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  location?: string;
  district?: string;
  plan?: { plan: string; startDate: string; endDate: string; planCharge: number };
  boostAds?: {
    boost: string;
    startDate: string;
    endDate: string;
    boostCharge: number;
  }[];
  images?: File[];
}

export const adsApi = {
  async getAll(filters?: {
    category?: string;
    subcategory?: string;
    district?: string;
    search?: string;
  }): Promise<Ad[]> {
    const params = new URLSearchParams();
    if (filters?.category) params.append("category", filters.category);
    if (filters?.subcategory) params.append("subcategory", filters.subcategory);
    if (filters?.district) params.append("district", filters.district);
    if (filters?.search) params.append("search", filters.search);
    const res = await api.get(`/ads?${params.toString()}`);
    return res.data;
  },

  async getOne(id: string): Promise<Ad> {
    const res = await api.get(`/ads/${id}`);
    return res.data;
  },

  async create(data: CreateAdData): Promise<Ad> {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("category", data.category);
    if (data.subcategory) formData.append("subcategory", data.subcategory);
    if (data.location) formData.append("location", data.location);
    if (data.district) formData.append("district", data.district);
    if (data.plan) formData.append("plan", JSON.stringify(data.plan));
    if (data.boostAds)
      formData.append("boostAds", JSON.stringify(data.boostAds));
    data.images?.forEach((file) => formData.append("images", file));
    const res = await api.post("/ads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async update(id: string, data: Partial<Ad>): Promise<Ad> {
    const res = await api.patch(`/ads/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/ads/${id}`);
  },

  async boostAd(
    id: string,
    data: { boost: string; startDate: string; endDate: string; boostCharge: number },
  ): Promise<Ad> {
    const res = await api.post(`/ads/${id}/boost`, data);
    return res.data;
  },
};
