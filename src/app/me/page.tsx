"use client";
import { useAppContextProvider } from "@/context/app-context";
import React, { useEffect, useMemo, useState } from "react";
import accountApiRequest from "@/apiRequests/account";
import { toast } from "sonner";

export default function page() {
  const { sessionToken } = useAppContextProvider();
  const [me, setMe] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const displayName = useMemo(() => {
    if (!me) return "";
    return (
      me.fullName ||
      [me.firstName, me.lastName].filter(Boolean).join(" ") ||
      me.email ||
      "Người dùng"
    );
  }, [me]);

  const initials = useMemo(() => {
    const source: string = displayName || me?.email || "U";
    const parts = source.trim().split(" ");
    const letters =
      parts.length >= 2
        ? parts[0][0] + parts[parts.length - 1][0]
        : source.slice(0, 2);
    return letters.toUpperCase();
  }, [displayName, me]);

  useEffect(() => {
    const fetchMe = async () => {
      if (!sessionToken) return;
      setLoading(true);
      try {
        const res = await accountApiRequest.me(sessionToken);
        setMe(res?.data ?? null);
      } catch (e: any) {
        setError("Không thể tải thông tin cá nhân");
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, [sessionToken]);

  if (!sessionToken) return <div className="mt-25">Vui lòng đăng nhập</div>;

  if (error) return <div className="mt-25">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 mt-25 mb-25">
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center text-lg font-semibold">
            {initials}
          </div>
          <div>
            <h1 className="text-xl font-semibold leading-tight">
              {displayName || "Thông tin cá nhân"}
            </h1>
            <p className="text-gray-500 text-sm">{me?.email}</p>
          </div>
        </div>

        <div className="px-6 pb-6">
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <p className="text-xs uppercase text-gray-500">Họ và tên</p>
                <p className="mt-1">{displayName || "-"}</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-xs uppercase text-gray-500">Email</p>
                <p className="mt-1">{me?.email || "-"}</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-xs uppercase text-gray-500">Số điện thoại</p>
                <p className="mt-1">{me?.phone_number || "-"}</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-xs uppercase text-gray-500">Địa chỉ</p>
                <p className="mt-1">{me?.address || "-"}</p>
              </div>
              <div className="border rounded-lg p-4 sm:col-span-2">
                <p className="text-xs uppercase text-gray-500">Vai trò</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(me?.roles || []).length > 0 ? (
                    (me.roles as string[]).map((r: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border"
                      >
                        {r}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <form
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!sessionToken) return;
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const payload = {
                      firstName:
                        (formData.get("firstName") as string) || undefined,
                      lastName:
                        (formData.get("lastName") as string) || undefined,
                      fullName:
                        (formData.get("fullName") as string) || undefined,
                      phone_number:
                        (formData.get("phone_number") as string) || undefined,
                      address: (formData.get("address") as string) || undefined,
                    };
                    try {
                      const res = await accountApiRequest.updateMe(
                        sessionToken,
                        payload
                      );
                      setMe(res?.data ?? me);
                      toast.success("Cập nhật thành công");
                    } catch (err) {
                      toast.error("Cập nhật thất bại");
                    }
                  }}
                >
                  <div>
                    <label className="block text-xs text-gray-600">Họ</label>
                    <input
                      name="firstName"
                      defaultValue={me?.firstName || ""}
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Tên</label>
                    <input
                      name="lastName"
                      defaultValue={me?.lastName || ""}
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">
                      Họ tên
                    </label>
                    <input
                      name="fullName"
                      defaultValue={me?.fullName || ""}
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">
                      Số điện thoại
                    </label>
                    <input
                      name="phone_number"
                      defaultValue={me?.phone_number || ""}
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-gray-600">
                      Địa chỉ
                    </label>
                    <input
                      name="address"
                      defaultValue={me?.address || ""}
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="sm:col-span-2 flex justify-end gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-pink-600 text-white rounded"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
