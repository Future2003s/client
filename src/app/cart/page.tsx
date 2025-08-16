"use client";
import Link from "next/link";
import { useCartStore } from "@/store/cart";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    n
  );

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const totalPrice = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng</h1>
      {items.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-600">Giỏ hàng trống.</p>
          <Link
            href="/products"
            className="inline-block mt-3 px-4 py-2 rounded bg-pink-600 text-white"
          >
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded shadow">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-3">Sản phẩm</th>
                  <th className="p-3">Giá</th>
                  <th className="p-3">Số lượng</th>
                  <th className="p-3">Tạm tính</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr
                    key={`${it.id}-${it.variantId || "_"}`}
                    className="border-t"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {it.imageUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={it.imageUrl}
                            alt={it.name}
                            className="w-14 h-14 rounded object-cover border"
                          />
                        )}
                        <div>
                          <div className="font-medium">{it.name}</div>
                          {it.variantName && (
                            <div className="text-xs text-gray-500">
                              {it.variantName}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{formatCurrency(it.price)}</td>
                    <td className="p-3">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(it.id, it.quantity - 1, it.variantId)
                          }
                          className="h-7 w-7 border rounded"
                        >
                          -
                        </button>
                        <div className="w-8 text-center">{it.quantity}</div>
                        <button
                          onClick={() =>
                            updateQuantity(it.id, it.quantity + 1, it.variantId)
                          }
                          className="h-7 w-7 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3">
                      {formatCurrency(it.price * it.quantity)}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => removeItem(it.id, it.variantId)}
                        className="text-red-600 hover:underline"
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded shadow p-4 h-fit">
            <div className="flex items-center justify-between">
              <div className="text-gray-600">Tổng cộng</div>
              <div className="text-lg font-semibold">
                {formatCurrency(totalPrice)}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Link
                href="/checkout"
                className="flex-1 px-4 py-2 rounded bg-pink-600 text-white text-center"
              >
                Thanh toán
              </Link>
              <button onClick={clear} className="px-4 py-2 rounded border">
                Xoá giỏ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
