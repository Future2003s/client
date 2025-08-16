import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { NextFont } from "next/dist/compiled/@next/font";
import AppProvider from "@/context/app-provider";
import LayoutMain from "@/layouts/layout-main";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import AppContext from "@/context/app-context";
import { CartProvider } from "@/context/cart-context";
import { QueryProvider } from "@/providers/query-provider";

const fontSans: NextFont = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LALA-LYCHEEE",
  description: "CÔNG TY TNHH LALA-LYCHEEE",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${fontSans.className}`} suppressHydrationWarning>
        <AppProvider>
          <AppContext initialSessionToken={sessionToken?.value as string}>
            <QueryProvider>
              <CartProvider>
                <LayoutMain>{children}</LayoutMain>
              </CartProvider>
            </QueryProvider>
          </AppContext>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
