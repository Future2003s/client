import {
  LoginBodyType,
  RegisterRequestType,
} from "@/shemaValidation/auth.schema";
import { http } from "@/lib/http";
import { LoginResType } from "@/types/types";

export const authApiRequest = {
  register: (body: RegisterRequestType) => {
    return http.post<LoginResType>("/api/auth/register", body);
  },
  login: (body: LoginBodyType) => {
    return http.post<LoginResType>("/api/auth/login", body);
  },
  sLogin: (body: any) => {
    return http.post("/api/auth/login", {
      baseUrl: "",
    });
  },
  auth: (body: { sessionToken: string }) => {
    return http.post<LoginResType>("/api/auth", body, {
      baseUrl: "",
    });
  },
  logout: () => {
    return http.post("/api/auth/logout", {}, { baseUrl: "" });
  },
};
