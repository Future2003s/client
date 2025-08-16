"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeSlashIcon } from "@/icons/icons.global";
import { EyeIcon } from "lucide-react";
import { authSchema, LoginBodyType } from "@/shemaValidation/auth.schema";
import { envConfig } from "@/config";
import { authApiRequest } from "@/apiRequests/auth";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useAppContextProvider } from "@/context/app-context";

function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const { setSessionToken } = useAppContextProvider();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginBodyType>({ resolver: zodResolver(authSchema) });

  const loginMutation = useMutation({
    mutationFn: (data: LoginBodyType) => {
      return authApiRequest.login(data);
    },
  });

  const onSubmit = async (data: LoginBodyType) => {
    setIsSubmitting(true);
    const result = await loginMutation.mutateAsync(data);

    console.log(result);

    if (result) {
      const resultFromNext = await fetch("/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(result),
      });
      console.log(resultFromNext);
      // Update client context immediately for seamless UX
      try {
        const token = result?.data?.access_token as string | undefined;
        if (token) setSessionToken(token);
      } catch {}
      // Immediately navigate and refresh to ensure server components read the latest cookie
      toast.success("Đăng nhập thành công!", {
        position: "top-center",
        richColors: true,
      });
      router.push("/me");
      // Give the push a tick, then refresh to re-run server components and layout reading cookies
    }
    setIsSubmitting(false);

    // router.push("/account");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
        {/* Logo và Heading */}
        <div className="text-center">
          <div className="mx-auto w-24 h-24 relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-75"></div>
            <img
              src={envConfig.NEXT_PUBLIC_URL_LOGO}
              className="relative rounded-full w-full h-full object-cover border-2 border-white/50"
              alt="Logo"
            />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tight">
            Đăng nhập
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Hoặc{" "}
            <Link
              href="/register"
              className="font-medium text-pink-400 hover:text-pink-300 transition-colors"
            >
              đăng ký tài khoản mới
            </Link>
          </p>
        </div>

        {/* Form đăng nhập */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className="appearance-none relative block w-full px-4 py-3 border border-white/20 placeholder-gray-400 text-white rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  placeholder="Địa chỉ email"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="appearance-none relative block w-full px-4 py-3 border border-white/20 placeholder-gray-400 text-white rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  placeholder="Mật khẩu"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white transition-colors"
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/forget-password"
                className="font-medium text-pink-400 hover:text-pink-300 transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang xử lý...
              </div>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
