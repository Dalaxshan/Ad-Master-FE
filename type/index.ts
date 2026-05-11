export interface Ad {
  id: number;
  title: string;
  price: number | null;
  priceLabel?: string;
  location: string;
  district: string;
  category: string;
  subcategory: string;
  image: string;
  postedAt: string;
  isFeatured: boolean;
  isPremium: boolean;
  description: string;
  seller: string;
  contact: string;
  views: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  color: string;
  subcategories: {
    subName: string;
    subSlug: string;
  }[];
}

export interface District {
  id: string;
  name: string;
  districtSlug: string;
}
