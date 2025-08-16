import { http } from "@/lib/http";

export const metaApi = {
  categories: () => http.get("/api/meta/categories", { baseUrl: "" }),
  brands: () => http.get("/api/meta/brands", { baseUrl: "" }),
  tags: () => http.get("/api/meta/tags", { baseUrl: "" }),
  createCategory: (data: any, token?: string) =>
    http.post(
      "/api/meta/categories",
      data,
      token
        ? { headers: { Authorization: `Bearer ${token}` }, baseUrl: "" }
        : { baseUrl: "" }
    ),
  createBrand: (data: any, token?: string) =>
    http.post(
      "/api/meta/brands",
      data,
      token
        ? { headers: { Authorization: `Bearer ${token}` }, baseUrl: "" }
        : { baseUrl: "" }
    ),
  createTag: (data: any, token?: string) =>
    http.post(
      "/api/meta/tags",
      data,
      token
        ? { headers: { Authorization: `Bearer ${token}` }, baseUrl: "" }
        : { baseUrl: "" }
    ),
};
