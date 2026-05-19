import api from '@/lib/axios';
import { Order } from '@/type';

export const orderService = {
  async create(adId: string): Promise<Order> {
    const res = await api.post('/orders', { adId });
    return res.data;
  },

  async getMyOrders(): Promise<Order[]> {
    const res = await api.get('/orders/my');
    return res.data;
  },

  async getOne(id: string): Promise<Order> {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  },

  async getAll(): Promise<Order[]> {
    const res = await api.get('/orders');
    return res.data;
  },

  async verifyPayment(id: string, status: 'verified' | 'notVerified'): Promise<Order> {
    const res = await api.patch(`/orders/${id}/payment`, { status });
    return res.data;
  },
};