import { envConfig } from "@/config";
import { useMutation } from "@tanstack/react-query";

const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(
        `${envConfig.NEXT_PUBLIC_API_END_POINT}/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Lỗi khi đăng nhập");
      }

      let responseData;
      try {
        const text = await res.text();
        responseData = text ? JSON.parse(text) : null;
      } catch (error) {
        console.error("JSON parse error:", error);
        throw new Error("Lỗi khi parse response");
      }
      return responseData;
    },
  });
};

export { useLoginMutation };
