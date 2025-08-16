import { http } from "@/lib/http";

export type ProductListItem = {
  id: string;
  name: string;
  price: number;
  brandName?: string;
  categoryName?: string;
  imageUrls: string[];
  stockQuantity?: number;
  status?: string;
};

export type ProductDetail = {
  id: string;
  name: string;
  price: number;
  brandName?: string;
  categoryName?: string;
  imageUrls: string[];
  variants: {
    id: string;
    sku: string;
    name: string;
    price: number;
    stockQuantity: number;
  }[];
  tags: string[];
  stockQuantity?: number;
  status?: string;
};

export const productsApi = {
  list: (params?: {
    q?: string;
    categoryId?: string | number;
    brandId?: string;
    page?: number;
    size?: number;
  }) => {
    const qs = new URLSearchParams();
    if (params?.q) qs.set("q", params.q);
    if (params?.categoryId) qs.set("categoryId", String(params.categoryId));
    if (params?.brandId) qs.set("brandId", params.brandId);
    if (params?.page !== undefined) qs.set("page", String(params.page));
    if (params?.size !== undefined) qs.set("size", String(params.size));
    const url = `/api/products/public${
      qs.toString() ? `?${qs.toString()}` : ""
    }`;
    return http.get(url, { baseUrl: "" });
  },
  detail: (id: string) => {
    return http.get(`/api/products/public/${id}`, { baseUrl: "" });
  },
  create: (_token: string, body: any) => {
    // token no longer needed here; Next API route handles auth + refresh
    return http.post(`/api/products/create`, body, { baseUrl: "" });
  },
  update: (_token: string, id: string, body: any) => {
    return http.put(`/api/products/${id}`, body, { baseUrl: "" });
  },
  remove: (_token: string, id: string) => {
    return http.delete(`/api/products/${id}`, { baseUrl: "" });
  },
};
