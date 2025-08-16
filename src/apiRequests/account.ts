import { http } from "@/lib/http";

const accountApiRequest = {
  me: (sessionToken: string) => {
    return http.get("/api/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      baseUrl: "",
    });
  },
  updateMe: (sessionToken: string, body: any) => {
    return http.put("/api/account/me", body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      baseUrl: "",
    });
  },
};

export default accountApiRequest;
