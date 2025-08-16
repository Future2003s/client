"use client";
import { envConfig } from "@/config";
import Link from "next/link";
import { useAppContextProvider } from "@/context/app-context";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import { authApiRequest } from "@/apiRequests/auth";
import accountApiRequest from "@/apiRequests/account";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Trang Chủ" },
  {
    label: "Sản Phẩm",
    href: "/shop",
    subItems: [
      { href: "/products", label: "Tất Cả Sản Phẩm" },
      { href: "/products?q=m%E1%BA%ADt+ong", label: "Mật Ong" },
      { href: "/products?q=v%E1%BA%A3i", label: "Sản phẩm Vải" },
    ],
  },
  { href: "/story", label: "Câu Chuyện" },
  {
    label: "Chức Năng",
    subItems: [
      { href: "/payment", label: "Thanh Toán" },
      { href: "/login", label: "Đăng Nhập" },
      { href: "/register", label: "Đăng Ký" },
      { href: "/dashboard?section=dashboard", label: "Quản Trị" },
    ],
  },
];

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16" />
  </svg>
);
const UserIcon = ({ className }: { className?: string }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
// --- Component Họa tiết trang trí ---
const DecorativeDivider = () => (
  <div className="relative -mt-16 sm:-mt-20 z-20 flex justify-center">
    <div className="bg-rose-50 px-4">
      <svg
        width="200"
        height="50"
        viewBox="0 0 250 50"
        className="text-rose-800 opacity-20"
      >
        {/* Lychee Branch */}
        <path
          d="M60 25 C 80 10, 100 10, 120 25"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="120" cy="25" r="5" fill="currentColor" stroke="none" />
        <circle cx="123" cy="22" r="1" fill="white" />
        <path
          d="M120 25 Q 115 35, 110 30"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M120 25 Q 125 35, 130 30"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Bee */}
        <ellipse cx="150" cy="20" rx="4" ry="2.5" fill="currentColor" />
        <path d="M150 18 L 150 22" stroke="white" strokeWidth="1" />
        <path
          d="M148 17 Q 145 15, 148 13"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M152 17 Q 155 15, 152 13"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />

        {/* Honeycomb */}
        <path
          d="M180 25 l 5 -3 l 5 3 v 6 l -5 3 l -5 -3 v -6"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M190 22 l 5 -3 l 5 3 v 6 l -5 3 l -5 -3 v -6"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  </div>
);

// --- Component Mobile Nav ---
const MobileNav = ({
  isOpen,
  onClose,
  isAdmin,
}: {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${isOpen ? "block" : "hidden"}`}
    >
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-xs bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <span className="font-bold text-rose-800">Menu</span>
          <button onClick={onClose} className="p-2 -mr-2">
            <XIcon className="text-slate-500" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.subItems ? (
                  <>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === link.label ? null : link.label
                        )
                      }
                      className="w-full flex justify-between items-center py-3 text-base font-semibold text-slate-700"
                    >
                      <span>{link.label}</span>
                      <ChevronDownIcon
                        className={`transition-transform duration-300 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === link.label && (
                      <ul className="pl-4 mt-1 space-y-1 border-l-2 border-rose-100">
                        {link.subItems.map((item) => (
                          <li key={item.label}>
                            <a
                              href={item.href}
                              className="block py-2 text-sm text-slate-600 hover:text-rose-700"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <a
                    href={link.href}
                    className="block py-3 text-base font-semibold text-slate-700"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  href="/d"
                  className="block py-3 text-base font-semibold text-rose-700"
                  onClick={onClose}
                >
                  Quản Trị
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const router = useRouter();
  const { sessionToken, setSessionToken } = useAppContextProvider();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const totalQuantity = useCartStore((s) =>
    s.items.reduce((sum, it) => sum + it.quantity, 0)
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 50);
      if (isMobileMenuOpen) {
        setIsHeaderVisible(true);
        return;
      }
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const fetchMe = async () => {
      if (!sessionToken) {
        setIsAdmin(false);
        return;
      }
      try {
        const res: any = await accountApiRequest.me(sessionToken);
        const roles: string[] = res?.data?.roles || [];
        setIsAdmin(roles.includes("ADMIN") || roles.includes("ROLE_ADMIN"));
      } catch {
        setIsAdmin(false);
      }
    };
    fetchMe();
  }, [sessionToken]);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-40 transition-all duration-500 ease-in-out bg-white/80 backdrop-blur-lg ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        } ${!isAtTop ? "shadow-md" : ""}`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <img
                src={envConfig.NEXT_PUBLIC_URL_LOGO}
                alt="LALA-LYCHEEE Logo"
                className="h-15 w-15 object-contain rounded-full"
              />
              <span className="text-3xl font-bold tracking-tighter hidden sm:block bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent ">
                LALA-LYCHEEE
              </span>
            </Link>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  {link.subItems ? (
                    <>
                      <span className="flex items-center gap-1.5 cursor-pointer py-3 text-base font-medium text-slate-600 hover:text-rose-700">
                        {link.label}
                        <ChevronDownIcon className="transition-transform duration-300 group-hover:rotate-180" />
                      </span>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 z-20 border border-gray-100">
                        <div className="py-2">
                          {link.subItems.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-700"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href!}
                      className="py-3 text-base font-medium text-slate-600 hover:text-rose-700"
                    >
                      {link.label}
                    </Link>
                  )}
                  <span className="absolute bottom-0 left-0 block h-[1.5px] w-full bg-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                </div>
              ))}
              {isAdmin && (
                <Link
                  href="/dashboard?section=dashboard"
                  className="py-3 text-base font-semibold text-rose-700"
                >
                  Trang Quản Trị
                </Link>
              )}
            </nav>

            {/* Icons & Mobile Menu Trigger */}
            <div className="flex items-center gap-3">
              {sessionToken ? (
                <div className="relative">
                  <button
                    onClick={() => setIsAccountOpen((v) => !v)}
                    aria-label="Tài khoản"
                    className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-all duration-300"
                  >
                    <UserIcon />
                    <span className="hidden sm:block">Tài khoản</span>
                    <ChevronDownIcon className="hidden sm:block" />
                  </button>
                  {isAccountOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-50">
                      <Link
                        href="/me"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-700"
                        onClick={() => setIsAccountOpen(false)}
                      >
                        Trang cá nhân
                      </Link>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-700"
                        onClick={async () => {
                          try {
                            await authApiRequest.logout();
                            setSessionToken("");
                            setIsAccountOpen(false);
                            toast.success("Đã đăng xuất");
                            router.push("/login");
                            router.refresh();
                          } catch {
                            toast.error("Đăng xuất thất bại");
                          }
                        }}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  aria-label="Đăng nhập"
                  className="p-2 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-all duration-300"
                >
                  <UserIcon />
                </Link>
              )}
              <Link
                href="/cart"
                aria-label="Giỏ hàng"
                className="relative p-2 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-all duration-300"
              >
                <ShoppingCartIcon />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] leading-none px-1.5 py-1 rounded-full">
                    {totalQuantity}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-colors lg:hidden"
                aria-label="Mở menu"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default Header;
