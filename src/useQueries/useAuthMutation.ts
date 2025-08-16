import { authApiRequest } from "@/apiRequests/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = async (data: any) => {
  return useMutation({
    mutationFn: await authApiRequest.login(data),
  });
};
