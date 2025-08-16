"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  ClipboardList,
  Menu,
  Bell,
  Search as SearchIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";

const navItems = [
  {
    id: "dashboard",
    label: "Tổng Quan",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    id: "orders",
    label: "Đơn Hàng",
    href: "/orders",
    icon: <ClipboardList size={18} />,
  },
  {
    id: "products",
    label: "Sản Phẩm",
    href: "/admin-products",
    icon: <ShoppingBag size={18} />,
  },
  {
    id: "accounts",
    label: "Tài Khoản",
    href: "/accounts",
    icon: <Users size={18} />,
  },
  {
    id: "analytics",
    label: "Thống Kê",
    href: "/analytics",
    icon: <LayoutDashboard size={18} />,
  },
  {
    id: "settings",
    label: "Cài Đặt",
    href: "/settings",
    icon: <Settings size={18} />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const baseHref = useMemo(() => {
    return "/dashboard";
  }, [pathname]);

  // Listen SSE for new orders and update badge (simple in-memory state)
  const [notifCount, setNotifCount] = useState(0);
  useState(() => {
    try {
      const es = new EventSource("/api/notifications/sse");
      es.addEventListener("order", () => setNotifCount((n) => n + 1));
      es.addEventListener("error", () => {});
      return () => es.close();
    } catch {}
  });

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100 text-gray-800">
        {/* Desktop sidebar */}
        <aside
          className={`hidden lg:flex lg:flex-col ${
            sidebarCollapsed ? "w-20" : "w-64"
          } bg-white shadow-lg transition-all duration-300 overflow-hidden`}
        >
          <div className="h-20 border-b flex items-center px-6">
            <div className="h-10 w-10 rounded-md bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
              L
            </div>
            <div className={`ml-3 ${sidebarCollapsed ? "hidden" : "block"}`}>
              <div className="font-bold">LALA-LYCHEE</div>
              <div className="text-xs text-muted-foreground">Admin</div>
            </div>
          </div>
          <nav className="flex-1 py-4">
            {navItems.map((item) => {
              const href = item.href || baseHref;
              const isActive = pathname?.startsWith(item.href || "") || false;
              return (
                <Link
                  key={item.id}
                  href={href}
                  title={item.label}
                  className={`flex items-center gap-3 py-3 ${
                    sidebarCollapsed ? "justify-center px-0" : "px-6"
                  } my-1 transition-colors ${
                    isActive
                      ? "bg-pink-100 text-pink-600 border-r-4 border-pink-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            ></div>
            <aside className="relative z-10 w-64 h-full bg-white shadow-lg flex flex-col">
              <div className="h-16 border-b flex items-center px-4">
                <div className="h-9 w-9 rounded-md bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                  L
                </div>
                <div className="ml-2 font-semibold">LALA-LYCHEE</div>
              </div>
              <nav className="flex-1 py-3">
                {navItems.map((item) => {
                  const href = item.href || baseHref;
                  const isActive =
                    pathname?.startsWith(item.href || "") || false;
                  return (
                    <Link
                      key={item.id}
                      href={href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 py-3 px-4 my-1 transition-colors ${
                        isActive
                          ? "bg-pink-100 text-pink-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:inline-flex"
                onClick={() => setSidebarCollapsed((v) => !v)}
                aria-label="Toggle sidebar"
                title="Thu gọn/Mở rộng thanh điều hướng"
              >
                {sidebarCollapsed ? (
                  <ChevronsRight size={20} />
                ) : (
                  <ChevronsLeft size={20} />
                )}
              </Button>
              <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
                <SearchIcon className="text-gray-500" size={18} />
                <Input
                  placeholder="Tìm kiếm..."
                  className="bg-transparent border-0 focus-visible:ring-0 ml-2 w-[260px]"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="relative"
                aria-label="Thông báo"
                title="Thông báo"
                onClick={() => alert("Mở panel thông báo")}
              >
                <Bell className="text-gray-500" size={20} />
                {notifCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-medium leading-none text-white bg-pink-600 rounded-full">
                    {notifCount}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2">
                <img
                  src="https://placehold.co/36x36/fecdd3/be185d?text=A"
                  alt="Admin"
                  className="w-9 h-9 rounded-full"
                />
                <div className="hidden md:block">
                  <div className="text-sm font-medium">Admin</div>
                  <div className="text-xs text-muted-foreground">
                    Quản trị viên
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
