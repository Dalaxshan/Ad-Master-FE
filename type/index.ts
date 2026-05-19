export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  district?: string;
  isVerified: boolean;
  role: 'admin' | 'seller' | 'customer';
  ads: Ad[];
}

export interface PlanDetail {
  plan: string;
  startDate: string;
  endDate: string;
  amount: number;
}

export interface BoostAd {
  boost: string;
  startDate: string;
  endDate: string;
  amount: number;
}

export interface Ad {
  _id: string;
  title: string;
  description: string;
  price: number;
  seller: User;
  images: { url: string; publicId: string }[];
  plan?: PlanDetail;
  boostAd: BoostAd[];
  totalAmount: number;
  location?: string;
  district?: string;
  category: string;
  subcategory?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

export interface Category {
  _id: string;
  categoryName: string;
  categorySlug: string;
  subcategory: { _id: string; subcategoryName: string; subcategorySlug: string }[];
}

export interface Order {
  _id: string;
  ad: Ad;
  buyer: User;
  payment: 'verified' | 'notVerified';
  orderDate: string;
  createdAt: string;
}